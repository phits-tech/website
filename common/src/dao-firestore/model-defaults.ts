import type { Defaults } from '../utils/types/firestore'

import type { User, UserPrivate } from './model-types'

export const userDefaults: Defaults<User> = {
  slug: '',
  nameLast: '',
  pic: '',
  tagline: '',
  description: '',
  skills: [],
  hasContributed: false,
  lccus: 0,
  events: [],
  profileGitHubId: '',
  profileGitLabId: '',
  profileStackExchangeId: '',
  profileTwitterId: '',
  profileFacebookId: '',
  profileLineId: '',
  profilePublicEmail: '',
  website: ''
}

export const userPrivateDefaults: Defaults<UserPrivate> = {
  email: '',
  emails: [],
  tokenNuConnect: ''
}
