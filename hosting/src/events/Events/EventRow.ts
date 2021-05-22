import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import { EventUi } from '../models'

export default class EventRow extends Vue {
  @Prop()
  event!: EventUi
}
