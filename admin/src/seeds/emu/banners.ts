import dayjs from 'dayjs'
import firebase from 'firebase-admin'

import { Banner } from '@phits-tech/common/dist/dao-firestore'

export const banners: Banner[] = [
  {
    banner169Url: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/banners/startup-tech-clinic.png',
    targetEventSlug: 'tech-clinic',
    dateExpire: firebase.firestore.Timestamp.fromMillis(dayjs('2021-06-01T01:00:00.000+07:00').unix() * 1000) // temporary (auto-expires)
  },
  {
    banner169Url: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/banners/otap-2021-1.png',
    targetUrl: 'https://otap.phits.tech',
    dateExpire: firebase.firestore.Timestamp.fromMillis(dayjs('2050-01-01T12:00:00.000+07:00').unix() * 1000) // permanent (manually expire by update)
  }
]
