import { computed } from '@vue/runtime-core'
import dayjs from 'dayjs'
import { partition, sumBy } from 'lodash'
import { DeepRequired } from 'ts-essentials'
import { setup, Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import { EventLog, User } from '@phits-tech/common/src/dao-firestore'
import { USERS } from '@phits-tech/common/src/dao-firestore/schema'

import { db } from '~/firebase-initialized'
import { Route } from '~/router/route-decorator'

// URGENT: Factor out CCU calculation
@Route({ path: '/profile/:slug', props: true })
export default class Profile extends Vue.with(class {
  slug!: string
}) {
  ccuCutoffSeconds = dayjs().subtract(2, 'year').unix()
  user: DeepRequired<User> | null = null

  meta = setup(() => useMeta(computed(() => ({
    title: this.user?.name ?? 'Profile'
  }))))

  async mounted(): Promise<void> {
    this.user = (await db.collection(USERS).doc(this.slug).get()).data() as (DeepRequired<User> | undefined) ?? null
  }

  get eventsAttendanceAndContribution(): [EventLog[], EventLog[]] { return partition(this.user?.events, e => e.role === 'attendee') }
  get eventsAttendanceCcu(): EventLog[] { return this.eventsAttendanceAndContribution[0].filter(e => e.date.seconds > this.ccuCutoffSeconds) }
  get eventsContributionAll(): EventLog[] { return this.eventsAttendanceAndContribution[1] }
  get eventsContributionCcu(): EventLog[] { return this.eventsContributionAll.filter(e => e.date.seconds > this.ccuCutoffSeconds) }

  get ccusFromAttendance(): number { return sumBy(this.eventsAttendanceCcu, 'ccus') }
  get ccusFromContribution(): number { return sumBy(this.eventsContributionCcu, 'ccus') }
}
