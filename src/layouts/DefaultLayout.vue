<template>
  <div
    v-shortkey="['ctrl', '/']"
    class="d-flex flex-grow-1"
    @shortkey="onKeyup"
  >
    <!-- Navigation -->
    <v-navigation-drawer
      v-model="drawer"
      app
      floating
      class="elevation-1"
      :right="$vuetify.rtl"
      :light="menuTheme === 'light'"
      :dark="menuTheme === 'dark'"
    >
      <!-- Navigation menu info -->
      <template v-slot:prepend>
        <div class="pa-2">
          <div class="title font-weight-bold text-uppercase primary--text"><a :href="cpxReturnDireccionHome">{{ product.name }}</a></div>
          <div class="overline grey--text">{{ product.version }}</div>
        </div>
      </template>

      <!-- Navigation menu -->
      <main-menu :menu="navigation.menu" />

      <!-- Navigation menu footer -->
      <template v-slot:append>
        <!-- Footer navigation links -->
        <!-- <div class="pa-1 text-center">
          <v-btn
            v-for="(item, index) in navigation.footer"
            :key="index"
            :href="item.href"
            :target="item.target"
            small
            text
          >
            {{ item.key ? $t(item.key) : item.text }}
          </v-btn>
        </div> -->

        <!-- REMOVE ME - Shop Demo purposes -->
        <!-- <div class="pa-2 pt-1 text-center">
          <v-btn
            class="buy-button"
            dark
            block
            color="#EE44AA"
            href="https://store.vuetifyjs.com/products/lux-admin-pro/"
            target="_blank"
          >
            Buy Now
          </v-btn>
        </div> -->
      </template>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-app-bar
      app
      :color="isToolbarDetached ? 'surface' : undefined"
      :flat="isToolbarDetached"
      :light="toolbarTheme === 'light'"
      :dark="toolbarTheme === 'dark'"
    >
      <v-card class="flex-grow-1 d-flex" :class="[isToolbarDetached ? 'pa-1 mt-3 mx-1' : 'pa-0 ma-0']" :flat="!isToolbarDetached">
        <div class="d-flex flex-grow-1 align-center">

          <!-- search input mobile -->
          <v-text-field
            v-if="showSearch"
            append-icon="mdi-close"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            hide-details
            solo
            flat
            autofocus
            @click:append="showSearch = false"
          ></v-text-field>

          <div v-else class="d-flex flex-grow-1 align-center">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-spacer class="d-none d-lg-block"></v-spacer>

            <!-- search input desktop -->
            <v-text-field
              ref="search"
              class="mx-1 hidden-xs-only"
              :placeholder="$t('menu.search')"
              prepend-inner-icon="mdi-magnify"
              hide-details
              filled
              rounded
              dense
            ></v-text-field>

            <v-spacer class="d-block d-sm-none"></v-spacer>

            <v-btn class="d-block d-sm-none" icon @click="showSearch = true">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <!-- <toolbar-language /> -->

            <!-- <div class="hidden-xs-only mx-1">
              <toolbar-currency />
            </div> -->

            <toolbar-apps />

            <div :class="[$vuetify.rtl ? 'ml-1' : 'mr-1']">
              <toolbar-notifications />
            </div>

            <toolbar-user />
          </div>
        </div>
      </v-card>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" :fluid="!isContentBoxed">
        <v-layout>
          <slot></slot>
        </v-layout>
      </v-container>
      <!-- {{ $store.state.app.permisosUsuario }} -->
      <v-footer app inset>
        <v-spacer></v-spacer>
        <div class="overline">
          Construido con esmero por <v-icon small color="pink">mdi-heart</v-icon> <a class="text-decoration-none" href="https://indielayer.com" target="_blank">Kangusoft</a>
        </div>
      </v-footer>
    </v-main>
  </div>
</template>

<script>
import { mapState } from 'vuex'

// navigation menu configurations
import config from '../configs'

