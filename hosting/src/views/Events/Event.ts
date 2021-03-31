import { Options, Vue } from 'vue-class-component'

import { Route } from '@/router/route-decorator'

@Route({ path: '/events/:eventId' })
@Options({ metaInfo(this: Event) { return {} } })
export default class Event extends Vue {
}
