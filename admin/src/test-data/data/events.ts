import firebase from 'firebase-admin'

import { Event } from '@phits-tech/common/dao-firestore'
import { nextDay } from '@phits-tech/common/utils/datetime'

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

export const events = [mobileMondays, webWednesdays]
