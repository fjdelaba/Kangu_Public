/* eslint-disable */
import breadcrumbs from "../../../../general/breadcrum/breadcrumbs.vue";
import NombreMaterial from "../../../../../components/general/nombre-obs-tabla/NombreObsTabla.vue"
import { getPedido } from "../../../../../graphql/adquisiciones";
import {creaPdfPedido} from "../../../../../utils/pdf-pedido-creado"
import { getUsuarioLogin } from '../../../../../graphql/configuracion'
import moment from 'moment'

export default {
  components: {
    breadcrumbs,
    NombreMaterial
  },
  props: {
  
  },
  watch: {
    '$auth.isLoading' (newCount, oldCount) {
      console.log(`tabla consultas - We have ${newCount} fruits now, yay!. ${oldCount}`)
      if(newCount == false){
        this.cargarPedidos()
      }
    }
  },
  data() {
    return {
      dialogDelete:false,
      nombre:'PALLETS',
      unidad:'UNIDAD',
      obs:'LO MAS ANTES POSIBLE',
      fechaDescarga:'',
      breadcrumbs: [
        {
          text: 'Adquisiciones',

        },
        {
          text: 'Consulta de Pedido',
        }
      ],
     listadoPedidos:[],
     lol:'',
      headers: [
        {
          text: "Centro de Gestión",
          value: "pro.nombre",
          width: "100px",
          align: "center",
        },
       
        // { text: 'C.C', value: 'oc_det_pars', sortable: false, width: '200px' },
        {
          text: "Identificador",
          value: "identificacion",
          width: "250px",
          align: "center",
        },
        {
          text: "Nombre Pedido",
          align: "start",
          value: "nombre",
          width: "200px",
        },
       
          {
            text: "Creado",
            value: "fec_creacion",
            width: "100px",
            align: "center",
          },
          {
            text: "Solicitante del Pedido",
            value: "nombreCompleto",
            width: "190px",
            align: "center",
          },
          {
            text: "Estado del Pedido",
            value: "est_lin.nombre",
            width: "100px",
            align: "center",
          },
       
         { text: 'Acciones', value: 'actions',width: "100px",
         sortable: false,
         align: "center", },
         { text: '', value: 'pdf',width: "100px",
         sortable: false,
         align: "center", }
      ],
      a2:[],
      lol2:'',
       headers2: [
         {
           text: "Nombre Material",
           align: "start",
           value: "nombre",
           width: "100px",
         },
         // { text: 'C.C', value: 'oc_det_pars', sortable: false, width: '200px' },
        
         {
             text: "Cantidad",
             value: "cantidad",
             width: "50px",
             align: "center",
           },
           {
            text: "Por Comprar",
            value: "cant_comprada",
            width: "50px",
            align: "center",
          },
           
       ],
       headers3: [
        {
          text: "Identificador OC",
          align: "start",
          value: "nombre",
          width: "200px",
        },
        // { text: 'C.C', value: 'oc_det_pars', sortable: false, width: '200px' },
       
        {
            text: "Fecha de Compra",
            value: "proyecto",
            width: "100px",
            align: "center",
          },
          {
           text: "Cantidad",
           value: "identificador",
           width: "100px",
           align: "center",
         },
          
      ],
      datosEmpresa:'',
      datosUsuario:'',
      a3:[{nombre:'OC-1392-1',identificador:'256',proyecto:'02/10/22'}],
      dates: [ this.$moment(new Date()).subtract(30, "days").format('yy-MM-DD').toString(), this.$moment(new Date()).add(1, 'days').format('yy-MM-DD').toString()],
      filtros:{
        proyectos: [], // Este filtro no viene desde el modal
      },
    }
  },
  created(){
   
  },
  mounted(){
    console.log("alo",this.$auth.isLoading);
    if (this.$auth.isLoading == false) {
      this.datosEmpresa = this.$store.state.app.datosEmpresa;
      this.cargarPedidos()
    }
    this.cargarUsuarioLogin() 
  },
 
  computed: {
    cpxDatosTabla() {
      return this.listadoPedidos.filter(ped => {
        let agregar = true;
        console.log('ped: ', ped);
        
        if (this.filtros.proyectos.length > 0) {
          agregar = agregar && this.filtros.proyectos.includes(ped.pro.id)
        }
        return agregar;
      });
    },
    dateRangeText () {
      const datePivot = []
      // console.log('this.dates_ ', this.dates);
      for(let fecha of this.dates){
        datePivot.push(this.$moment(fecha).format('DD/MM/yy').toString())
      }
      datePivot.join(' ~ ')
      // console.log('datePivot: ', datePivot);
      return datePivot.join(' ~ ')
    },
    cpxFecha() {
      return  this.$moment(new Date()).format("DD/MM/yy");
    },

  },
  methods: {
    async cargarUsuarioLogin() {
      const usuarioLogin = await getUsuarioLogin(this.$store.state.app.datosUsuario.user_id)
      this.datosUsuario = usuarioLogin.data.kangusoft_usu[0]

    },
    abrirDetalle(item){
      this.$router.push({
            path:'/adquisiciones/pedido/detalle',
            query: { id: Number(item.id),}
        });
     },
    async cargarPedidos() {
      console.log('id',this.datosEmpresa)
      let id = this.datosEmpresa.id
      const {data: { kangusoft_ped }} = await getPedido(id)
      for(let ped of kangusoft_ped){
        const nombreCompleto = `${ped.usu.nombre}  ${ped.usu.apellidos}`
        ped.nombreCompleto = nombreCompleto
        this.listadoPedidos.push(ped)
      }
    },
    moment() {
      return moment();
    },
    async descargarPdf(item){
      try {
        console.log('item: ', item);
        console.log('this.datosUsuario',this.datosUsuario)
        const cabecera = {
          proyecto: item.pro.nombre,
          nombre: item.nombre,
        }
        const materiales = []
        const partidas = []
        for(let mate of item.ped_dets){
          console.log("mat",mate)
          partidas.push({name:mate.parByParFk.nombre})
          materiales.push({mat:mate.mat.nombre,unidad:mate.mat.mat_uni.nombre,observacion:mate.observacion,partidas:partidas,cantidad:mate.cantidad})
        }
        console.log("materiales pa pdf",materiales)
      
        this.fechaDescarga = `${this.cpxFecha}`
        await creaPdfPedido(this.datosEmpresa,cabecera,materiales,this.fechaDescarga,this.datosUsuario,item.pro.id,item.id)
      } catch (error) {
        console.log("error",error)
      }
       
    
    }

  }
}