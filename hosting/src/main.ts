import { App as VueApp, createApp } from 'vue'

import App from '@/App/App.vue'
import * as filters from '~/filters'
import { auth } from '~/firebase-initialized'
import { globals } from '~/globals'
import { i18n, td } from '~/i18n'
import { metaManager } from '~/meta'
import { mixins } from '~/mixins'
import { createRouter } from '~/router'
import { STORE, store, storeKey } from '~/store'

import '@/main.css'

// Setup Vue
const create = async (): Promise<VueApp<Element>> => {
  const router = await createRouter()

  const app = createApp(App)
    .use(router)
    .use(store, storeKey)
    .use(metaManager)
    .use(i18n)

  // TODO: I think I'm doing this wrong... https://learnvue.co/2020/03/designing-vue3-plugins-using-provide-and-inject/
  Object.entries(globals).forEach(([key, value]) => app.provide(key, value))

  mixins.forEach(mixin => app.mixin(mixin))
  app.config.globalProperties.$filters = filters
  app.config.globalProperties.$td = td

  await store.dispatch(STORE.ACTIONS.init)
  await router.isReady()
  app.mount('#app')
  return app
}

// Load auth state => start Vue
let shouldInitialize = true
auth.onAuthStateChanged(async user => {
  await store.dispatch(STORE.ACTIONS.userChanged, user)
  if (shouldInitialize) {
    shouldInitialize = false
    await create()
  }
})
