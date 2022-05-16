import { getDatosFormularioCabecera } from '../../../../graphql/adquisiciones'
import { getProveedores, getContactos, getProyectosPorUsuario } from '../../../../graphql/general'
import ModalEntidad from '../../../general/modal-entidad/ModalEntidad.vue'
import ModalContacto from '../../../general/modal-contacto/ModalContacto'
export default {
  components: {
    ModalEntidad,
    ModalContacto
  },
  props: {
    origen:''
  },
  data() {
    return {
      // vmodels
      oc_cab:{
        proyecto: '',
        nombre: '',
        moneda: '',
        tipoDocumento: '',
        proveedor: '',
        contacto: '',
        formaPago: '',
        tipoDespacho: ''
      },
      rules:{
        oc_cab:{
          proyecto: [
            (v) => !!v || 'Debes seleccionar un proyecto'
          ],
          moneda: [
            (v) => !!v || 'Debes seleccionar una moneda'
          ],
          tipoDocumento: [
            (v) => !!v || 'Debes seleccionar el tipo de documento'
          ],
          proveedor: [
            (v) => !!v || 'Seleccionar un proveedor'
          ],
          contacto: [
            (v) => !!v || 'Debes ingresar un nombre para este proveedor'
          ],
          formaPago: [
            (v) => !!v || 'Seleccionar una forma de pago'
          ],
          tipoDespacho: [
            (v) => !!v || 'Ingresa este valor'
          ]
        }
      },
      //campos para autocomplete de proveedor
      isLoading: false,
      search: null,

      //listas 
      listaImpuesto:[],
      listaTiposDocumento:[],
      listaTiposDespacho:[],
      listaMonedas:[],
      listaFlags:[],
      listaFormasPago:[],
      listaUnidadesProyecto:[],
      listaProveedores:[],
      listaContactos:[],
      listaProyectos:[],

      //otros valores
      usu_id:'',
      dialog: false,
      mostrarNoData:false,
      mostrarDialogCrearEntidad: false,
      valid: true,

      mostrarEdicionContacto: false
    }
  },
  created() {
    this.usu_id = this.$auth.user['https://kangusoft.cl/jwt/hasura'] && this.$auth.user['https://kangusoft.cl/jwt/hasura'].user_id
  },
  mounted() {    
    setTimeout(() => {
      this.cargarProyectosPorUsuarios()      
    }, 4000)
    this.cargarDatosFormulario()
    
  },
  methods: {
    mostrarDialog() {
      this.mostrarDialogCrearEntidad = true
    },
    cerrarDialog() {
      this.mostrarDialogCrearEntidad = false
    },
    async cargarDatosFormulario() {
      console.log('cargarDatosFormulario')
      const { data:{ kangusoft_emp_imp, kangusoft_emp_doctip, kangusoft_des_tip, kangusoft_emp_mon, kangusoft_fla, kangusoft_for_pag } } = await getDatosFormularioCabecera()

      for (const mon of kangusoft_emp_mon) {
        this.listaMonedas.push({ id: mon.mon.id, nombre:mon.mon.nombre })
      }
      for (const doc_tip of kangusoft_emp_doctip) {
        console.log('doc_tip.doc_ti: ', doc_tip.doc_tip)
        this.listaTiposDocumento.push({ id: doc_tip.doc_tip.id, nombre:doc_tip.doc_tip.nombre })
      }
      this.listaFormasPago = kangusoft_for_pag
      this.listaTiposDespacho = kangusoft_des_tip
      //this.listaImpuesto = kangusoft_emp_imp,
      //this.listaFlags = kangusoft_fla,
      
    },
    async cargarProyectosPorUsuarios() {
      const { data:{ kangusoft_apr } } = await getProyectosPorUsuario(this.usu_id && this.usu_id)

      for (const pro of kangusoft_apr) {
        console.log('pro: ', pro)
        // this.listaProyectos.push({ id:pro.pro.id, nombre:`${pro.pro.nombre} (${pro.pro.codigo})` })
        this.listaProyectos.push({ id:pro.pro.id, nombre:pro.pro.nombre, codigo:pro.pro.codigo })
      }
      console.log('this.listaProyectos: ', this.listaProyectos)
    },
    fetchEntriesDebounced() {
      console.log('PASO POR ACÁ !!!!')
      this.mostrarNoData = false
      // cancel pending call
      clearTimeout(this._timerId)
    
      // delay new call 500ms
      this._timerId = setTimeout(() => {
        this.buscarProveedor()
      }, 1000)
    },
    async buscarProveedor() {
      const { data } = await getProveedores(`%${this.search}%`)

      this.isLoading = false
      this.listaProveedores = data.kangusoft_ent

      if (this.listaProveedores.length === 0) {
        this.mostrarNoData = true
      }
    },
    async cargarContactos() {
      console.log('this.proveedor: ', this.oc_cab.proveedor)
      const { data } = await getContactos(this.oc_cab.proveedor.id)

      this.listaContactos = data.kangusoft_ent_con
      console.log('cargarContactos', data)
    },
    limpiarAutocompleate() {
      setTimeout(() => {
        console.log('PASO POR AQUÍ !!!!')
        this.mostrarNoData = false
        this.search = ''        
      }, 500)

    },
    validarInformacionGeneral() {
      return this.$refs.formPaso1.validate()
    },
    async editarContacto(item) {
      console.log('editar Contacto: ', item)
      this.mostrarEdicionContacto = true
    }
  },
  watch: {
    async search (val) {
      // Items have already been loaded
    //   if (this.items.length > 0) return

      // Items have already been requested
      if (this.isLoading) return
      if (!val) return
      this.isLoading = true

      // Lazily load input items
      this.fetchEntriesDebounced()
    }
  },
  computed: {
    auth() {
      return this.$auth.user['https://kangusoft.cl/jwt/hasura']
    }
  }

}