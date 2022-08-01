<template>
  <v-container>
    <div v-if="$store.state.app.permisosUsuario.cotizacion">
      <div>
        <h2>Crear Cotización</h2>
      </div></div>
    <div v-else>
      <h2>No tienes permisos para ver esta sección</h2>
    </div>
  </v-container>
</template>

<script>

import CrearDocumento from '../../../components/adquisiciones/crear-documento/CrearDocumento.vue'
export default {
  components: {
    
  }
}
</script>

<style>

</style>