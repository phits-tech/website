import firebase from 'firebase/app'
import mapKeys from 'lodash/mapKeys'
import pickBy from 'lodash/pickBy'

import { camelize } from '@phits-tech/common/utils/string-cases'

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'

// Get ENV
const { VUE_APP_EMU_PORT_AUTH, VUE_APP_EMU_PORT_FIRESTORE, VUE_APP_EMU_PORT_FUNCTIONS, VUE_APP_FUNCTIONS_REGION } = process.env

// Extract all keys starting with VUE_APP_FIREBASE
interface FirebaseConfig {
  projectId: string
}

const PREFIX = 'VUE_APP_FIREBASE_'
const config = mapKeys(
  pickBy(process.env, (_value, key) => key.startsWith(PREFIX)),
  (_value, key) => camelize(key.substring(PREFIX.length).toLowerCase())
) as unknown as FirebaseConfig

// Initialize
firebase.initializeApp(config)
console.log(`Using project: ${config.projectId}`)

// Cloud Functions region
const region = VUE_APP_EMU_PORT_FUNCTIONS ? 'us-central1' : VUE_APP_FUNCTIONS_REGION
if (!region) throw new Error("Functions region wasn't set in .ENV")

// Exports
export default firebase
export const auth = firebase.auth()
export const db = firebase.firestore()
export const FieldValue = firebase.firestore.FieldValue
export const functions = firebase.app().functions(region) // HTTPS callable
export const storage = firebase.storage()

// Set emulator URLs
// @ts-expect-error https://github.com/firebase/firebase-js-sdk/issues/4223
if (VUE_APP_EMU_PORT_AUTH) auth.useEmulator(`http://localhost:${VUE_APP_EMU_PORT_AUTH}/`, { disableWarnings: true })
if (VUE_APP_EMU_PORT_FIRESTORE) db.useEmulator('localhost', Number.parseInt(VUE_APP_EMU_PORT_FIRESTORE))
if (VUE_APP_EMU_PORT_FUNCTIONS) functions.useEmulator('localhost', Number.parseInt(VUE_APP_EMU_PORT_FUNCTIONS))
