/* eslint-disable */
import TablaConsulta from "../../../../components/adquisiciones/consultas/TablaConsulta.vue";
import CardSinPermiso from "../../../../components/general/card-sin-permiso/card-sin-permiso.vue"
export default {
    components: {
        TablaConsulta,
        CardSinPermiso
      },
    mounted() {
    },
    data() {
      return {
        consulta: true,
          skeleton:true
      };
    },
    methods: {},
    computed:{
      cpxSkeleton(){
        if(this.$store.state.app.permisosUsuario.recepcion){
          this.skeleton = false
        }
        return this.skeleton
      }
    }
}