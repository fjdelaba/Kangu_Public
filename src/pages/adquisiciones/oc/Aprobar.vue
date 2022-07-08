<template>
  <v-container>
    <div v-if="$store.state.app.permisosUsuario.oc">
      <div>
        <h2>Aprobar OC</h2>
        <tabla-consulta :aprobar="aprobar"></tabla-consulta>
      </div>
    </div>
    <div v-else>
      <h2>No tienes permisos para ver esta seccion</h2>
    </div>
  </v-container>
</template>
<script src="./aprobar/aprobar.js"></script>
<style scoped src="./aprobar/aprobar.css"></style>