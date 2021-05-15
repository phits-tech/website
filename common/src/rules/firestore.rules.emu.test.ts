// TODO: I think: rules should be at the root; rule tests should be in a global tests module (which also has tests like checking no "/src" refs, checking package.json is consistent, etc)
import { apps, assertFails, assertSucceeds, clearFirestoreData, firestore, initializeTestApp } from '@firebase/rules-unit-testing'
import firebase from 'firebase/app'

import { USERS, USERS_PRIVATE } from '../dao-firestore'

import { alice, bertha, clare } from './test-data/users'
import { writeCoverage } from './test-utils/rule-coverage'

const PROJECT_ID = 'firestore-emulator-example'

afterAll(async () => {
  await Promise.all(apps().map(async (app) => await app.delete()))
  await writeCoverage(PROJECT_ID, 'firestore-coverage.html')
})

beforeEach(async () => {
  await clearFirestoreData({ projectId: PROJECT_ID })
})

function authedFirestore(auth?: { uid: string }): firebase.firestore.Firestore {
  return initializeTestApp({ projectId: PROJECT_ID, auth }).firestore()
}

test('require users to log in before creating a user profile', async () => {
  const db = authedFirestore()
  await assertFails(db.collection(USERS).add(alice))
})

test('require nameFirst, nameLast, name, createdAt date when creating a user profile', async () => {
  const db = authedFirestore({ uid: 'bertha' })
  const profile = db.collection(USERS).doc('bertha')
  const { nameFirst, ...berthaMinusNameFirst } = bertha
  const { nameLast, ...berthaMinusNameLast } = bertha
  const { name, ...berthaMinusName } = bertha
  const { createdAt, ...berthaMinusCreatedAt } = bertha
  await assertFails(profile.set(berthaMinusNameFirst))
  await assertFails(profile.set(berthaMinusNameLast))
  await assertFails(profile.set(berthaMinusName))
  await assertFails(profile.set(berthaMinusCreatedAt))
})

test('should let users create their own profile', async () => {
  const db = authedFirestore({ uid: 'alice' })
  await assertSucceeds(db.collection(USERS).doc('alice').set(alice))
})

test('should not let users create other user profiles', async () => {
  const db = authedFirestore({ uid: 'alice' })
  await assertFails(db.collection(USERS).doc('bertha').set(bertha))
})

test('should only let users update their own profile', async () => {
  const dbOtherUser = authedFirestore({ uid: 'clare' })
  await dbOtherUser.collection(USERS).doc('clare').set(clare)
  const db = authedFirestore({ uid: 'alice' })
  await db.collection(USERS).doc('alice').set(alice)
  await assertSucceeds(
    db.collection(USERS).doc('alice').update({
      nameFirst: 'Alicia'
    })
  )
  await assertFails(
    db.collection(USERS).doc('clare').update({
      nameFirst: 'Clara'
    })
  )
})

test("should let users add/remove themselves to other user's followers", async () => {
  const dbOtherUser = authedFirestore({ uid: 'clare' })
  await dbOtherUser.collection(USERS).doc('clare').set(clare)
  const db = authedFirestore({ uid: 'alice' })
  await assertSucceeds(
    db
      .collection(USERS)
      .doc('clare')
      .update({
        followerIds: firestore.FieldValue.arrayUnion('alice')
      })
  )
  await assertSucceeds(
    db
      .collection(USERS)
      .doc('clare')
      .update({
        followerIds: firestore.FieldValue.arrayRemove('alice')
      })
  )
})

test("should not let users add/remove others to other user's followers", async () => {
  const dbOtherUser = authedFirestore({ uid: 'clare' })
  const clareWithFollowers = { ...clare, followerIds: ['bertha', 'duncan'] }
  await dbOtherUser.collection(USERS).doc('clare').set(clareWithFollowers)
  const db = authedFirestore({ uid: 'alice' })
  await assertFails(
    db
      .collection(USERS)
      .doc('clare')
      .update({
        followerIds: firestore.FieldValue.arrayUnion('gerald')
      })
  )
  await assertFails(
    db
      .collection(USERS)
      .doc('clare')
      .update({
        followerIds: firestore.FieldValue.arrayRemove('duncan')
      })
  )
})

test('should allow users to read/write their protected subcollection', async () => {
  const db = authedFirestore({ uid: 'alice' })
  const aliceRef = db.collection(USERS_PRIVATE).doc('alice')
  await assertSucceeds(aliceRef.set({ email: 'alice@phits.tech' }))
})

test('should deny others from read/write to protected subcollection', async () => {
  const dbOtherUser = authedFirestore({ uid: 'clare' })
  await dbOtherUser.collection(USERS_PRIVATE).doc('clare').set({ email: 'clare@phits.tech' })
  const db = authedFirestore({ uid: 'alice' })
  const clarePrivateRef = db.collection(USERS_PRIVATE).doc('clare')
  await assertFails(clarePrivateRef.get())
  await assertFails(clarePrivateRef.set({ email: 'sabotage@phits.tech' }))
})
