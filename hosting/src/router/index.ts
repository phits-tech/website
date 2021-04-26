import { createRouter, createWebHistory } from 'vue-router'

import { getRoutes } from './route-decorator'

const context = require.context('@/', true, /\.vue$/i)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: getRoutes(context),
  linkActiveClass: 'is-active'
})

export default router
