<template>
  <div class="flex-grow-1">
    <div class="d-flex align-center">
      <div>
        <!-- <div class="display-1">Edit User {{ `${ usuario && usuario.nombre}  ${ usuario && usuario.apellidos}` }}</div> {{ user.name && `- ${user.name}` }} -->
        <v-breadcrumbs v-if="cpxOrigenConfiguracion" :items="breadcrumbs" class="pa-0"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <!-- <v-btn icon @click>
        <v-icon>mdi-refresh</v-icon>
      </v-btn> -->
    </div>
    <!-- disable  v-card -->
    <datos ref="tabs-account" :user="usuario" :origen="origen"></datos>
  </div>
</template>

<script>
// import CopyLabel from '../../components/common/CopyLabel'
import CopyLabel from '../../../common/CopyLabel.vue'
import Datos from './datos/Datos.vue'
import gql from 'graphql-tag'

const QUERY_USER = gql`
query MyQuery($id_usuario: bigint!) {
  kangusoft_usu(where: {id: {_eq: $id_usuario}}) {
    apellidos
    activo
    avatar
    cargo
    email
    firma
    id
    nombre
    rut
      usu_mods {
      mod_fk
      id
    }
    # cgs(where: {estado_fk: {_eq: 1}}) {
    #   nombre
    #   id,
    #   descripcion,
    #   imagen
    # }
  }
}

`

export default {
  name: 'DetalleUsuario',
  components: {
    Datos
  },
  props:{
    origen: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      user: {
        'id':32,
        'rut':123456789,
        'email':'bfitchew0@ezinearticles.com',
        'name':'Bartel ',
        'lastname':' Fitchew',
        'verified':false,
        'created':'2019-08-09T03:14:12Z',
        'lastSignIn':'2019-08-14T20:00:53Z',
        'disabled':true,
        'role':'ADMIN',
        'avatar':'/images/avatars/avatar1.svg'
      },
      usu_id: {},
      usuario: {},
      tab: null,
      breadcrumbs: [
        {
          text: 'Usuarios',
          to: '/configuracion/usuarios',
          exact: true
        },
        {
          text: 'Detalle de Usuario'
        }
      ]
    }
  },
  computed:{
    cpxOrigenConfiguracion() {
      return this.origen === 1 // origen es configuracion ?
    }
  },
  mounted() {
    // if (this.origen === 'miperfil') {
    //   this.usu_id = this.$store.state.app.datosUsuario.user_id
    // } else {
    //   this.usu_id = this.$store.state.app.datosUsuario.user_id
    // }
    console.log('this.origen: ', this.origen)
    this.usu_id = this.cpxOrigenConfiguracion ? this.$route.query.id : this.$store.state.app.datosUsuario.user_id 
    this.cargarDatosUsuario(this.usu_id)
    // console.log('MOUNTED DETALLE USUARIO: ', this.$store.state.app.datosUsuario.user_id)
    // console.log('router: ', this.$route.query.id)

  },
  methods: {
    async cargarDatosUsuario(usu_id) {  
      console.log('usu_id: ', usu_id)
      const { data }  = await this.$apollo.query({
        query: QUERY_USER,
        variables:{
          'id_usuario': usu_id
        }
      })

      this.usuario = data.kangusoft_usu[0]
      console.log('data data: ', data.kangusoft_usu[0])
    }
  }
}
</script>
