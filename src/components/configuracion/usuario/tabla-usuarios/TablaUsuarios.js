import users from '../../../../pages/users/content/users'
import CopyLabel from '../../../common/CopyLabel'

export default {
  components: {
    CopyLabel
  },
  data() {
    
    return {
      image: undefined,
      // to save image url
      imageUrl: '',
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
    createImage(file) {
      const reader = new FileReader()
  
      reader.onload = (e) => {
        this.imageUrl = e.target.result
      }
      reader.readAsDataURL(file)
    },
    onFileChange(file) {
      if (!file) {
        return
      }
      this.createImage(file)
    }
  }
}
