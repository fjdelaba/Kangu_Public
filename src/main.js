import Vue from 'vue'
import App from './App.vue'

// VUEX - https://vuex.vuejs.org/
import store from './store'

// VUE-ROUTER - https://router.vuejs.org/
import router from './router'

// PLUGINS
import vuetify from './plugins/vuetify'
import i18n from './plugins/vue-i18n'
import './plugins/vue-google-maps'
import './plugins/vue-shortkey'
import './plugins/vue-head'
import './plugins/vue-gtag'
import './plugins/apexcharts'
import './plugins/echarts'
import './plugins/animate'
import './plugins/clipboard'
import './plugins/moment'

// FILTERS
import './filters/capitalize'
import './filters/lowercase'
import './filters/uppercase'
import './filters/formatCurrency'
import './filters/formatDate'

// STYLES
// Main Theme SCSS
import './assets/scss/theme.scss'

// Animation library - https://animate.style/
import 'animate.css/animate.min.css'

// Import the Auth0 configuration and plugin
import { domain, clientId, audience } from '../auth_config.json'
import { Auth0Plugin } from '@/auth/auth0-plugin'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import VueApollo from 'vue-apollo'
const authLink = setContext((_, { headers }) => {
  // get the authentication token from ApplicationSettings if it exists
  const token = localStorage.getItem('tokenxjwt_id')

  console.log('token main: ', token)

  // return the headers to the context so HTTP link can read them
  return {
    headers: {
      ...headers,

      // authorization: token ? `Bearer ${token}` : null,
      authorization: token || null
    }
  }
})

// // Create the subscription websocket link
// const wsLink = new WebSocketLink({
//   uri: 'https://darling-glider-87.hasura.app/v1/graphql',
//   options: {  
//     reconnect: true
//   }
// })

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://darling-glider-87.hasura.app/v1/graphql'

  // headers: {
  //   'x-hasura-admin-secret': 'gKfb394Es6Bb2JjhhGM49h18Qmkj7FhSt5mz94ZUZSmeYUlO8gopF1BGqyM7Hygm',
  // },
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  // link: httpLink,
  link: authLink.concat(httpLink),
  cache
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(VueApollo)

// Set this to false to prevent the production tip on Vue startup.
Vue.config.productionTip = false

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

/*
|---------------------------------------------------------------------
| Main Vue Instance
|---------------------------------------------------------------------
|
| Render the vue application on the <div id="app"></div> in index.html
|
| https://vuejs.org/v2/guide/instance.html
|
*/
export default new Vue({
  i18n,
  vuetify,
  router,
  store,
  apolloProvider,
  render: (h) => h(App)
}).$mount('#app')
