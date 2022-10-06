<template>
  <v-container>
    <div v-if="$store.state.app.permisosUsuario.pedido">
      <div>
        <h2>Aprobar Pedido</h2>
        <tabla-consulta></tabla-consulta>
      </div></div>
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
<script src="./Aprobar/Aprobar.js"></script>
<style scoped src="./Aprobar/Aprobar.css"></style>