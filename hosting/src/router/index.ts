import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import * as Pages from '@/views'

import Routes from './routes'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: Routes.MainHome,
    component: Pages.MainHome
  },
  {
    path: '/events',
    name: Routes.Events,
    component: Pages.Events
  },
  {
    path: '/events/create',
    name: Routes.EventsCreate,
    component: Pages.EventsCreate
  },
  {
    path: '/:catchAllSegments(.*)',
    name: Routes.NotFound,
    component: Pages.NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active'
})

export default router
