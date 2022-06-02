import CuadroResumen from '../../../general/cuadro-resumen/CuadroResumen.vue'
import Pipeline from '../../../general/pipeline/Pipeline.vue'

export default {
  components:{
    CuadroResumen,
    Pipeline
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
      pie:{
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // legend: {
        //   orient: 'vertical',
        //   left: 'left',
        //   data: ['Blog Referral', 'Newsletter Users', 'Email Forwarding', 'Referral links', 'Eating pie']
        // },
        series: [
          {
            name: 'Distribucion de Partidas',
            type: 'pie',
            radius: '60%',
            center: ['50%', '60%'],
            color: ['#FF9F43','#28C76F','#EA5455','#87ceeb','#7367F0'],
            data: [
              { value: 335, name: 'Blog Referral' },
              { value: 310, name: 'Newsletter Users' },
              { value: 234, name: 'Email Forwarding' },
              { value: 135, name: 'Referral links' },
              { value: 1548, name: 'Eating pie' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }},
  methods: {
    cargarPieChart() {
      const partidas = []

      for (const ps of this.materiales) {
        console.log('ps: ', ps)
        for (const p of ps.par_fk) {
          partidas.push(p)
        }
      }
      console.log('partidas: ', partidas)
      // let dataIndex = -1
      // const { pie } = this.$refs
      // const dataLen = this.pie.options.series[0].data.length

      // setInterval(() => {
      //   pie.dispatchAction({
      //     type: 'downplay',
      //     seriesIndex: 0,
      //     dataIndex
      //   })
      //   dataIndex = (dataIndex + 1) % dataLen
      //   pie.dispatchAction({
      //     type: 'highlight',
      //     seriesIndex: 0,
      //     dataIndex
      //   })
      //   pie.dispatchAction({
      //     type: 'showTip',
      //     seriesIndex: 0,
      //     dataIndex
      //   })
      // }, 1000)
    }
  },
  mounted() {
    console.log('mounted previsualizacion')
    this.cargarPieChart()
  }
}