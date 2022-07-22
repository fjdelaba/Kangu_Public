/* eslint-disable */


export default {
    components: {
       
      },
    mounted() {
    },
    data() {
      return {
        lol:'',
        a:'',
        dessertHeaders: [
            { text: '#', value: 'oc' },
            { text: 'Nombre del Material', align: 'start', sortable: false, value: 'id', },
            { text: 'Formato', value: 'nombre' },
            { text: 'Cantidad Recepcionada', value: 'comprador' },
            { text: 'Cantidad por Recepcionar', value: 'fecha' },
            { text: 'Cantidad a Recepcionar', value: 'monto' },
            { text: 'Acción', value: 'actions' },

        ],
        listaCelulas:[{
            nombre: 'Guía de Despacho',
            id:2
        }],
        desserts: [
            {
                id: 'Foco Panel Slim Cuadrado 12w, Smd 2835 170*170*12mm, 3000k, 900lm',
                nombre: 'Unidad',
                comprador: '33',
                fecha: '33',
                monto: '0',
                oc:'1'
            }
        ],
        dialogDelete:false
      };
    },
    methods: {}
}