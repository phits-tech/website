import { Component } from '@vue/runtime-core'
import { RouteRecordRaw } from 'vue-router'

import { RouteBinding } from './route-binding'

// TODO: Use Component name as default if only 1 route
export const getRoutes = (components: { [name: string]: Component } | Component[]): RouteRecordRaw[] =>
  (Array.isArray(components))
    ? components.flatMap(component => (component.prototype.$routeBindings as RouteBinding[] ?? [])
      .map(route => Object.assign({ component, priority: 0 }, route)))
      .sort((r1, r2) => r2.priority - r1.priority)
    : Object.entries(components).flatMap(([name, component]) => (component.prototype.$routeBindings as RouteBinding[] ?? [])
      .map(route => Object.assign({ name, component, priority: 0 }, route)))
      .sort((r1, r2) => r2.priority - r1.priority)
