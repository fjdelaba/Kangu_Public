import TablaAgregarMaterial from './tabla-agregar-material/TablaAgregarMaterial.vue'
import DrawerSeleccionMaterialPartida from '../../drawer-seleccion-material-partida/DrawerSeleccionMaterialPartida.vue'
import CuadroResumen from '../../../general/cuadro-resumen/CuadroResumen.vue'

export default {
  name: 'NewAgregarMaterial',
  components: {
    TablaAgregarMaterial,
    DrawerSeleccionMaterialPartida,
    CuadroResumen
  },
  props:{
    tipo_documento:{
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      drawerMaterial: null,
      lista:[],
      cabecera:[]
    }
  },
  methods: {
    changeDrawerMaterial() {
      this.drawerMaterial = !this.drawerMaterial
    },
    agregarMaterial(item) {
      console.log('item en pagina base: ', item)
      this.lista.push(item)
    }
  }
}