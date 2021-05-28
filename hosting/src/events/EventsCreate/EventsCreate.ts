import { Options, Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import { EVENTS_SUGGESTED, EventSuggested } from '@phits-tech/common/dao-firestore'

import { db } from '~/firebase-initialized'
import { Route } from '~/router/route-decorator'

import { messages } from './translations-events-create'

const emptyForm: EventSuggested = {
  eventType: 'share',
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

@Route({ path: '/events/create' })
@Options({ i18n: { messages } })
export default class EventsCreate extends Vue {
  meta = useMeta({ title: 'Create Event' })

  form = { ...emptyForm }

  isSubmitting = false
  isConfirming = false

  get isShare(): boolean { return this.form.eventType === 'share' }
  get isPropose(): boolean { return !this.isShare }

  async submit(): Promise<unknown> {
    this.isSubmitting = true

    return await db.collection(EVENTS_SUGGESTED).add(this.form)
      .then(() => {
        this.form = { ...emptyForm, eventType: this.form.eventType }
        this.isSubmitting = false
        this.isConfirming = true
      })
      .catch(error => {
        console.error(error)
        this.isSubmitting = false
      })
  }
}
