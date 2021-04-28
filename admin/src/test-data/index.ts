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
      banner: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Fcomputer-connect.jpeg?alt=media&token=9bbcc699-189b-4add-9176-db61409006d2',
      logo: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Fbrain-logo.jpeg?alt=media&token=cc521e0f-12bc-4f5e-85f3-064302979d40',
      category: 'community',
      locationText: '4th floor SC2, Naresuan University',
      locationLatitude: 16.742_317,
      locationLongitude: 100.193_807
    },
    {
      slug: 'setic-nu',
      name: 'SET Investment Center, NU',
      description: 'Nostrum laborum nemo odio obcaecati omnis amet at pariatur soluta, accusamus incidunt aliquid nesciunt cupiditate quasi cumque beatae nihil perspiciatis ad exercitationem!',
      banner: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Ffinancial-technology.jpeg?alt=media&token=bd95ddb5-3664-4be4-85ed-4b772e90dd99',
      logo: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Fbrain-logo.jpeg?alt=media&token=cc521e0f-12bc-4f5e-85f3-064302979d40',
      category: 'coworking',
      locationText: 'Near BEC, Naresuan University'
    },
    {
      slug: 'usit-nu',
      name: 'USIT, NU',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem commodi dolor corrupti et a vitae aliquam, minima ipsa at quasi. Delectus et ad quis eos repellendus illo, ducimus labore enim!',
      banner: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Fhomes-autonomous.jpeg?alt=media&token=c228af43-ff70-4b95-bd4d-224e8385e781',
      logo: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Fbrain-logo.jpeg?alt=media&token=cc521e0f-12bc-4f5e-85f3-064302979d40',
      category: 'cafe',
      locationText: 'Near Engineering, Naresuan University'
    },
    {
      slug: 'pt-discord',
      name: 'PT Discord',
      description: 'Optio esse fugit voluptatum! Nesciunt, similique quaerat distinctio voluptatem voluptates facilis totam ex repudiandae. Incidunt quaerat eligendi consequatur non labore facere nulla.',
      banner: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Fmodern-technology.jpeg?alt=media&token=e440f586-b143-4ce0-9039-a1e03921e441',
      logo: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Fbrain-logo.jpeg?alt=media&token=cc521e0f-12bc-4f5e-85f3-064302979d40',
      category: 'online',
      locationText: 'https://discord.gg/4CHb53F'
    },
    {
      slug: 'pt-youtube',
      name: 'PT YouTube',
      description: 'Facilis rem quas perspiciatis quis quae numquam blanditiis ea sed recusandae aspernatur inventore reprehenderit ut, ullam, asperiores itaque officia perferendis officiis incidunt!',
      banner: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Ftarget-marketing.jpeg?alt=media&token=aec127f6-e685-40de-a09c-416450b0dcf3',
      logo: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/spaces%2Fbrain-logo.jpeg?alt=media&token=cc521e0f-12bc-4f5e-85f3-064302979d40',
      category: 'online',
      locationText: 'https://www.youtube.com/channel/UC83wlCFD2-FOYxSUzVG-oUg'
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
