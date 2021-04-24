import { createRouter, createWebHistory } from 'vue-router'

import components from '@/views'

import { getRoutes } from './route-decorator/route-builder'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: getRoutes(components),
  linkActiveClass: 'is-active'
})

export default router
