import { Defaults } from '../utils/types/firestore'

import { User, UserPrivate } from './model-types'

export const userDefaults: Defaults<User> = {
  slug: '',
  nameLast: '',
  pic: '',
  tagline: '',
  bio: '',
  skills: [],
  hasContributed: false,
  lccus: 0,
  events: [],
  socialAccountsIds: {},
  website: ''
}

export const userPrivateDefaults: Defaults<UserPrivate> = {
  email: '',
  emails: [],
  tokenNuConnect: ''
}
