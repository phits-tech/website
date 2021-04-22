import { computed } from '@vue/runtime-core'
import { Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'
import { useRoute } from 'vue-router'

import { Route } from '~/router/route-decorator'
import { EventUi } from '../models'

@Route({ name: 'Event', path: '/events/:slug' })
export default class Event extends Vue {
  route = useRoute()
  meta = useMeta(computed(() => ({ title: `Event ${this.route.params.slug as string}` })))

  get event(): EventUi {
    return this.$store.getters.eventBySlug(this.route.params.slug)
  }
}
