import firebase from 'firebase/app'

import { FirebaseContext } from '../context'
import { New, NewComplete, NewWithDefaults, Update } from '../utils/types/firestore'

import { userDefaults } from './model-defaults'
import { User, UserPrivate } from './model-types'
import { USERS } from './schema'

import 'core-js/features/array/flat-map'

export type { New, Update }
export * from './model-types'
export * from './schema'

/**
 * @description Manages saving data to Firestore, including updating computed values
 */
export class Dao {
  // @ts-expect-error - we will use this later (to get the current user)
  private readonly auth: firebase.auth.Auth
  private readonly db: firebase.firestore.Firestore
  // @ts-expect-error - we will use this later (to save computed values)
  private readonly FieldValue: typeof firebase.firestore.FieldValue
  private readonly getGuid: () => string

  constructor({ auth, db, FieldValue, getGuid }: FirebaseContext) {
    this.auth = auth
    this.db = db
    this.FieldValue = FieldValue
    this.getGuid = getGuid
  }

  async createUser(data: New<User>): Promise<string> {
    const userWd: NewWithDefaults<User> = { ...userDefaults, ...data }
    const userComplete: NewComplete<User> = { ...userWd, slug: userWd.slug ?? this.getGuid(), name: `${userWd.nameFirst} ${userWd.nameLast}` }

    // TODO: Check slug is available
    return await this.db.collection(USERS).doc(userComplete.slug).set(userComplete, { merge: true })
      .then(() => userComplete.slug)
      .catch(() => '')
  }

  async createUserPrivate(_data: New<UserPrivate>, _userId: string): Promise<void> {}
  async updateUser(_data: Update<User>, _userId: string): Promise<void> {}
  async updateUserPrivate(_data: Update<UserPrivate>, _userId: string): Promise<void> {}
}
