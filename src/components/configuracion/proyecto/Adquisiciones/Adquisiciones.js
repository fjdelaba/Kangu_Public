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
        { text: 'Nombre', value: 'name' },
        { text: 'Hasta', value: 'fat' },
        { text: 'Tiempo de Aprobación', value: 'carbs' }
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
    }
  }
} 