/* eslint-disable */
import {getDatosGenerales}  from "../../../../graphql/configuracion.js"
import DetalleProyecto from './../Detalle.vue'
export default {
  data() {
    return {
      search: '',
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

          value: 'ent.razon_social',
        },
        {
          text: 'Administrador',
          align: 'start',
        
          value: 'usu.nombre',
        },
        {
          text: 'Creacion',
          align: 'start',

          value: 'fec_creacion',
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
    async cargarProyectos() {
      const { data: {kangusoft_pro} } = await getDatosGenerales()
      for(let pro of kangusoft_pro){
       console.log("proyect:", pro)
       this.proyectos.push(pro)
      }  
  },
  abrirDetalle(item){
   this.idProyectoSeleccionado = item.id
   this.detalle = true
   this.presupuestoProyecto = item.presupuesto
    console.log("proyecto",item)
    // this.$router.push(`/configuracion/proyectos/sent`)
  }
},
  mounted() {
  this.cargarProyectos()
  }

}