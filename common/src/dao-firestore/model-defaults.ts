import type { Defaults } from '../utils/types/firestore'

import type { User, UserPrivate } from './model-types'

export const userDefaults: Defaults<User> = {
  code: '',
  nameLast: ''
}

export const userPrivateDefaults: Defaults<UserPrivate> = {
  email: '',
  nuConnectToken: ''
}
