import { Component } from 'vue'
import { Vue } from 'vue-class-component'
import { RouteRecordRaw } from 'vue-router'

export function Route<T extends Vue>(...routes: Array<Omit<RouteRecordRaw, 'component'> & { priority?: number }>) {
  return function (constructor: new () => T): void {
    const component = constructor as Component
    constructor.prototype.$routeMappings = routes.map(route =>
      Object.assign({ component, name: component.name, priority: 0 }, route)
    )
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $routeMappings: RouteRecordRaw & { priority: number }
  }
}
