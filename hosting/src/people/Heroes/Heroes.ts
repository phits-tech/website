import dayjs from 'dayjs'
import { partition, sum } from 'lodash'
import type { DeepRequired } from 'ts-essentials'
import { Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import type { EventLog, User } from '@phits-tech/common/dao-firestore'
import { USERS } from '@phits-tech/common/dao-firestore'

import { db } from '~/firebase-initialized'
import { Route } from '~/router/route-decorator'

interface HeroData {
  ccus: number
  lastEvent: EventLog
}

@Route({ path: '/heroes' })
export default class Heroes extends Vue {
  meta = useMeta({ title: 'Heroes' })
  heroesActive: Array<DeepRequired<User> & HeroData> = []
  heroesHallOfFame: Array<DeepRequired<User> & HeroData> = []

  async mounted(): Promise<void> {
    // Get & enrich heroes
    const ccuCutoffSeconds = dayjs().subtract(2, 'year').unix()
    const heroes = (await db.collection(USERS).where('hasContributed', '==', true).get())
      .docs
      .map(doc => {
        const user = doc.data() as DeepRequired<User>
        return {
          ...user,
          ccus: sum(user.events.filter(e => e.date.seconds > ccuCutoffSeconds).map(e => e.ccus)),
          lastEvent: user.events.sort((e1, e2) => e2.date.seconds - e1.date.seconds)[0] // hasContributed implies events > 0
        }
      })
      .sort((h1, h2) => h2.ccus - h1.ccus || h2.lccus - h1.lccus || h1.name.localeCompare(h2.name))

    // Split active/fame
    const [heroesActive, heroesHallOfFame] = partition(heroes, h => h.ccus > 0)
    this.heroesActive = heroesActive
    this.heroesHallOfFame = heroesHallOfFame
  }
}
