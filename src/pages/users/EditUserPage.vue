<template>
  <div class="flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        {{ usuario }}
        <div class="display-1">Edit User {{ `${ usuario && usuario.nombre}  ${ usuario && usuario.apellidos}` }}</div> <!-- {{ user.name && `- ${user.name}` }} -->
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon @click>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>
    <!-- disable  v-card -->
    <v-card v-if="false">
  
      <div 
        v-if="user.role === 'ADMIN'"
        class="d-flex align-center font-weight-bold primary--text my-2"
      >
        <v-icon small color="primary">mdi-security</v-icon>
        <span class="ma-1">Administrador</span>
      </div>

      <div class="mb-4">
        <div class="d-flex">
          <span class="font-weight-bold">Email</span>
          <span class="mx-1">
            <copy-label :text="user.email" />
          </span>
        </div>

        <div class="d-flex">
          <span class="font-weight-bold">ID</span>
          <span class="mx-1">
            <copy-label :text="user.id + ''" />
          </span>
        </div>
      </div>
    </v-card>

    <v-tabs v-model="tab" :show-arrows="false" background-color="transparent">
      <v-tab to="#tabs-account">Account</v-tab>
      <v-tab v-if="false" to="#tabs-information">Information</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="tabs-account">
        <account-tab ref="tabs-account" :user="usuario"></account-tab>
      </v-tab-item>

      <v-tab-item value="tabs-information">
        <information-tab ref="tabs-information" :user="user"></information-tab>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import CopyLabel from '../../components/common/CopyLabel'
import AccountTab from './EditUser/AccountTab'
import InformationTab from './EditUser/InformationTab'
import gql from 'graphql-tag'

const QUERY_USER = gql`
query MyQuery($id_usuario: bigint!) {
  kangusoft_usu(where: {id: {_eq: $id_usuario}}) {
    apellidos
    activo
    avatar
    cargo
    email
    imagen
    nombre
    rut
    cgs(where: {estado_fk: {_eq: 1}}) {
      nombre
      id,
      descripcion,
      imagen
    }
  }
}

`

export default {
  components: {
    CopyLabel,
    AccountTab,
    InformationTab
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
          text: 'Users',
          to: '/users/list',
          exact: true
        },
        {
          text: 'Edit User'
        }
      ]
    }
  },
  mounted() {
    // this.usu_id = this.$auth.user['https://kangusoft.cl/jwt/hasura'] && this.$auth.user['https://kangusoft.cl/jwt/hasura'].user_id
    this.usu_id = this.$store.state.app.datosUsuario.user_id
    this.cargarDatosUsuario(this.usu_id)
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
