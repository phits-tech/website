import { Options, Vue } from 'vue-class-component'

import { Route } from '@/router/route-decorator'

@Route({ path: '/events/create' })
@Options({ metaInfo(this: Create) { return {} } })
export default class Create extends Vue {
}
