/* eslint-disable */

import NombreMaterial from '../../../../general/nombre-obs-tabla/NombreObsTabla.vue'

export default {
    components: {
      NombreMaterial
      },
    mounted() {
    },
    data() {
      return {
        nombre:'Foco Panel Slim Cuadrado 12w',
        unidad:'Unidad',
        obs:'Luz led porfavor',
        dessertHeaders: [
            { text: '#', value: 'oc' },
            { text: 'Nombre del Material', align: 'start', sortable: false, value: 'id', },
            { text: 'Solicitado', value: 'nombre' },
            { text: 'Recepcionado', value: 'comprador' },
            { text: 'por Recepcionar', value: 'fecha' },
            { text: 'a Recepcionar', value: 'monto' },
            { text: 'Acción', value: 'actions' },

        ],
        listaCelulas:[{
            nombre: 'Guía de Despacho',
            id:2
        }],
        desserts: [
            {
                id: 'Foco Panel Slim Cuadrado 12w, Smd 2835 170*170*12mm, 3000k, 900lm',
                nombre: '66',
                comprador: '33',
                fecha: '33',
                monto: '0',
                oc:'1'
            }
        ],
   
      };
    },
    methods: {}
}