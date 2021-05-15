import { Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import { Space, SpaceCategory, SPACES } from '@phits-tech/common/dao-firestore'

import { db } from '~/firebase-initialized'
import { Route } from '~/router/route-decorator'

// URGENT: Extract this
const categoryRanking: Record<SpaceCategory, number> = {
  community: 3,
  coworking: 2,
  cafe: 1,
  online: 0
}

@Route({ path: '/spaces' })
export default class Spaces extends Vue {
  meta = useMeta({ title: 'Spaces' })
  spaces: Space[] = []

  async mounted(): Promise<void> {
    this.spaces = (await db.collection(SPACES).get())
      .docs
      .map(doc => doc.data() as Space)
      .sort((s1, s2) => categoryRanking[s2.category] - categoryRanking[s1.category] || s1.name.localeCompare(s2.name))
  }
}
