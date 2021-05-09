import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

/**
 * Finds first instance of the requested day after today
 * 0 = Sunday
 */
export const nextDay = (target: number): Dayjs => {
  const today = dayjs()
  return today.day() > target ? today.day(target).add(1, 'week') : today.day(target)
}
