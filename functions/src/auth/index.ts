import { TokenRequestCallable, UrlRequestCallable } from '@phits-tech/common/dist/api-callables'
import { Dao, User, UserPrivate, USERS, USERS_PRIVATE } from '@phits-tech/common/dist/dao-firestore'
import { fixName } from '@phits-tech/common/dist/utils/string-cases'
import { New, Update } from '@phits-tech/common/dist/utils/types/firestore'

import { context } from '../_services/context'
import admin, { db, FieldValue } from '../_services/firebase-admin-initialized'
import { Handler } from '../types'

import { authorizeUrl, exchangeAuthCodeForToken, getUserIdentity } from './nu-connect'

const dao = new Dao(context)

export const getUrl: Handler<UrlRequestCallable> = (data, _context) => {
  return authorizeUrl(data.redirectUri)
}

export const getToken: Handler<TokenRequestCallable> = async (data, _context) => {
  const response = await exchangeAuthCodeForToken(data.authCode, data.redirectUri)
  if ('error' in response.body) {
    console.error(response.body.error)
    return { error: 'Failed to exchange NU token' }
  }

  // Get the NU user profile
  // TODO Ant - this should not assume success
  const nuToken = response.body
  const userIdentity = await getUserIdentity(nuToken)

  // Look up the user in Firestore
  let userId: string | undefined
  let userData: admin.firestore.DocumentData | undefined
  try {
    const userPrivateSnapshot = await db.collection(USERS_PRIVATE).where('emails', 'array-contains', userIdentity.email).limit(1).get()
    userId = userPrivateSnapshot.docs[0]?.id
    if (userId) {
      const userSnapshot = await db.collection(USERS).doc(userId).get()
      userData = userSnapshot.data()
    }
  } catch (error) {
    console.log(error)
    return { error: 'Failed to load profile' }
  }

  // Update Firestore profile
  const { nameFirst, nameLast } = fixName(userIdentity.name)
  const existingName = (userData?.name as string | undefined)
  if (userData && !existingName) {
    // Update user
    const update: Update<User> = {
      nameFirst,
      nameLast
    }
    const updatePrivate: Update<UserPrivate> = {
      emails: FieldValue.arrayUnion(userIdentity.email),
      tokenNuConnect: nuToken
    }

    await dao.updateUser(update, userId)
    await dao.updateUserPrivate(updatePrivate, userId)
  } else {
    // Create user
    const user: New<User> = {
      nameFirst,
      nameLast
    }
    const userPrivate: New<UserPrivate> = {
      email: userIdentity.email,
      emails: [userIdentity.email],
      tokenNuConnect: nuToken
    }

    userId = await dao.createUser(user)
    await dao.createUserPrivate(userPrivate, userId)
  }

  // Convert to Firebase Auth
  return await admin
    .auth()
    .createCustomToken(userId)
    .catch((error) => {
      console.error(error)
      return { error: 'Failed to create Firebase token' }
    })
}
