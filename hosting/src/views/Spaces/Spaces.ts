import { Options, Vue } from 'vue-class-component'

import { Route } from '@/router/route-decorator'

@Route({ path: '/spaces' })
@Options({ metaInfo(this: Spaces) { return {} } })
export default class Spaces extends Vue {}
