export default {
  name: 'TablaAgregarMaterial',
  props:{
    _lista: {
      Type: Array,
      default: () => [] 
    }
  },
  data() {
    return {
      cabecera:[]
    }
  },
  created() {
  },
  mounted() {
    // this.cargarProps()
    this.cabecera =  [
      {
        text: 'Material',
        align: 'start',
        sortable: false,
        value: 'mat',
        width: '400px'
      },
      { text: 'C.C', value: 'oc_det_pars', sortable: false, width: '200px' },
      { text: 'Cant.', value: 'cantidad', width: '100px', sortable: false, align: 'center' },
      { text: 'P. Unitario', value: 'precio_unitario', width: '100px', sortable: false, align: 'center' },
      { text: 'Subtotal', value: 'total', width: '100px', sortable: false, align: 'center' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ]
  },
  methods: {
  }
}