import firebase from 'firebase-admin'

import { Dao, Event, Space } from '@phits-tech/common/dist/dao-firestore'
import { nextDay } from '@phits-tech/common/dist/utils/datetime'
import { EVENTS, SPACES } from '@phits-tech/common/src/dao-firestore/schema'

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
    bannerUrl: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/banners%2Fmobile-mondays.jpg?alt=media&token=40e01fc2-9aa2-42c1-bd89-9e1ad76d067d',
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
    bannerUrl: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/banners%2Fweb-wednesdays.jpg?alt=media&token=2f63c5da-5230-4976-830b-ecfde34a46d9',
    dateStart: firebase.firestore.Timestamp.fromMillis(nextWednesday.hour(19).unix() * 1000),
    dateEnd: firebase.firestore.Timestamp.fromMillis(nextWednesday.hour(20).unix() * 1000),
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
      logo: 'https://images.unsplash.com/photo-1585980243496-fe29a36bd382',
      banner: 'https://images.unsplash.com/photo-1585980243496-fe29a36bd382',
      spaceType: 'community',
      locationText: '4th floor SC2, Naresuan University'
    },
    {
      slug: 'usit-nu',
      name: 'Maker Club, NU',
      logo: 'https://images.unsplash.com/photo-1585980243496-fe29a36bd382',
      banner: 'https://images.unsplash.com/photo-1585980243496-fe29a36bd382',
      spaceType: 'community',
      locationText: '4th floor SC2, Naresuan University'
    },
    {
      slug: 'pt-discord',
      name: 'Maker Club, NU',
      logo: 'https://images.unsplash.com/photo-1585980243496-fe29a36bd382',
      banner: 'https://images.unsplash.com/photo-1585980243496-fe29a36bd382',
      spaceType: 'community',
      locationText: '4th floor SC2, Naresuan University'
    },
    {
      slug: 'pt-youtube',
      name: 'Maker Club, NU',
      logo: 'https://images.unsplash.com/photo-1585980243496-fe29a36bd382',
      banner: 'https://images.unsplash.com/photo-1585980243496-fe29a36bd382',
      spaceType: 'community',
      locationText: '4th floor SC2, Naresuan University'
    },
    {
      slug: 'setic-nu',
      name: 'Maker Club, NU',
      logo: 'https://images.unsplash.com/photo-1585980243496-fe29a36bd382',
      banner: 'https://images.unsplash.com/photo-1585980243496-fe29a36bd382',
      spaceType: 'community',
      locationText: '4th floor SC2, Naresuan University'
    }
  ]

  await Promise.all(
    spaces.map(async space =>
      await db.collection(SPACES).doc(space.slug).set(space, { merge: true }))
  )
}

main()
  .then(() => process.exit())
  .catch((error) => console.error(error))
