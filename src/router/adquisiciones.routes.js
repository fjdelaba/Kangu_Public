import emailRoutes from '../apps/email/routes'
import chatRoutes from '../apps/chat/routes'
import todoRoutes from '../apps/todo/routes'
import boardRoutes from '../apps/board/routes'

export default [
  {
    path: '/adquisiciones/oc/crear',
    component: () =>
      import(
        /* webpackChunkName: "apps-email" */ '@/pages/adquisiciones/oc/Crear.vue'
      ),
    children: [...emailRoutes]
  },
  {
    path: '/adquisiciones/oc/consultar',
    component: () =>
      import(
        /* webpackChunkName: "apps-chat" */ '@/pages/adquisiciones/oc/Consultar.vue'
      ),
    children: [...chatRoutes]
  },
  {
    path: '/adquisiciones/oc/consultar/detalle',
    component: () =>
      import(
        /* webpackChunkName: "apps-chat" */ '@/pages/adquisiciones/oc/consultar/Detalle.vue'
      ),
    children: [...chatRoutes]
  },
  {
    path: '/adquisiciones/oc/aprobar/detalle',
    component: () =>
      import(
        /* webpackChunkName: "apps-chat" */ '@/pages/adquisiciones/oc/aprobar/Detalle.vue'
      ),
    children: [...chatRoutes]
  },
  {
    path: '/adquisiciones/oc/aprobar',
    component: () =>
      import(
        /* webpackChunkName: "apps-todo" */ '@/pages/adquisiciones/oc/Aprobar.vue'
      ),
    children: [...todoRoutes]
  },
  {
    path: '/adquisiciones/oc/pendientes',
    component: () =>
      import(
        /* webpackChunkName: "apps-todo" */ '@/pages/adquisiciones/oc/Pendientes.vue'
      ),
    children: [...todoRoutes]
  },
  {
    path: '/adquisiciones/pedido/crear',
    component: () =>
      import(
        /* webpackChunkName: "apps-todo" */ '@/pages/adquisiciones/pedido/Crear.vue'
      ),
    children: [...todoRoutes]
  },
  {
    path: '/adquisiciones/pedido/consultar',
    component: () =>
      import(
        /* webpackChunkName: "apps-todo" */ '@/pages/adquisiciones/pedido/Consultar.vue'
      ),
    children: [...todoRoutes]
  },
  {
    path: '/adquisiciones/pedido/aprobar',
    component: () =>
      import(
        /* webpackChunkName: "apps-todo" */ '@/pages/adquisiciones/pedido/Aprobar.vue'
      ),
    children: [...todoRoutes]
  },
  {
    path: '/adquisiciones/cotizacion/crear',
    component: () =>
      import(
        /* webpackChunkName: "apps-todo" */ '@/pages/adquisiciones/cotizacion/Crear.vue'
      ),
    children: [...todoRoutes]
  },
  {
    path: '/adquisiciones/cotizacion/consultar',
    component: () =>
      import(
        /* webpackChunkName: "apps-todo" */ '@/pages/adquisiciones/cotizacion/Consultar.vue'
      ),
    children: [...todoRoutes]
  },
  {
    path: '/adquisiciones/despacho/crear',
    component: () =>
      import(
        /* webpackChunkName: "apps-todo" */ '@/pages/adquisiciones/despacho/Crear.vue'
      ),
    children: [...todoRoutes]
  },
  {
    path: '/adquisiciones/despacho/consultar',
    component: () =>
      import(
        /* webpackChunkName: "apps-todo" */ '@/pages/adquisiciones/despacho/Consultar.vue'
      ),
    children: [...todoRoutes]
  },
  {
    path: '/adquisiciones/recepcion/crear',
    component: () =>
      import(
        /* webpackChunkName: "apps-todo" */ '@/pages/adquisiciones/recepcion/Crear.vue'
      ),
    children: [...todoRoutes]
  },
  {
    path: '/adquisiciones/recepcion/listado',
    component: () =>
      import(
        /* webpackChunkName: "apps-todo" */ '@/pages/adquisiciones/recepcion/Listado.vue'
      ),
    children: [...todoRoutes]
  },
  {
    path: '/adquisiciones/recepcion/consultar',
    component: () =>
      import(
        /* webpackChunkName: "apps-todo" */ '@/pages/adquisiciones/recepcion/Consultar.vue'
      ),
    children: [...todoRoutes]
  }
]
