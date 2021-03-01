import type { User as FirebaseUser } from '@firebase/auth-types'
import { createStore } from 'vuex'
import { firestoreAction, vuexfireMutations } from 'vuexfire'

import { USERS } from '@phits-tech/common/dist/dao-firestore/schema'

import { db } from '~/firebase-initialized'

import type { PTVuexState } from './vuex-api'

// Private (use mutations to update state)
const STATE = {
  currentUser: 'currentUser'
}

// Private (prefer actions not mutations)
// const MUTATIONS = {} // currently none...

export default createStore<PTVuexState>({
  state: {
    currentUser: null
  },
  getters: {},
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    userChanged: firestoreAction(({ state, bindFirestoreRef, unbindFirestoreRef }, user: FirebaseUser | { uid: string } | undefined) => {
      const uid = user?.uid
      if (uid === state.currentUser?.id) return

      return uid
        ? Promise.all([
          bindFirestoreRef(STATE.currentUser, db.collection(USERS).doc(uid))
        ])
        : new Promise<void>((resolve) => {
          unbindFirestoreRef(STATE.currentUser)
          resolve()
        })
    })
  },
  modules: {}
})
