import { values } from 'lodash'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import * as Views from '@/views'

const routes: RouteRecordRaw[] = values(Views)
  .filter(page => page.prototype.$routeMappings)
  .flatMap(page => page.prototype.$routeMappings)
  .sort((r1, r2) => r2.priority - r1.priority)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active'
})

export default router
