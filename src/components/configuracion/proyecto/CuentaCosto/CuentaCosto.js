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
        { text: 'Nombre', value: 'nombre' },
        { text: 'Presupuesto Asignado', value: 'fat' },
        { text: '% del presupuesto total', value: 'carbs' }
      ],
      desserts: [],
     
      editedIndex: -1,
      editedItem: {
        nombre: '',
        n: '',
        fat: ''
      },
      editedItem1: {
        nombre: '',
        n: '',
        fat: ''
      },
      habilitar:false
    }
  },
  methods: {
    guardarNuevoItem () {
      this.editedItem1.name = this.editedItem.name
      this.editedItem1.n = this.editedItem.n
      this.editedItem1.fat = this.editedItem.fat
      this.editedItem1.carbs = '%' + this.editedItem1.fat / 1000000 * 100
      this.desserts.push(this.editedItem1)
     
    }
  }
}