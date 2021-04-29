import dayjs from 'dayjs'
import { partition, sum } from 'lodash'
import { Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import { EventLog, User } from '@phits-tech/common/src/dao-firestore'
import { USERS } from '@phits-tech/common/src/dao-firestore/schema'
import { DeepRequiredWithId } from '@phits-tech/common/src/utils/types/general'

import { db } from '~/firebase-initialized'
import { Route } from '~/router/route-decorator'

interface HeroData {
  ccus: number
  lastEvent: EventLog
}

@Route({ path: '/heroes' })
export default class Heroes extends Vue {
  meta = useMeta({ title: 'Heroes' })
  heroesActive: Array<DeepRequiredWithId<User> & HeroData> = []
  heroesHallOfFame: Array<DeepRequiredWithId<User> & HeroData> = []

  async mounted(): Promise<void> {
    // Get & enrich heroes
    const oneYearAgoSeconds = dayjs().subtract(3, 'year').unix()
    const heroes = (await db.collection(USERS).where('hasContributed', '==', true).get())
      .docs
      .map(doc => {
        const user = doc.data() as DeepRequiredWithId<User>
        return {
          ...user,
          ccus: sum(user.events.filter(e => e.eventDate.seconds > oneYearAgoSeconds).map(e => e.ccus)),
          lastEvent: user.events.sort((e1, e2) => e2.eventDate.seconds - e1.eventDate.seconds)[0] // hasContributed implies events > 0
        }
      })
      .sort((h1, h2) => h2.ccus - h1.ccus || h2.lccus - h1.lccus || h1.name.localeCompare(h2.name))

    // Split active/fame
    const [heroesActive, heroesHallOfFame] = partition(heroes, h => h.ccus > 0)
    this.heroesActive = heroesActive
    this.heroesHallOfFame = heroesHallOfFame
  }
}
