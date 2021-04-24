import { values } from 'lodash'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import views from '@/views'

import { RouteBinding } from './route-decorator'

// TODO: Extract logic to "RouteBuilder"
// TODO: Use Component name as default if only 1 route
const routes: RouteRecordRaw[] = values(views)
  .flatMap(component => (component.prototype.$routeBindings as RouteBinding[] ?? [])
    .map(route => Object.assign({ component, priority: 0 }, route)))
  .sort((r1, r2) => r2.priority - r1.priority)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active'
})

export default router
