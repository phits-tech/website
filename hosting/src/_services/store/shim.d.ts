import { Store } from 'vuex'

import { PTVuexState } from '~/store/vuex-api'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<PTVuexState>
  }
}
