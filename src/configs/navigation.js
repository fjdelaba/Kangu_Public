import menuConfiguracion from './menus/configuracion.menu'
import menuAdquisiciones from './menus/adquisiciones.menu'
import menuFinanzas from './menus/finanzas.menu'
import menuPages from './menus/pages.menu'

export default {
  // main navigation - side menu
  menu: [{
    text: '',
    key: '',
    items: [
      { icon: 'mdi-view-dashboard-outline', key: 'menu.dashboard', text: 'Dashboard', link: '/dashboard/analytics' }
    ]
  }, {
    text: 'Adquisiciones',
    items: menuAdquisiciones
  }, 
  // {
  //   text: 'Subcontrato',
  //   items: [
  //     { icon: 'mdi-airplane-landing', key: 'menu.landingPage', text: 'Landing Page', link: '/landing' },
  //     { icon: 'mdi-cash-usd-outline', key: 'menu.pricingPage', text: 'Pricing Page', link: '/landing/pricing' }
  //   ]
  // }, 
  {
    text: 'Configuración',
    items: menuConfiguracion
  },
  {
    text: 'Finanzas',
    items: menuFinanzas
  }]
}
