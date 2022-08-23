/* eslint-disable */
import breadcrumPedido from "../../../general/breadcrum/breadcrumbs.vue";
import cabeceraPedidos from "./cabecera-pedidos/cabecera-pedidos.vue";
import tablaPedidos from "./tabla-pedidos/tabla-pedidos.vue";
import comentarioComprador from "./comentario-comprador/comentario-comprador.vue";
import DialogFinal from "./../../dialog-final-documento/DialogFinalDocumento.vue"
import { creaPdfPedido } from "../../../../utils/pdf-pedido-creado";
import { getUsuarioLogin } from '../../../../graphql/configuracion'
import { getProyectosPorUsuario } from '../../../../graphql/general'
import { getAprobadorPedido,insertPED} from '../../../../graphql/adquisiciones'

export default {
  name:'CrearPedido',
    components: {
      breadcrumPedido,
      cabeceraPedidos,
      tablaPedidos,
      comentarioComprador,
      DialogFinal,
    
      },
    mounted() {
      setTimeout(() => {
       console.log("cabecera",this.$refs.refdatoscabecera)
      }, 2000);
    },
   
    data() {
      return {
        tituloModal:'',
        textoModal:'',
        correoModal:'',
        breadcrumbs: [
          {
            text: 'Listado',
            to: '/adquisiciones/pedido/consultar',
            exact: true
          },
          {
            text: 'Creacion de Pedido',
          }
        ],
        cantidadCero:false,
        adjuntos:[],
        respFiles: [],
        mostrar:false,
        dialogDelete:true,
        cantidad:"",
        usu_id:'',
        headers: [
            {
              text: "Material",
              align: "start",
              sortable: false,
              value: "mat",
              width: "400px",
            },
            // { text: 'C.C', value: 'oc_det_pars', sortable: false, width: '200px' },
            {
              text: "Cant.",
              value: "cantidad",
              width: "100px",
              sortable: false,
              align: "center",
            },
           
             { text: 'Acciones', value: 'actions',width: "100px",
             sortable: false,
             align: "center", }
          ],
          listaProyectos:[],
          datosEmpresa:'',
          materialesPedido:[],
          aprobadorPedido:[],
          existeAprobador:'',
          idProyecto:'',
          fechaDescarga:'',
          datosUsuario:'',
          comentario:''
      };
    },

    created() {    
      this.usu_id = Number(this.$store.state.app.datosUsuario.user_id)
      this.datosEmpresa = this.$store.state.app.datosEmpresa
      this.cargarUsuarioLogin()
     
    },
    computed:{
      cpxFecha() {
        return  this.$moment(new Date()).format("DD/MM/yy");
      },
      cpxProFk(){
       
        if(this.$refs.refdatoscabecera == undefined || this.$refs.refdatoscabecera == null){
          return 0
        }else {
          return this.$refs.refdatoscabecera.proyectoPedido
        }
      },
      cpxHabilitarPedido(){
      
        if( this.materialesPedido.length == 0){
          return true
        }
        }
    },
    methods: {
      async cargarUsuarioLogin() {
        const usuarioLogin = await getUsuarioLogin(this.$store.state.app.datosUsuario.user_id)
        this.datosUsuario = usuarioLogin.data.kangusoft_usu[0]
        console.log('usuarioLogin: ', usuarioLogin.data.kangusoft_usu[0])
        console.log("a",this.$refs)
      },

      cargarPartidas(id_pro){
        this.materialesPedido = this.$refs.tablapedido.materiales
        this.idProyecto = id_pro
        console.log("proyecto",this.idProyecto)
      },
      cargarComentario(comentario){
        console.log("comentario",comentario)
         this.comentario = comentario
      },
   
      eliminarAdjunto(item) {
        console.log('item: ', item)
        
      },
      clic() {
        console.log('Clic adjuntos: ', this.adjuntos)    
      },
      chang() {
        if (this.adjuntos.length >= 5) {
          this.$notify({
            group: 'foo',
            title: 'Puedes agregar un maximo de 5 archivos',
            text: 'Adjuntar archivos'
          })
  
          return
        }
  
        console.log('Change adjuntos: ',this.adjuntos)
        if (this.respFiles.length < 1){
          console.log('IF')
          this.respFiles = [...this.adjuntos]
        } else {
          console.log('ELSE')
          for (const f in this.adjuntos) {
            let agregarAdjunto = true
  
            for (const fr in this.respFiles) {
              console.log('f: ', this.respFiles[fr].name)
              if (this.respFiles[fr].name === this.adjuntos[f].name) {
                agregarAdjunto = false
              }
            }
            if (agregarAdjunto) {
              console.log('concat: ', this.adjuntos[f])
              this.respFiles.push(this.adjuntos[f])
              // this.adjuntos = [...this.respFiles,  ...this.adjuntos[f]]
            }
            console.log('agregarAdjunto: ', agregarAdjunto)
          }
          this.adjuntos = [...this.respFiles]
  
        }
        console.log('respFiles: ', this.respFiles)
        console.log('adjuntos: ', this.adjuntos)
  
        return
        // eslint-disable-next-line no-unreachable
        if (this.respFiles.length < 2) {
          this.adjuntos = [
            ...this.respFiles,
            ...this.adjuntos
          ]
        } else {
          this.adjuntos = [
            ...this.respFiles
          ]
          this.$notify({
            group: 'foo',
            title: 'Puedes agregar un maximo de 2 archivos',
            text: 'Adjuntar archivos'
          })
        }
      },
      cancelarPedido(){
        this.dialogDelete = false
        this.$router.push(`/adquisiciones/pedido/consultar`)
      },
      cerrarDialog(){
        this.mostrar = true
      },
     async crearPedido(){
          for(let cant of this.$refs.tablapedido.materiales){
            console.log("a",cant)
            if(cant.cantidad == 0 || cant.cantidad < 0){
             this.cantidadCero = true
            }
          }
          if(this.materialesPedido.length > 0 && this.cantidadCero == false){
          let cabecera = {}
          let adjuntos = {}
           cabecera.nombre = this.$refs.refdatoscabecera.nombrePedido
          cabecera.proyecto =  this.$refs.refdatoscabecera.proyectoPedido
          if(this.existeAprobador == false){
            cabecera.est_doc_fk = 1
          }else if(this.existeAprobador == true){
            cabecera.est_doc_fk = 2
          }
          cabecera.est_lin_fk = 5
          //adjuntos pedido
          for(let adj of this.adjuntos){
            adjuntos.nombre = adj.name
            adjuntos.tipo = adj.type
            adjuntos.usu_fk = this.usu_id
          }
          this.materialesPedido = this.$refs.tablapedido.materiales
          // detalle pedido
          console.log("ACTIONS", cabecera,this.materialesPedido,adjuntos)
          this.tituloModal = `Pedido Completado`
          this.textoModal = `El pedido PED-15 ha sido completado correctamente`
          this.mostrar = true
          this.fechaDescarga = `${this.cpxFecha}`
          const objDatosCabecera = {
            nombre: cabecera.nombre, 
            comentario: this.$refs.refcomentario.comentario, 
            usu_fk:this.datosUsuario.id,
            pro_fk:  this.idProyecto,
            emp_fk: this.datosEmpresa.id,
            est_doc: 1,
          }
          const objLineas = []
          for(let linea of this.materialesPedido){
            const objLinea = {
              mat_fk: linea.mat_id,
              cantidad: Number(linea.cantidad),
              observacion: linea.observacion,
              partida: linea.partidas[0].id,
              usu_fk:this.datosUsuario.id
            }
            objLineas.push(objLinea)
          }
          // await creaPdfPedido(this.datosEmpresa,cabecera,this.materialesPedido,this.fechaDescarga,this.datosUsuario,this.idProyecto)
          const { data:{ insert_pedido: {error,success, ped_id } } } = await insertPED(objDatosCabecera, objLineas)
          console.log('success: ', success)
          console.log('error: ', error)
          console.log('ped_id: ', ped_id)
        }
        else {
          this.$toast.error('NO existe valores, Revisa los valores en la tabla', {
            tposition: 'top-right',
            timeout: 5000,
            pauseOnHover: true
          })
          this.cantidadCero = false
        }
        
      }
    }
}