/* eslint-disable */
import CuadroResumen from '../../../general/cuadro-resumen/CuadroResumen.vue'
import Pipeline from '../../../general/pipeline/Pipeline.vue'
import DistribucionLineasPartidas from '../../../adquisiciones/distribucion-lineas-partidas/DistribucionLineasPartidas.vue'
import { getAprobadoresProyecto } from '../../../../graphql/aprobaciones'
import {creaPdfOC} from '../../../../utils/pdf-oc-template.js'

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
    listaPartidas: [],
    consultas:"",
    aprobacion:"",
    regla:[]
  },

  data() {
    return {
      icon: "mdiClockTimeEightOutline" ,
      // materiales: [],
      // cabecera: {},
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
      aprobadores:[],
      apruebo:"a",
      respuesta:"1"
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
    },
    async aprueboOc(){
    this.apruebo = true
    this.respuesta = 'success'
    this.regla = [() => true]
    console.log(" this.apruebo", this.apruebo)
    },
    async descargarOcPDF(){
      await creaPdfOC(this.materiales,this.cabecera)
    },
    rechazoOc(){
     this.apruebo = false
     this.respuesta = 'error'
     this.regla = [() => false]
     console.log(" this.apruebo", this.cpxvalidacion)
    }
   
  },
  mounted() {
    console.log('mounted previsualizacion')
    console.log(" this.res", this.apruebo)
  },
  computed: {
    cpxFecha() {
      return this.$moment(new Date()).format('DD/MM/yy')
    },
    cpxvalidacion(){
     return this.apruebo
    },
    cpxColor(){
      return  this.respuesta
    },
    cpxRegla(){
      return  this.regla
    },
    cpxTitulo(){
      return this.apruebo == true ? "Aprobado" : "Rechazado"
    }
  }
}