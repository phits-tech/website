import dayjs from 'dayjs'
import { Options, Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import { Route } from '~/router/route-decorator'
import { EventUi } from '../models'

import EventRow from './EventRow.vue'

@Route({ path: '/events' })
@Options({ components: { EventRow } })
export default class Events extends Vue {
  meta = useMeta({ title: 'Events' })

  get currentEvents(): EventUi[] {
    const now = dayjs()
    return this.$store.getters.events.filter((event: EventUi) => event.dateStart.isAfter(now)).reverse()
  }

  get pastEvents(): EventUi[] {
    const now = dayjs()
    return this.$store.getters.events.filter((event: EventUi) => event.dateStart.isBefore(now))
  }
}
