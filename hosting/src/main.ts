import type { App as VueApp } from 'vue'
import { createApp } from 'vue'
import { createMetaManager } from 'vue-meta'

// import { firestorePlugin as VueFire } from 'vuefire' // TODO: VueFire for Vue 3
import router from '@/router'
import store from '@/store'
import { ACTIONS } from '@/store/vuex-api'
import { App } from '@/views'
import { auth } from '~/firebase-initialized'
import { globals } from '~/vue/globals'
import { mixins } from '~/vue/mixins'

import '@/styles/index.css'

// Setup Vue
const create = async (): Promise<VueApp<Element>> => {
  const app = createApp(App)
    .use(router)
    .use(store)
    .use(createMetaManager())
    // .use(VueFire) // TODO: VueFire for Vue 3

  Object.entries(globals).forEach(([key, value]) => app.provide(key, value))
  mixins.forEach(mixin => app.mixin(mixin))

  await store.dispatch(ACTIONS.init)
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
