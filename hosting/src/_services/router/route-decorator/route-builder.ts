import type { Component } from '@vue/runtime-core'
import type { RouteRecordRaw } from 'vue-router'

import type { RouteBinding } from './route-binding'

export const getRoutes = (components: Component[] | __WebpackModuleApi.RequireContext): RouteRecordRaw[] =>
  Array.isArray(components)
    ? getRoutesFromArray(components)
    : getRoutesFromContext(components)

const getRoutesFromArray = (components: Component[]): RouteRecordRaw[] =>
  components
    .flatMap(component => getBindings(component).map(binding => createRoute(binding, component)))
    .sort((r1, r2) => r2.priority - r1.priority)

const getRoutesFromContext = (context: __WebpackModuleApi.RequireContext): RouteRecordRaw[] =>
  context.keys()
    .flatMap(key => {
      const component = context(key).default as Component // component (must be export default)
      const name = key.match(/\/([^/]*)\./)?.[1] ?? '' // filename (without path & ext)
      return getBindings(component).map(binding => createRoute(binding, component, name))
    })
    .sort((r1, r2) => r2.priority - r1.priority)

const getBindings = (component: Component): RouteBinding[] =>
  component.prototype.$routeBindings ?? []

const createRoute = (binding: RouteBinding, component: Component, name?: string): RouteRecordRaw & { priority: number } =>
  ('redirect' in binding || 'components' in binding)
    ? Object.assign({ name, priority: 0 }, binding) // Redirect or MultipleViews
    : Object.assign({ name, priority: 0, component }, binding) // SingleView
