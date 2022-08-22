/* eslint-disable */
import NombreObsTabla from '../../general/nombre-obs-tabla/NombreObsTabla.vue'

export default {
  name: 'LineasOc',
  props: {
    // cabecera: {
    //   Type: Array,
    //   default: []
    // },
    lineas: {
      Type: Array,
      default: []
    },
    origen: {
      type:Number,
      default: 2 // 1 = Aprobacion, 2 = Consultas
    }
  },
  components: {
    NombreObsTabla
  },
  computed: {
    cpxDinamicHeaders() {
      if(this.origen === 3){
       return [
        { text: 'Material', value: 'nombre', sortable: true, idx: 1 },
        { text: 'Unidad', value: 'mu_nombre', sortable: true, idx: 2 },
        { text: 'Cantidad', value: 'cant_ajustada', sortable: true, idx: 3 },
        { text: 'Recepcionado', value: 'cant_recepcion', sortable: true, idx: 4 },
        { text: 'Por Recepcionar', value: 'cant_por_recepcionar', sortable: true, idx: 5 }
        ]
      }else if(this.origen === 2){
          return [
            { text: 'Material', value: 'nombre', sortable: true, idx: 1 },
            { text: 'Unidad', value: 'mu_nombre', sortable: true, idx: 2 },
            { text: 'Cantidad', value: 'cant_ajustada', sortable: true, idx: 3 },
            { text: 'Precio Unitario', value: 'cant_recepcion', sortable: true, idx: 4 },
            { text: 'Total', value: 'cant_por_recepcionar', sortable: true, idx: 5 }
        ]
      }
     
      return this.cabecera;
    },
  },
  data() {
    return {
      cabecera:[
        { text: 'Material', value: 'nombre', sortable: true, idx: 1 },
        { text: 'Unidad', value: 'mu_nombre', sortable: true, idx: 2 },
        { text: 'Cantidad', value: 'cant_ajustada', sortable: true, idx: 3 },
        { text: 'Precio Unitario', value: 'cant_recepcion', sortable: true, idx: 4 },
        { text: 'Total', value: 'cant_por_recepcionar', sortable: true, idx: 5 }
      ]
    }
  }
  
}