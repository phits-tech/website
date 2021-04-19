import { Component } from '@vue/runtime-core'
import { values } from 'lodash'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import * as Views from '@/views'

import { RouteBindingOrdered } from './route-decorator'

const routes: RouteRecordRaw[] = values(Views)
  .flatMap((component: Component) => (component.prototype.$routeBindings as RouteBindingOrdered[] ?? [])
    .map(route => Object.assign(route, { component })))
  .sort((r1, r2) => r2.priority - r1.priority)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active'
})

export default router
