<template>

  <v-container class="white ">
    <h2>
      Mi Información
    </h2>
    <detalle-usuario :origen="2"></detalle-usuario> <!-- Confoguracion: 1; Mi Perfil :2  -->
  </v-container>
</template>

<script>
import DetalleUsuario from '../components/configuracion/usuario/detalle/Detalle.vue'
export default {
  name:'MiPerfil',
  components:{
    DetalleUsuario
  }
}
</script>

<style>

</style>