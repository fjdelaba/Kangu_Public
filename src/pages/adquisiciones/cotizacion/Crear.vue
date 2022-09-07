<template>
  <v-container>
    <div v-if="$store.state.app.permisosUsuario.cotizacion">
      <div>
        <h2>Crear Cotización</h2>
      </div></div>
    <div v-else>
      <v-card class="text-center w-full error-page pa-4 mx-auto">
        <v-img src="../../../assets/images/permiso.png" max-height="250" contain />
        <div class="display-2 mt-6">OOPS!!!</div>
        <div class="mt-3 mb-6">No tienes permisos para ver está página. Contacta al administrador de Kangusoft si necesitas tener habilitada esta página</div>
        <v-btn to="/" block large color="primary">Notificar al administrador de  Kangusoft</v-btn>
      </v-card>
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