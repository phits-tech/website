import firebase from 'firebase/app'
import mapKeys from 'lodash/mapKeys'
import pickBy from 'lodash/pickBy'

import { camelize } from '@phits-tech/common/dist/utils/string-cases'

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'

// Get ENV
const { VITE_EMU_PORT_AUTH, VITE_EMU_PORT_FIRESTORE, VITE_EMU_PORT_FUNCTIONS, VITE_FUNCTIONS_REGION } = import.meta.env

// Extract all keys starting with VITE_FIREBASE
interface FirebaseConfig {
  projectId: string
}

const PREFIX = 'VITE_FIREBASE_'
const config = mapKeys(
  pickBy(import.meta.env, (_value, key) => key.startsWith(PREFIX)),
  (_value, key) => camelize(key.slice(PREFIX.length).toLowerCase())
) as unknown as FirebaseConfig

// Initialize
firebase.initializeApp(config)
if (import.meta.env.DEV) console.info(`Using project: ${config.projectId}`)

// Cloud Functions region
const region = VITE_EMU_PORT_FUNCTIONS ? 'us-central1' : VITE_FUNCTIONS_REGION
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
if (VITE_EMU_PORT_AUTH) auth.useEmulator(`http://localhost:${VITE_EMU_PORT_AUTH}/`, { disableWarnings: true })
if (VITE_EMU_PORT_FIRESTORE) db.useEmulator('localhost', Number.parseInt(VITE_EMU_PORT_FIRESTORE))
if (VITE_EMU_PORT_FUNCTIONS) functions.useEmulator('localhost', Number.parseInt(VITE_EMU_PORT_FUNCTIONS))
