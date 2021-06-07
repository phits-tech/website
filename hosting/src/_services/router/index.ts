import { createRouter, createWebHistory } from 'vue-router'

import { routesFromGlobImport } from './route-decorator'

const globImport = import.meta.globEager('/**/*.vue')
const routes = routesFromGlobImport(globImport)

export const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'is-active'
})
