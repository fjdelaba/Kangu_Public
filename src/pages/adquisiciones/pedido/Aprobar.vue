<template>
  <v-container>
    <div v-if="$store.state.app.permisosUsuario.pedido">
      <div>
        <h2>Aprobar Pedido</h2>
        <crear-pedido></crear-pedido>
      </div></div>
    <div v-else>
      <h2>No tienes permisos para ver esta seccion</h2>
    </div>
  </v-container>
</template>
<script src="./Aprobar/Aprobar.js"></script>
<style scoped src="./Aprobar/Aprobar.css"></style>