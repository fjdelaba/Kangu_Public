import { getMateriales } from '../../../graphql/adquisiciones'

export default {
  name: 'DrawerSeleccionMaterialPartida',
  props: {
    _agregarMaterial: { type: Function }
  },
  data() {
    return {
      busquedaMaterial: null,
      listaMateriales: [],
      open: [1, 2]
    }
  },
  methods: {
    async buscarMaterial() {
      if (this.busquedaMaterial !== null && this.busquedaMaterial.length > 2 ) {    
        const datos = { emp_fk: 1, material:this.busquedaMaterial }
        const { data:{ getMateriales:{ materiales } } } = await getMateriales(datos)

        this.listaMateriales = [...materiales]
      }
    },
    limpiar() {
      this.listaMateriales = []
    },
    agregarMaterial(item) {
      console.log('item: ', item)
      this._agregarMaterial(item)
    }
  }
}