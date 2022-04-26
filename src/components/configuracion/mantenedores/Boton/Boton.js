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