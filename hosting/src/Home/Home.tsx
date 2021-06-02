import dayjs, { Dayjs } from 'dayjs'
import { Options, Vue } from 'vue-class-component'

import { EventUi } from '@/models'
import { Route } from '~/router/route-decorator'

import HomeBanners from './HomeBanners.vue'
import { messages } from './translations-home'

import 'dayjs/locale/th'

interface EventSummary { slug: string, name: string, dateStart: Dayjs, dateEnd: Dayjs, location: string }
interface DayAndEvents { day: string, events: EventSummary[] }

@Route({ path: '/' })
@Options({
  components: { HomeBanners },
  i18n: { messages }
})
export default class Home extends Vue {
  get sevenDaysAhead(): DayAndEvents[] {
    const events: EventUi[] = this.$store.getters.events
    console.log(this.$i18n.locale)
    const startOfDayLocal = dayjs().locale(this.$i18n.locale).startOf('day')

    return Array.from({ length: 7 }, (_, i) => {
      const day = startOfDayLocal.add(i, 'day')
      return {
        day: (i === 0) ? this.$t('today') : ((i === 1) ? this.$t('tomorrow') : day.format('ddd')),
        events: events.filter(e => day.isBefore(e.dateStart) && day.add(1, 'day').isAfter(e.dateStart))
      }
    })
  }
}
