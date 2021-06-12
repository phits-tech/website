import { Vue } from 'vue-class-component'

import { RouteBinding } from './route-binding'

type Decorator<T> = (ctor: new () => T) => void

/***
 * For multiple routes, you must explicitly specify unique names
 */
export function Route<T extends Vue>(...routes: RouteBinding[]): Decorator<T> {
  return ctor => { ctor.prototype.$routeBindings = routes }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $routeBindings?: RouteBinding[]
  }
}
