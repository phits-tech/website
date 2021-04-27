import { setup, Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import { Space } from '@phits-tech/common/src/dao-firestore'
import { SPACES } from '@phits-tech/common/src/dao-firestore/schema'

import { Route } from '@/router/route-decorator'
import { db } from '~/firebase-initialized'

@Route({ path: '/spaces' })
export default class Spaces extends Vue {
  meta = setup(() => useMeta({ title: 'Spaces' }))
  spaces: Space[] = []

  async mounted(): Promise<void> {
    this.spaces = (await db.collection(SPACES).get())
      .docs.map(doc => doc.data() as Space)
  }
}
