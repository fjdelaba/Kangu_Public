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

import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import VueApollo from 'vue-apollo'
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('tokenxjwt_id')

  return {
    headers: {
      ...headers,
      authorization: token || null
    }
  }
})

// const httpLink = createHttpLink({ uri: 'https://darling-glider-87.hasura.app/v1/graphql' })
const httpLink = createHttpLink({ uri: 'https://rapid-reptile-58.hasura.app/v1/graphql' })
const wsLink = new WebSocketLink(
  { 
    // uri: 'wss://darling-glider-87.hasura.app/v1/graphql',
    uri: 'wss://rapid-reptile-58.hasura.app/v1/graphql',
    options: {
      connectionParams: {
        headers: {
          Authorization: localStorage.getItem('tokenxjwt_id') ? localStorage.getItem('tokenxjwt_id') : null
        }
      },
      reconnect: true
    }
  }
)

const cache = new InMemoryCache()
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)

    return definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

// Create the apollo client
const apolloClient = new ApolloClient({
  // link: httpLink,
  // link: authLink.concat(httpLink),
  link: authLink.concat(link),
  cache
})

const apolloProvider = new VueApollo({ defaultClient: apolloClient })

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
