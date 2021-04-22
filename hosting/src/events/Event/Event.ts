import { computed } from '@vue/runtime-core'
import { setup, Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import { Route } from '~/router/route-decorator'
import { storeKey } from '~/store'
import { EventUi } from '../models'

@Route({ name: 'Event', path: '/events/:slug', props: true })
export default class Event extends Vue.with(class {
  slug!: string
}) {
  route = useRoute()
  store = useStore(storeKey)
  meta = setup(() => useMeta(computed(() => ({ title: this.event?.name ?? 'Event not found' }))))

  get event(): EventUi | undefined {
    return this.store.getters.eventBySlug(this.slug)
  }
}
