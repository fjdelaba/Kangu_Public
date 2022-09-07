/* eslint-disable */
export default {
  data() {
    return {
      iniciales:''
    }
  },
  props: {
    aprobadores:[],
  },
  mounted() {
    console.log('aprobadores:', this.aprobadores)
    for(let apro of this.aprobadores){
      this.iconoLetras(apro.nombre)
    }
   
  },
  methods: {
    iconoLetras(nombre) {
      console.log("nombres",nombre)
      let inicialNombre = nombre.split(' ')
    let initials = ''
    for (var i = 0; i < inicialNombre.length; i++) {
      if (inicialNombre[i].length > 0 && inicialNombre[i] !== '') {
        initials += inicialNombre[i][0]
      }
    }
    this.iniciales = initials 
    return console.log('iniciales',initials)
      },
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