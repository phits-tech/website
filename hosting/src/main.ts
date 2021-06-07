import { createApp } from 'vue'

import App from '@/App/App.vue'
import * as filters from '~/filters'
import { auth } from '~/firebase-initialized'
import { i18n, td } from '~/i18n'
import { injects } from '~/injects'
import { metaManager } from '~/meta'
import { mixins } from '~/mixins'
import { router } from '~/router'
import { STORE, store, storeKey } from '~/store'

import 'virtual:windi.css'
import '@/main.css'

// Setup Vue
let appInitialized = false
const init = async (): Promise<void> => {
  if (appInitialized) return

  const app = createApp(App)
    .use(router)
    .use(store, storeKey)
    .use(metaManager)
    .use(i18n)

  Object.entries(injects).forEach(([key, value]) => app.provide(key, value))
  mixins.forEach(mixin => app.mixin(mixin))
  app.config.globalProperties.$filters = filters
  app.config.globalProperties.$td = td

  await Promise.all([
    store.dispatch(STORE.ACTIONS.init),
    router.isReady()
  ])
  app.mount('#app')
  appInitialized = true
}

// Load auth state => start Vue
auth.onAuthStateChanged(async user => {
  await Promise.all([
    store.dispatch(STORE.ACTIONS.userChanged, user),
    init()
  ])
})
