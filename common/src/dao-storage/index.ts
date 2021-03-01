import type firebase from 'firebase/app'

import { FirebaseContext } from '../context'
import { Dao } from '../dao-firestore'

type Storage = firebase.storage.Storage

export class StorageDao {
  constructor(
    // @ts-expect-error - we will use this later
    private readonly context: FirebaseContext,
    // @ts-expect-error - we will use this later
    private readonly dao: Dao,
    // @ts-expect-error - we will use this later
    private readonly storage: Storage, // TODO: Move this to FirebaseContext
    // @ts-expect-error - we will use this later
    private readonly storageBucket: string
  ) {}
}
