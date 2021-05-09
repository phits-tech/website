import firebase from 'firebase-admin'

import type { New, User } from '@phits-tech/common/dao-firestore'
import { BANNERS, Dao, EVENTS, SPACES } from '@phits-tech/common/dao-firestore'

import { context } from '~/context'
import { MODE } from '~/modes'
import migrate from '../migrations/migrate'

import { banners } from './data/banners'
import { events } from './data/events'
import { spaces } from './data/spaces'

const db = context.db

const main = async (): Promise<void> => {
  if (MODE !== 'emu') return console.warn('This script is exclusively for local testing')

  // Run the migrations
  await migrate()

  // URGENT: Extract example data to `/data`
  // ***** Save test data here *****
  const dao = new Dao(context)
  const chaz: New<User> = {
    slug: 'charles-allen',
    nameFirst: 'Charles',
    nameLast: 'Allen',
    pic: 'https://firebasestorage.googleapis.com/v0/b/phits-tech-emu.appspot.com/o/users%2Fcharles-allen.jpg?alt=media&token=3aefa624-8d7f-4938-b3f7-68ca1f11ac43',
    tagline: 'software engineer; team player; lean advocate',
    bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, ad dolorem ipsum deserunt quos odio harum sit? Quae, autem praesentium unde accusamus possimus rerum corrupti dicta delectus omnis quibusdam necessitatibus?',
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
    socialAccountsIds: {
      github: 'charles-allen',
      stackoverflow: '2957169',
      twitter: 'VoieDev',
      email: 'example@example.com'
    },
    website: 'https://voiedev.com'
  }

  await dao.createUser(chaz)

  await Promise.all([
    ...banners.map(async banner => await db.collection(BANNERS).doc().set(banner, { merge: true })),
    ...events.map(async event => await db.collection(EVENTS).doc(event.slug).set(event, { merge: true })),
    ...spaces.map(async space => await db.collection(SPACES).doc(space.slug).set(space, { merge: true }))
  ]).catch(error => console.error(error))
  // ***** End test data *****
}

main()
  .then(() => process.exit())
  .catch((error) => console.error(error))
