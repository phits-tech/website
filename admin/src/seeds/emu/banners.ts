import dayjs from 'dayjs'
import firebase from 'firebase-admin'

import { Banner } from '@phits-tech/common/dao-firestore'

export const banners: Banner[] = [
  {
    slug: 'js-phs-1',
    banner169Url: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/events/2021/js-phs-1.png',
    targetEventSlug: 'js-phs-1',
    dateExpire: firebase.firestore.Timestamp.fromMillis(dayjs('2021-05-15T00:00:00.000+07:00').unix() * 1000) // temporary (auto-expires)
  },
  {
    slug: 'google-io-2021',
    banner169Url: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/events/2021/google-io-2021.png',
    targetEventSlug: 'google-io-2021',
    dateExpire: firebase.firestore.Timestamp.fromMillis(dayjs('2021-05-20T00:00:00.000+07:00').unix() * 1000) // temporary (auto-expires)
  },
  {
    slug: 'js-phs-2',
    banner169Url: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/events/2021/js-phs-2.png',
    targetEventSlug: 'js-phs-2',
    dateExpire: firebase.firestore.Timestamp.fromMillis(dayjs('2021-06-12T00:00:00.000+07:00').unix() * 1000) // temporary (auto-expires)
  },
  {
    slug: 'otap-2021-1',
    banner169Url: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/events/2021/otap-2021-1.png',
    targetUrl: 'https://otap.phits.tech',
    dateExpire: firebase.firestore.Timestamp.fromMillis(dayjs('2050-01-01T12:00:00.000+07:00').unix() * 1000) // permanent (manually expire by update)
  }
]
