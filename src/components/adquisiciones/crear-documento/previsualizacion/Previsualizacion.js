export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Dessert (100g serving)',
          value: 'name',
          sortable: false
        },
        {
          text: 'Calories',
          value: 'calories',
          sortable: false
        },
        { text: 'Actions', value: 'actions', sortable: false , width: '100px' }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: '',
        calories: 0
      },
      defaultItem: {
        id: 0,
        name: 'New Item',
        calories: 0
      }
    }},
  created () {
    this.initialize()
  },
    
  methods: {
    initialize () {
      this.desserts = [
        {
          id: 1,
          name: 'Frozen Yogurt',
          calories: 120
        },
        {
          id: 2,
          name: 'Ice cream sandwich',
          calories: 200
        },
        {
          id: 3,
          name: 'Eclair',
          calories: 128
        },
        {
          id: 4,
          name: 'Cupcake',
          calories: 140
        },
        {
          id: 5,
          name: 'Gingerbread',
          calories: 159
        },
        {
          id: 6,
          name: 'Jelly bean',
          calories: 110
        },
        {
          id: 7,
          name: 'Lollipop',
          calories: 132
        },
        {
          id: 8,
          name: 'Honeycomb',
          calories: 45
              
        }
      ]
    },
    
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
    },
    
    deleteItem (item) {
      const index = this.desserts.indexOf(item)

      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    },
    
    close () {
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    addNew() {
      const addObj = Object.assign({}, this.defaultItem)

      addObj.id = this.desserts.length + 1
      this.desserts.unshift(addObj)
      this.editItem(addObj)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      }
      this.close()
    }
  }
}