export default {
  name: 'ModalFiltros',
  data() {
    return {
      //datos
      filtros: {
        estados: [],
        monedas: [],
        despachos: [],
        formasPago: [],
        estadoLineas: [],
        tiposDocumento: []
      }
    }
  },
  props: {
    _aplicarFiltros:{
      type: Function
    },
    _listaEstados:[],
    _listaMonedas:[],
    _listaDespachos:[],
    _listaFormasPago:[],
    _listaEstadoLineas:[],
    _listaTiposDocumento:[],
    _valoresFiltros: {},
    _filtros: {}
  },
  mounted() {
    console.log('this.filtros: ', this._valoresFiltros)
    console.log('this.filtros Miodal: ', this._filtros)
    this.filtros.estados = [...this._filtros.estados]
    this.filtros.monedas = [...this._filtros.monedas]
    this.filtros.despachos = [...this._filtros.despachos]
    this.filtros.formasPago = [...this._filtros.formasPago]
    this.filtros.estadoLineas = [...this._filtros.estadoLineas]
    this.filtros.tiposDocumento = [...this._filtros.tiposDocumento]
  },
  methods: {
    aplicarFiltros() {
      //Aplicar Filtros
      this._aplicarFiltros(this.filtros)
    }
  }
}