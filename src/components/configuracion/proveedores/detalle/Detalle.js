/* eslint-disable */
import { getProveedorSeleccionado, updateContactoProveedor, postContactoProveedor,updateProveedor,updateEstadoProveedor } from '../../../../graphql/configuracion'

export default {
  components: {
  },
  mounted() {
    this.idProveedor = this.$route.query.id
    this.cargarDetalleProveedor()
    this.datosUsuario = this.$store.state.app.datosUsuario.user_id
  },
  data() {
    return {
      skeleton:true,
      valid:true,
      datosUsuario:"",
      edicion: false,
      idProveedor: "",
      nombreRules: [
        v => !!v || 'Nombre es requerido',
      ],
      razonRules: [
        v => !!v || 'Razon Social es requerido',
      ],
      rutRules: [
        v => !!v || 'Rut es requerido',
      ],
     emailRules: [
        v => !!v || 'Email es requerido',
        v => /.+@.+\..+/.test(v) || 'Email invalido',
      ],
      direccionRules: [
        v => !!v || 'Dirección es requerido',
      ],
      proveedor: {
        razon_social: "",
        rut: "",
        activo: "",
        emailDte: "",
        emailContacto: "",
        giro: "",
        direccion: "",
      },
      loadingEdicionProveedor:false,
      loadingEdicionContacto:false,
      loadingCrearContacto:false,
      contactosProveedor: [],
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
      dialog: false,
      contactoSeleccionado: {
        email: "",
        nombre: "",
        id: ""
      },
      loadingDeshabilitar:false,
      nuevoContactoProveedor: {
        email: "",
        nombre: "",
      },
      dialogDesactivar: false,
      dialogCrearContacto: false,
    };
  },
  computed:{
    cpxTextoBotonUpdateEstado() {
      return this.proveedor.activo ? 'Deshabilitar Proveedor' : 'Habilitar Proveedor'
    },
  },
  methods: {
    //CARGAR DATA PROVEEDOR
    async cargarDetalleProveedor() {
      const { data: { kangusoft_ent } } = await getProveedorSeleccionado(this.idProveedor);
      console.log("Proveedor Seleccionado:", kangusoft_ent[0])
      this.skeleton = false
      this.proveedor.razon_social = kangusoft_ent[0].razon_social
      this.proveedor.rut = kangusoft_ent[0].rut
      this.proveedor.activo = kangusoft_ent[0].activo
      this.proveedor.emailDte = kangusoft_ent[0].email_dte
      this.proveedor.emailContacto = kangusoft_ent[0].email_contacto
      if (kangusoft_ent[0].direccion == null) {
        this.proveedor.direccion = 'Sin Direccion'
      } else {
        this.proveedor.direccion = kangusoft_ent[0].direccion
      }
      if (kangusoft_ent[0].giro == null) {
        this.proveedor.giro = 'Sin Giro'
      } else {
        this.proveedor.giro = kangusoft_ent[0].giro
      }
      this.contactosProveedor = kangusoft_ent[0].ent_cons

      this.proveedorCopy = this.proveedor
      console.log("COpia", this.contactosProveedor)
    },
    //EDICION  PROVEEDOR
   editarProveedor() {
      this.edicion = true
    },
   async grabarEdicionProveedor(){
      try {
        this.loadingEdicionProveedor = true
        console.log("HOLA")
        const resp = await updateProveedor(this.proveedor.direccion,this.proveedor.emailContacto,this.proveedor.emailDte,this.idProveedor,this.proveedor.giro,this.proveedor.razon_social,this.proveedor.rut,this.datosUsuario)
        console.log('resp datos contacto: ', resp)
        this.edicion = false
        this.dialog = false
        this.loadingEdicionProveedor = false
        this.cargarDetalleProveedor()
      } catch (error) {
        console.log('error: ', error)
      }
    },
    cancelarEdicionProveedor() {
      this.edicion = false
      this.cargarDetalleProveedor()
    },
    cambiarEstadoProvedoor() {
      this.dialogDesactivar = true
    },
    async deshabilitarProveedor(){
      try {
        this.loadingDeshabilitar = true
        if(this.proveedor.activo == true){
          const resp = await updateEstadoProveedor(this.idProveedor, false)
          console.log('resp datos contacto: ', resp)
          this.loadingDeshabilitar = false
          this.dialogDesactivar = false
        }else if(this.proveedor.activo == false){
          const resp = await updateEstadoProveedor(this.idProveedor, true)
          console.log('resp datos contacto: ', resp)
          this.loadingDeshabilitar = false
          this.dialogDesactivar = false
        }
       
      } catch (error) {
        console.log('error: ', error)
      }
     
    },
    //EDICION - CREACION CONTACTO PROVEEDOR
    editarContacto(item) {
      this.dialog = true
      console.log("ITEM EDIT", item)
      this.contactoSeleccionado.email = item.email
      this.contactoSeleccionado.nombre = item.nombre
      this.contactoSeleccionado.id = item.id
    },
    async guardarEdicionContacto() {
      this.loadingEdicionContacto = true
      console.log(" this.contactoSeleccionado", this.contactoSeleccionado)
      
      try {
        const resp = await updateContactoProveedor(this.contactoSeleccionado.id, this.contactoSeleccionado.nombre, this.contactoSeleccionado.email)
        console.log('resp datos contacto: ', resp)
        this.loadingEdicionContacto = false
        this.dialog = false
        this.cargarDetalleProveedor()
      } catch (error) {
        console.log('error: ', error)
      }
      
    },
    async crearNuevoContacto() {
      this.loadingCrearContacto = true
      
      try {
      const { data } = await postContactoProveedor(
      this.nuevoContactoProveedor.email,
      this.idProveedor,
      this.nuevoContactoProveedor.nombre,
      this.datosUsuario 
      );
      console.log(data);
      this.loadingCrearContacto = false
      this.dialogCrearContacto = false
      this.cargarDetalleProveedor()
    } catch (error) {
      console.log('error: ', error)
    } 
    this.contactosProveedor.push(this.nuevoContactoProveedor)
    }

  }
}