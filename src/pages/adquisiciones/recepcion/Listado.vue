<template>
  <v-container>
    <div v-if="$store.state.app.permisosUsuario.recepcion">
      <div>
        <h2>Listar Recepcion</h2>
        <tabla-listado></tabla-listado>
      </div>
    </div>
    <div v-else>
      <h2>No tienes permisos para ver esta seccion</h2>
    </div>
  </v-container>
</template>

<script src="./listado/Listado.js"></script>
<style scoped src="./listado/Listado.css"></style>