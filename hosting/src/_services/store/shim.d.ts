import { Store } from 'vuex'

import { PTStoreState } from '~/store'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<PTStoreState>
  }
}
