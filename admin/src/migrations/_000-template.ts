import admin from 'firebase-admin'

export const up = async (_db: admin.firestore.Firestore): Promise<void> => {
  // Should be an atomic action (transaction or batched write)

  // Prefer batched write (locked reads not needed):
  // const batch = db.batch()
  // batch.set(ref, data)
  // return await batch.commit()

  // Otherwise a transaction:
  // return await db.runTransaction(async t => {
  //   t.set(ref, data)
  // })
}
