import { User as FirebaseUser } from '@firebase/auth-types'
import { InjectionKey } from '@vue/runtime-core'
import { createStore, Store } from 'vuex'
import { firestoreAction, vuexfireMutations } from 'vuexfire'

import { Banner, BANNERS, Event, EVENTS, User, USERS } from '@phits-tech/common/dist/dao-firestore'
import { DeepRequiredWithId } from '@phits-tech/common/dist/utils/types/general'

import { eventToEventUi } from '@/events/models'
import { db } from '~/firebase-initialized'

// VuexFire resets objects to null
export interface PTStoreState {
  currentUser: DeepRequiredWithId<User> | null
  eventsRaw: Event[]
  banners: Array<Omit<Banner, 'dateExpire'>>
}

/**
 * For mapState, mapGetters, VuexFire
 */
export const STORE = {
  STATE: {
    currentUser: 'currentUser',
    eventsRaw: 'eventsRaw',
    banners: 'banners'
  },
  GETTERS: {},
  MUTATIONS: {},
  ACTIONS: {
    init: 'init',
    userChanged: 'userChanged'
  }
}

export const storeKey: InjectionKey<Store<PTStoreState>> = Symbol('PTStore')

export const store = createStore<PTStoreState>({
  state: {
    currentUser: null, // eslint-disable-line unicorn/no-null -- vuexfire
    eventsRaw: [],
    banners: [{ banner169Url: '/images/banner_16_9_loading.png' }]
  },
  getters: {
    events: state => state.eventsRaw.map(event => eventToEventUi(event)),
    eventBySlug: state => (slug: string) => {
      const event = state.eventsRaw.find(event => event.slug === slug)
      return event ? eventToEventUi(event) : undefined
    }
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    init: firestoreAction(async ({ bindFirestoreRef }) => {
      return await Promise.all([
        bindFirestoreRef(STORE.STATE.eventsRaw, db.collection(EVENTS).orderBy('dateStart', 'desc')),
        bindFirestoreRef(STORE.STATE.banners, db.collection(BANNERS).where('dateExpire', '>', new Date()))
      ])
    }),
    userChanged: firestoreAction(({ state, bindFirestoreRef, unbindFirestoreRef }, user: FirebaseUser | { uid: string } | undefined) => {
      const uid = user?.uid
      if (uid === state.currentUser?.id) return

      return uid
        ? Promise.all([
          bindFirestoreRef(STORE.STATE.currentUser, db.collection(USERS).doc(uid))
        ])
        : new Promise<void>(resolve => {
          unbindFirestoreRef(STORE.STATE.currentUser)
          resolve()
        })
    })
  },
  modules: {}
})

export default store
