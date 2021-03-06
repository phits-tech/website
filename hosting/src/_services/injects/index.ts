import firebase from 'firebase/app'

import { FirebaseContext } from '@phits-tech/common/dist/context'
import { Dao } from '@phits-tech/common/dist/dao-firestore'
import { StorageDao } from '@phits-tech/common/dist/dao-storage'

import { auth, db, functions, storage } from '~/firebase-initialized'

const context = new FirebaseContext(auth, db, firebase.firestore.FieldValue)

const dao = new Dao(context)
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? ''
const storageDao = new StorageDao(context, dao, storage, storageBucket)

export const injects = {
  auth,
  context,
  dao,
  db,
  functions,
  storage,
  storageDao
}
