import { computed } from '@vue/runtime-core'
import { Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import { Route } from '@/router/route-decorator'

@Route({ name: 'Event', path: '/events/:eventId' })
export default class Event extends Vue {
  mounted(): void {
    useMeta(computed(() => ({ title: `Event ${this.$route.params.eventId as string}` })))
  }
}
