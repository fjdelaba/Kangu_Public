/* eslint-disable */
import CuentaCosto from '../../../../components/configuracion/proyecto/CuentaCosto/CuentaCosto.vue'
import Adquisiciones from '../../../../components/configuracion/proyecto/Adquisiciones/Adquisiciones.vue'
import MaterialControl from '../../../../components/configuracion/proyecto/MaterialControl/MaterialControl.vue'
import InformacionGeneral from '../../../../components/configuracion/proyecto/InformacionGeneral/InformacionGeneral.vue'
export default {
  data() {
    return {
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
    idproyecto: Number
},
  mounted() {
    setTimeout(() => {
        console.log('detalle', this.detalle)
        console.log('idproyectoSeleccionado:',this.idproyecto)
      }, 5000);

  }

}