<template>
  <v-container>
    <div v-if="$store.state.app.permisosUsuario.oc">
      <div>
        <h2>Aprobar OC</h2>
        <tabla-consulta :aprobar="aprobar" :origen="1"></tabla-consulta>
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
<script src="./aprobar/aprobar.js"></script>
<style scoped src="./aprobar/aprobar.css"></style>