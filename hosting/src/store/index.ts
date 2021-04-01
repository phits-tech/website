import type { User as FirebaseUser } from '@firebase/auth-types'
import { createStore } from 'vuex'
import { firestoreAction, vuexfireMutations } from 'vuexfire'

import { EVENTS, USERS } from '@phits-tech/common/dist/dao-firestore/schema'

import { PTVuexState, STATE } from '@/store/vuex-api'
import { db } from '~/firebase-initialized'

// Private (prefer actions not mutations)
// const MUTATIONS = {} // currently none...

const store = createStore<PTVuexState>({
  state: {
    currentUser: null,
    events: []
  },
  getters: {},
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    init: firestoreAction(async ({ bindFirestoreRef }) => {
      return await bindFirestoreRef(STATE.events, db.collection(EVENTS))
    }),
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

export default store
