import { NavigationGuard } from 'vue-router'

import store from '@/store'

import Routes from './routes'

const requireLogin: NavigationGuard<Vue> = async (_to, from, next) => {
  if (!store.state.currentUser) next({ name: Routes.UserLogin, params: { redirect: from.fullPath } })
  return next()
}

export default requireLogin
