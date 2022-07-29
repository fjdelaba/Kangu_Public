/* eslint-disable */
import breadcrumbs from "../../../../general/breadcrum/breadcrumbs.vue";
import NombreMaterial from "../../../../../components/general/nombre-obs-tabla/NombreObsTabla.vue"


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
     a2:'',
     breadcrumbs: [
      {
        text: 'Pedido',
      },
      {
        text: 'Consultas de Pedido',
      }
    ],
     a:[{nombre:'PEDIDO OBRAS CORREOS',identificador:'PED-2301',proyecto:'ALSÑDASKD',fecha:'26/07/22',soli:'Bastian Medina',estado:'Incompleto'}],
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
          value: "identificador",
          width: "100px",
          align: "center",
        },
        {
            text: "Centro de Gestión",
            value: "proyecto",
            width: "100px",
            align: "center",
          },
       
          {
            text: "Fecha de Creación",
            value: "fecha",
            width: "100px",
            align: "center",
          },
          {
            text: "Solicitante del Pedido",
            value: "soli",
            width: "100px",
            align: "center",
          },
          {
            text: "Estado del Pedido",
            value: "estado",
            width: "100px",
            align: "center",
          },
       
         { text: 'Acciones', value: 'actions',width: "100px",
         sortable: false,
         align: "center", },
        //  { text: '', value: 'pdf',width: "100px",
        //  sortable: false,
        //  align: "center", }
      ],
      a2:[{nombre:'Pallets',identificador:'256',proyecto:'257',fecha:'Test',}],
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
             value: "proyecto",
             width: "100px",
             align: "center",
           },
           {
            text: "Comprado",
            value: "identificador",
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
      a3:[{nombre:'OC-1392-1',identificador:'256',proyecto:'02/10/22'}],
      dates: [ this.$moment(new Date()).subtract(30, "days").format('yy-MM-DD').toString(), this.$moment(new Date()).add(1, 'days').format('yy-MM-DD').toString()],
     
    }
  },
  computed: {
    dateRangeText () {
      const datePivot = []
      console.log('this.dates_ ', this.dates);
      for(let fecha of this.dates){
        datePivot.push(this.$moment(fecha).format('DD/MM/yy').toString())
      }
      datePivot.join(' ~ ')
      console.log('datePivot: ', datePivot);
      return datePivot.join(' ~ ')
    },
   
  },
  methods: {
 
 

  }
}