import { computed } from '@vue/runtime-core'
import { Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'
import { useRoute } from 'vue-router'

import { Route } from '@/router/route-decorator'

@Route({ name: 'Profile', path: '/profile/:slug' })
export default class Profile extends Vue {
  route = useRoute()
  meta = useMeta(computed(() => ({ title: `Profile ${this.route.params.slug as string}` })))
}