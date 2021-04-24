import { Component } from '@vue/runtime-core'
import { RouteRecordRaw } from 'vue-router'

import { RouteBinding } from './route-binding'

export const getRoutes = (components: { [name: string]: Component } | Component[]): RouteRecordRaw[] =>
  asNamedEntries(components)
    .flatMap(([name, component]) => getBindings(component).map(binding => createRoute(binding, name, component)))
    .sort((r1, r2) => r2.priority - r1.priority)

const asNamedEntries = (components: { [name: string]: Component } | Component[]): Array<[string, Component]> =>
  (Array.isArray(components))
    ? Array.from(components.entries()).map(entry => [entry[0].toString(), entry[1]] as [string, Component])
    : Object.entries(components)

const getBindings = (component: Component): RouteBinding[] =>
  component.prototype.$routeBindings ?? []

const createRoute = (binding: RouteBinding, name: string, component: Component): RouteRecordRaw & { priority: number } =>
  (binding.redirect !== undefined || binding.components !== undefined)
    ? Object.assign({ name, priority: 0 }, binding) // Redirect or MultipleViews
    : Object.assign({ name, priority: 0, component }, binding) // SingleView
