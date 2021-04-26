import { Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import { Route } from '~/router/route-decorator'

@Route({ path: '/spaces' })
export default class Spaces extends Vue {
  meta = useMeta({ title: 'Spaces' })
}
