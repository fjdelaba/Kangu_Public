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
  data() {
    return {
      cabecera:[
        { text: 'Material', value: 'nombre', sortable: true, idx: 1 },
        { text: 'Cantidad', value: 'cant_ajustada', sortable: true, idx: 2 },
        { text: 'Recepcionado', value: 'cant_recepcion', sortable: true, idx: 3 },
        { text: 'Por Recepcionar', value: 'cant_por_recepcionar', sortable: true, idx: 4 }
      ]
    }
  }
}