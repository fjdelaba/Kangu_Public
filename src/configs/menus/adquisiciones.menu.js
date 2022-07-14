export default [
  {
    icon: 'mdi-reorder-horizontal',
    key: 'menu.pedido',
    text: 'Pedido',
    link: '/apps/email',
    items: [
      { key: 'menu.consultas', text: 'Consultas', link: '/adquisiciones/pedido/consultar' },
      {
        key: 'menu.aprobar',
        text: 'Aprobar',
        link: '/adquisiciones/pedido/aprobar'
      }
    ]
  },
  {
    icon: 'mdi-order-bool-ascending',
    key: 'menu.cotizacion',
    text: 'Cotizacion',
    link: '/apps/chat',
    items: [
      { key: 'menu.pendientes', text: 'Pendientes de Compra', link: '/adquisiciones/cotizacion/crear' },
      { key: 'menu.consultas', text: 'Consultas', link: '/adquisiciones/cotizacion/consultar' }
    ]
  },
  {
    icon: 'mdi-order-bool-ascending-variant',
    key: 'menu.oc',
    text: 'Orden de Compra',
    link: '/apps/todo',
    items: [
      { key: 'menu.crear-oc', text: 'Crear', link: '/adquisiciones/oc/crear' },
      { key: 'menu.pendientes', text: 'Pendientes de Compra', link: '/adquisiciones/oc/pendientes' },
      { key: 'menu.consultas', text: 'Consultar', link: '/adquisiciones/oc/consultar' },
      {
        key: 'menu.aprobar',
        text: 'Aprobar',
        link: '/adquisiciones/oc/aprobar'
      }
    ]
  },
  {
    icon: 'mdi-truck-check',
    key: 'menu.despacho',
    text: 'Despacho',
    link: '/apps/board',
    items: [
      { key: 'menu.despachar', text: 'Despachar', link: '/adquisiciones/despacho/crear' },
      { key: 'menu.consultas', text: 'Consultar', link: '/adquisiciones/despacho/consultar' }
    ]
  },
  {
    icon: 'mdi-warehouse',
    key: 'menu.recepcion',
    text: 'Recepcion',
    regex: /^\/ecommerce/,
    items: [
      { key: 'menu.recepcionar', text: 'Recepcionar', link: '/adquisiciones/recepcion/crear' },
      { key: 'menu.consultas', text: 'Consultar', link: '/adquisiciones/recepcion/consultar' }
    ]
  }
]
