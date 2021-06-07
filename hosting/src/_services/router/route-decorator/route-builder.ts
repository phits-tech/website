import { Component } from '@vue/runtime-core'
import { RouteRecordRaw } from 'vue-router'

import { RouteBinding } from './route-binding'

type GlobEagerReturn = ReturnType<ImportMeta['globEager']>

export const routesFromComponents = (components: Component[]): RouteRecordRaw[] =>
  components
    .flatMap(component => getBindings(component).map(binding => createRoute(binding, component)))
    .sort((r1, r2) => r2.priority - r1.priority)

export const routesFromGlobImport = (globEagerResult: GlobEagerReturn): RouteRecordRaw[] =>
  Object.entries(globEagerResult)
    .flatMap(pathAndImport => {
      const component = pathAndImport[1].default as Component
      const name = pathAndImport[0].match(/\/([^/]*)\./)?.[1] ?? '' // filename (without path & ext)
      return getBindings(component).map(binding => createRoute(binding, component, name))
    })
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
