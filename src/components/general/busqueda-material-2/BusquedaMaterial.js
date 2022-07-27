import { getMateriales } from '../../../graphql/adquisiciones'

export default {
  name:'BusquedaMaterial',
  props: {
    
  },
  data() {
    return {
      items: [],
      open: [1, 2],
      search: null,
      seleccion: []
      // caseSensitive: false
    }
  },
  computed: {
    filter () {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined
    }
  },
  mounted() {
   
  },
  methods: {
    agregarMaterial(item) {
      console.log('item: ', item)
      this.seleccion.push(item)
    },
    eliminar(item) {
      console.log('item: ', item)
      for (const sel in this.seleccion) {
        console.log('item.id, sel.id: ', item.id, this.seleccion[sel].id)
        // eslint-disable-next-line eqeqeq
        if (item.id == this.seleccion[sel].id) {
          console.log('iguales: ', sel)
          this.seleccion.splice(sel, 1)
        }
      }
    },
    async buscarMaterial() {
      if (this.search !== null && this.search.length > 2 ) {    
        const datos = { emp_fk: 1, material:this.search }
        const { data:{ getMateriales:{ materiales } } } = await getMateriales(datos)

        this.items = [...materiales]
      }
    },
    limpiar() {
      this.items = []
    }
  }
}
