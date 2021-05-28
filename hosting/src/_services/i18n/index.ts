import { mapValues } from 'lodash'
import { createI18n } from 'vue-i18n'

import { TranslatedString } from '@phits-tech/common/dao-firestore'

const globalTranslations: { [key: string]: TranslatedString } = {}

const messages = {
  en: mapValues(globalTranslations, vals => vals.en),
  th: mapValues(globalTranslations, vals => vals.th)
}

export const i18n = createI18n({
  locale: 'th',
  fallbackLocale: 'en',
  messages
})
