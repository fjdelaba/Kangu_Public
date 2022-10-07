/* eslint-disable no-unreachable */
import { getDte } from '../../../../graphql/finanzas'
import { creaPdfFactura } from '../../../../utils/pdf-factura-template'
import IndicadorIndividual from '../../../../components/general/indicador-individual/IndicadorIndividual.vue'

export default {
  name: 'DetalleRecepcionDte',
  components: {
    IndicadorIndividual
  },
  data() {
    return {
      pdf:'',
      id_recepcion: 0,
      datos_dte: {},
      datos_oc_ref: {},
      headersRecepcionesObra: [
        {
          text: 'Identificacion',
          align: 'start',
          sortable: false,
          value: 'identificacion'
        },
        { text: 'Fecha', value: 'fec_recepcion' },
        { text: 'Monto', value: 'monto' },
        { text: 'Usuario', value: 'usu.nombre' }
      ],
      headersRecepcionesDte: [
        {
          text: 'Folio',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Fecha Aceptacion', value: 'calories' },
        { text: 'Monto', value: 'fat' },
        { text: 'Usuario', value: 'carbs' },
        { text: 'Monto Moneda Original', value: 'carbs' }
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
    }
  },
  mounted() {
    console.log('mounted detalle recepciones')
    this.id_recepcion = this.$route.query.id
    console.log('this.id_recepcion: ', this.id_recepcion)
    this.muestraFactura()
    this.cargaDte()
  },
  methods: {
    async muestraFactura() {
      console.log('this.$store.state.app.datosEmpresa: ', this.$store.state.app.datosEmpresa)
      this.pdf = await creaPdfFactura(this.id_recepcion, this.$store.state.app.datosEmpresa, 2)
    },
    async cargaDte() {
      const { data:kangusoft_dte_cab } = await getDte(this.id_recepcion)

      console.log('kangusoft_dte_cab: ', kangusoft_dte_cab.kangusoft_dte_cab[0])
    
      this.datos_dte = kangusoft_dte_cab.kangusoft_dte_cab[0]
      this.datos_oc_ref = kangusoft_dte_cab.kangusoft_dte_cab[0].dte_cab_recs[0].oc

      console.log('this.datos_dte: ', this.datos_dte)
      console.log('this.datos_oc_ref: ', this.datos_oc_ref)
    }
  },
  computed: {
    getPdfBody() {
      return 'data:application/pdf,' + this.pdf
    }
  }
}