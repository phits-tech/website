import { Banner, BANNERS, Dao, Event, EVENTS, New, Space, SPACES, User } from '@phits-tech/common/dist/dao-firestore'

import { productionWarning } from '@/_services/modes'
import { context } from '~/context'
import { MODE } from '~/modes'
import migrate from '../migrations/migrate'

const db = context.db

const load = async <T>(filename: string): Promise<T[]> => {
  const path = `./${MODE}/${filename}`
  return await import(path).then(imported => Object.values(imported)[0] as T[]).catch(() => [])
}

const printSummary = (data: { [key: string]: unknown[] }): void => {
  console.info('\nSeeding:')
  Object.entries(data).forEach(([key, value]) => {
    if (value.length > 0) console.info(`- ${value.length} ${key}`)
  })
  console.info()
}

const main = async (): Promise<void> => {
  await productionWarning(__filename)

  // Load data
  const banners: Banner[] = await load('banners')
  const events: Event[] = await load('events')
  const spaces: Space[] = await load('spaces')
  const people: Array<New<User>> = await load('people')

  // Run the migrations
  await migrate()

  // Save data
  const dao = new Dao(context)

  printSummary({ banners, events, spaces, people })
  await Promise.all<unknown>([
    ...people.map(async person => await dao.createUser(person)),
    ...banners.map(async banner => await db.collection(BANNERS).doc(banner.slug).set(banner, { merge: true })),
    ...events.map(async event => await db.collection(EVENTS).doc(event.slug).set(event, { merge: true })),
    ...spaces.map(async space => await db.collection(SPACES).doc(space.slug).set(space, { merge: true }))
  ]).catch(error => console.error(error))
}

main()
  .then(() => process.exit())
  .catch(error => console.error(error))
