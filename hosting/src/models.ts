import dayjs, { Dayjs } from 'dayjs'
import { DeepRequired } from 'ts-essentials'

import { Event } from '@phits-tech/common/dist/dao-firestore'

export type EventUi = Omit<DeepRequired<Event>, 'dateStart' | 'dateEnd'> & {
  dateStart: Dayjs
  dateEnd: Dayjs
}

export const eventToEventUi = (event: DeepRequired<Event>): EventUi => {
  const dateStart = dayjs.unix(event.dateStart.seconds)
  const dateEnd = dayjs.unix(event.dateEnd.seconds)

  return {
    ...event,
    dateStart,
    dateEnd
  }
}
