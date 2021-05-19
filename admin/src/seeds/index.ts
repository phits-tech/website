import type { Banner, Event, Space } from '@phits-tech/common/dao-firestore'
import { BANNERS, EVENTS, SPACES } from '@phits-tech/common/dao-firestore'

import { productionWarning } from '@/_services/modes'
import { context } from '~/context'
import { MODE } from '~/modes'
import migrate from '../migrations/migrate'

const db = context.db

const main = async (): Promise<void> => {
  if (!process.argv.includes('--yes')) {
    await productionWarning(__filename)
  }
  await migrate()

  const banners = await import(`./${MODE}/banners`).catch(_ => []) as Banner[]
  const events = await import(`./${MODE}/events`).catch(_ => []) as Event[]
  const spaces = await import(`./${MODE}/spaces`).catch(_ => []) as Space[]

  // ***** Save test data here *****
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
