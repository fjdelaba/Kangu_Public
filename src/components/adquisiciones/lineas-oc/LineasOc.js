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
    }
  },
  components: {
    NombreObsTabla
  },
  data() {
    return {
      cabecera:[
        { text: 'Material', value: 'nombre', sortable: true, idx: 1 },
        { text: 'Unidad', value: 'mu_nombre', sortable: true, idx: 2 },
        { text: 'Cantidad', value: 'cant_ajustada', sortable: true, idx: 3 },
        { text: 'Recepcionado', value: 'cant_recepcion', sortable: true, idx: 4 },
        { text: 'Por Recepcionar', value: 'cant_por_recepcionar', sortable: true, idx: 5 }
      ]
    }
  }
}