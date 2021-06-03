import { Vue } from 'vue-class-component'

import { EventUi } from '../models'

export default class EventRow extends Vue.with(class {
  event!: EventUi
}) {}
