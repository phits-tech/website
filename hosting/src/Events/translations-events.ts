import { mapValues } from 'lodash'

import { TranslatedString } from '@phits-tech/common/dist/dao-firestore'

const translations: { [key: string]: TranslatedString } = {
  eventsFutureTitle: {
    en: 'Upcoming Events',
    th: 'เหตุการณ์ที่จะเกิดขึ้น'
  },
  eventsPastTitle: {
    en: 'Past Events',
    th: 'เหตุการณ์ที่ผ่านมา'
  }
}

export const messages = {
  en: mapValues(translations, vals => vals.en),
  th: mapValues(translations, vals => vals.th)
}
