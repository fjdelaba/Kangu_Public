/* eslint-disable */

import NombreMaterial from '../../../../general/nombre-obs-tabla/NombreObsTabla.vue'

export default {
    components: {
      NombreMaterial
      },
    mounted() {

      this.materiales = this.detalle
      console.log('materiales',this.materiales)
    },
    props:{
      detalle:{
        type: Array
      }
    },
    data() {
      return {
        dessertHeaders: [
            { text: 'Nombre del Material', value: 'mat',width: '10px' },
            { text: 'Solicitado', value: 'cant_ajustada',},
            { text: 'Recepcionado', value: 'cant_recepcion',  },
            { text: 'por Recepcionar', value: 'cant_despacho', },
            { text: 'a Recepcionar', value: 'recepcionar', },
            { text: 'Acción', value: 'actions',width: '10px' },

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
        openModal:false,
        materiales:[]
      };
    },
    methods: {
      deleteItem3(item) {
        this.detalle.splice(item, 1);
        console.log("item", item);
      },
      pasarCantidad(item){
        console.log('item',item)
        item.recepcionar = item.cantidad
      },
      modalAviso(item){
        if(item.recepcionar > item.cant_recepcion){
          this.openModal = true
        }
      },
      calcularSaldo(item){
        if(item.oc_det__view_recepciones_lista != null){
        if(item.oc_det__view_recepciones_lista.total_recibido > item.cant_ajustada ){
         item.saldo = 0
        }else if(item.oc_det__view_recepciones_lista.total_recibido <= item.cant_ajustada ){
          item.saldo = item.cant_ajustada - item.oc_det__view_recepciones_lista.total_recibido
        }
        console.log('saldo',item.saldo)
        return item.saldo
      }else{
        return item.cant_ajustada
      }
    }
    }
}