import { Vue } from 'vue-class-component'

interface Priority { priority: number }
type RouteBinding = { name: string, path: string } & Partial<Priority>
export type RouteBindingOrdered = RouteBinding & Required<Priority>

export function Route<T extends Vue>(...routes: RouteBinding[]): (constructor: new () => T) => void {
  return (ctor) => { ctor.prototype.$routeBindings = routes.map(route => Object.assign({ priority: 0 }, route)) }
}

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $routeBindings?: RouteBindingOrdered[]
//   }
// }
