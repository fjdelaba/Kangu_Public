<template>
  <v-container>
    <div v-if="$store.state.app.permisosUsuario.oc">
      <div>
        <h2>Pendientes de Compra</h2>
      </div></div>
    <div v-else>
      <h2>No tienes permisos para ver esta seccion</h2>
    </div>
  </v-container>
</template>
<script src="./pendientes/Pendientes.js"></script>
<style scoped src="./pendientes/Pendientes.css"></style>