import { User } from '@phits-tech/common/dist/dao-firestore'
import { DeepRequiredWithId } from '@phits-tech/common/dist/utils/types/general'

export interface PTVuexState {
  currentUser: DeepRequiredWithId<User> | null
}

export const GETTERS = {
}

export const ACTIONS = {
  userChanged: 'userChanged'
}
