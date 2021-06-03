import { createRouter as vrcreate, createWebHistory, Router } from 'vue-router'

import { routesFromGlobImport } from './route-decorator'

// URGENT: Use globeager
const globImport = import.meta.glob('/**/*.vue')

export const createRouter: () => Promise<Router> = async () => vrcreate({
  routes: await routesFromGlobImport(globImport),
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'is-active'
})
