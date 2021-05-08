import dayjs from 'dayjs'
import firebase from 'firebase-admin'

import { Banner } from '@phits-tech/common/dist/dao-firestore'

export const banners: Banner[] = [
  {
    banner169Url: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/banners%2Fstartup-tech-clinic.png?alt=media&token=0f2a42d0-f0d7-4f87-b4af-a8bfe23859cc',
    targetEventSlug: 'tech-clinic',
    dateExpire: firebase.firestore.Timestamp.fromMillis(dayjs('2021-06-01T01:00:00.000+07:00').unix() * 1000) // temporary (auto-expires)
  },
  {
    banner169Url: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/banners%2Fotap-2021-1.png?alt=media&token=a25cbb6e-e5f2-43c2-80e1-d443e5695af1',
    targetUrl: 'https://otap.phits.tech',
    dateExpire: firebase.firestore.Timestamp.fromMillis(dayjs('2050-01-01T12:00:00.000+07:00').unix() * 1000) // permanent (manually expire by update)
  }
]
