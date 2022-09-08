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
      
              <v-avatar v-if="$store.state.app.usuario.avatar != null" size="40">
                <v-img
                  :src="$store.state.app.usuario.avatar"
                  v-bind="attrs"
                  v-on="on"
                ></v-img>
              </v-avatar>
              <v-avatar
                v-else
                color="blue"
                size="40"
              >
                <span class="white--text text-h7">{{ iniciales }}</span>
               
              </v-avatar>
            </template>
            <span id="firstName"> - {{ $store.state.app.usuario.nombre }}</span> <span id="lastName"> {{ $store.state.app.usuario.apellidos }}</span> <span><br/> - {{ $store.state.app.usuario.cargo }}</span>
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
        v-if="$store.state.app.usuario.usu_per_fk == 1"
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
/* eslint-disable */
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
      menu: config.toolbar.user,
      iniciales:''
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
      //this.cargarDatosUsuario()
      // this.cargarPermisos()
      this.iconoLetras(this.$store.state.app.usuario.nombre ,this.$store.state.app.usuario.apellidos)
    }, 3000)
  },
  methods: {
    iconoLetras(nombre,apellido) {
    console.log("nombres",nombre)
    console.log('apellido', apellido)
    let inicialNombre = nombre.split(' ')
    let inicialApellidos = apellido.split(' ')
  let initials = ''
  let initials2 = ''
  for (var i = 0; i < inicialNombre.length; i++) {
    if (inicialNombre[i].length > 0 && inicialNombre[i] !== '') {
      initials += inicialNombre[i][0]
    }
  }
   for (var i = 0; i < inicialApellidos.length; i++) {
    if (inicialApellidos[i].length > 0 && inicialApellidos[i] !== '') {
      initials2 += inicialApellidos[i][0]
    }
  }
  this.iniciales = initials + initials2
  return console.log('iniciales',initials,initials2)
    },
    logout() {
      this.$auth.logout()
      // this.$router.push({ path: '/landing' })
    },
    async cargarDatosUsuario() {
      // console.log('cargarDatosUsuario Toolbar: ', this.$store.state.app.datosUsuario.user_id)
      // try {
      //   console.log('try subscription')
      //   const resp = await subsDatosUsuario(this.$store.state.app.datosUsuario.user_id)

      //   resp.subscribe({
      //     next (data) {
      //       console.log('suscribe datausuario_ ', data.data.kangusoft_usu[0].activo)
      //       console.log('data.data.kangusoft_usu[0].activo: ', data.data.kangusoft_usu[0].activo)
      //       if (data.data.kangusoft_usu[0].activo === false) {
      //         console.log('object')
      //       }
      //     },
      //     error (error) {
      //       console.error(error)
      //     } 
      //   })
      // } catch (error) {
      //   console.log('error: ', error)
      // }

    }
  }
}
</script>
