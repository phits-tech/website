import { values } from 'lodash'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import * as Views from '@/views'

import { RouteBinding } from './route-decorator'

const routes: RouteRecordRaw[] = values(Views)
  .flatMap(component => (component.prototype.$routeBindings as RouteBinding[] ?? [])
    .map(route => Object.assign({ component, priority: 0 }, route)))
  .sort((r1, r2) => r2.priority - r1.priority)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active'
})

export default router
