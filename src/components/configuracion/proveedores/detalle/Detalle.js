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
            activo:""
           },
           proveedorCopy:{},
           panel: [-1]
        };
    },
    methods: {
      async cargarDetalleProveedor(){
        const {data: { kangusoft_ent } } = await getProveedorSeleccionado(this.idProveedor);
        console.log("Proveedor Seleccionado:",kangusoft_ent[0])
        this.proveedor.razon_social = kangusoft_ent[0].razon_social
        this.proveedor.rut = kangusoft_ent[0].rut
        this.proveedor.activo = kangusoft_ent[0].activo
        this.proveedorCopy = this.proveedor
        console.log("COpia",this.proveedorCopy)
      },
      editarProveedor(){
        this.edicion=true
        this.proveedorCopy.rut = this.proveedor.rut
        this.proveedorCopy.razon_social = this.proveedor.razon_social
      },
      cancelarEdicionProveedor(){
        this.edicion = false
        this.cargarDetalleProveedor()
      }
    }
}