import firebaseClient from 'firebase/app'
import firebaseAdmin from 'firebase-admin'

type FirestoreAdmin = firebaseAdmin.firestore.Firestore
type FirestoreClient = firebaseClient.firestore.Firestore

export const GuidGen = (firestore: FirestoreClient | FirestoreAdmin): (() => string) => {
  const db = firestore as unknown as FirestoreClient
  return () => db.collection('guids').doc().id // If it's good enough for Firestore...
}
