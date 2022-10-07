/* eslint-disable */
import TablaMaterialRecepcion from '../crear/tabla-materiales-recepcion/tabla-materiales-recepcion.vue'
import ModalFinalizar from './modal-finalizar/modal-finalziar.vue';
import CabeceraRecepcion from './cabecera-recepcion/cabecera-recepcion.vue';
import { getDetalleOC, insertRecOc } from '../../../../graphql/adquisiciones'
import DialogFinal from "./../../dialog-final-documento/DialogFinalDocumento.vue"
import Comentario from '../../recepcion/crear/comentario/comentario-recepcion.vue'

export default {
    components: {
      TablaMaterialRecepcion,
      ModalFinalizar,
      CabeceraRecepcion,
      DialogFinal,
      Comentario
      },
    mounted() {
      this.detalleOc()
      if (this.$auth.isLoading == false) {
        this.datosEmpresa = this.$store.state.app.datosEmpresa;
        this.datosUsuario = this.$store.state.app.datosUsuario;

      }
      console.log("EMPRESA:", this.datosEmpresa, "USUARIO:", this.datosUsuario);
    },
    data() {
      return {
        comentarioRules: [
          v => !!v || 'El Comentario es requerido',
          
        ],
       datosUsuario:'',
       datosEmpresa:'',
       tituloModal:'',
       textoModal:'',
       comentarioModal:'',
       mostrar:false,
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
                nombre: 'Unidad',
                comprador: '33',
                fecha: '33',
                monto: '0',
                oc:'1'
            }
        ],
        dialogDelete:false,
        ocCabecera:{},
        ocDetalle:[],
        comentario:'',
        openModal:false,
        recepcion:''
      };
    },
    methods: {
      validate() {
        this.$refs.form.validate()
      },
      reset() {
        this.$refs.form.reset()
      },
      async detalleOc(){
        const resp = await getDetalleOC(this.$route.query.id)
       
        this.ocCabecera = resp.data.kangusoft_oc[0]
        for(let detalle of resp.data.kangusoft_oc_det){
          detalle.recepcionar = 0
          console.log('detalle',detalle)
          //RECEPCIONADO//
          if(detalle.oc_det__view_recepciones_lista == null){
            detalle.cant_recepcion = 0 
            detalle.cant_despacho = detalle.cant_ajustada
          }else if(detalle.oc_det__view_recepciones_lista != null){
            detalle.cant_recepcion = detalle.oc_det__view_recepciones_lista.total_recibido 
             //POR RECEPCIONAR//
             if(detalle.oc_det__view_recepciones_lista.total_recibido > detalle.cant_ajustada ){
              detalle.cant_despacho = 0
             }else if(detalle.oc_det__view_recepciones_lista.total_recibido <= detalle.cant_ajustada ){
              detalle.cant_despacho = detalle.cant_ajustada - detalle.oc_det__view_recepciones_lista.total_recibido
             }
           //POR RECEPCIONAR//
            
          }
          console.log('//RECEPCIONADO//',detalle.cant_recepcion)
          console.log('//POR RECEPCIONAR//',detalle.cant_despacho)
          //RECEPCIONADO//
          //POR RECEPCIONAR//
          
           //POR RECEPCIONAR//
          this.ocDetalle.push(detalle)
        }

        },
        cancelarCrear(){
          this.openModal = false
          },
        async  confirmacionCrear(){
      
            this.recepcion.comentarioModal = this.comentarioModal
           let arreglo = []
            for(let item of this.recepcion.rec_dets.data){
              delete item.por_recepcionar;
              if(item.cantidad != 0){
                arreglo.push(item)
              }
            }
            console.log('this.validate()', this.$refs.form.validate())
            console.log('item',this.recepcion)
            this.recepcion.rec_dets.data = arreglo
            if( this.$refs.form.validate()){
              this.openModal = false
              const returnPostDetalle =  await insertRecOc(  this.recepcion.oc_fk,1,  this.recepcion.usu_fk,  this.recepcion.rec_dets,  this.recepcion.comentarioModal,this.recepcion.dte_cab_fk,this.recepcion.ref_folio_dte,this.recepcion.ref_tipo_dte_fk,this.recepcion.emp_fk,this.recepcion.descuadre)
              console.log('return',returnPostDetalle)
              this.tituloModal = 'Recepción Creada',
              this.textoModal = 'Tu Recepción ha sido creada con exito',
              this.mostrar = true
              this.$toast.success('Se completo con exito esta Recepción', {
                tposition: 'top-right',
                timeout: 5000,
                pauseOnHover: true
              }) 
           
            }
           
          },
        async crearRecepcion(){
          let objeto = {}
          let existeLinea 
          objeto.oc_fk = this.ocCabecera.id
          objeto.usu_fk = this.datosUsuario.user_id
          objeto.rec_est_fk = 1 
          objeto.observacion = this.comentario == '' ? null : this.comentario
          objeto.dte_cab_fk = this.$refs.refdatoscabecera.cabeceraSeleccion == 1 ? null : this.$refs.refdatoscabecera.dte_cab

          objeto.emp_fk = this.datosEmpresa.id
          objeto.rec_dets = {
    
              data:[]
          }
         for(let item of this.$refs.refdatostabla.materiales ){
           if(item.cant_despacho != undefined || item.cant_despacho != null){
          item.descuadre = item.recepcionar > item.cant_despacho ? true : false
          objeto.descuadre = item.descuadre
          item.monto = item.recepcionar > item.cant_despacho? item.cant_despacho * item.precio_unitario : item.recepcionar * item.precio_unitario
         }
         else if(item.cant_despacho == undefined || item.cant_despacho == null){
          item.descuadre = item.recepcionar > item.cantidad ? true : false
          objeto.descuadre = item.descuadre
          item.monto = item.recepcionar > item.cantidad? item.recepcionar * item.precio_unitario : item.recepcionar * item.precio_unitario
         }
          console.log('item',item)
          if(item.recepcionar > 0 && item.cant_despacho != undefined || item.cant_despacho != null ){
            objeto.rec_dets.data.push({oc_det_fk: item.id,cantidad:Number(item.recepcionar),descuadre:item.descuadre,monto:item.monto,por_recepcionar:item.cant_despacho})
          } else if(item.recepcionar > 0 && item.cant_despacho == undefined || item.cant_despacho == null){
            objeto.rec_dets.data.push({oc_det_fk: item.id,cantidad:Number(item.recepcionar),descuadre:item.descuadre,monto:item.monto,por_recepcionar:item.cantidad})
          }
          
          else if(item.recepcionar <= 0){
          console.log('no tiene lineas, no se agrega al arreglo')
          existeLinea = false
          }
         }
         objeto.ref_tipo_dte_fk = this.$refs.refdatoscabecera.cabeceraSeleccion == 1 ? null : this.$refs.refdatoscabecera.cabeceraSeleccion
         objeto.ref_folio_dte = this.$refs.refdatoscabecera.cabeceraSeleccion == 1 ? null : this.$refs.refdatoscabecera.cabeceraNumero
         
         console.log('reftip',objeto.rec_dets.data)
         this.recepcion = objeto
         for(let item of objeto.rec_dets.data){
           console.log('item if linea',item)
           if(item.cantidad == 0 ){
            existeLinea = false
           } else if (item.cantidad > 0){
            existeLinea = true
            break; 
           }
         }
         let cantidad
         let solicitado
         console.log('existeLinea',existeLinea)
         if(existeLinea == true){
           for(let item of objeto.rec_dets.data){
            console.log('objeto.rec_dets.data',item)
            if(item.cantidad > item.por_recepcionar){
              this.openModal = true
              existeLinea = false
              delete item.por_recepcionar;
              console.log('if')
            }
          }
          if(this.openModal == false) {
            for(let item of objeto.rec_dets.data){
              console.log('objeto.rec_dets.data',item)
              if(item.cantidad > item.por_recepcionar){
               
                cantidad = item.cantidad
                solicitado = item.por_recepcionar
                delete item.por_recepcionar;
                console.log('entre',item)
              }else if(item.cantidad <= item.por_recepcionar){
                cantidad = item.cantidad
                solicitado = item.por_recepcionar
                delete item.por_recepcionar;
                console.log('entre',item)
              }
            }
            console.log('cantidad',cantidad)
            console.log('solicitado',solicitado)
            if( cantidad <= solicitado){
              let arreglo=[]
              for(let item of objeto.rec_dets.data){
                if(item.cantidad != 0){
                  console.log('item',item)
                  arreglo.push(item)
                }
              }
              console.log('arreglo',arreglo)
              objeto.rec_dets.data = arreglo
              console.log('arregobjeto.rec_dets.data lo',objeto.rec_dets.data )
              const returnPostDetalle =  await insertRecOc(objeto.oc_fk,1,objeto.usu_fk,objeto.rec_dets,objeto.observacion,objeto.dte_cab_fk,objeto.ref_folio_dte,objeto.ref_tipo_dte_fk,objeto.emp_fk,objeto.descuadre)
              console.log('return',returnPostDetalle)
              this.tituloModal = 'Recepción Creada',
              this.textoModal = 'Tu Recepción ha sido creada con exito',
              this.mostrar = true
              this.$toast.success('Se completo con exito esta Recepción', {
                tposition: 'top-right',
                timeout: 5000,
                pauseOnHover: true
              })
              existeLinea = false
            }else{
              console.log('tepasaste wey')
              this.openModal = true
            }
            //   this.$router.push({
            //     path:'/adquisiciones/recepcion/listado',
            // });
            }
          
           return
         
         }else if(existeLinea == false){
          this.$toast.error('Esta recepcion debe tener una linea con valor a recepcionar', {
            tposition: 'top-right',
            timeout: 5000,
            pauseOnHover: true
          })
         }
         else if(existeLinea == undefined){
          this.$toast.error('Esta recepcion no tiene lineas ', {
            tposition: 'top-right',
            timeout: 5000,
            pauseOnHover: true
          })
         }
        },
        cerrarDialog(){
          this.mostrar = true
        },
        cargarComentario(comentario){
          console.log("comentario",comentario)
           this.comentario = comentario
        },
    }
}