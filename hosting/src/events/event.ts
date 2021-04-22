import dayjs, { Dayjs } from 'dayjs'

import { Event } from '@phits-tech/common/dist/dao-firestore/model-types'

export interface EventUi {
  slug: string
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

export function eventToEventUi(event: Event): EventUi {
  const dsDayjs = dayjs.unix(event.dateStart.seconds)
  const deDayJs = dayjs.unix(event.dateEnd.seconds)

  return {
    ...event,
    dateStart: dsDayjs,
    dateEnd: deDayJs,
    time: dsDayjs.format('ddd DD MMM, HH:mm') + '-' + deDayJs.format('HH:mm')
  }
}
