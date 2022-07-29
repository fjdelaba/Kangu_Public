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
  mounted() {
    this.cargarProps()
  },
  methods: {
    changeDrawerMaterial() {
      this.drawerMaterial = !this.drawerMaterial
    },
    cargarProps() {
      this.cabecera = [
        { text: 'Centro de Gestión', value: 'pro_nombre', idx: 1 },
        { text: 'ID OC', value: 'identificacion', idx: 2 },
        { text: 'Nombre OC', value: 'oc_nombre', idx: 3 },
        { text: 'Proveedor', value: 'razon_social', sortable: true, idx: 4 }
      ],
      this.lista = [
        { pro_nombre: 'Proyecto 1',identificacion:'ADDSDD_1',oc_nombre:'Nombre 1',razon_social:'Empresa 1' },
        { pro_nombre: 'Proyecto 2',identificacion:'ADDSDD_2',oc_nombre:'Nombre 2',razon_social:'Empresa 2' },
        { pro_nombre: 'Proyecto 3',identificacion:'ADDSDD_3',oc_nombre:'Nombre 3',razon_social:'Empresa 3' }
      ]
    }
  }
}