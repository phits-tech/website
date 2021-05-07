import type { User as FirebaseUser } from '@firebase/auth-types'
import type { InjectionKey } from '@vue/runtime-core'
import type { Store } from 'vuex'
import { createStore } from 'vuex'
import { firestoreAction, vuexfireMutations } from 'vuexfire'

import type { Event, User } from '@phits-tech/common/dao-firestore'
import { EVENTS, USERS } from '@phits-tech/common/dao-firestore'
import type { DeepRequiredWithId } from '@phits-tech/common/utils/types/general'

import { eventToEventUi } from '@/events/models'
import { db } from '~/firebase-initialized'

export interface PTStoreState {
  currentUser: DeepRequiredWithId<User> | null
  eventsRaw: Event[]
}

/**
 * For mapState, mapGetters, VuexFire
 */
export const STORE = {
  STATE: {
    currentUser: 'currentUser',
    eventsRaw: 'eventsRaw'
  },
  GETTERS: { },
  MUTATIONS: { },
  ACTIONS: {
    init: 'init',
    userChanged: 'userChanged'
  }
}

export const storeKey: InjectionKey<Store<PTStoreState>> = Symbol('PTStore')

export const store = createStore<PTStoreState>({
  state: {
    currentUser: null,
    eventsRaw: []
  },
  getters: {
    events: (state) => state.eventsRaw.map(eventToEventUi),
    eventBySlug: (state) => (slug: string) => {
      const event = state.eventsRaw.find(event => event.slug === slug)
      return event ? eventToEventUi(event) : undefined
    }
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    init: firestoreAction(async ({ bindFirestoreRef }) => {
      return await bindFirestoreRef(STORE.STATE.eventsRaw, db.collection(EVENTS))
    }),
    userChanged: firestoreAction(({ state, bindFirestoreRef, unbindFirestoreRef }, user: FirebaseUser | { uid: string } | undefined) => {
      const uid = user?.uid
      if (uid === state.currentUser?.id) return

      return uid
        ? Promise.all([
          bindFirestoreRef(STORE.STATE.currentUser, db.collection(USERS).doc(uid))
        ])
        : new Promise<void>((resolve) => {
          unbindFirestoreRef(STORE.STATE.currentUser)
          resolve()
        })
    })
  },
  modules: {}
})

export default store
