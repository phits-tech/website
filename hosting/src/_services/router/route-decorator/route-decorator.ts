import { Vue } from 'vue-class-component'

import { RouteBinding } from './route-binding'

/***
 * For multiple routes, you must explicitly specify unique names
 */
export function Route<T extends Vue>(...routes: RouteBinding[]): (constructor: new () => T) => void {
  return (ctor) => { ctor.prototype.$routeBindings = routes }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $routeBindings?: RouteBinding[]
  }
}