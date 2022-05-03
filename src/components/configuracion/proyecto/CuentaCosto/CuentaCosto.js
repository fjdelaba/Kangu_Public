export default {
  data() {
    return {
      select: ['Vuetify', 'Programming'],
      items: [
        'Programming',
        'Design',
        'Vue',
        'Vuetify'
      ],
      headers: [
        {
          text: 'Codigo',
          align: 'start',
          sortable: false,
          value: 'n'
        },
        { text: 'Nombre', value: 'name' },
        { text: 'Presupuesto Asignado', value: 'fat' },
        { text: '% del presupuesto total', value: 'carbs' }
      ],
      desserts: [
        {
          name: 'Ventanas',
          n: 4132,
          fat: '$233.000',
          carbs: '55%'
        }]
    }
  }
}