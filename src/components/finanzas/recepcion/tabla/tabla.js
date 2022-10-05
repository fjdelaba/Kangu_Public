import { getFactura } from '../../../../graphql/adquisiciones'
import { getFacturasPorProcesar } from '../../../../graphql/finanzas'
import moment from 'moment'
import { creaPdfFactura } from '../../../../utils/pdf-factura-template'

export default {
  name:'TablaRecepcionDte',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Folio',
        align: 'start',
        sortable: false,
        value: 'folio'
      },
      { text: 'Emision', value: 'fec_emision' },
      { text: 'Proveedor', value: 'emi_nombre' },
      { text: 'Pago', value: 'dte_for_pag' },
      { text: 'Validez', value: 'valido' },
      { text: 'Total', value: 'total' },
      //   { text: 'Estado', value: 'dte_cab_recs' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    desserts: [],
    facturas:[]
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  created () {
    this.initialize()
  },
  mounted() {
    this.cargarFacturas()
  },
  methods: {
    abrirDetalle(item) {
      console.log('object: ', item)
      const path = '/finanzas/recepcionar/detalle'

      this.$router.push({
        path,
        query: { id: Number(item.id) }
      })
    },
    descargarFactura(item) {
      console.log('item.id: ', item.id)
      console.log('datos empresa: ', this.$store.state.app.datosEmpresa)
      creaPdfFactura(item.id, this.$store.state.app.datosEmpresa, 1)
    },
    isValido(item) {
      item.valido = 1

      return 1
    },
    formatoFecha(item) {
      item.valido = true

      return moment(item.fecha).format('DD/MM/YYYY')
    },
    colorChipFecha(fecha) {
      const ahora = this.$moment().format('YYYY-MM-DD[T]HH:mm:ss')
      const creacion = this.$moment(fecha)
      const diff = creacion.diff(ahora, 'days')

      console.log('diff: ', Math.abs(diff))
      const if_diff = Math.abs(diff)

      if (if_diff < 3) {
        return 'green'
      } else if (if_diff < 6) {
        return 'orange'
      } else if (if_diff < 7) {
        return 'red'
      }
      
      return 'brown'
    },
    async cargarFacturas() {
      const { data:{ kangusoft_dte_cab } } = await getFacturasPorProcesar()

      console.log('kangusoft_dte_cab: ', kangusoft_dte_cab)
      this.facturas = [...kangusoft_dte_cab]
    },
    initialize () {
      this.desserts = [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7
        }
      ]
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
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

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  }
}