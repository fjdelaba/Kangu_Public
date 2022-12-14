import Vue from 'vue'
import Router from 'vue-router'

// Routes
import AppsRoutes from './apps.routes'
import UIRoutes from './ui.routes'
import PagesRoutes from './pages.routes'
import UsersRoutes from './users.routes'
import EcommerceRoutes from './ecommerce.routes'
import LandingRoutes from './landing.routes'
import { authenticationGuard } from '@/auth/authenticationGuard'
import adquisicionesRoutes from './adquisiciones.routes'
import configuracionRoutes from './configuracion.routes'
import finanzasRoutes from './finanzas.routes'

Vue.use(Router)

export const routes = [{
  path: '/',
  // redirect: '/dashboard/analytics'
  redirect: '/landing'
}, {
  path: '/dashboard/analytics',
  name: 'dashboard-analytics',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/dashboard/DashboardPage.vue'),
  beforeEnter: authenticationGuard
},
// ...AppsRoutes,
// ...UIRoutes,
// ...PagesRoutes,
...UsersRoutes,
// ...EcommerceRoutes,
...LandingRoutes, 
...adquisicionesRoutes,
...configuracionRoutes,
...finanzasRoutes,
{
  path: '/blank',
  name: 'blank',
  component: () => import(/* webpackChunkName: "blank" */ '@/pages/BlankPage.vue')
},
{
  path: '/mi_perfil',
  name: 'miperfil',
  component: () => import(/* webpackChunkName: "blank" */ '@/pages/MiPerfil.vue')
},
{
  path: '/mi_empresa',
  name: 'miempresa',
  component: () => import(/* webpackChunkName: "blank" */ '@/pages/MiEmpresa.vue')
},
{
  path: '*',
  name: 'error',
  component: () => import(/* webpackChunkName: "error" */ '@/pages/error/NotFoundPage.vue'),
  meta: {
    layout: 'error'
  }
}]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL || '/',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes
})

/**
 * Before each route update
 */
router.beforeEach((to, from, next) => {
  return next()
})

/**
 * After each route update
 */
router.afterEach((to, from) => {
})

export default router
