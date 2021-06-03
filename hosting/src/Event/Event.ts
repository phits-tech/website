import { computed } from '@vue/runtime-core'
import { setup, Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'
import { Prop } from 'vue-property-decorator'
import { useStore } from 'vuex'

import { Route } from '~/router/route-decorator'
import { storeKey } from '~/store'
import { EventUi } from '../models'

@Route({ path: '/events/:slug', props: true })
export default class Event extends Vue {
  @Prop(String) slug!: string
  store = useStore(storeKey)

  meta = setup(() => useMeta(computed(() => ({
    title: this.event?.name ?? 'Event not found',
    og: {
      image: this.event?.bannerUrl ?? 'https://phits.tech/images/placeholders/banner_16_9_default.jpg'
    }
  }))))

  get event(): EventUi | undefined {
    return this.store.getters.eventBySlug(this.slug)
  }
}
