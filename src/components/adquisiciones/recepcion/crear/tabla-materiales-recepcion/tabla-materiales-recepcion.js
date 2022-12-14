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
        materiales:[],
        editedIndex:'',
        editedItem:'',
        valid: false,
        nameRules: [
          v => v > -1 || 'Ingrese solo numeros positivos',
        ],
        selected: [],
      };
    }, 
    computed: {
    
    },
    methods: {
      deleteItem3(item) {
        this.editedIndex = this.detalle.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.detalle.splice(this.editedIndex, 1)
        console.log("editedIndex",  this.editedIndex);
      },
      row_classes(item) {
        if (item.recepcionar > item.cant_despacho ) {
          return "style-2";
        } 
    },
    
    //   itemRowBackground: function (item) {
    //     return item.recepcionar > item.cant_despacho ? 'style-2' : 'style-1'
    //  },
      validate() {
        this.$refs.positivo.validate()
      },
      pasarCantidad(item){
        console.log('item',item)
        if(item.cant_despacho != undefined || item.cant_despacho != null){
          item.recepcionar =  item.cant_despacho
          
        }else if(item.cant_despacho == undefined || item.cant_despacho == null){
          item.recepcionar =  item.cant_ajustada
           
        }
        
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
          item.saldo = Number(item.cant_ajustada - item.oc_det__view_recepciones_lista.total_recibido)
        }
        console.log('saldo',item.saldo)
        return  Number(item.saldo)
      }else{
        return  Number(item.cant_ajustada)
      }
    }
    }
}