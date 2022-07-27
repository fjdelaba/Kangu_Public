import { getMateriales } from '../../../graphql/adquisiciones'

export default {
  name:'BusquedaMaterial',
  props: {
    respaldarSeleccion:{ type: Function }
  },
  data() {
    return {
      selectionType: 'leaf',
      selection: [],
      items: [],
      //   items: [
      //     {
      //       id: 1,
      //       name: 'Root',
      //       children: [
      //         { id: 2, name: 'Child #1' },
      //         { id: 3, name: 'Child #2' },
      //         {
      //           id: 4,
      //           name: 'Child #3',
      //           children: [
      //             { id: 5, name: 'Grandchild #1' },
      //             { id: 6, name: 'Grandchild #2' }
      //           ]
      //         }
      //       ]
      //     }
      //   ],
      open: [1, 2],
      search: null,
      caseSensitive: false,
      respSelection: [],
      respaldar:0
    }
  },
  computed: {
    filter () {
      if (this.search && this.search.length > 4) {
        return this.caseSensitive
          ? (item, search, textKey) => item[textKey].indexOf(search) > -1
          : undefined
      }

      return null
    }
  },
  mounted() {
    console.log('mounted Busqueda material')
    // this.buscarMaterial()
  },
  methods: {
    async buscarMaterial() {

      // this.respaldarSeleccion(this.respSelection)
      //   const datos = { emp_fk: 1, material:'' }
      //   const { data:{ getMateriales:{ materiales } } } = await getMateriales(datos)
      
      //   this.items = [...materiales]

      if (this.search.length > 2 ) {    
        this.respSelection = [...this.selection]
        console.log('this.respSelection: ', this.respSelection)
        // this.respaldarSeleccion(this.respSelection)
        const datos = { emp_fk: 1, material:this.search }
        const { data:{ getMateriales:{ materiales } } } = await getMateriales(datos)

        this.items = [...materiales]
        this.respaldar = 0
        // console.log('materiales: ', materiales)
        // console.log('parent: ', this.$parent.$parent.$ref)
        // console.log('root: ', this.$root)
        // console.log('ref: ', this.$refs)

        setTimeout(() => {

          this.selection.push(...this.respSelection)
        }, 5000)
        
        // for (const i of this.respSelection) {
        //   console.log('i: ', i)
        //   this.selection.push(i)
        // }
      }
      // this.respSelection.length > 0 ? this.selection = [...this.respSelection] : this.selection = []
      
    },
    inputTreeview() {
      if (this.respaldar === 0) {
        this.respaldar = this.respaldar  + 1
        console.log('igualar')
        this.selection.push(...this.respSelection)
      }
      //   this.respSelection.push(...this.selection)
      console.log('input')
    //   
    },
    updateActive() {
      console.log('update Active')
    },
    updateOpen() {
      console.log('update Open')
    }
  }
}
