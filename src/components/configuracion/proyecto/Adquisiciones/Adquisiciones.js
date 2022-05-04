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
      items2: [
        '24 HORAS',
        '48 HORAS'
      ],
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Hasta', value: 'fat' },
        { text: 'Tiempo de Aprobación', value: 'carbs' },
        { text: 'Accion', value: 'actions' }
      ],
      headers2: [
        { text: 'Nombre', value: 'name' },
        { text: 'Monto Máximo de Compra', value: 'fat' }
      ],
      desserts: [
      ],
      desserts2: [
      ],
      dialog: false,
      dialogo: false,
      dialogDelete: false,
  
      editedIndex: -1,
      editedItem: {
        name: '',
        n: '',
        fat: '',
        carbs: ''
      },
      aux:'',
      habilitar:false
  
    }
  },
  methods: {
    guardarNuevoItem () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
    guardarNuevoItem2 () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts2.push(this.editedItem)
      }
      this.close()
    },
    close() {
      this.dialog = false
      this.dialogo = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.desserts.splice(this.editedIndex, 1)
   
    }
  }
} 