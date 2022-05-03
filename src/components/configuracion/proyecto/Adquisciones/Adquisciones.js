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
          text: 'Orden',
          align: 'start',
          sortable: false,
          value: 'n'
        },
        { text: 'Nombre', value: 'name' },
        { text: 'Hasta', value: 'fat' },
        { text: 'Tiempo de Aprobación', value: 'carbs' }
      ],
      desserts: [
        {
          name: 'Bastian Medina',
          n: 1,
          fat: '$233.000',
          carbs: '24 HORAS'
        },
        {
          name: 'Felipe de la Barra',
          n: 2,
          fat: '$22.233.000',
          carbs: '2 HORAS'
        },
        {
          name: 'Esteban Loaiza',
          n: 3,
          fat: '$2.332.000',
          carbs: '24 HORAS'
        },
        {
          name: 'Felipe Allendes',
          n: 4,
          fat: '$1.133.000',
          carbs: '48 HORAS'
        }]
    }
  }
}