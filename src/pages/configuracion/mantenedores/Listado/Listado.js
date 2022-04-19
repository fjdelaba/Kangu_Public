/* eslint-disable */
import BotonMantenedor from '../../../../components/configuracion/mantenedores/Boton/Boton.vue'
import TablaMantenedor from '../../../../components/configuracion/mantenedores/Tabla/Tabla.vue'
import gql from 'graphql-tag'

export default {
  mounted() {
    // alert('COMPONENTE')
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    kangusoft_mantendores: gql`query {
      kangusoft_mantendores {
        emp_fk
        icono
        id
        link
        nombre
      }
    }`
    
  },
  data() {
    return {
      
    }
  },

  components: {
    BotonMantenedor,
    TablaMantenedor
  }
}
