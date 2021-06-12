import { mapValues } from 'lodash'
import { createI18n } from 'vue-i18n'

import { TranslatedString } from '@phits-tech/common/dist/dao-firestore'

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

export const td = (message: TranslatedString): string =>
  (message as Record<string, string>)[i18n.global.locale] ?? message.en ?? message.th
