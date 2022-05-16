import { getMateriales,getMonedas } from '../../../../graphql/general.js'
export default {
  data() {
    return {
      select: ['Vuetify', 'Programming'],
      items: [
        'Programming',
        'Design',
        'Vue',
        'Vuetify'
      ],rules:{
     
        material:{
          nombre: [
            (v) => !!v || 'Debes buscar un material'
          ]
        }
      },
      headers: [
        {
          text: 'Codigo',
          align: 'start',
          sortable: false,
          value: 'n'
        },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'Unidad Formato', value: 'formato' },
        { text: 'Valor Unitario', value: 'unitario' },
        { text: 'Valor Total', value: 'total' },
        { text: '% del Presupuesto', value: 'porcentaje' }
      ],
      listaMaterial: [],
      listaMonedas:[],
      isLoading: false,
      mostrarNoData: false,
      search: null,
      cargaMasiva: false,
      material:'',
      desserts: [],
      editedIndex: -1,
      materialSeleccionado: {
        nombre: '',
        cantidad: '',
        formato: '',
        unitario: '',
        total:'',
        porcentaje:''
      }
    }
  },
  mounted() {
    this.cargarMonedas()
  },
  methods: {
    async cargarMonedas() {
      const { data } = await getMonedas()
      
      this.listaMonedas = data.kangusoft_mon
    },
    cargarMateriales() {
      console.log('PASO POR ACÁ !!!!')
      this.mostrarNoData = false
      // cancel pending call
      clearTimeout(this._timerId)
    
      // delay new call 500ms
      this._timerId = setTimeout(() => {
        this.buscarMaterial()
      }, 1000)
      this.isLoading = false
    },
    async buscarMaterial() {
      const { data } = await getMateriales(`%${this.search}%`)

      this.listaMaterial = data.kangusoft_mat

      if (this.listaMaterial.length === 0) {
        this.mostrarNoData = true
      }
      console.log('this.listaMaterial: ', this.listaMaterial)
    },
    limpiarAutocompleate() {
      setTimeout(() => {
        console.log('PASO POR AQUÍ !!!!')
        this.mostrarNoData = false
        this.search = ''        
      }, 500)

    },
    guardarNuevoItem () {
     
      this.materialSeleccionado.nombre = this.material.nombre
      this.materialSeleccionado.formato = this.material.mat_uni.nombre

      this.materialSeleccionado.total = this.materialSeleccionado.unitario * this.materialSeleccionado.cantidad
      this.materialSeleccionado.porcentaje = '%' + this.materialSeleccionado.total / 1000000 * 100
      this.desserts.push(this.materialSeleccionado)
      console.log('mats:',this.materialSeleccionado)
    }
  },
  watch: {
    async search (val) {
      if (this.isLoading) return
      if (this.isLoading) return
      this.isLoading = true
      this.cargarMateriales()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  }
}