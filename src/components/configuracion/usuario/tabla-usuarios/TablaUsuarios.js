import users from '../../../../pages/users/content/users'
import CopyLabel from '../../../common/CopyLabel'

export default {
  components: {
    CopyLabel
  },
  data() {
    return {
      usuario:{
        nombres: '',
        apellidos: '',
        email: '',
        cargo: '',
        rut: '',
        perfil: '',
        imagen: '',
        firma: ''
      },
      items: [
        'Admin',
        'Plebeyo'
      ],

      url: null,
      url2:null,
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

    eliminarFirma() {
      this.url2 = null 
      console.log('eliminar firma')
    }
  }
}
