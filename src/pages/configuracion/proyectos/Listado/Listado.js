/* eslint-disable */
import {getDatosGenerales}  from "../../../../graphql/configuracion.js"
import DetalleProyecto from './../Detalle.vue'
export default {
  data() {
    return {
      skeleton:true,
      searchQuery:"",
      headers: [
        {
          text: 'Código',
          align: 'start',
          
          value: 'codigo',
        },
        {
          text: 'Nombre',
          align: 'start',
          
          value: 'nombre',
        },
        {
          text: 'Mandante',
          align: 'start',
          width: "300px",
          value: 'ent.razon_social',
        },
        {
          text: 'Monto Contrato',
          align: 'start',
          
          value: 'valor_contractual'
        },
        {
          
        },
        {
          text: 'Estado',
          align: 'start',
          value: 'pro_est.nombre',
        },
        {
          text: 'Accion',
          align: 'start',
          value: 'actions',
        },
      ],
      breadcrumbs: [
        {
          text: "Proyectos",
          disabled: false,
          // href: "#",
        },
        {
          text: "Listado",
        },
      ],
      proyectos:[],
      idProyectoSeleccionado:'',
      detalle:false,
      presupuestoProyecto:''
    }
  },
  components: {
   DetalleProyecto
  },
  methods:{
    searchUser() {},
    async cargarProyectos() {
      const { data: {kangusoft_pro} } = await getDatosGenerales()
      for(let pro of kangusoft_pro){
       console.log("proyect:", pro)
       this.proyectos.push(pro)
      }  
      this.skeleton = false
  },
  abrirDetalle(item){
  this.idProyectoSeleccionado = item.id
  this.detalle = true
  this.presupuestoProyecto = item.presupuesto
  this.$router.push({ path: '/configuracion/proyectos/detalle', query: { id: item.id }})
    console.log("proyecto",item)
    console.log("detalle", this.detalle)
  }
},
  mounted() {
  this.cargarProyectos()
  }

}