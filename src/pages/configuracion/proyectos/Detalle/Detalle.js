/* eslint-disable */
import CuentaCosto from '../../../../components/configuracion/proyecto/CuentaCosto/CuentaCosto.vue'
import Adquisiciones from '../../../../components/configuracion/proyecto/Adquisiciones/Adquisiciones.vue'
import MaterialControl from '../../../../components/configuracion/proyecto/MaterialControl/MaterialControl.vue'
import InformacionGeneral from '../../../../components/configuracion/proyecto/InformacionGeneral/InformacionGeneral.vue'
export default {
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Listado',
          to: '/configuracion/proyectos',
          exact: true
        },
        {
          text: 'Detalle de Proyecto'
        }
      ],
      idProyecto:"",
      detalle:""
    }
  },
  components: {
    InformacionGeneral,
    Adquisiciones,
    MaterialControl,
    CuentaCosto
  },
  methods:{

},
props:{
    detalle: Boolean,
    presupuesto: Number
},
  mounted() {
    this.idProyecto = this.$route.query.id
      if( this.idProyecto != ""){
        this.detalle = true
      }
      
  }

}