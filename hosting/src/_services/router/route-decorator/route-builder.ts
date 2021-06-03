import { Component } from '@vue/runtime-core'
import { RouteRecordRaw } from 'vue-router'

import { RouteBinding } from './route-binding'

export const routesFromComponents = (components: Component[]): RouteRecordRaw[] =>
  components
    .flatMap(component => getBindings(component).map(binding => createRoute(binding, component)))
    .sort((r1, r2) => r2.priority - r1.priority)

export const routesFromGlobImport = async (globImport: Record<string, () => Promise<{ [key: string]: any }>>): Promise<RouteRecordRaw[]> =>
  (await Promise.all(
    Object.entries(globImport)
      .map(async pathAndImport => {
        const component = (await pathAndImport[1]()).default as Component
        const name = pathAndImport[0].match(/\/([^/]*)\./)?.[1] ?? '' // filename (without path & ext)
        return getBindings(component).map(binding => createRoute(binding, component, name))
      })
  )).flat()
    .sort((r1, r2) => r2.priority - r1.priority)

// const routesFromRequireContext = (context: __WebpackModuleApi.RequireContext): RouteRecordRaw[] =>
//   context.keys()
//     .flatMap(key => {
//       const component = context(key).default as Component // component (must be export default)
//       const name = key.match(/\/([^/]*)\./)?.[1] ?? '' // filename (without path & ext)
//       return getBindings(component).map(binding => createRoute(binding, component, name))
//     })
//     .sort((r1, r2) => r2.priority - r1.priority)

const getBindings = (component: Component): RouteBinding[] =>
  component.prototype.$routeBindings ?? []

const createRoute = (binding: RouteBinding, component: Component, name?: string): RouteRecordRaw & { priority: number } =>
  ('redirect' in binding || 'components' in binding)
    ? ({ name, priority: 0, ...binding }) // Redirect or MultipleViews
    : ({ name, priority: 0, component, ...binding }) // SingleView
