import { Options, Vue } from 'vue-class-component'

import { Route } from '@/router/route-decorator'

@Route({ path: '/heroes' })
@Options({ metaInfo(this: Heroes) { return {} } })
export default class Heroes extends Vue {}
