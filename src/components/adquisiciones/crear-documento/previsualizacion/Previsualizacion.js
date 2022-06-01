import CuadroResumen from '../../../general/cuadro-resumen/CuadroResumen.vue'
export default {
  components:{
    CuadroResumen
  },
  props: {
    materiales:[],
    cabecera: {},
    observacion: ''
  },
  data() {
    return {
      materiales: [],
      cabecera: {},
      logo: 'https://kangufiles.nyc3.digitaloceanspaces.com/kangu/logo_dlb.png',
      headers: [
        {
          text: 'Material',
          align: 'start',
          sortable: false,
          value: 'nombre'
        },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'Precio', value: 'precio_unitario' },
        { text: 'Subtotal', value: 'total' }
      ]
    }},
  methods: {
  },
  mounted() {
    console.log('mounted previsualizacion')
  }
}