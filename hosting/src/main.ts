import type { App as VueApp } from 'vue'
import { createApp } from 'vue'
import { createMetaManager } from 'vue-meta'

import { App } from '@/views'
import * as filters from '~/filters'
import { auth } from '~/firebase-initialized'
import { globals } from '~/globals'
import { mixins } from '~/mixins'
import router from '~/router'
import store, { STORE } from '~/store'

import '@/main.css'

// Setup Vue
const create = async (): Promise<VueApp<Element>> => {
  const app = createApp(App)
    .use(router)
    .use(store)
    .use(createMetaManager())

  // TODO: I think I'm doing this wrong... https://learnvue.co/2020/03/designing-vue3-plugins-using-provide-and-inject/
  Object.entries(globals).forEach(([key, value]) => app.provide(key, value))

  mixins.forEach(mixin => app.mixin(mixin))
  app.config.globalProperties.$filters = filters

  await store.dispatch(STORE.ACTIONS.init)
  await router.isReady()
  app.mount('#app')
  return app
}

// Load auth state => start Vue
let shouldInitialize = true
auth.onAuthStateChanged(async (user) => {
  await store.dispatch(STORE.ACTIONS.userChanged, user)
  if (shouldInitialize) {
    shouldInitialize = false
    await create()
  }
})
