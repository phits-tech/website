import { setup, Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import { Route } from '@/router/route-decorator'

@Route({ path: '/events/create' })
export default class EventsCreate extends Vue {
  meta = setup(() => {
    useMeta({ title: 'Create Event' })
    return { }
  })
}
