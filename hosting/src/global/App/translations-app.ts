import { mapValues } from 'lodash'

import { TranslatedString } from '@phits-tech/common/dao-firestore'

const translations: { [key: string]: TranslatedString } = {
  madeWithLovePrefix: {
    en: 'Made with',
    th: 'Made with'
  },
  madeWithLoveSuffix: {
    en: 'in Phitsanulok',
    th: 'in Phitsanulok'
  },
  joinTheCommunity: {
    en: 'Join the community',
    th: 'เข้าร่วมชุมชน'
  }
}

export const messages = {
  en: mapValues(translations, vals => vals.en),
  th: mapValues(translations, vals => vals.th)
}
