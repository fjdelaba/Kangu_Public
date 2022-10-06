<template>
  <v-container>
    <div v-if="$store.state.app.permisosUsuario.pedido == true">
      <h2>Consultar Pedido</h2>
      <v-row>
        <v-col cols="12">
          <tabla-consulta></tabla-consulta>
        </v-col>
      </v-row>
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

<script src="./Consultar/Consultar.js"></script>

<style scoped>
.error-page {
  max-width: 1080px;
}
div {
  
  font-weight:bold
}
</style>