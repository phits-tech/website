import { Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import { Route } from '~/router/route-decorator'

import translations, { moreTranslations } from './Translations'

type EventType = 'event-type-share' | 'event-type-propose'
const eventTypeShare: EventType = 'event-type-share'

@Route({ path: '/events/create' })
export default class EventsCreate extends Vue {
  meta = useMeta({ title: 'Create Event' })
  t = translations
  mt = moreTranslations
  lang = 'th'

  event = {
    eventType: eventTypeShare,
    name: '',
    website: '',
    topics: '',
    date: '',
    timeStart: '',
    timeEnd: '',
    location: '',
    locationVenue: '',
    contactName: '',
    contactId: '',
    description: ''
  }

  get isShare(): boolean {
    return this.event.eventType === eventTypeShare
  }

  get isPropose(): boolean {
    return !this.isShare
  }
}
