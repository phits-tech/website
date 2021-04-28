import { Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import { Route } from '~/router/route-decorator'

@Route({ path: '/heroes' })
export default class Heroes extends Vue {
  meta = useMeta({ title: 'Heroes' })
}
