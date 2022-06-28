/* eslint-disable */
import Previsualizacion from '../../../../../components/adquisiciones/crear-documento/previsualizacion/Previsualizacion.vue'
import {getDetalleOC} from '../../../../../graphql/adquisiciones'
export default {
  components: {
    Previsualizacion
  },
  mounted() {
    this.idOcSeleccionada = this.$route.query
    this.cargarMaterialesOc()
  },
  data() {
    return {
      idOcSeleccionada:'',
      detalleOcSeleccionada:'',
      materialesOcSeleccionada:[],
    
        cabecera:{
            proveedor:{
                nombre:"",
                rut:""
            },
            proyecto:{
                nombre:"",
                direccion:"",
            },
            moneda:{
                nombre:""
            },
            contacto:{
                nombre:"",
                email:""
            },
            formaPago:{
                nombre:"",
            },
            tipoDespacho:{
                nombre:"",
            }
            

      },
      comentarioOcSeleccionada:""
    }
  },
  methods: {
    async cargarMaterialesOc(){
        const { data: {kangusoft_oc_det,kangusoft_oc} } = await getDetalleOC(this.idOcSeleccionada.id)
        console.log("MATERIALES:",kangusoft_oc_det)
        this.materialesOcSeleccionada = kangusoft_oc_det
        console.log("OC:", kangusoft_oc[0])
        this.cabecera.proveedor.nombre = kangusoft_oc[0].ent.nombre
        this.cabecera.proveedor.rut = kangusoft_oc[0].ent.rut
        this.cabecera.proyecto.nombre = kangusoft_oc[0].pro.nombre
        this.cabecera.proyecto.direccion = kangusoft_oc[0].pro.direccion
        this.cabecera.moneda.nombre = kangusoft_oc[0].mon.nombre
        this.cabecera.contacto.nombre = kangusoft_oc[0].usu.nombre
        this.cabecera.contacto.email = kangusoft_oc[0].usu.email
        this.cabecera.formaPago.nombre =  kangusoft_oc[0].for_pag.nombre
        this.cabecera.formaPtipoDespachoago.nombre = kangusoft_oc[0].des_tip.nombre
    },
  }
}