/* eslint-disable */
export default {
  props: {
   botones: Array,
   cargarMantenedor: Function
  },
 
 
  data() {
    return {
      mostrarBotones: true,
      mantenedorSelec:"",
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    }
  },
  methods: {
    mostrarMantenedor(mantenedor){
     this.mantenedorSelec = mantenedor
     console.log( this.mantenedorSelec)
     this.mostrarBotones = false
    this.$emit('cargarMantenedor',mantenedor)
    }
  },
  computed: {
    cambioBoton() {
      return this.mostrarBotones = true
    },
  },
}