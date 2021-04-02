import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import firebase from 'firebase-admin'

import { Dao, Event } from '@phits-tech/common/dist/dao-firestore'
import { EVENTS } from '@phits-tech/common/src/dao-firestore/schema'

import { context } from '~/context'
import { MODE, productionWarning } from '~/modes'
import migrate from '../migrations/migrate'

dayjs.extend(weekday)
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
  const today = dayjs().startOf('day')
  const nextMonday = today.weekday(8)
  const nextWednesday = today.weekday(10)

  const mobileMondays: Event = {
    id: '123',
    name: 'Mobile Mondays',
    location: 'Warehouse Cafe',
    dateStart: firebase.firestore.Timestamp.fromMillis(nextMonday.add(18, 'hour').unix() * 1000),
    dateEnd: firebase.firestore.Timestamp.fromMillis(nextMonday.add(19, 'hour').unix() * 1000)
  }

  const webWednesdays: Event = {
    id: '456',
    name: 'Web Wednesdays',
    location: 'In Towne',
    dateStart: firebase.firestore.Timestamp.fromMillis(nextWednesday.add(19, 'hour').unix() * 1000),
    dateEnd: firebase.firestore.Timestamp.fromMillis(nextWednesday.add(20, 'hour').unix() * 1000)
  }

  await Promise.all([
    db.collection(EVENTS).doc(mobileMondays.id).set(mobileMondays, { merge: true }),
    db.collection(EVENTS).doc(webWednesdays.id).set(webWednesdays, { merge: true })
  ]).catch(error => console.error(error))
}

main()
  .then(() => process.exit())
  .catch((error) => console.error(error))
