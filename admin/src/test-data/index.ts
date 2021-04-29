import firebase from 'firebase-admin'

import { Dao, Event, New, Space, User } from '@phits-tech/common/dist/dao-firestore'
import { nextDay } from '@phits-tech/common/dist/utils/datetime'
import { EVENTS, SPACES } from '@phits-tech/common/src/dao-firestore/schema'

import { context } from '~/context'
import { MODE, productionWarning } from '~/modes'
import migrate from '../migrations/migrate'

const db = context.db

const main = async (): Promise<void> => {
  await productionWarning(__filename)
  if (MODE !== 'emu') return console.warn('This script is exclusively for local testing')

  const dao = new Dao(context)

  // Run the migrations
  await migrate()

  // ***** Add test data here *****
  const chaz: New<User> = {
    slug: 'charles-allen',
    nameFirst: 'Charles',
    nameLast: 'Allen',
    pic: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/users%2Fcharles-allen.jpg?alt=media&token=3aefa624-8d7f-4938-b3f7-68ca1f11ac43',
    tagline: 'software engineer; team player; lean advocate',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, ad dolorem ipsum deserunt quos odio harum sit? Quae, autem praesentium unde accusamus possimus rerum corrupti dicta delectus omnis quibusdam necessitatibus?',
    skills: ['vue', 'node', 'android', 'typescript', 'kotlin', 'scala', 'java', 'erlang', 'agile', 'scrum'],
    hasContributed: true,
    lccus: 40,
    events: [{
      slug: 'meetup-datehere-agile',
      name: 'Agile: Learn to Plan; Plan to Learn',
      banner169Url: '',
      date: firebase.firestore.Timestamp.fromMillis(1_534_824_000_000),
      role: 'speaker',
      ccus: 40
    }],
    profileGitHubId: 'charles-allen',
    profileStackExchangeId: '2957169',
    profileTwitterId: 'VoieDev',
    profilePublicEmail: 'example@example.com',
    website: 'https://voiedev.com'
  }

  await dao.createUser(chaz)

  const nextMonday = nextDay(1).startOf('day')
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

  const nextWednesday = nextDay(3).startOf('day')
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
}

main()
  .then(() => process.exit())
  .catch((error) => console.error(error))
