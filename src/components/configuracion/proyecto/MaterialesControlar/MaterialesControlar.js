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
        { text: 'Cantidad', value: 'fat' },
        { text: 'Unidad/Formato', value: 'a' },
        { text: 'Valor Unitario', value: 'b' },
        { text: 'Valor Total', value: 's' },
        { text: '% del Presupuesto', value: 'd' }
      ],
      desserts: [
        {
          name: 'Casco Seguridad',
          n: 4132,
          fat: '45',
          a: 'Unidad',
          b: '$980',
          s: '$45.000',
          d: '45%'
        }]
    }
  }
}