import { getDatosFormularioCabecera } from '../../../../graphql/adquisiciones'
import { getProveedores, getContactos } from '../../../../graphql/general'
export default {

  data() {
    return {
      // vmodels
      proyecto: '',
      nombre: '',
      moneda: '',
      tipoDocumento: '',
      //flags
      proveedor: '',
      contacto: '',
      formaPago: '',
      tipoDespacho: '', 

      //campos para autocomplete de proveedor
      descriptionLimit: 60,
      entries: [],
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
      listaContactos:[]
    }
  },
  mounted() {
    this.cargarDatosFormulario()
  },
  methods: {
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
    fetchEntriesDebounced() {
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
      console.log('search data: ', data)
    },
    async cargarContactos() {
      console.log('this.proveedor: ', this.proveedor)
      const { data } = await getContactos(this.proveedor.id)
      
      this.listaContactos = data.kangusoft_ent_con
      console.log('cargarContactos', data)
    }
  },
  watch: {
    async search (val) {
      // Items have already been loaded
    //   if (this.items.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      this.fetchEntriesDebounced()
    }
  }

}