import gql from 'graphql-tag'

const GET_VALORES_GENERALES = gql`
query MyQuery{
  kangusoft_desp_tipo {
    activo
    nombre
    id
    editable
  }
  kangusoft_doc_tipo {
    id
    nombre
  }
  kangusoft_forma_pago {
    activo
    editable
    id
    nombre
  }
  kangusoft_moneda {
    editable
    activo
    id
    nombre
  }
}
`

const GET_PROYECTOS = gql`
query MyQuery($id_usuario: bigint!, $id_flujo_apro: Int!) {
  kangusoft_func_proyectosbyuser(
    args:{id_usuario:$id_usuario, id_flujo_apro: $id_flujo_apro}
  ){
    id,
    nombre
  }
}
`
const GET_PROVEEDORES = gql`
query MyQuery($nombrerut: String) {
  kangusoft_ee(where: {_or: [{razon_social: {_ilike: $nombrerut}}, {rut: {_ilike: $nombrerut}}] }) {
    email_dte
    fec_creacion
    fec_movimiento
    id
    razon_social
    rut
    activo
    usu_creacion_fk
    usu_movimiento_fk
  }
}
`

export default {
  created() {
    this.usu_id = this.$auth.user['https://kangusoft.cl/jwt/hasura'] && this.$auth.user['https://kangusoft.cl/jwt/hasura'].user_id
  },
  mounted() {
    this.cargarValoresGenerales()
    this.cargarProyectos()
  },
  data() {
    return {
      usu_id:0,
      pasoStep: 1,
      
      valid: false,
      //
      proyecto:'',
      proyectoRules: [
        (v) => !!v || 'Selecciona un proyecto'
      ],
      nombreOC: '',
      nombreOCRules: [
        (v) => !!v || 'Debes Ingresar el nombre'
      ],
      moneda: '',
      monedaRules: [
        (v) => !!v || 'Selecciona un moneda'
      ],
      tipoDocumento: '',
      tipoDocumentoRules: [
        (v) => !!v || 'Selecciona un tipo de Documento'
      ],
      tipoOC:'',
      tipoOCRules: [
        (v) => !!v || 'Selecciona el tipo de OC'
      ],
      proveedor: '',
      proveedorRules:[
        (v) => !!v || 'Selecciona un proveedor'
      ],
      vendedor: '',
      vendedorRules:[
        (v) => !!v || 'Selecciona un vendedor'
      ],
      pago:'',
      pagoRules:[
        (v) => !!v || 'Selecciona una forma de pago'
      ],
      despacho: '',
      despachoRules:[
        (v) => !!v || 'Selecciona un tipo de Despacho'
      ],
      descriptionLimit: 60,
      isLoading: false,
      search: null,
      listaMonedas:[],
      listaFormaPago: [],
      listaDespacho: [],
      listaTipoDocumento: [],
      listaProyectos: [],
      listaProveedores:[],
      listaTipoOC:[
        { id:0, nombre:'Directa' },
        { id:1, nombre:'Pedido' },
        { id:2, nombre:'Cotizacion' }
      ]
    }
  },
  computed: {
    validarPasoUno() {
      return this.$refs.formPaso1.validate()
    },
    fields () {
      if (!this.proveedor) return []

      return Object.keys(this.proveedor).map((key) => {
        return {
          key,
          value: this.proveedor[key] || 'n/a'
        }
      })
    },
    items () {
      return this.listaProveedores.map((entry) => {
        console.log('entriiiii: ', entry)
        const Description = entry.razon_social.length > this.descriptionLimit
          ? entry.razon_social.concat(`(${entry.rut})`).slice(0, this.descriptionLimit) + '...'
          : `${entry.razon_social}(${entry.rut})`

        return Object.assign({}, entry, { Description })
      })
    }
  },
  methods: {
    async cargarProyectos() {    
      const { data }  = await this.$apollo.query({
        query: GET_PROYECTOS,
        variables:{
          'id_usuario': 1,
          'id_flujo_apro': 3
        }
      })

      console.log('data data: ', data.kangusoft_func_proyectosbyuser)
      this.listaProyectos = data.kangusoft_func_proyectosbyuser
    },
    async cargarProveedores(val) {    
      console.log('cargar proveedor ---- ', `%${this.proveedor}%`)
      const { data }  = await this.$apollo.query({
        query: GET_PROVEEDORES,
        variables:{
          'nombrerut':`%${val}%`
        }
      })

      //this.count = data.kangusoft_ee.razon_social
      this.listaProveedores = data.kangusoft_ee
      //this.entries = data.kangusoft_ee.razon_social
      console.log('this.listaProveedores: ', this.listaProveedores)
    
      //   this.listaProyectos = data.kangusoft_func_proyectosbyuser
    },
    async cargarValoresGenerales() {
      const { data }  = await this.$apollo.query({
        query: GET_VALORES_GENERALES
      })

      this.listaMonedas = data.kangusoft_moneda
      this.listaDespacho = data.kangusoft_desp_tipo
      this.listaFormaPago = data.kangusoft_forma_pago
      this.listaTipoDocumento = data.kangusoft_doc_tipo
      
      console.log(data)
    },
    siguiente() {
      this.pasoStep++
      console.log(this.$refs.formPaso1.validate())
    },
    atras() {
      this.pasoStep--
      console.log(this.$refs.formPaso1.validate())
    }
  },
  watch: {
    async search (val) {
      console.log('vallllll: ', val)
      // Items have already been loaded
      if (this.items.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      await this.cargarProveedores(val)
      this.isLoading = false

      // Lazily load input items

      //   fetch('https://api.publicapis.org/entries')
      //     .then((res) => res.json())
      //     .then((res) => {
      //       const { count, entries } = res

    //       this.count = count
    //       this.entries = entries
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    //     .finally(() => (this.isLoading = false))
    }
  }
}
