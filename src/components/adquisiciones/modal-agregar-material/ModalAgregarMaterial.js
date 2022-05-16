import { getPartidasPorPoroyecto,getMateriales } from '../../../graphql/general'
export default {
  name: 'ModalAgregarMaterial',
  data() {
    return {
      material:{
        nombre: '',
        partida: '',
        cantidad: '',
        unitario: '',
        subtotal: '',
        observacion: ''
      },
      rules:{
        material:{
          nombre: [
            (v) => !!v || 'Debes buscar un material'
          ],
          partida: [
            (v) => !!v || 'Selecciona una partida'
          ],
          cantidad: [
            (v) => !!v || 'Ingresa la cantidad del material'
          ],
          unitario: [
            (v) => !!v || 'Ingresa el precio unitario'
          ]
        }
      },
      listaPartidas: [],
      listaMaterial: [],
      isLoading: false,
      mostrarNoData: false,
      search: null,
      cargaMasiva: false,

      //Tabla
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'ID', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        protein: 0
      },
      defaultItem: {
        name: '',
        protein: 0
      }
    }
  },
  mounted() {
    this.getPartidas()
  },
  methods: {
    agregarMaterial() {

    },
    cerrar() {

    },
    async getPartidas() {
      const  { data }   = await getPartidasPorPoroyecto(1)

      this.listaPartidas = data.getPartidas
      for (const partida of this.listaPartidas) {
        if (partida.path.indexOf('/') > 0) {
          const pathArray = partida.path.split('/')

          pathArray.shift()
          pathArray.reverse()
          partida.path = pathArray
        } else {
          delete partida.path
        }
      }

    },
    mostrarDialog() {

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
    },
    async buscarMaterial() {
      const { data } = await getMateriales(`%${this.search}%`)

      this.isLoading = false
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

    ////////////////////////////////
    initialize () {
      this.desserts = [
        {
          name: 'Frozen Yogurt',
          protein: 4.0
        },
        {
          name: 'Ice cream sandwich',
          protein: 4.3
        }
      ]
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    }
  },
  computed: {
    cpxTitulo() {
      return this.cargaMasiva ? 'Cagar Material' : 'Seleccion multiple de material'
    },
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
  },
  created () {
    this.initialize()
  }
}