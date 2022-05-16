import ModalAgregarMaterial from '../../modal-agregar-material/ModalAgregarMaterial.vue'

export default {
  components:{
    ModalAgregarMaterial
  },
  data: () => ({
    dialogMaterial: false,
    dialogDeleteMaterial: false,
    headers: [
      {
        text: 'Material',
        align: 'start',
        sortable: false,
        value: 'material',
        width: '400px'
      },
      { text: 'C.C', value: 'partida', sortable: false, width: '200px' },
      { text: 'Cant.', value: 'cantidad', width: '100px', sortable: false, align: 'center' },
      { text: 'P. Unitario', value: 'precio_unitario', width: '100px', sortable: false, align: 'center' },
      { text: 'Subtotal', value: 'subtotal', width: '100px', sortable: false, align: 'center' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    materiales:[]
  }),
  methods: {
    async getMateriales() {
    },
    abrirDialogMaterialMasivo() {

    },
    abrirDialogMaterial() {
      this.dialogMaterial = true
      // setTimeout(() => {
      //   this.dialogMaterial = false
      // }, 6000)
    }
  },
  async mounted() {
   
  }
}