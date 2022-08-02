/* eslint-disable */
import breadcrumPedido from "../../../general/breadcrum/breadcrumbs.vue";
import cabeceraPedidos from "./cabecera-pedidos/cabecera-pedidos.vue";
import tablaPedidos from "./tabla-pedidos/tabla-pedidos.vue";
import comentarioComprador from "./comentario-comprador/comentario-comprador.vue";
import DialogFinal from "./../../dialog-final-documento/DialogFinalDocumento.vue"
import { getProyectosPorUsuario } from '../../../../graphql/general'
import { getAprobadorPedido} from '../../../../graphql/adquisiciones'

export default {
    components: {
      breadcrumPedido,
      cabeceraPedidos,
      tablaPedidos,
      comentarioComprador,
      DialogFinal,
    
      },
    mounted() {
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
            text: 'Creacion de Pedido',
          }
        ],
        adjuntos:[],
        respFiles: [],
        mostrar:false,
        dialogDelete:true,
        cantidad:"",
        nombrePedido:'',
        proyectoPedido:'',
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
          materiales:[],
          listaProyectos:[],
          datosEmpresa:'',
          materialesPedido:[],
          aprobadorPedido:[],
          existeAprobador:''
      };
    },
    mounted() {    
      this.usu_id = this.$store.state.app.datosUsuario.user_id
      this.datosEmpresa = this.$store.state.app.datosEmpresa.id
      this.cargarProyectosPorUsuarios()
    },
    methods: {
      obtengoRespuesta(resp){
        console.log("resp:", resp)
        this.dialogDelete = resp
      },
      obtengoMateriales(datos) {
        console.log("arreglo:", datos)
        for(let mat of datos){
          this.materialesPedido.push(mat)
        }
       },
      async cargarProyectosPorUsuarios() {
        const { data:{ kangusoft_apr } } = await getProyectosPorUsuario(this.usu_id)
        for (const pro of kangusoft_apr) {

          this.listaProyectos.push({ id:pro.pro.id, nombre:pro.pro.nombre, codigo:pro.pro.codigo })
        }
      },
      async cargarAprobadorPedido() {
        this.dialogDelete = false
        let mod_fk = 1
      
        const { data:{ kangusoft_apr } } = await getAprobadorPedido(mod_fk,this.proyectoPedido)
        if(kangusoft_apr.length == 0){
          this.existeAprobador = false
        }else{
          for (const apro of kangusoft_apr) {
            this.existeAprobador = true
            this.aprobadorPedido.push({ id:apro.id, nombre:apro.nombre, apellidos:apro.apellidos })
          }
        }
       console.log("exite aprobador?:",this.existeAprobador)
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
        if (this.respFiles.length < 1) {
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
      crearPedido(){
        let cabecera = {}
        let adjuntos = {}
        //cabecera pedido
        cabecera.nombre = this.nombrePedido
        cabecera.comentario = 'gola'
        cabecera.usu_fk = this.usu_id
        cabecera.emp_fk = this.datosEmpresa
        cabecera.pro_fk = this.proyectoPedido
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
        // detalle pedido
        console.log("ACTIONS", cabecera,this.materialesPedido,adjuntos)
        this.mostrar = true
      }
    }
}