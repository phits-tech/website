import dayjs, { Dayjs } from 'dayjs'

import { Event } from '@phits-tech/common/dist/dao-firestore/model-types'

export type EventUi = Omit<Event, 'dateStart' | 'dateEnd'> & {
  dateStart: Dayjs
  dateEnd: Dayjs
  time: string
}

export const eventToEventUi = (event: Event): EventUi => {
  const dateStart = dayjs.unix(event.dateStart.seconds)
  const dateEnd = dayjs.unix(event.dateEnd.seconds)

  return {
    ...event,
    dateStart,
    dateEnd,
    time: dsDayjs.format('ddd DD MMM, HH:mm') + '-' + deDayJs.format('HH:mm')
  }
}
