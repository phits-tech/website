import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import type { Event } from '@phits-tech/common/dao-firestore'

export type EventUi = Omit<Event, 'dateStart' | 'dateEnd'> & {
  dateStart: Dayjs
  dateEnd: Dayjs
}

export const eventToEventUi = (event: Event): EventUi => {
  const dateStart = dayjs.unix(event.dateStart.seconds)
  const dateEnd = dayjs.unix(event.dateEnd.seconds)

  return {
    ...event,
    dateStart,
    dateEnd
  }
}
