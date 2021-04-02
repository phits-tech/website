import dayjs, { Dayjs } from 'dayjs'
import { Options, Vue } from 'vue-class-component'

import { Route } from '@/router/route-decorator'

interface EventUi { // TODO: Extract to UI `models`
  id: string
  name: string
  description: string
  dateStart: Dayjs
  dateEnd: Dayjs
  time: string
  location: string
  series?: string
  seriesType?: string
  badges?: string[]
  hostId?: string
  hostName?: string
  registrationRequired?: boolean
  registrationUrl?: string
}

@Route({ path: '/events' })
@Options({ metaInfo(this: Events) { return {} } })
export default class Events extends Vue {
  get events(): EventUi[] { // TODO: Factor out as Vuex getter
    return this.$store.state.events.map(event => {
      const dsDayjs = dayjs.unix(event.dateStart.seconds)
      const deDayJs = dayjs.unix(event.dateEnd.seconds)

      return Object.assign(event, {
        dateStart: dsDayjs,
        dateEnd: deDayJs,
        time: dsDayjs.format('ddd DD MMM, HH:mm') + '-' + deDayJs.format('HH:mm')
      })
    })
  }
}