import { mapValues } from 'lodash'
import { createI18n } from 'vue-i18n'

import translations from '@/events/EventsCreate/Translations'

const messages = {
  en: mapValues(translations, vals => vals.en),
  th: mapValues(translations, vals => vals.th)
}

console.log(messages)

export const i18n = createI18n({
  locale: 'th',
  fallbackLocale: 'en',
  messages
})
