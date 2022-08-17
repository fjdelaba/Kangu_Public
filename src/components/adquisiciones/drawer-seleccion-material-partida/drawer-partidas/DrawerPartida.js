export default {
  name: 'DrawerPartida',
  data() {
    return {
      search: null,
      caseSensitive: false,
      open: [1, 2],
      selPartida: null
    }
  },
  props: {
    _origen:{
      Type: Number, // 1 = agregar, 2 = editar
      default: 0
    },
    _edicionPartida:{
      Type: Function
    },
    _seleccionPartida:{
      Type: Function
    },
    _listaPartidas:{
      Type: Array,
      default: () => ([])
    }
  },
  mounted() {
    this.cargarPartidas()
    console.log('Drawe Partida')
  },
  computed: {
    filter () {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined
    },
    seleccionMultiple() {
      return this._origen === 2
    },
    openCacheTree() {
      return this.$refs.reftreeviewpartida.openCache
    },
    cpxListaPartida() {
      return this.listaPartidas
    }
  },
  methods: {
    // async cargarPartidas(pro_fk) {
    //   try {
    //     console.log('adasd')
    //     // const { data } = await this.axios.get('https://mindicador.cl/api')    
    //     const datos = {
    //       pro_fk:1
    //     }

    //     console.log('datos: ', datos)
    //     const { data: { partidas } } = await this.axios.post('https://actions-kangu-hasura.herokuapp.com/getPartidas', datos)   

    //     console.log('resp: ', partidas)
    //     this.listaPartidas = [...partidas]
    //     console.log('this.listaPartidas: ', this.listaPartidas)
    //   } catch (e) {
    //     console.log(e)
    //   } 
    // },
    seleccionPartida(partida) {
      console.log('this.origen: ', this._origen)
      console.log('Partida: ', partida)
      if (this._origen === 1) {
        partida[0].cantidad = 0
        this.selPartida = partida
        this.search = null
        console.log(this.$refs.reftreeviewpartida)
        this.$refs.reftreeviewpartida.updateAll(false)
        this._seleccionPartida(partida)
      }
      if (this._origen === 2) {
        console.log('this.$refs.reftreeviewpartida: ', this.$refs.reftreeviewpartida)
        this._edicionPartida(partida)
      }
    },
    cerrarNodosAbiertos(nodos) {
      console.log('nodos: ', nodos)
    },
    seleccionProrateoPartida(item) {
      console.log('item: ', item)
      item.seleccionado = true
    }
  }
}