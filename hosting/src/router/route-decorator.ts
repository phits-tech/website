import { Component } from 'vue'
import { Vue } from 'vue-class-component'
import { RouteRecordRaw } from 'vue-router'

export function Route<T extends Vue>(...routes: Array<Omit<RouteRecordRaw, 'component'> & { priority?: number }>): (constructor: new () => T) => void {
  return (constructor) => {
    const component = constructor as Component
    constructor.prototype.$routeMappings = routes.map(route => Object.assign({ component, priority: 0 }, route))
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $routeMappings?: RouteRecordRaw & { priority: number }
  }
}
