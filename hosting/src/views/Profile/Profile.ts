import { computed } from '@vue/runtime-core'
import { Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import { Route } from '@/router/route-decorator'

@Route({ path: '/profile/:slug' })
export default class Profile extends Vue {
  mounted(): void {
    useMeta(computed(() => ({
      title: `Profile ${this.$route.params.slug as string}`
    })))
  }
}
