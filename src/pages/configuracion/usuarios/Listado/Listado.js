/* eslint-disable */
import TablaUsuarios from '../../../../components/configuracion/usuario/tabla-usuarios/TablaUsuarios.vue'
import { getUsuariosEmpresa } from '../../../../graphql/configuracion'
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
      const { data :  { kangusoft_usu } } = await getUsuariosEmpresa()
      this.usuarios = kangusoft_usu
      console.log("usuarios:", this.usuarios)
    }
  }
}