import MainMenu from '../components/navigation/MainMenu'
import ToolbarUser from '../components/toolbar/ToolbarUser'
import ToolbarApps from '../components/toolbar/ToolbarApps'
import ToolbarLanguage from '../components/toolbar/ToolbarLanguage'
import ToolbarCurrency from '../components/toolbar/ToolbarCurrency'
import ToolbarNotifications from '../components/toolbar/ToolbarNotifications'

import { getPermisos, getUsuarioLogin } from '../graphql/configuracion'

export default {
  components: {
    MainMenu,
    ToolbarUser,
    ToolbarApps,
    // ToolbarLanguage,
    // ToolbarCurrency,
    ToolbarNotifications
  },
  data() {
    return {
      drawer: null,
      showSearch: false,

      navigation: config.navigation
    }
  },
  computed: {
    ...mapState('app', ['product', 'isContentBoxed', 'menuTheme', 'toolbarTheme', 'isToolbarDetached']),
    cpxReturnDireccionHome() {
      return 'http://localhost:8080/dashboard/analytics'
    }
  },
  watch: {
    '$auth.isLoading' (newCount, oldCount) {
      // Our fancy notification (2).
      console.log(`DEFAULT LAYOUT ${newCount} fruits now, yay!. ${oldCount}`)
      // this.cargarDatosUsuario()
      this.cargarPermisos()
      this.cargarUsuarioLogin()
    }
  },
  mounted() {
    // console.log('config.navigation: ', config.navigation)
    // console.log('$auth.isLoading default layout: ', this.$auth.isLoading)
    if (this.$auth.isLoading === false) {
      this.cargarPermisos()
    }
  },
  methods: {
    onKeyup(e) {
      this.$refs.search.focus()
    },
    async cargarUsuarioLogin() {
      const usuarioLogin = await getUsuarioLogin(this.$store.state.app.datosUsuario.user_id)

      console.log('usuarioLogin: ', usuarioLogin.data.kangusoft_usu[0])
      this.$store.dispatch('app/setUsuario', usuarioLogin.data.kangusoft_usu[0])
    },  
    async cargarPermisos() {
      // console.log('cargarPermisos DEFAULT LAYOUT')
      // console.log('this.$store.state.app.datosUsuario.user_id: ', this.$store.state.app.datosUsuario.user_id)
      const { data } = await getPermisos(this.$store.state.app.datosUsuario.user_id)

      // store.dispatch('app/setDatosUsuario', this.user['https://kangusoft.cl/jwt/hasura'])   
      // console.log('resp cargarPermisos: ',  data.kangusoft_usu_mod)
      const permisos = {
        pedido: false,
        cotizacion: false,
        oc: false,
        despacho: false,
        recepcion: false,
        proveedores: false,
        proyectos: false,
        materiales: false,
        usuarios: false,
        mantenedores: false
      }

      for (const per of data.kangusoft_usu_mod) {
        // console.log('per: ', per)
        if (per.mod_fk === 1 && per.activo === true) {
          permisos.pedido = true
        }
        if (per.mod_fk === 2 && per.activo === true) {
          permisos.cotizacion = true
        }
        if (per.mod_fk === 3 && per.activo === true) {
          permisos.oc = true
        } 
        if (per.mod_fk === 4 && per.activo === true) {
          permisos.despacho = true
        } 
        if (per.mod_fk === 5 && per.activo === true) {
          permisos.recepcion = true
        } 
        if (per.mod_fk === 6 && per.activo === true) {
          permisos.proveedores = true
        }
        if (per.mod_fk === 7 && per.activo === true) {
          permisos.proyectos = true
        }
        if (per.mod_fk === 8 && per.activo === true) {
          permisos.materiales = true
        }
        if (per.mod_fk === 9 && per.activo === true) {
          permisos.usuarios = true
        }
        if (per.mod_fk === 10 && per.activo === true) {
          permisos.mantenedores = true
        }
      }
      this.$store.dispatch('app/setPermisosUsuario', permisos)   
      // console.log('permisos: ', permisos)
    }
  }
}
</script>

<style scoped>
.buy-button {
  box-shadow: 1px 1px 18px #ee44aa;
}
</style>
