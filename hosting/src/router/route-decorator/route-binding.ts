import { RouteRecordRaw } from 'vue-router'

export type RouteBinding = RouteRecordRaw & {
  priority?: number // to control match order
  component: never // injected by decorator
}
