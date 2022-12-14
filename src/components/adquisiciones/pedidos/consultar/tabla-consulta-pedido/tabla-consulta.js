/* eslint-disable */
import breadcrumbs from "../../../../general/breadcrum/breadcrumbs.vue";
import Vue from "vue";
import JsonExcel from "vue-json-excel";
import NombreMaterial from "../../../../../components/general/nombre-obs-tabla/NombreObsTabla.vue"
import { getPedido } from "../../../../../graphql/adquisiciones";
import {creaPdfPedido} from "../../../../../utils/pdf-pedido-creado"
import { getUsuarioLogin } from '../../../../../graphql/configuracion'
import moment from 'moment'
Vue.component("downloadExcel", JsonExcel); 

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
     headerExcelCabecera: {
      "Nombre Centro Gestion": "pro.nombre",
      "Identificador PED": "identificacion",
      "Nombre PED": "nombre",
      "Creado":"fec_creacion",
      "Solicitante Pedido": {
          callback: value => {
              return `${value.usu.nombre} ${value.usu.apellidos}`;
          }
      },
      "Estado del Pedido": "est_lin.nombre"
  },
  headerExcelDetalle: {
    "Nombre Centro Gestion": "pro_nombre",
    "Identificador OC": "identificacion",
    "Nombre PED": "ped_nombre",
    "Solicitante Pedido": "comprador",
  "Creado":"fec_creacion",
    "Codigo": "mat_fk",
    "Material": "material",
    "Formato":"formato",
    "Cantdad": "cantidad",
    "Estado del Pedido": "estado", 
},
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
        estadoLineas:[],
        solicitante: []
      },
      valoresFiltros: {
        _listaProyectos: [], // Este filtro no viene desde el modal
        _listaEstadoLineas:[],
        _listaSolicitante:[]
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
        if (this.filtros.estadoLineas.length > 0) {
          agregar = agregar && this.filtros.estadoLineas.includes(ped.est_lin.id)
        }
        if (this.filtros.solicitante.length > 0) {
          agregar = agregar && this.filtros.solicitante.includes(ped.usu.id)
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

  },
  methods: {
    getFechaFormat(fecha){
      return moment(fecha).format("DD/MM/YYYY")
    },
    async cargarDataExcelDetalle() {
      const detalles = []
      for(let detalle of this.listadoPedidos){
        console.log('detalle: ', detalle);
        const pro_nombre = detalle.pro.nombre
        const identificacion = detalle.identificacion
        const ped_nombre = detalle.nombre
        const comprador = `${detalle.usu.nombre} ${detalle.usu.apellidos}`
        const estado = detalle.est_lin.nombre
        const fec_creacion = detalle.fec_creacion
        for(let lineaDetalle of detalle.ped_dets){
          console.log('lineaDetalle: ', lineaDetalle);
          const obj = {
            pro_nombre,
            identificacion,
            ped_nombre,
            comprador,
            material: lineaDetalle.mat.nombre,
            cantidad: lineaDetalle.cant_ajustada,
            formato: lineaDetalle.mat.mat_uni.nombre,
            mat_fk: lineaDetalle.mat_fk,
            estado,
            fec_creacion
          }
          detalles.push(obj)
          // console.log('obj_ ', obj);
        }
      }
        return detalles;
    },
    cargarDataExcelCabecera() {
      //alert('Se genero el archivo cabeceras_oc.xls')
      console.log("METODO EXCEL:", this.listadoPedidos);
      const pedExcel = [...this.cpxDatosTabla]
    
      return pedExcel;
  },
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
        this.listadoPedidos.push(JSON.parse(JSON.stringify(ped)))
      }
      let proyectos = [... new Set(this.listadoPedidos.map(x=> ({nombre: x.pro.nombre, id: x.pro.id})))];
      let estadosLineas = [... new Set(this.listadoPedidos.map(x=> ({nombre: x.est_lin.nombre, id: x.est_lin.id})))];
      let solicitante = [... new Set(this.listadoPedidos.map(x=> ({nombre: `${x.usu.nombre} ${x.usu.apellidos}`, id: x.usu.id})))];
      this.valoresFiltros._listaProyectos = [...new Set(proyectos.map(JSON.stringify))].map(JSON.parse);
      this.valoresFiltros._listaEstadoLineas = [...new Set(estadosLineas.map(JSON.stringify))].map(JSON.parse);
      this.valoresFiltros._listaSolicitantes = [...new Set(solicitante.map(JSON.stringify))].map(JSON.parse);
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