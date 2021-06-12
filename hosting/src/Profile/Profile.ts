import { computed } from '@vue/runtime-core'
import dayjs from 'dayjs'
import { partition, sumBy } from 'lodash'
import { DeepRequired } from 'ts-essentials'
import { setup, Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'
import { Prop } from 'vue-property-decorator'

import { EventLog, User, USERS, UserSocialAccount } from '@phits-tech/common/dist/dao-firestore'
import { entries } from '@phits-tech/common/dist/utils/object-extensions'

import { db } from '~/firebase-initialized'
import { Route } from '~/router/route-decorator'

import { getSocialUrl, socialRanking } from './social'

@Route({ path: '/profile/:slug', props: true })
export default class Profile extends Vue {
  @Prop(String) slug!: string

  ccuCutoffSeconds = dayjs().subtract(2, 'year').unix() // TODO: Factor out CCU calculation
  user: DeepRequired<User> | null = null // eslint-disable-line unicorn/no-null

  meta = setup(() => useMeta(computed(() => ({
    title: this.user?.name ?? 'Profile'
  }))))

  async mounted(): Promise<void> {
    this.user = (await db.collection(USERS).doc(this.slug).get()).data() as (DeepRequired<User> | undefined) ?? null // eslint-disable-line unicorn/no-null
  }

  get socialAccounts(): Array<[UserSocialAccount, string]> {
    return (entries(this.user?.socialAccountsIds) as Array<[UserSocialAccount, string]>) // TODO: PR TypeScript to improve Object.entries!
      .sort((e1, e2) => socialRanking[e1[0]] - socialRanking[e2[0]])
      .map(e => [e[0], getSocialUrl(e)])
  }

  get eventsAttendanceAndContribution(): [EventLog[], EventLog[]] { return partition(this.user?.events, e => e.role === 'attendee') }
  get eventsAttendanceCcu(): EventLog[] { return this.eventsAttendanceAndContribution[0].filter(e => e.date.seconds > this.ccuCutoffSeconds) }
  get eventsContributionAll(): EventLog[] { return this.eventsAttendanceAndContribution[1] }
  get eventsContributionCcu(): EventLog[] { return this.eventsContributionAll.filter(e => e.date.seconds > this.ccuCutoffSeconds) }

  get ccusFromAttendance(): number { return sumBy(this.eventsAttendanceCcu, 'ccus') }
  get ccusFromContribution(): number { return sumBy(this.eventsContributionCcu, 'ccus') }
}
