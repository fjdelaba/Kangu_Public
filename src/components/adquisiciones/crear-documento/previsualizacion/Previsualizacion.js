/* eslint-disable */
import CuadroResumen from '../../../general/cuadro-resumen/CuadroResumen.vue'
import Pipeline from '../../../general/pipeline/Pipeline.vue'
import DistribucionLineasPartidas from '../../../adquisiciones/distribucion-lineas-partidas/DistribucionLineasPartidas.vue'
import { getAprobadoresProyecto } from '../../../../graphql/aprobaciones'

export default {
  name:'Previsualizacion',
  components:{
    CuadroResumen,
    Pipeline,
    DistribucionLineasPartidas
  },
  props: {
    materiales:[],
    cabecera: {},
    observacion: '',
    listaPartidas: []
  },
  mounted() {
   console.log("PROPS:",this.cabecera)
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
          value: 'mat',
          width: '400px'
        },
        // { text: 'C.C', value: 'oc_det_pars', sortable: false, width: '200px' },
        { text: 'Cant.', value: 'cantidad', width: '100px', sortable: false, align: 'center' },
        { text: 'P. Unitario', value: 'precio_unitario', width: '100px', sortable: false, align: 'center' },
        { text: 'Subtotal', value: 'total', width: '100px', sortable: false, align: 'center' }
        // { text: 'Acciones', value: 'actions', sortable: false }
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
    },
    getNombrePartida(idPartida) {
      const searchObject = this.listaPartidas.find((partida) => {
        console.log('partida: ', partida)
        console.log('idPartida: ', idPartida)

        return Number(partida.id) === Number(idPartida)
      })

      console.log('searchObject: ', searchObject)

      return searchObject.nombre
    }
  },
  mounted() {
    console.log('mounted previsualizacion')
  },
  computed: {
    cpxFecha() {
      return this.$moment(new Date()).format('DD/MM/yy')
    }
  }
}