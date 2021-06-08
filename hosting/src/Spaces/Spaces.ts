import { Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import { Space, SPACES } from '@phits-tech/common/dist/dao-firestore'

import { db } from '~/firebase-initialized'
import { Route } from '~/router/route-decorator'

import { categoryRanking } from './categories'

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
