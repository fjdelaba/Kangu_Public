/* eslint-disable */
import cabeceraPedidos from "../../../../../components/adquisiciones/pedidos/crear/cabecera-pedidos/cabecera-pedidos.vue";
import tablaPedidos from "../../../../../components/adquisiciones/pedidos/crear/tabla-pedidos/tabla-pedidos.vue";
import comentarioComprador from "../../../../../components/adquisiciones/pedidos/crear/comentario-comprador/comentario-comprador.vue";
import {getDetallePedido} from '../../../../../graphql/adquisiciones'
export default {
  components: {
    cabeceraPedidos,
    tablaPedidos,
    comentarioComprador,
  },
  mounted() {

  this.cargarMaterialesOc(this.$route.query.id)
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Listado',
          to: '/adquisiciones/pedido/consultar',
          exact: true
        },
        {
          text: 'Detalle de Pedido',
        }
      ],
      verPdf:false,
      skeleton:true,
      idPedSeleccionado:'',
      materialesPed:'',
      cabeceraPed:{
          pro:{
          },
          usu:{

          }
      },
      comentarioPed:''
    }
  },
  methods: {
    async cargarMaterialesOc(id){
        const { data: {kangusoft_ped_det,kangusoft_ped} } = await getDetallePedido(id)
        console.log("MATERIALES:",kangusoft_ped_det,kangusoft_ped)
        this.materialesPed = kangusoft_ped_det
        for(let cabecera of kangusoft_ped){
            console.log("Cabecera", cabecera)
            this.cabeceraPed.nombre = cabecera.nombre,
            this.cabeceraPed.identificacion = cabecera.identificacion,
            this.cabeceraPed.id = cabecera.id,
            this.cabeceraPed.usu.nombre = cabecera.usu.nombre + ' ' + cabecera.usu.apellidos
            this.cabeceraPed.usu.email = cabecera.usu.email
            this.cabeceraPed.fec_creacion = cabecera.fec_creacion,
            this.cabeceraPed.pro.nombre = cabecera.pro.nombre,
            this.cabeceraPed.pro.id = cabecera.pro.id
            this.comentarioPed= cabecera.comentario
        }
        console.log("Cabecera", this.cabeceraPed, this.comentarioPed)
        this.skeleton = false
    },
   
  
    
  }
}