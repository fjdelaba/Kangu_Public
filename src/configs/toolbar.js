export default {
  // apps quickmenu
  // apps: [{
  //   icon: 'mdi-email-outline',
  //   text: 'Email',
  //   key: 'menu.email',
  //   subtitle: 'Inbox',
  //   subtitleKey: 'email.inbox',
  //   link: '/apps/email/inbox'
  // }, {
  //   icon: 'mdi-format-list-checkbox',
  //   title: 'Tasks',
  //   key: 'menu.todo',
  //   subtitle: 'TODO',
  //   link: '/apps/todo'
  // }, {
  //   icon: 'mdi-message-outline',
  //   title: 'Chat',
  //   key: 'menu.chat',
  //   subtitle: '#general',
  //   link: '/apps/chat/channel/general'
  // }, {
  //   icon: 'mdi-view-column-outline',
  //   title: 'Board',
  //   key: 'menu.board',
  //   subtitle: 'Kanban',
  //   link: '/apps/board'
  // }],
  apps: [{
    icon: 'mdi-order-bool-ascending-variant',
    title: 'Tasks',
    key: 'menu.oc',
    subtitle: 'OC',
    link: '/adquisiciones/oc/crear'
  }, {
    icon: 'mdi-reorder-horizontal',
    title: 'Tasks',
    key: 'menu.pedido',
    subtitle: 'PEDIDO',
    link: '/apps/todo'
  } 
  , {
    icon: 'mdi-message-outline',
    title: 'Chat',
    key: 'menu.chat',
    subtitle: '#general',
    link: '/apps/chat/channel/general'
  }
  //, {
  //   icon: 'mdi-view-column-outline',
  //   title: 'Board',
  //   key: 'menu.board',
  //   subtitle: 'Kanban',
  //   link: '/apps/board'
  // }
  ],

  // user dropdown menu
  user: [
    // { icon: 'mdi-account-box-outline', key: 'menu.profile', text: 'Profile', link: '/users/edit' },
    { icon: 'mdi-account-box-outline', key: 'menu.profile', text: 'Profile', link: '/mi_perfil' },
    // { icon: 'mdi-email-outline', key: 'menu.email', text: 'Email', link: '/apps/email' },
    // { icon: 'mdi-format-list-checkbox', key: 'menu.todo', text: 'Todo', link: '/apps/todo' },
    // { icon: 'mdi-email-outline', key: 'menu.chat', text: 'Chat', link: '/apps/chat' },
    // { icon: 'mdi-email-outline', key: 'menu.board', text: 'Board', link: '/apps/board' }
    { icon: 'mdi-help', key: 'menu.faq', text: 'FAQ', link: '/apps/board' }
  ]
}
