/* eslint-disable */
export default {
  components: {

  },
  props: {
   
    label: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      selectedInterval: 'Hoy',
      intervals: [
        'Hoy',
        'Hace 7 dias',
        'Hace 1 mes',
        'Hace 1 Año'
      ],
      daysOfWeek: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    }
  },
  methods:{
    getDay(date) {
      console.log("date:", date);
      let i = new Date(date).getDay(date);
      return this.daysOfWeek[i];
    },
  },
  computed: {
    
   
  }
}