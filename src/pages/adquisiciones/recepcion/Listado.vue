<template>
  <v-container>
   
    <div v-if="$store.state.app.permisosUsuario.recepcion">
      <div>
        <h2>Listar Recepcion</h2>
        <tabla-listado></tabla-listado>
      </div>
    </div>
    <div v-else>
      <div v-if="cpxSkeleton">
        <v-skeleton-loader
          type="card-avatar, article, actions"
        ></v-skeleton-loader>
      </div>
      <div v-else>
        <card-sin-permiso></card-sin-permiso>
      </div>
  
    </div>
  </v-container>
</template>

<script src="./listado/Listado.js"></script>
<style scoped src="./listado/Listado.css"></style>