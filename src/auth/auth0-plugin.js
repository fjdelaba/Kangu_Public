/**
 *  External Modules
 */

import Vue from 'vue'
import createAuth0Client from '@auth0/auth0-spa-js'

import { getEmpresa } from '../graphql/general'

import store from '../store'
/**
 *  Vue.js Instance Definition
 */

let instance

export const getInstance = () => instance

/**
 *  Vue.js Instance Initialization
 */

export const useAuth0 = ({
  onRedirectCallback = () =>
    window.history.replaceState({}, document.title, window.location.pathname),
  //redirectUri = window.location.origin,
  redirectUri = window.location.origin,
  ...pluginOptions
}) => {
  if (instance) return instance

  instance = new Vue({
    data() {
      return {
        auth0Client: null,
        isLoading: true,
        isAuthenticated: false,
        user: {},
        error: null
      }
    },
    methods: {
      async handleRedirectCallback() {
        this.isLoading = true
        try {
          await this.auth0Client.handleRedirectCallback()
          this.user = await this.auth0Client.getUser()
          this.isAuthenticated = true
        } catch (error) {
          this.error = error
        } finally {
          this.isLoading = false
        }
      },

      loginWithRedirect(options) {
        return this.auth0Client.loginWithRedirect(options)
      },

      logout(options) {
        return this.auth0Client.logout(options)
      },

      getTokenSilently(o) {
        return this.auth0Client.getTokenSilently(o)
      }
    },

    // eslint-disable-next-line vue/order-in-components
    async created() {
      try {
        console.log('try')
        this.auth0Client = await createAuth0Client({
          ...pluginOptions,
  
          // Environment Heroku
          domain: process.env.VUE_APP_AUTH_DOMAIN || 'kangusoft.us.auth0.com',//pluginOptions.domain,
          client_id: process.env.VUE_APP_AUTH_CLIENT_ID || 'vrEYoiels6SlT3fgKo1NWso3f9JMU5Z8',//pluginOptions.clientId,
          audience: pluginOptions.audience,
          //redirect_uri: redirectUri
          // redirect_uri: 'http://localhost:8080/dashboard/analytics'
          redirect_uri: process.env.VUE_APP_URL_POST_LOGIN || 'http://localhost:8080/dashboard/analytics',
          ui_locales: 'es'
          // redirect_uri: 'https://kangu.cl/dashboard/analytics'
  
        })
        try {
          console.log('try 1')
          console.log('window.location.: ', window.location)
          if (
            window.location.search.includes('code=') &&
            window.location.search.includes('state=')
          ) {
            console.log('IF')
            const { appState } = await this.auth0Client.handleRedirectCallback()
  
            onRedirectCallback(appState)
          }
        } catch (error) {
          this.error = error
          console.log('error: ', error)
        } finally {
          try {
            this.isAuthenticated = await this.auth0Client.isAuthenticated()
            this.user = await this.auth0Client.getUser()
            console.log('USER : ', this.user)
            // console.log('USER USER user_tenant: ', this.user['https://kangusoft.cl/jwt/hasura'].user_tenant)
            const val = this.user['https://kangusoft.cl/jwt/hasura'].user_tenant
    
            store.dispatch('app/setDatosUsuario', this.user['https://kangusoft.cl/jwt/hasura'])
            this.isLoading = false
            localStorage.setItem('tokenxjwt_id', `Bearer ${this.user['https://kangusoft.cl/jwt/hasura'].token}`)
            const resp = await getEmpresa(val)
            
            console.log('resp.data.kangusoft_emp[0]: ', resp.data.kangusoft_emp[0])
            store.dispatch('app/setDatosEmpresa', resp.data.kangusoft_emp[0])
    
            // console.log('resp: ', resp)          
    
          } catch (error) {
            
            console.log('error',error)
          }
         
        }
      } catch (error) {
        console.log('error: ', error)
      }
    }
  })

  return instance
}

/**
 *  Vue.js Plugin Definition
 */

export const Auth0Plugin = {
  install(Vue, options) {
    Vue.prototype.$auth = useAuth0(options)
  }
}