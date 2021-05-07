import type firebase from 'firebase/app'

import type { FirebaseContext } from '../context'
import type { New, Update } from '../utils/types/firestore'

import type { User, UserPrivate } from './model-types'

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
  // @ts-expect-error - we will use this later (to save data)
  private readonly db: firebase.firestore.Firestore
  // @ts-expect-error - we will use this later (to save computed values)
  private readonly FieldValue: typeof firebase.firestore.FieldValue
  // @ts-expect-error - we will use this later (to generate GUIDs locally)
  private readonly getGuid: () => string

  constructor({ auth, db, FieldValue, getGuid }: FirebaseContext) {
    this.auth = auth
    this.db = db
    this.FieldValue = FieldValue
    this.getGuid = getGuid
  }

  createUser(_data: New<User>, userId?: string): string { return userId ?? '' }
  createUserPrivate(_data: New<UserPrivate>, _userId: string): void {}
  updateUser(_data: Update<User>, _userId: string): void {}
  updateUserPrivate(_data: Update<UserPrivate>, _userId: string): void {}
}
