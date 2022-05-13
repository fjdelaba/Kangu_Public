// import { VCascader } from '@tookit/vma'
import gql from 'graphql-tag'
import { getPrueba } from '../../../../graphql/adquisiciones'

const GET_PARTIDAS = gql`
mutation MUT_GET_PARTIDAS($pro_fk: bigint!) {
  getPartidas(pro_fk: $pro_fk) {
    nombre
    id
    path
  }
}
`

export default {
  components:{
    // VCascader
  },
  data: () => ({
    val: '',
    val1: '',
    items: [
      'Programming',
      'Design',
      'Vue',
      'Vuetify'
    ],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Material',
        align: 'start',
        sortable: false,
        value: 'name',
        width: '400px'
      },
      { text: 'C.C', value: 'calories', sortable: false, width: '200px' },
      { text: 'Cant.', value: 'fat', width: '100px', sortable: false, align: 'center' },
      { text: 'P. Unitario', value: 'carbs', width: '100px', sortable: false, align: 'center' },
      { text: 'Subtotal', value: 'protein', width: '100px', sortable: false, align: 'center' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    listaPartidas: []
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Agregar Material' : 'Editar Material'
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

  methods: {
    initialize () {
      this.desserts = [
        // {
        //   name: 'Frozen Yogurt',
        //   calories: 159,
        //   fat: 6.0,
        //   carbs: 24,
        //   protein: 4.0,
        //   observacion: 'adadads'
        // }
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
    },
    async getPartidas() {

      console.log('getPartidas')

      const { data }  = await this.$apollo.mutate({
        mutation: GET_PARTIDAS,
        variables:{
          'pro_fk': 1
        },
        update: (data) => {console.log('update data getPartidas: ',data)} 
      })

      this.listaPartidas = data.getPartidas
      console.log('data getPartidas: ', data.getPartidas)
      for (const partida of this.listaPartidas) {
        console.log('partida.path: ', partida.path)
        if (partida.path.indexOf('/') > 0) {
          const pathArray = partida.path.split('/')

          console.log('pathArray: ', pathArray)
          pathArray.shift()
          pathArray.reverse()
          console.log('pathArray: ', pathArray)
          partida.path = pathArray
        } else {
          delete partida.path
        }
      }

    },
    async getMateriales() {
      // console.log('Cargando Datos getMateriales')
      // const { data }  = await this.$apollo.query({
      //   query: GET_OTRO
      // })

      // console.log('DATA', data)
      //this.ocs = data.kangusoft_oc
    }
  },
  async mounted() {
    //this.getPartidas()
    //this.getMateriales()
    //getPrueba()
    //this.val = await getMateriales()
    // this.val1 = await getOtros()
  }
}