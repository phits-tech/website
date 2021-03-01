import type firebaseClient from 'firebase/app'
import type firebaseAdmin from 'firebase-admin'

import { GuidGen } from '../utils/guids'

// Aliases
type AuthAdmin = firebaseAdmin.auth.Auth
type FirestoreAdmin = firebaseAdmin.firestore.Firestore
type FieldValueAdmin = typeof firebaseAdmin.firestore.FieldValue

type AuthClient = firebaseClient.auth.Auth
type FirestoreClient = firebaseClient.firestore.Firestore
type FieldValueClient = typeof firebaseClient.firestore.FieldValue

/**
 * @description Blindly assert that Firebase components are from the client SDK
 * (will fail if we use any field/method that doesn't exist in the Admin SDK)
 */
export class FirebaseContext {
  public readonly auth: AuthClient
  public readonly db: FirestoreClient
  public readonly FieldValue: FieldValueClient
  public readonly getGuid: () => string

  constructor(
    auth: AuthAdmin | AuthClient,
    firestore: FirestoreAdmin | FirestoreClient,
    fieldValue: FieldValueAdmin | FieldValueClient
  ) {
    this.auth = auth as unknown as AuthClient
    this.db = firestore as unknown as FirestoreClient
    this.FieldValue = fieldValue as FieldValueClient
    this.getGuid = GuidGen(this.db)
  }
}
