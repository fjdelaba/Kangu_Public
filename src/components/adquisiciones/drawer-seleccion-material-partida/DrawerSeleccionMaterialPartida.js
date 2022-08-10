import { v4 as uuidv4 } from 'uuid'
import DrawerPartida from './drawer-partidas/DrawerPartida.vue'
import { getMateriales } from '../../../graphql/adquisiciones'

export default {
  name: 'DrawerSeleccionMaterialPartida',
  props: {
    _agregarMaterial: { type: Function }
  },
  components: {
    DrawerPartida
  },
  data() {
    return {
      busquedaMaterial: null,
      listaMateriales: [],
      open: [1, 2],
      panel:[0],
      partida:{},
      disabledPanelMaterial: true,
      textoPanelPartida:''
    }
  },
  computed: {
    cpxRefDrawerPartida() {
      return this.$refs.refdrawerpartida.selPartida
    },
    cpxSelPartida() {
      return this.$refs.refdrawerpartida.selPartida.length
      // return this.$refs.refdrawerpartida && this.$refs.refdrawerpartida.selPartida
    },
    cpxTextoPanelPartida() {
      return this.disabledPanelMaterial ? 'Seleccion de Partida' : `Partida Seleccionada: ${this.$refs.refdrawerpartida.selPartida[0].name}`
    }
  },
  methods: {

    seleccionPartidaDrawer(param) {
      console.log('param: ', param)
      this.disabledPanelMaterial = false
      this.panel = [1]
      
      // this.$refs['textFieldMaterial'].$refs.textarea.focus()
      console.log('this.$refs.refdrawerpartida.selPartida: ', this.$refs.refdrawerpartida.selPartida)
      console.log('this.$refs: ', this.$refs.textFieldMaterial)
    },
    async buscarMaterial() {
      if (this.busquedaMaterial !== null && this.busquedaMaterial.length > 2 ) {    
        const datos = { emp_fk: 1, material:this.busquedaMaterial }
        const { data:{ getMateriales:{ materiales } } } = await getMateriales(datos)

        console.log('materiales: ', materiales)
        this.listaMateriales = [...materiales]
      }
    },
    limpiarMaterial() {
      this.listaMateriales = []
    },
    limpiarPartida() {
      this.listaPartidas = []
    },
    agregarMaterial(item) {
      console.log('item: ', item)
      console.log('this.$refs: ', this.$refs.refdrawerpartida.selPartida)

      // eslint-disable-next-line prefer-destructuring
      const par = this.$refs.refdrawerpartida.selPartida
      const obj = {
        mat_fk: Number(item.id),
        cantidad: 0,
        precio_unitario: 0,
        total: 0,
        observacion: '',
        mat_nombre: item.name,
        mat_unidad: item.mu_nombre,
        // par_fk: par.id,
        // par_nombre: par.name,
        edicion: true,
        partidas: par,
        uid:uuidv4()
      }

      this._agregarMaterial(obj)
    }
  }
}