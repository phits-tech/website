import { FirebaseContext } from '@phits-tech/common/dist/context'

import { auth, db, FieldValue } from '../firebase-admin-initialized'

export const context = new FirebaseContext(auth, db, FieldValue)
