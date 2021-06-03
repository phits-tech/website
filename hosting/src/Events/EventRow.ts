import { PropType } from '@vue/runtime-core'
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import { EventUi } from '../models'

export default class EventRow extends Vue {
  @Prop({ type: Object as PropType<EventUi>, required: true })
  readonly event!: EventUi
}
