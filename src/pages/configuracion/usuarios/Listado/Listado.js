/* eslint-disable */
import { getInstance } from '../../../../auth/auth0-plugin'
import TablaUsuarios from '../../../../components/configuracion/usuario/tabla-usuarios/TablaUsuarios.vue'
import { getUsuariosEmpresa } from '../../../../graphql/configuracion'
import { getAccesoModulo } from '../../../../graphql/general'
export default {
  components: {
    TablaUsuarios
  },
  data() {
    return {
      usuarios: [],
      skeleton: true,
      acceso: false,
      usuario: []
    }
  },
  async created() {
    
  },
  async mounted() {
    setTimeout(() => {
      this.cargarValores()
    }, 2000);

  },
  methods: {
    async cargarValores(){
      this.usuario =  await getInstance()
      console.log('this.usuario_ ', this.usuario.isLoading)
      this.cargarUsuarios()
      this.validarAccesoModulo()  
    },
    async cargarUsuarios() {
      const { data :  { kangusoft_usu } } = await getUsuariosEmpresa()
      this.usuarios = kangusoft_usu
      console.log("usuarios:", this.usuarios)
    },
    async validarAccesoModulo() {
      this.skeleton = true
      try {
        console.log('this.$store.state.app.datosUsuario_ ', this.$store.state.app.datosUsuario.user_id)
        const resp = await getAccesoModulo(this.$store.state.app.datosUsuario.user_id,9)
        console.log('resp acceso Modlo: ', resp.data.kangusoft_usu_mod.length);        
        if( resp.data.kangusoft_usu_mod.length > 0){
          this.acceso = true
        }
      } catch (error) {
        
      }
      this.skeleton = false
    }
  }
}