// import Buefy from 'buefy'
import type { App as VueApp } from 'vue'
import { createApp } from 'vue'

// import { firestorePlugin as VueFire } from 'vuefire'
import router from '@/router'
import store from '@/store'
import { ACTIONS } from '@/store/vuex-api'
import { App } from '@/views'
import { auth } from '~/firebase-initialized'
import { globals } from '~/vue/globals'
import { mixins } from '~/vue/mixins'

import '@mdi/font/css/materialdesignicons.css'
import '@/scss/main.scss'

// Setup Vue
const create = async (): Promise<VueApp<Element>> => {
  const app = createApp(App)
    // .use(Buefy)
    .use(router)
    .use(store)
    // .use(VueFire)

  Object.entries(globals).forEach(([key, value]) => app.provide(key, value))
  mixins.forEach(mixin => app.mixin(mixin))

  await router.isReady()
  app.mount('#app')
  return app
}

// Load auth state => start Vue
let shouldInitialize = true
auth.onAuthStateChanged(async (user) => {
  await store.dispatch(ACTIONS.userChanged, user)
  if (shouldInitialize) {
    shouldInitialize = false
    await create()
  }
})
