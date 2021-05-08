import dayjs from 'dayjs'
import firebase from 'firebase-admin'

import { Banner, BANNERS, Dao, Event, EVENTS, Space, SPACES } from '@phits-tech/common/dist/dao-firestore'
import { nextDay } from '@phits-tech/common/dist/utils/datetime'

import { context } from '~/context'
import { MODE, productionWarning } from '~/modes'
import migrate from '../migrations/migrate'

const db = context.db

const main = async (): Promise<void> => {
  await productionWarning(__filename)
  if (MODE !== 'emu') return console.warn('This script is exclusively for local testing')

  // @ts-expect-error - we will use this later
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dao = new Dao(context)

  // Run the migrations
  await migrate()

  // ***** Add test data here *****
  const nextMonday = nextDay(1).startOf('day')
  const nextWednesday = nextDay(3).startOf('day')

  const mobileMondays: Event = {
    slug: 'mobile-mondays',
    name: 'Mobile Mondays',
    description: 'Hang-out with fellow mobile developers. Trade knowledge. Learn the latest tech. Be your best dev!',
    bannerUrl: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/events%2Fmobile-mondays.jpg?alt=media&token=61eda595-77e1-40ef-8666-89a5e69dec51',
    dateStart: firebase.firestore.Timestamp.fromMillis(nextMonday.hour(18).unix() * 1000),
    dateEnd: firebase.firestore.Timestamp.fromMillis(nextMonday.hour(19).unix() * 1000),
    location: 'Warehouse Cafe',
    series: 'Mobile Mondays',
    seriesType: 'monthly',
    badges: ['android', 'ios', 'flutter'],
    hostId: 'boat-123',
    hostName: 'Boat-o'
  }

  const webWednesdays: Event = {
    slug: 'web-wednesdays',
    name: 'Web Wednesdays',
    description: 'TYPESCRIPT IS AMAZING!!!',
    bannerUrl: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/events%2Fweb-wednesdays.jpg?alt=media&token=b4d2eb39-4cb1-4ede-96f9-d602c3577d7c',
    dateStart: firebase.firestore.Timestamp.fromMillis(nextWednesday.hour(23).unix() * 1000),
    dateEnd: firebase.firestore.Timestamp.fromMillis(nextWednesday.add(1, 'day').hour(0).unix() * 1000),
    location: 'In Towne',
    series: 'Web Wednesdays',
    seriesType: 'monthly',
    badges: ['react', 'vue', 'express', 'firebase'],
    hostId: 'nutto-456',
    hostName: 'Nutto'
  }

  await Promise.all([
    db.collection(EVENTS).doc(mobileMondays.slug).set(mobileMondays, { merge: true }),
    db.collection(EVENTS).doc(webWednesdays.slug).set(webWednesdays, { merge: true })
  ]).catch(error => console.error(error))

  const spaces: Space[] = [
    {
      slug: 'maker-club-nu',
      name: 'Maker Club, NU',
      description: 'Aliquid quod tenetur neque labore sequi non facere. Consequatur voluptatibus quae quisquam explicabo odio, hic natus dolorem, alias error, corporis totam eveniet.',
      banner: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Fmaker-club-nu-banner.jpg?alt=media&token=9ccefce1-b0d2-4808-a4a3-109ed37a9194',
      logo: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Fmaker-club-nu-logo.jpg?alt=media&token=da3b874d-ba62-4bd9-b236-43cab188a51c',
      category: 'community',
      locationText: '4th floor SC2, Naresuan University',
      locationLatitude: 16.742_235_085_922_57,
      locationLongitude: 100.193_572_537_988_8
    },
    {
      slug: 'setic-nu',
      name: 'SET Investment Center, NU',
      description: 'Nostrum laborum nemo odio obcaecati omnis amet at pariatur soluta, accusamus incidunt aliquid nesciunt cupiditate quasi cumque beatae nihil perspiciatis ad exercitationem!',
      banner: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Fsetic-nu-banner.jpg?alt=media&token=a5ce286e-37d1-4cbe-80ed-e14db07c4438',
      logo: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Fsetic-nu-logo.jpg?alt=media&token=66a5c132-087f-4ac4-a34d-5a40e68962d9',
      category: 'coworking',
      locationText: 'Near BEC, Naresuan University',
      locationLatitude: 16.748_156_316_592_908,
      locationLongitude: 100.196_996_297_037_84
    },
    {
      slug: 'usit-nu',
      name: 'USIT, NU',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem commodi dolor corrupti et a vitae aliquam, minima ipsa at quasi. Delectus et ad quis eos repellendus illo, ducimus labore enim!',
      banner: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Fusit-nu-banner.jpg?alt=media&token=4a5b2039-a513-48c3-9d26-719ddc8d97c2',
      logo: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Fusit-nu-logo.jpg?alt=media&token=c82966c5-28a3-4dd5-bdfe-5719257a7ddd',
      category: 'cafe',
      locationText: 'Near Engineering, Naresuan University',
      locationLatitude: 16.744_032_818_990_863,
      locationLongitude: 100.195_160_148_854_64
    },
    {
      slug: 'pt-discord',
      name: 'PT Discord',
      description: 'Optio esse fugit voluptatum! Nesciunt, similique quaerat distinctio voluptatem voluptates facilis totam ex repudiandae. Incidunt quaerat eligendi consequatur non labore facere nulla.',
      banner: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Fmodern-technology.jpeg?alt=media&token=e440f586-b143-4ce0-9039-a1e03921e441',
      logo: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Fphits-tech-logo.png?alt=media&token=a3e436e1-f303-4083-b3d6-e324f4073e3c',
      category: 'online',
      locationText: 'https://discord.gg/4CHb53F'
    },
    {
      slug: 'pt-youtube',
      name: 'PT YouTube',
      description: 'Facilis rem quas perspiciatis quis quae numquam blanditiis ea sed recusandae aspernatur inventore reprehenderit ut, ullam, asperiores itaque officia perferendis officiis incidunt!',
      banner: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Ftarget-marketing.jpeg?alt=media&token=aec127f6-e685-40de-a09c-416450b0dcf3',
      logo: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Fphits-tech-logo.png?alt=media&token=a3e436e1-f303-4083-b3d6-e324f4073e3c',
      category: 'online',
      locationText: 'https://www.youtube.com/channel/UC83wlCFD2-FOYxSUzVG-oUg'
    }
  ]

  await Promise.all(
    spaces.map(async space =>
      await db.collection(SPACES).doc(space.slug).set(space, { merge: true }))
  )

  const banners: Banner[] = [
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

  await Promise.all(
    banners.map(async banner =>
      await db.collection(BANNERS).doc().set(banner, { merge: true })
    )
  )
}

main()
  .then(() => process.exit())
  .catch((error) => console.error(error))
