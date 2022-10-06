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
       datosUsuario:'',
       datosEmpresa:'',
       tituloModal:'',
       textoModal:'',
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
        comentario:''
      };
    },
    methods: {
      async detalleOc(){
        const resp = await getDetalleOC(this.$route.query.id)
       
        this.ocCabecera = resp.data.kangusoft_oc[0]
        for(let detalle of resp.data.kangusoft_oc_det){
          detalle.recepcionar = 0
          this.ocDetalle.push(detalle)
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
          item.descuadre = item.recepcionar > item.saldo ? true : false
          item.monto = item.recepcionar > item.saldo? item.saldo * item.precio_unitario : item.recepcionar * item.precio_unitario
          if(item.recepcionar > 0){
            objeto.rec_dets.data.push({oc_det_fk: item.id,cantidad:Number(item.recepcionar),descuadre:item.descuadre,monto:item.monto})
          }else if(item.recepcionar <= 0){
          console.log('no tiene lineas, no se agrega al arreglo')
          existeLinea = false
          }
         }
         objeto.ref_tipo_dte_fk = this.$refs.refdatoscabecera.cabeceraSeleccion == 1 ? null : this.$refs.refdatoscabecera.cabeceraSeleccion
         objeto.ref_folio_dte = this.$refs.refdatoscabecera.cabeceraSeleccion == 1 ? null : this.$refs.refdatoscabecera.cabeceraNumero
         console.log('reftip',objeto.rec_dets.data)
         
         for(let item of objeto.rec_dets.data){
           if(item.cantidad == 0){
            existeLinea = false
           } else if (item.cantidad > 0){
            existeLinea = true
           }
         }
         console.log('existeLinea',existeLinea)
         if(existeLinea == true){
          const returnPostDetalle =  await insertRecOc(objeto.oc_fk,1,objeto.usu_fk,objeto.rec_dets,objeto.observacion,objeto.dte_cab_fk,objeto.ref_folio_dte,objeto.ref_tipo_dte_fk,objeto.emp_fk)
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
        //   this.$router.push({
        //     path:'/adquisiciones/recepcion/listado',
        // });
         }else if(existeLinea == false){
          this.$toast.error('Esta recepcion debe tener una linea con valor a recepcionar', {
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