/* eslint-disable */
import Previsualizacion from '../../../../../components/adquisiciones/crear-documento/previsualizacion/Previsualizacion.vue'
import {getDetalleOC} from '../../../../../graphql/adquisiciones'
import pdf from '../../../../../components/general/generadorPDF/pdf.vue'
export default {
  components: {
    Previsualizacion,
    pdf
  },
  mounted() {
    this.idOcSeleccionada = this.$route.query
    this.cargarMaterialesOc()
  },
  data() {
    return {
      verPdf:false,
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
        // this.materialesOcSeleccionada = kangusoft_oc_det

        for(const mat of kangusoft_oc_det){
          console.log('mat: ', mat)
          const objMat = {
            mat_fk: mat.mat_fk,
            cantidad: mat.cantidad,
            precio_unitario: mat.precio_unitario,
            total: mat.total,
            observacion: mat.observacion,
            mat_nombre: mat.mat.nombre,
            mat_unidad: mat.mat.mat_uni.nombre,
            id: mat.id
          }
          this.materialesOcSeleccionada.push(objMat)
        }

        
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
        this.cabecera.adjuntos = kangusoft_oc[0].oc_adjs
        this.cabecera.identificacion = kangusoft_oc[0].identificacion
        this.cabecera.proyecto.codigo = kangusoft_oc[0].pro.codigo
        this.skeleton = false
    },
    exportToPDF () {
      console.log("this.$refs.refpdf",this.$refs)
      this.$refs.refpdf.exportToPDF()
      
    },
    verPdf1(){
      this.verPdf = true
    }
  
    
  }
}