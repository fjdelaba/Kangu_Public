/* eslint-disable */
import { getProveedorSeleccionado} from '../../../../graphql/configuracion'
export default {
    components: {
    },
    mounted() {
      this.idProveedor = this.$route.query.id
      this.cargarDetalleProveedor()
    },
    data() {
        return {
           edicion:false,
           idProveedor:"",
           proveedor:{
            razon_social:"",
            rut:"",
            activo:"",
            emailDte:"",
            emailContacto:"",
            giro:"",
            direccion:"",
           },
           contactosProveedor:[],
           proveedorCopy:{},
           panel: [-1],
           breadcrumbs: [
            {
              text: 'Proveedores',
              to: '/configuracion/proveedores',
              exact: true
            },
            {
              text: 'Detalle de Usuario'
            }
          ],
          dialog:false
        };
    },
    methods: {
      async cargarDetalleProveedor(){
        const {data: { kangusoft_ent } } = await getProveedorSeleccionado(this.idProveedor);
        console.log("Proveedor Seleccionado:",kangusoft_ent[0])
        this.proveedor.razon_social = kangusoft_ent[0].razon_social
        this.proveedor.rut = kangusoft_ent[0].rut
        this.proveedor.activo = kangusoft_ent[0].activo
        // this.proveedor.emailDte = kangusoft_ent[0].
        this.proveedor.emailContacto = kangusoft_ent[0].email_contacto
        if(kangusoft_ent[0].direccion == null){
            this.proveedor.direccion = 'Sin Direccion'
        }else{
            this.proveedor.direccion = kangusoft_ent[0].direccion
        }
        if(kangusoft_ent[0].giro == null){
            this.proveedor.giro = 'Sin Giro'
        }else{
            this.proveedor.giro = kangusoft_ent[0].giro
        }
       this.contactosProveedor = kangusoft_ent[0].ent_cons

        this.proveedorCopy = this.proveedor
        console.log("COpia", this.contactosProveedor)
      },
      editarProveedor(){
        this.edicion=true
        this.proveedorCopy.rut = this.proveedor.rut
        this.proveedorCopy.razon_social = this.proveedor.razon_social
      },
      editarContacto(item){
        this.dialog=true
       console.log("ITEM EDIT",item)
      },
      cancelarEdicionProveedor(){
        this.edicion = false
        this.cargarDetalleProveedor()
      }
    }
}