/* eslint-disable */



export default {
  components: {
 
  },
  props: {
  
  },
  mounted() {
 
  },
  watch: {
   
  },
  data() {
    return {
     a2:'',
      breadcrumbs: [
        {
          text: 'Pedidos',
        },
        {
          text: 'Consultas'
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
         align: "center", }
      ],
      
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