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
          text: '',
          to: '/configuracion/proyectos',
          exact: true
        },
        {
          text: 'Detalle de Proyecto'
        }
      ]
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
    idproyecto: Number,
    presupuesto: Number
},
  mounted() {
        console.log('detalle', this.detalle)
        console.log('idproyectoSeleccionado:',this.idproyecto)
        console.log('detalle', this.presupuesto)
  }

}