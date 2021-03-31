import { Options, Vue } from 'vue-class-component'

import { Route } from '@/router/route-decorator'

@Route({ path: '/events' })
@Options({ metaInfo(this: Events) { return {} } })
export default class Events extends Vue {
}
