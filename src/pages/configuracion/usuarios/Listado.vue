<template>
  <div>
    <div style="width: 300px">
{{ usuarios }}
    </div>
    
    <h2>
      Listado Usuario
    </h2>
    <tabla-usuarios :usuarios="usuarios"></tabla-usuarios>
  </div>
</template>

<script>
import TablaUsuarios from '../../../components/configuracion/usuario/tabla-usuarios/TablaUsuarios.vue'
import gql from 'graphql-tag'

const GET_USUARIOS = gql`
  query query_usuarios {
    kangusoft_usu {
      apellidos
      activo
      avatar
      cargo
      email
      imagen
      nombre
      rut
      fec_creacion
    }
  }
`

export default {
  components: {
    TablaUsuarios
  },
  data() {
    return {
      usuarios: []
    }
  },
  mounted() {
    this.cargarUsuarios()
  },
  methods: {
    async cargarUsuarios() {
      const { data }  = await this.$apollo.query({
        query: GET_USUARIOS
      })
    
      console.log('data data: ', data.kangusoft_usu)

      //   this.listaProyectos = data.kangusoft_func_proyectosbyuser
      this.usuarios = data.kangusoft_usu
    }
  }
}
</script>

<style>

</style>