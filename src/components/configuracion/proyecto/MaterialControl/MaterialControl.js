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
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        n: '',
        fat: '',
        carbs: '',
        u:'',
        f:'',
        t:''
      },
      editedItem1: {
        name: '',
        n: '',
        fat: '',
        carbs: '',
        u:'',
        f:'',
        t:''
      }
    }
  },
  methods: {
    guardarNuevoItem () {
      this.editedItem1.name = this.editedItem.name
      this.editedItem1.fat = this.editedItem.fat
      this.editedItem1.f = this.editedItem.f
      this.editedItem1.t = this.editedItem.fat * this.editedItem.f
      this.editedItem1.carbs = '%' + this.editedItem1.t / 1000000 * 100
      this.desserts.push(this.editedItem1)
     
    }
  }
}