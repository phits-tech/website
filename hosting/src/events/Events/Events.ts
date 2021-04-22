import { setup, Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import { Route } from '~/router/route-decorator'
import { EventUi } from '../models'

@Route({ name: 'Events', path: '/events' })
export default class Events extends Vue {
  meta = setup(() => useMeta({ title: 'Events' }))

  get events(): EventUi[] {
    return this.$store.getters.events
  }
}
