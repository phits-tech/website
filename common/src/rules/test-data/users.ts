import { firestore } from '@firebase/rules-unit-testing'

// TODO: These should probably have types
export const alice = {
  nameFirst: 'Alice',
  nameLast: 'Arrawadee',
  name: 'Alice Arrawadee',
  createdAt: firestore.FieldValue.serverTimestamp(),
  followerIds: []
}

export const bertha = {
  nameFirst: 'Bertha',
  nameLast: 'Bridgewater',
  name: 'Bertha Bridgewater',
  createdAt: firestore.FieldValue.serverTimestamp(),
  followerIds: []
}

export const clare = {
  nameFirst: 'Clare',
  nameLast: 'Clutterhouse',
  name: 'Clare Clutterhouse',
  createdAt: firestore.FieldValue.serverTimestamp(),
  followerIds: []
}
