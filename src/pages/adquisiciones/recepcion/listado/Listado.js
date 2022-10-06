/* eslint-disable */
import TablaListado from "../../../../components/adquisiciones/recepcion//tabla-listado/TablaListado.vue";
import CardSinPermiso from "../../../../components/general/card-sin-permiso/card-sin-permiso.vue"

export default {
    components: {
        TablaListado,
        CardSinPermiso
      },
    mounted() {
    },
    data() {
      return {
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