import type { Change, EventContext, https } from 'firebase-functions'
import type { DocumentSnapshot, QueryDocumentSnapshot } from 'firebase-functions/lib/providers/firestore'

import type { HttpsCallable } from '@phits-tech/common/dist/api-callables'

export type Handler<Callable> = Callable extends HttpsCallable<infer In, infer Out> ? (data: In, context: https.CallableContext) => Out | Promise<Out> : never
export type DocumentCreatedHandler = (snapshot: QueryDocumentSnapshot, context: EventContext) => PromiseLike<unknown> | unknown
export type DocumentUpdatedHandler = (change: Change<DocumentSnapshot>, context: EventContext) => PromiseLike<unknown> | unknown
