import { Change, EventContext, https } from 'firebase-functions'
import { DocumentSnapshot, QueryDocumentSnapshot } from 'firebase-functions/lib/providers/firestore'

import { HttpsCallable } from '@phits-tech/common/dist/api-callables'

export type HttpsCallableHandler<Callable = unknown> = Callable extends HttpsCallable<infer In, infer Out> ? (data: In, context: https.CallableContext) => Out | Promise<Out> : (data: any, context: https.CallableContext) => any | Promise<any>
export type DocumentCreatedHandler = (snapshot: QueryDocumentSnapshot, context: EventContext) => PromiseLike<unknown> | unknown
export type DocumentUpdatedHandler = (change: Change<DocumentSnapshot>, context: EventContext) => PromiseLike<unknown> | unknown
