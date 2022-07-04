<template>
  <v-container class="white">
    <div>
      <h2>
        Detalle Usuario
      </h2>
      <detalle-usuario :origen="1"></detalle-usuario> <!-- Confoguracion: 1; Mi Perfil :2  -->
    </div>
  </v-container>

</template>

<script>
import DetalleUsuario from '../../../components/configuracion/usuario/detalle/Detalle.vue'
export default {
  name:'PageDetalleUsuario',
  components: {
    DetalleUsuario
  }
}
</script>

<style>

</style>