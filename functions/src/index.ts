import { EVENTS_SUGGESTED } from '@phits-tech/common/dist/dao-firestore'

import functions from './_services/firebase-functions-initialized'
import { onEventSuggested } from './events'
// import { getToken, getUrl } from './auth'

// HTTPS Callable
// export const authNUConnectURL = functions.https.onCall(getUrl)
// export const authNUConnectToken = functions.https.onCall(getToken)

// Firestore
export const eventSuggested = functions.firestore.document(`${EVENTS_SUGGESTED}/{eventId}`).onCreate(onEventSuggested)
