import { setup, Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import { Route } from '@/router/route-decorator'

@Route({ path: '/spaces' })
export default class Spaces extends Vue {
  meta = setup(() => {
    useMeta({ title: 'Spaces' })
    return { }
  })
}
