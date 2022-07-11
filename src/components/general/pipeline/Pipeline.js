export default {
  name: 'Pipeline',
  data() {
    return {
      
    }
  },
  props: {
    aprobadores:[],
    origen:{
      Type: Number,
      default: 1
    }
  },
  methods: {
    getAprobadorAprobado(item) {
      console.log('item: ', item)
      console.log('1: ', item.aprobado === true)

      return item.aprobado === true
    },
    getAprobadorRechazadoEsperando(item) {
      // console.log('2: ', item.aprobado === false)
      console.log('item: ',item)
      // return item.aprobado === false
      
      return item.aprobado === false || item.aprobado === null 
    },
    getIconoRechazadoEsperando(item) {
      if (item.aprobado === undefined || item.aprobado === null) {
        return 'pause'
      } else if (item.aprobado === false) {
        return 'close'
      } else {
        return 'help-outline'
      }
    }
    // getAprobadorEsperando(item) {
    //   console.log('item: ', item)
    //   console.log('3: ', item.aprobado === null || item.aprobado === undefined)
      
    //   return item.aprobado === null || item.aprobado === undefined
    // }
  }
}