/* eslint-disable */
import Previsualizacion from '../../../../../components/adquisiciones/crear-documento/previsualizacion/Previsualizacion.vue'
import {getDetalleOC} from '../../../../../graphql/adquisiciones'
export default {
  components: {
    Previsualizacion
  },
  mounted() {
    console.log('mounted detalle');
    this.idOcSeleccionada = this.$route.query
    this.cargarMaterialesOc()
  },
  data() {
    return {
      idOcSeleccionada:'',
      detalleOcSeleccionada:'',
      materialesOcSeleccionada:[],
      skeleton:true,
    
        cabecera:{
            proveedor:{
                nombre:"",
                rut:""
            },
            proyecto:{
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
      aprobacion:true,
      aprobadores: [],
      tipo_documento: 1
    }
  },
  methods: {
    async cargarMaterialesOc(){
      this.aprobadores = []
        const { data: {kangusoft_oc_det,kangusoft_oc} } = await getDetalleOC(this.idOcSeleccionada.id)
        console.log("kangusoft_oc_det: ",kangusoft_oc_det)
        for(let apro of kangusoft_oc[0].apr_pros){
          console.log("apro: ", apro.apr.usuByUsuAproFk)
          this.aprobadores.push({nombre: `${apro.apr.usuByUsuAproFk.nombre} ${apro.apr.usuByUsuAproFk.apellidos}`, aprobado:apro.aprobado,id_apr: apro.id, id_user:apro.apr.usuByUsuAproFk.id, avatar:apro.apr.usuByUsuAproFk.avatar})
        }
        console.log('this.aprobadores: ', this.aprobadores)
        this.materialesOcSeleccionada = kangusoft_oc_det
        console.log("OC:", kangusoft_oc[0])
        this.cabecera.nombre = kangusoft_oc[0].nombre
        this.cabecera.impuestos = kangusoft_oc[0].impuestos
        this.cabecera.neto = kangusoft_oc[0].neto
        this.cabecera.tipoDocumento = kangusoft_oc[0].doc_tip.nombre
        this.cabecera.identificacion = kangusoft_oc[0].identificacion
        this.cabecera.comentarioPDF = kangusoft_oc[0].comentario_pdf
        this.cabecera.comentario = kangusoft_oc[0].comentario
        this.cabecera.proveedor.razon_social = kangusoft_oc[0].ent.razon_social
        this.cabecera.proveedor.email = kangusoft_oc[0].ent_con.email
        this.cabecera.proveedor.nombreContacto =  kangusoft_oc[0].ent_con.nombre
        this.cabecera.proveedor.rut = kangusoft_oc[0].ent.rut
        this.cabecera.proveedor.direccion = kangusoft_oc[0].ent.direccion
        this.cabecera.proyecto.nombre = kangusoft_oc[0].pro.nombre
        this.cabecera.proyecto.direccion = kangusoft_oc[0].pro.direccion
        this.cabecera.moneda.nombre = kangusoft_oc[0].mon.nombre
        this.cabecera.moneda.id = kangusoft_oc[0].mon.id
        this.cabecera.contacto.nombre = kangusoft_oc[0].ent_con.nombre
        this.cabecera.contacto.email = kangusoft_oc[0].ent_con.email
        this.cabecera.formaPago.nombre =  kangusoft_oc[0].for_pag.nombre
        this.cabecera.tipoDespacho.nombre = kangusoft_oc[0].des_tip.nombre
        this.cabecera.est_doc_fk = Number(kangusoft_oc[0].est_doc_fk)
        this.cabecera.id = kangusoft_oc[0].id
        this.tipo_documento = kangusoft_oc[0].doc_tip_fk
        this.skeleton = false
    },
  }
}