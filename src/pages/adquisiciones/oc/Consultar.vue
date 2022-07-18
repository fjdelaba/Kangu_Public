<template>
  <v-container>
    <div v-if="$store.state.app.permisosUsuario.oc">
      <div>
        <h2>Consultar OC</h2>
        <tabla-consulta :consulta="consulta" :origen="2"></tabla-consulta>
      </div>
    </div>
    <div v-else>
      <h2>No tienes permisos para ver esta seccion</h2>
    </div>
  </v-container>
</template>
<script src="./consultar/consultar.js"></script>
<style scoped src="./consultar/consultar.css"></style>