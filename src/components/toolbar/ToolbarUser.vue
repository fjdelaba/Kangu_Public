<template>
  <v-menu offset-y left transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-btn icon class="elevation-2" v-on="on">
        <v-badge
          color="success"
          dot
          bordered
          offset-x="10"
          offset-y="10"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-avatar size="40">
                <v-img
                  :src="$store.state.app.usuario.avatar"
                  v-bind="attrs"
                  v-on="on"
                ></v-img>
              </v-avatar>
            </template>
            <span> - {{ $store.state.app.usuario.nombre }} {{ $store.state.app.usuario.apellidos }} <br/> - {{$store.state.app.usuario.cargo}}</span>
          </v-tooltip>
        </v-badge>
      </v-btn>
    </template>

    <!-- user menu list -->
    <v-list dense nav>
      <v-list-item
        v-for="(item, index) in menu"
        :key="index"
        :to="item.link"
        :exact="item.exact"
        :disabled="item.disabled"
        link
      >
        <v-list-item-icon>
          <v-icon small :class="{ 'grey--text': item.disabled }">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.key ? $t(item.key) : `${item.text}` }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        to="/mi_empresa"
        :exact="true"
        :link="true"
      >
        <v-list-item-icon>
          <v-icon small>mdi-office-building-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Mi Empresa</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-1"></v-divider>
      <!-- to="/auth/signin" texto del boton inferior -->
      <v-list-item @click="logout()">
        <v-list-item-icon>
          <v-icon small>mdi-logout-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('menu.logout') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import config from '../../configs'
/*
|---------------------------------------------------------------------
| Toolbar User Component
|---------------------------------------------------------------------
|
| Quickmenu for user menu shortcuts on the toolbar
|
*/

import { subsDatosUsuario } from '../../graphql/general'
import { getPermisos } from '../../graphql/configuracion'

export default {
  data() {
    return {
      menu: config.toolbar.user
    }
  },
  computed: {
    auth() {
      return this.$auth
    }
  },
  watch: {
    '$auth.isLoading' (newCount, oldCount) {
      // Our fancy notification (2).
      console.log(`We have ${newCount} fruits now, yay!. ${oldCount}`)
      this.cargarDatosUsuario()
    }
  },
  mounted() {
    // console.log('mounted Toolbar')
    setTimeout(() => {
      // this.cargarDatosUsuario()
      // this.cargarPermisos()
    }, 3000)
  },
  methods: {

    logout() {
      this.$auth.logout()
      // this.$router.push({ path: '/landing' })
    },
    async cargarDatosUsuario() {
      // console.log('cargarDatosUsuario Toolbar: ', this.$store.state.app.datosUsuario.user_id)
      try {
        const resp = await subsDatosUsuario(this.$store.state.app.datosUsuario.user_id)

        // resp.subscribe({
        //   next (data) {
        //     console.log('suscribe datausuario_ ', data.data.kangusoft_usu[0].activo)
        //     console.log('data.data.kangusoft_usu[0].activo: ', data.data.kangusoft_usu[0].activo)
        //     if (data.data.kangusoft_usu[0].activo === false) {
        //       console.log('object')
        //     }
        //   },
        //   error (error) {
        //     console.error(error)
        //   } 
        // })
      } catch (error) {
        console.log('error: ', error)
      }

    }
  }
}
</script>
