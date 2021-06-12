/* eslint-disable radar/no-duplicate-string */
import dayjs from 'dayjs'
import firebase from 'firebase-admin'

import { Event } from '@phits-tech/common/dist/dao-firestore'

const PT_DISCORD = 'https://discord.gg/4CHb53F'

export const events: Event[] = [
  {
    slug: 'js-phs-1',
    name: 'Vue vs Nuxt (JS-PHS Meetup #1)',
    description: 'JavaScript Phitsanulok เป็น meetup รายเดือนสำหรับชุมชนในพื้นที่ เรารวมตัวกันเพื่อสนทนาเกี่ยวกับ JavaScript ทุกอย่าง มาร่วมพูดคุยถามคำถามและแบ่งปันความรู้ของคุณ',
    bannerUrl: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/events/2021/js-phs-1.png',
    dateStart: firebase.firestore.Timestamp.fromMillis(dayjs('2021-05-14T20:00:00+0700').unix() * 1000),
    dateEnd: firebase.firestore.Timestamp.fromMillis(dayjs('2021-05-14T21:30:00+0700').unix() * 1000),
    location: PT_DISCORD,
    badges: ['Vue', 'Nuxt', 'JavaScript', 'Web'],
    hostId: 'charles-allen',
    hostName: 'Charles Allen'
  },
  {
    slug: 'google-io-2021',
    name: 'Google I/O Developer Keynote Viewing Party',
    description: 'Play Google I/O Adventure while watching the Google I/O Developer Keynote together.',
    bannerUrl: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/events/2021/google-io-2021.png',
    dateStart: firebase.firestore.Timestamp.fromMillis(dayjs('2021-05-19T17:00:00+0700').unix() * 1000),
    dateEnd: firebase.firestore.Timestamp.fromMillis(dayjs('2021-05-19T18:00:00+0700').unix() * 1000),
    location: PT_DISCORD,
    badges: ['Web', 'Android', 'Flutter', 'Assistant', 'Firebase', 'Cloud', 'TensorFlow'],
    hostId: 'ant',
    hostName: 'Antony'
  },
  {
    slug: 'tech-clinic-7',
    name: 'Startup Tech Clinic',
    description: 'ทีมผู้เชี่ยวชาญด้านเทคโนโลยีของเราพร้อมให้คำปรึกษา startup ของคุณ​ นำโค้ดของคุณมาด้วย​ Open to OTAP IGNITE teams and other local startups looking for advice on topics including Web, Mobile, AI and Cloud.',
    bannerUrl: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/events/2021/startup-tech-clinic.png',
    dateStart: firebase.firestore.Timestamp.fromMillis(dayjs('2021-05-27T12:00:00+0700').unix() * 1000),
    dateEnd: firebase.firestore.Timestamp.fromMillis(dayjs('2021-05-27T13:00:00+0700').unix() * 1000),
    location: PT_DISCORD,
    series: 'Startup Tech Clinic',
    seriesType: 'biweekly',
    badges: ['Web', 'iOS', 'Android', 'AI/ML', 'Cloud'],
    hostId: 'ant',
    hostName: 'Antony'
  },
  {
    slug: 'tech-clinic-8',
    name: 'Startup Tech Clinic',
    description: 'ทีมผู้เชี่ยวชาญด้านเทคโนโลยีของเราพร้อมให้คำปรึกษา startup ของคุณ​ นำโค้ดของคุณมาด้วย​ Open to OTAP IGNITE teams and other local startups looking for advice on topics including Web, Mobile, AI and Cloud.',
    bannerUrl: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/events/2021/startup-tech-clinic.png',
    dateStart: firebase.firestore.Timestamp.fromMillis(dayjs('2021-06-10T12:00:00+0700').unix() * 1000),
    dateEnd: firebase.firestore.Timestamp.fromMillis(dayjs('2021-06-10T13:00:00+0700').unix() * 1000),
    location: PT_DISCORD,
    series: 'Startup Tech Clinic',
    seriesType: 'biweekly',
    badges: ['Web', 'iOS', 'Android', 'AI/ML', 'Cloud'],
    hostId: 'ant',
    hostName: 'Antony'
  },
  {
    slug: 'js-phs-2',
    name: 'TypeScript for JS Devs (JS-PHS Meetup #2)',
    description: 'TypeScript คืออะไร? เหตุใดจึงต้องใช้ TypeScript คุณจะเริ่มต้นได้อย่างไร? คำตอบสำหรับคำถามเหล่านี้และอีกมากมาย! เข้าร่วมการอภิปราย; ถามคำถาม; และเรียนรู้ TypeScript ด้วยกัน :)',
    bannerUrl: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/events/2021/js-phs-2.png',
    dateStart: firebase.firestore.Timestamp.fromMillis(dayjs('2021-06-11T20:00:00+0700').unix() * 1000),
    dateEnd: firebase.firestore.Timestamp.fromMillis(dayjs('2021-06-11T21:00:00+0700').unix() * 1000),
    location: PT_DISCORD,
    badges: ['TypeScript', 'JavaScript', 'Web'],
    hostId: 'charles-allen',
    hostName: 'Charles Allen'
  }
]
