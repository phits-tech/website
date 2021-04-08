import { Options, Vue } from 'vue-class-component'

import { Route } from '@/router/route-decorator'

@Route({ path: '/events/create' })
@Options({ metaInfo(this: EventsCreate) { return {} } })
export default class EventsCreate extends Vue {
}
