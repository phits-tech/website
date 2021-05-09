import { computed } from '@vue/runtime-core'
import { setup, Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'
import { useStore } from 'vuex'

import { Route } from '~/router/route-decorator'
import { storeKey } from '~/store'
import type { EventUi } from '../models'

@Route({ path: '/events/:slug', props: true })
export default class Event extends Vue.with(class {
  slug!: string
}) {
  store = useStore(storeKey)

  meta = setup(() => useMeta(computed(() => ({
    title: this.event?.name ?? 'Event not found',
    og: {
      // TODO: This will only be relevant if we enable SSR
      image: this.event?.bannerUrl ?? ''
    }
  }))))

  get event(): EventUi | undefined {
    return this.store.getters.eventBySlug(this.slug)
  }
}
