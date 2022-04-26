import users from '../../../../pages/users/content/users'
import CopyLabel from '../../../common/CopyLabel'

export default {
  components: {
    CopyLabel
  },
  data() {
    return {
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
        { text: 'Rut', align: 'left', value: 'id' },
        { text: 'Email', value: 'email' },
        { text: 'Email verificado', value: 'verified' },
        { text: 'Nombre', align: 'left', value: 'name' },
        { text: 'Apellido', align: 'left', value: 'name' },
        { text: 'Cargo', value: 'role' },
        { text: 'FechaCreacion', value: 'created' },
        { text: 'Estado', value: 'disabled' },
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
    open() {}
  }
}
