import users from '../../../../pages/users/content/users'
import CopyLabel from '../../../common/CopyLabel'

export default {
  components: {
    CopyLabel
  },
  data() {
    return {
      usuario:{
        valid:true,
        nombres: '',
        nombresRules: [
          (v) => !!v || 'Nombre obligatorio',
          (v) => (v && v.length <= 10) || 'No'
        ],
        apellidos: '',
        apellidosRules:[
          (v) => !!v || 'Apellido obligatorio'
        ],
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail es obligatorio',
          (v) => /.+@.+\..+/.test(v) || 'E-mail debe ser valido'
        ],
        cargo: '',
        cargoRules: [
          (v) => !!v || 'Cargo obliogatorio'
        ],

        rut: '',
        rutRules: [
          (v) => !!v || 'Rut es obligatorio'
        ],
        perfil: '',
        imagen: '',
        firma: ''
      },
      select:null,
      items: [
        'Admin',
        'Plebeyo'
      ],

      url: null,
      url2:null,
      abrirDialog:false,
      dialog:false,
      image: null,
      drawer:false, 
      isLoading: false,
      breadcrumbs: [
        {
          text: 'Users',
          disabled: false,
          href: '#'
        },
        {
          text: 'List'
        }
      ],
     
      searchQuery: '',
      selectedUsers: [],
      headers: [
        { text: 'Rut', align: 'left', value: 'rut' },
        { text: 'Email', value: 'email' },
        { text: 'Nombre', align: 'left', value: 'nombre' },
        { text: 'Apellido', align: 'left', value: 'apellidos' },
        { text: 'Cargo', value: 'cargo' },
        { text: 'FechaCreacion', value: 'fec_creacion' },
        { text: 'activo', value: 'activo' },
        { text: '', sortable: false, align: 'right', value: 'action' }
      ],

      users
    }
    
  },

  props: {
    usuarios:[]
  },
  watch: {
    selectedUsers(val) {}
  },
  methods: {
    searchUser() {},
    open() {},
    getEstado(estado) {
      return estado === 'S' ? true : false
    },
    previewImagen() {
      this.url = URL.createObjectURL(this.usuario.imagen)
    },

    eliminarImagen() {
      this.url = null 
      console.log('eliminar imagen')
    },
    previewFirma() {
      this.url2 = URL.createObjectURL(this.usuario.firma)
    },
    crearUsuario() {
      const usu = { 
        nombres:this.usuario.nombres,
        apellidos: this.usuario.apellidos,
        email: this.usuario.email,
        cargo: this.usuario.cargo,
        rut: this.usuario.rut,
        perfil: this.usuario.perfil,
        imagen: this.usuario.imagen,
        firma: this.usuario.firma 
      }

      console.log(usu)
      
      this.usuario = {
        nombres:'',
        apellidos: '',
        email: '',
        cargo: '',
        rut: '',
        perfil: '',
        imagen: '',
        firma: ''
      }
      
      //this.abrirDialog = false
    },
    validate () {
      this.$refs.form.validate()
    },
    reset() {
      this.usuario = {
        nombres:'',
        apellidos: '',
        email: '',
        cargo: '',
        rut: '',
        perfil: '',
        imagen: '',
        firma: ''
      },
      this.abrirDialog = false
      
    },

    eliminarFirma() {
      this.url2 = null 
      console.log('eliminar firma')
    }
   
  }
}
