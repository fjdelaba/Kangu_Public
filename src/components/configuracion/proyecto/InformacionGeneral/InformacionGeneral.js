export default {
  data() {
    return {
      select: ['Vuetify', 'Programming'],
      items: [
        'Programming',
        'Design',
        'Vue',
        'Vuetify'
      ],
      headers: [
        {
          text: 'Codigo',
          align: 'start',
          sortable: false,
          value: 'n'
        },
        { text: 'Nombre', value: 'name' },
        { text: 'Cantidad', value: 'fat' },
        { text: 'Unidad Formato', value: 'u' },
        { text: 'Valor Unitario', value: 'f' },
        { text: 'Valor Total', value: 't' },
        { text: '% del Presupuesto', value: 'carbs' }
      ],
      desserts: [
        {
          name: 'Casco Rojo',
          n: 4132,
          fat: '145',
          carbs: '55%',
          u:'UNIDAD',
          f:'$890',
          t:'$19202'
        }],
      editedIndex: -1,
      usuario: {
        firma:''
      }
    }
  },
  methods: {
    previewFirma() {
      this.url2 = URL.createObjectURL(this.usuario.firma)
    },
    eliminarFirma() {
      this.url2 = null 
    }
  }
}