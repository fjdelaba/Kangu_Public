<template>
  <v-container>
    <div v-if="$store.state.app.permisosUsuario.recepcion">
      <div>
        <h2>Consultar Recepcion</h2>
        <tabla-consulta :consulta="consulta" :origen="3"></tabla-consulta>
      </div>
    </div>
    <div v-else>
      <h2>No tienes permisos para ver esta seccion</h2>
    </div>
  </v-container>
</template>
<script src="./consultar/Consultar.js"></script>