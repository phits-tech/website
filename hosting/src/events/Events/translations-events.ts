import { mapValues } from 'lodash'

import { TranslatedString } from '@phits-tech/common/dao-firestore'

const translations: { [key: string]: TranslatedString } = {
  eventUpcomingTitle: {
    en: 'Upcoming Events',
    th: 'เหตุการณ์ที่จะเกิดขึ้น'
  },
  eventPastTitle: {
    en: 'Past Events',
    th: 'เหตุการณ์ที่ผ่านมา'
  }
}

export const messages = {
  en: mapValues(translations, vals => vals.en),
  th: mapValues(translations, vals => vals.th)
}
