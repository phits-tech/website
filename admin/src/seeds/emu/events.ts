import firebase from 'firebase-admin'

import type { Event } from '@phits-tech/common/dao-firestore'
import { nextDay } from '@phits-tech/common/utils/datetime'

const nextMonday = nextDay(1).startOf('day')
const nextWednesday = nextDay(3).startOf('day')

const mobileMondays: Event = {
  slug: 'mobile-mondays',
  name: 'Mobile Mondays',
  description: 'Hang-out with fellow mobile developers. Trade knowledge. Learn the latest tech. Be your best dev!',
  bannerUrl: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/events/mobile-mondays.jpg',
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
  bannerUrl: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/events/web-wednesdays.jpg',
  dateStart: firebase.firestore.Timestamp.fromMillis(nextWednesday.hour(23).unix() * 1000),
  dateEnd: firebase.firestore.Timestamp.fromMillis(nextWednesday.add(1, 'day').hour(0).unix() * 1000),
  location: 'In Towne',
  series: 'Web Wednesdays',
  seriesType: 'monthly',
  badges: ['react', 'vue', 'express', 'firebase'],
  hostId: 'nutto-456',
  hostName: 'Nutto'
}

export const events = [mobileMondays, webWednesdays]
