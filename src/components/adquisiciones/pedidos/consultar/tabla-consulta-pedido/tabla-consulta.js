/* eslint-disable */
import breadcrumbs from "../../../../general/breadcrum/breadcrumbs.vue";
import NombreMaterial from "../../../../../components/general/nombre-obs-tabla/NombreObsTabla.vue"
import { getPedido } from "../../../../../graphql/adquisiciones";


export default {
  components: {
    breadcrumbs,
    NombreMaterial
  },
  props: {
  
  },
  mounted() {
 
  },
  watch: {
   
  },
  data() {
    return {
      dialogDelete:false,
      nombre:'PALLETS',
      unidad:'UNIDAD',
      obs:'LO MAS ANTES POSIBLE',
     breadcrumbs: [
      {
        text: 'Pedido',
      },
      {
        text: 'Consultas de Pedido',
      }
    ],
     listadoPedidos:[],
     lol:'',
      headers: [
        {
          text: "Nombre Pedido",
          align: "start",
          value: "nombre",
          width: "200px",
        },
        // { text: 'C.C', value: 'oc_det_pars', sortable: false, width: '200px' },
        {
          text: "Identificador",
          value: "identificacion",
          width: "250px",
          align: "center",
        },
        {
            text: "Centro de Gestión",
            value: "pro.nombre",
            width: "100px",
            align: "center",
          },
       
          {
            text: "Fecha de Creación",
            value: "fec_creacion",
            width: "100px",
            align: "center",
          },
          {
            text: "Solicitante del Pedido",
            value: "usu.nombre",
            width: "100px",
            align: "center",
          },
          {
            text: "Estado del Pedido",
            value: "est_doc.nombre",
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
           width: "200px",
         },
         // { text: 'C.C', value: 'oc_det_pars', sortable: false, width: '200px' },
        
         {
             text: "Cantidad",
             value: "cantidad",
             width: "100px",
             align: "center",
           },
           {
            text: "Comprado",
            value: "cant_comprada",
            width: "100px",
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
      a3:[{nombre:'OC-1392-1',identificador:'256',proyecto:'02/10/22'}],
      dates: [ this.$moment(new Date()).subtract(30, "days").format('yy-MM-DD').toString(), this.$moment(new Date()).add(1, 'days').format('yy-MM-DD').toString()],
     
    }
  },
  mounted(){
    console.log(this.$auth.isLoading);
    if (this.$auth.isLoading == false) {
      this.datosEmpresa = this.$store.state.app.datosEmpresa;
     
    }
    this.cargarPedidos()
  },
  computed: {
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
    abrirDetalle(item){
      console.log('object: ', item);
      this.$router.push({
            path:'/adquisiciones/pedido/consultar/detalle',
            query: { id: Number(item.id),}
        });
     },
    async cargarPedidos() {
      const {data: { kangusoft_ped }} = await getPedido(this.datosEmpresa.id)
      console.log('a: ', kangusoft_ped);
      for(let ped of kangusoft_ped ){
        this.listadoPedidos.push(ped)
      }
    },

  }
}