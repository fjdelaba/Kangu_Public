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
      skeleton:true,
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
      comentarioOcSeleccionada:"",
      consulta:true,
      tipo_documento: 0
    }
  },
  methods: {
    async cargarMaterialesOc(){
        const { data: {kangusoft_oc_det,kangusoft_oc} } = await getDetalleOC(this.idOcSeleccionada.id)
        console.log("MATERIALES:",kangusoft_oc_det)
        this.materialesOcSeleccionada = kangusoft_oc_det
        console.log("OC:", kangusoft_oc[0])
        this.cabecera.proveedor.razon_social = kangusoft_oc[0].ent.razon_social
        this.cabecera.nombre = kangusoft_oc[0].nombre
        this.cabecera.proveedor.rut = kangusoft_oc[0].ent.rut
        this.cabecera.proyecto.nombre = kangusoft_oc[0].pro.nombre
        this.cabecera.proyecto.direccion = kangusoft_oc[0].pro.direccion
        this.cabecera.moneda.nombre = kangusoft_oc[0].mon.nombre
        this.cabecera.contacto.nombre = kangusoft_oc[0].ent_con.nombre
        this.cabecera.contacto.email = kangusoft_oc[0].ent_con.email
        this.cabecera.formaPago.nombre =  kangusoft_oc[0].for_pag.nombre
        this.cabecera.tipoDespacho.nombre = kangusoft_oc[0].des_tip.nombre
        this.tipo_documento = kangusoft_oc[0].doc_tip_fk
        this.skeleton = false
    },
  }
}