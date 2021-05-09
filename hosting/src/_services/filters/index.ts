import type { Dayjs } from 'dayjs'

import type { EventUi } from '@/events/models'

export const dateRange = (dateStart: Dayjs, dateEnd: Dayjs): string =>
  `${dateStart.format('ddd DD MMM, HH:mm')}-${dateEnd.format('HH:mm')}${(dateStart.day() !== dateEnd.day()) ? `(+${dateEnd.day() - dateStart.day()})` : ''}`

export const timeRange = (dateStart: Dayjs, dateEnd: Dayjs): string =>
  `${dateStart.format('HH:mm')}-${dateEnd.format('HH:mm')}`

export const eventDate = ({ dateStart, dateEnd }: EventUi): string => dateRange(dateStart, dateEnd)

export const eventTime = ({ dateStart, dateEnd }: EventUi): string => timeRange(dateStart, dateEnd)
