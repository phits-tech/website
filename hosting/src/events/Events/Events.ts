import { Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import { Route } from '~/router/route-decorator'
import type { EventUi } from '../models'

@Route({ path: '/events' })
export default class Events extends Vue {
  meta = useMeta({ title: 'Events' })

  get events(): EventUi[] {
    return this.$store.getters.events
  }
}
