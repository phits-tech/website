import { Event, User } from '@phits-tech/common/dist/dao-firestore'
import { DeepRequiredWithId } from '@phits-tech/common/dist/utils/types/general'

export interface PTVuexState {
  currentUser: DeepRequiredWithId<User> | null
  events: Event[] // TODO: Maybe rename to avoid clash with a built-in type
}

export const STATE = {
  events: 'events',
  currentUser: 'currentUser'
}

export const GETTERS = {
}

export const ACTIONS = {
  init: 'init',
  userChanged: 'userChanged'
}
