import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { Options, Vue } from 'vue-class-component'

import type { EventUi } from '@/events/models'
import { Route } from '~/router/route-decorator'

import HomeBanners from './HomeBanners.vue'

interface EventSummary { slug: string, name: string, dateStart: Dayjs, dateEnd: Dayjs, location: string }
interface DayAndEvents { day: string, events: EventSummary[] }

@Route({ path: '/' })
@Options({ components: { HomeBanners } })
export default class Home extends Vue {
  get sevenDaysAhead(): DayAndEvents[] {
    const events: EventUi[] = this.$store.getters.events
    const startOfDayLocal = dayjs().startOf('day')

    return Array.from({ length: 7 }, (_, i) => {
      const day = startOfDayLocal.add(i, 'day')
      return {
        day: (i === 0) ? 'Today' : (i === 1) ? 'Tomorrow' : day.format('ddd'),
        events: events.filter(e => day.isBefore(e.dateStart) && day.add(1, 'day').isAfter(e.dateStart))
      }
    })
  }
}
