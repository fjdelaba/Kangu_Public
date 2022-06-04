export default {
  name: 'DistribucionLineasPartidas',
  props: {
    origen:{
      default: 0,
      Type:Number
    },
    materiales: []
  },
  data () {
    return {
      headersLineas: [
        {
          text: 'Material',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Cantidad', value: 'calories' },
        { text: 'Precio', value: 'fat' },
        { text: 'Presupuestado', value: 'carbs' },
        { text: 'Gastado', value: 'protein' },
        { text: 'Saldo', value: 'iron' },
        { text: 'Total', value: 'iron' }
      ],
      headersPartidasOC: [
        {
          text: 'Nombre Cuenta de Costo',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Saldo Partida', value: 'calories' },
        { text: 'Monto OC Actual', value: 'fat' },
        { text: 'Excede', value: 'carbs' }
      ],
      headersPartidasApro: [
        { text: 'Codigo Partida', value: 'calories' },
        {
          text: 'Nombre Cuenta de Costo',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Monto OC Actual', value: 'fat' },
        { text: 'Presupuestado', value: 'calories' },
        { text: 'Saldo Partida', value: 'calories' },
        { text: 'En Aprobacion', value: 'calories' },
        { text: 'Excede', value: 'carbs' }
      ],
      dataLineas: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        }
      ],
      dataPartidas: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        }
      ]
    }
  },
  methods: {
    getColor (calories) {
      if (calories > 400) return 'red'
      else if (calories > 200) return 'orange'
      else return 'green'
    }
  }
}