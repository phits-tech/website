import 'vite/client'

declare global {
  interface ImportMetaEnv {
    VITE_FIREBASE_API_KEY: string
    VITE_FIREBASE_APP_ID: string
    VITE_FIREBASE_AUTH_DOMAIN: string
    VITE_FIREBASE_DATABASE_U_R_L: string
    VITE_FIREBASE_MESSAGING_SENDER_ID: string
    VITE_FIREBASE_PROJECT_ID: string
    VITE_FIREBASE_STORAGE_BUCKET: string
    VITE_FUNCTIONS_REGION: string
    VITE_BUILD_VERSION: string

    VITE_EMU_PORT_AUTH: string
    VITE_EMU_PORT_FIRESTORE: string
    VITE_EMU_PORT_FUNCTIONS: string
  }
}
