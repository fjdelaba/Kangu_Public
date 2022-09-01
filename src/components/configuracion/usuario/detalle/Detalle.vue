<template>
  <div class="flex-grow-1">
    <div v-if="skeleton">
      <v-skeleton-loader
        type="card-avatar, article, actions"
      ></v-skeleton-loader>
    </div>
    <div v-if="!skeleton" class="d-flex align-center">
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
    <datos v-if="!skeleton" ref="tabs-account" :user="usuario" :origen="origen"></datos>
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
    usu_per {
      nombre
      id
    }
      usu_mods {
      mod_fk
      id
      activo
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
      skeleton:true,
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
  watch: {
    '$auth.isLoading' (newCount, oldCount) {
      console.log(`Listado - We have ${newCount} fruits now, yay!. ${oldCount}`)
      // eslint-disable-next-line eqeqeq
      if (newCount == false) {
        this.cargarDatosUsuario()
      }
    }
  },
  mounted() {
    // eslint-disable-next-line eqeqeq
    if (this.$auth.isLoading == false) {
      this.cargarDatosUsuario()
    }
  },
  methods: {
    async cargarDatosUsuario() {  
      // console.log('usu_id: ', usu_id)
      this.usu_id = this.cpxOrigenConfiguracion ? this.$route.query.id : this.$store.state.app.datosUsuario.user_id 
      const { data }  = await this.$apollo.query({
        query: QUERY_USER,
        variables:{
          'id_usuario': this.usu_id
        },
        fetchPolicy:'network-only'
      })
      
      this.usuario = data.kangusoft_usu[0]
      this.skeleton = false
      // console.log('data data: ', data.kangusoft_usu[0])
    }
  }
}
</script>
