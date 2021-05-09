import type { Store } from 'vuex'

import type { PTStoreState } from '~/store'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<PTStoreState>
  }
}
