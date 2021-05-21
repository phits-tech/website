import firebase from 'firebase-admin'

import { New, User } from '@phits-tech/common/dao-firestore'

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

export const people: Array<New<User>> = [chaz]
