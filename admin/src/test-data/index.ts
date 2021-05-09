import { BANNERS, Dao, EVENTS, SPACES } from '@phits-tech/common/dao-firestore'

import { context } from '~/context'
import { MODE } from '~/modes'
import migrate from '../migrations/migrate'

import { banners } from './data/banners'
import { events } from './data/events'
import { people } from './data/people'
import { spaces } from './data/spaces'

const db = context.db

const main = async (): Promise<void> => {
  if (MODE !== 'emu') return console.warn('This script is exclusively for local testing')

  // Run the migrations
  await migrate()

  // URGENT: Extract example data to `/data`
  // ***** Save test data here *****
  const dao = new Dao(context)

  await Promise.all<unknown>([
    ...people.map(async person => await dao.createUser(person)),
    ...banners.map(async banner => await db.collection(BANNERS).doc().set(banner, { merge: true })),
    ...events.map(async event => await db.collection(EVENTS).doc(event.slug).set(event, { merge: true })),
    ...spaces.map(async space => await db.collection(SPACES).doc(space.slug).set(space, { merge: true }))
  ]).catch(error => console.error(error))
  // ***** End test data *****
}

main()
  .then(() => process.exit())
  .catch((error) => console.error(error))
