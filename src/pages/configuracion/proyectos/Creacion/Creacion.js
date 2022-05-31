/* eslint-disable */
import CuentaCosto from '../../../../components/configuracion/proyecto/CuentaCosto/CuentaCosto.vue'
import Adquisiciones from '../../../../components/configuracion/proyecto/Adquisiciones/Adquisiciones.vue'
import MaterialControl from '../../../../components/configuracion/proyecto/MaterialControl/MaterialControl.vue'
import InformacionGeneral from '../../../../components/configuracion/proyecto/InformacionGeneral/InformacionGeneral.vue'
export default {
  data() {
    return {
      idPro:'',
      grabado:false,
      active:0,
      presupuesto:0
    }
  },
  components: {
    InformacionGeneral,
    Adquisiciones,
    MaterialControl,
    CuentaCosto
  },
  methods:{
    cambioStep1() {
      console.log('aaaaaa',this.$refs.infoGeneral.infoGeneralProyecto.presupuestoObra)
      this.idPro = this.$refs.infoGeneral.idProyectoCreado
      this.grabado = this.$refs.infoGeneral.grabado
      this.active = this.$refs.infoGeneral.active
      this.presupuesto = this.$refs.infoGeneral.infoGeneralProyecto.presupuestoObra
    },
    cambioStep2() {
      this.active = this.$refs.adquisiciones.active
    }
  },
  mounted() {
  
      this.dada()

  }

}