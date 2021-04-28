import { computed } from '@vue/runtime-core'
import { Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'
import { useRoute } from 'vue-router'

import { Route } from '@/router/route-decorator'

@Route({ path: '/events/:slug' })
export default class Event extends Vue {
  route = useRoute()
  meta = useMeta(computed(() => ({ title: `Event ${this.route.params.slug as string}` })))
}