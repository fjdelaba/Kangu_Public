import CuentaCosto from '../../../../components/configuracion/proyecto/CuentaCosto/CuentaCosto.vue'
import Adquisiciones from '../../../../components/configuracion/proyecto/Adquisiciones/Adquisiciones.vue'
import MaterialControl from '../../../../components/configuracion/proyecto/MaterialControl/MaterialControl.vue'
import InformacionGeneral from '../../../../components/configuracion/proyecto/InformacionGeneral/InformacionGeneral.vue'
export default {
  data() {
    return {
      idPro:'',
      grabado:false
    }
  },
  components: {
    InformacionGeneral,
    Adquisiciones,
    MaterialControl,
    CuentaCosto
  },
  methods:{
    dada() {
      console.log('aaaaaa',this.$refs.infoGeneral.idProyecto)
      this.idPro = this.$refs.infoGeneral.idProyecto
      this.grabado = this.$refs.infoGeneral.grabado
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.dada()
    // }, 5000)
  }

}