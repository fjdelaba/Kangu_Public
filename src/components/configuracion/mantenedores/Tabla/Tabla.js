/* eslint-disable */
export default {
  mounted() {
    
    console.log(this.$parent.$refs.botonMantenedor)
 },
  props: {
    mantenedores: Array,
    lista: Array
   },
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nombres', value: 'nombre' },
        { text: 'Activo', value: 'activo' },
        { text: 'Accion', value: 'nombre' },
      
     
      ],
    }
  }
}
