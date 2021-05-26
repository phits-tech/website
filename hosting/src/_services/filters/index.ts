import { Timestamp } from '@google-cloud/firestore'
import dayjs, { Dayjs } from 'dayjs'

import { EventUi } from '@/events/models'

export const monthYear = (date: Timestamp): string => dayjs.unix(date.seconds).format('MMM YYYY')

export const dateRange = (dateStart: Dayjs, dateEnd: Dayjs): string => {
  // TODO: Make `dayChange` consistent with `timeRange` function (which leaves "+1" to the UI so it can be <sup>)
  const dayChange = (dateStart.day() !== dateEnd.day()) ? `(+${dateEnd.day() - dateStart.day()})` : ''
  return `${dateStart.format('ddd DD MMM, HH:mm')}-${dateEnd.format('HH:mm')}${dayChange}`
}

export const timeRange = (dateStart: Dayjs, dateEnd: Dayjs): string =>
  `${dateStart.format('HH:mm')}-${dateEnd.format('HH:mm')}`

export const eventDate = ({ dateStart, dateEnd }: EventUi): string => dateRange(dateStart, dateEnd)

export const eventTime = ({ dateStart, dateEnd }: EventUi): string => timeRange(dateStart, dateEnd)
