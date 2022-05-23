import emailRoutes from '../apps/email/routes'
import chatRoutes from '../apps/chat/routes'
import todoRoutes from '../apps/todo/routes'
import boardRoutes from '../apps/board/routes'

export default [
  {
    path: '/configuracion/proyectos',
    component: () =>
      import(
        /* webpackChunkName: "apps-email" */ '@/pages/configuracion/proyectos/Listado.vue'
      )

  },
  {
    path: '/configuracion/proyectos/sent',
    component: () =>
      import(
        /* webpackChunkName: "apps-email" */ '@/pages/configuracion/proyectos/Crear.vue'
      )

  },
  {
    path: '/configuracion/proyectos/trash',
    component: () =>
      import(
        /* webpackChunkName: "apps-email" */ '@/pages/configuracion/proyectos/Detalle.vue'
      )

  },
  {
    path: '/configuracion/materiales',
    component: () =>
      import(
        /* webpackChunkName: "apps-chat" */ '@/pages/configuracion/materiales/Listado.vue'
      ),
    children: [...chatRoutes]
  },
  {
    path: '/configuracion/proveedores',
    component: () =>
      import(
        /* webpackChunkName: "apps-todo" */ '@/pages/configuracion/proveedores/Listado.vue'
      ),
    children: [...todoRoutes]
  },
  {
    path: '/configuracion/mantenedores',
    component: () =>
      import(
        /* webpackChunkName: "apps-todo" */ '@/pages/configuracion/mantenedores/Listado.vue'
      ),
    children: [...todoRoutes]
  },
  {
    path: '/configuracion/usuarios',
    component: () =>
      import(
        /* webpackChunkName: "apps-todo" */ '@/pages/configuracion/usuarios/Listado.vue'
      ),
    children: [...todoRoutes]
  }
]
