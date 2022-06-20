import CuadroResumen from '../../../general/cuadro-resumen/CuadroResumen.vue'
import Pipeline from '../../../general/pipeline/Pipeline.vue'
import DistribucionLineasPartidas from '../../../adquisiciones/distribucion-lineas-partidas/DistribucionLineasPartidas.vue'
import { getAprobadoresProyecto } from '../../../../graphql/aprobaciones'

export default {
  components:{
    CuadroResumen,
    Pipeline,
    DistribucionLineasPartidas
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
      ],
      tab: 'documento',
      comentarioAprobadores: '',
      aprobadores:[]
    }},
  methods: {
    async cargarAprobadores() {
      this.aprobadores = []
      const { data:{ kangusoft_apr } } = await getAprobadoresProyecto()

      for (const apro of kangusoft_apr) {
        this.aprobadores.push({ nombre:`${apro.usuByUsuAproFk.nombre} ${apro.usuByUsuAproFk.apellidos}`, id:apro.id })
      }
      console.log('this.aprobadores: ', this.aprobadores)
    },
    changeTab() {
      console.log('change')
    },
    clickTab() {
      console.log('click')
      this.cargarAprobadores()
    }
  },
  mounted() {
    console.log('mounted previsualizacion')
  }
}