<template>
  <v-container>
    <div v-if="$store.state.app.permisosUsuario.recepcion">
      <div>
        <h2>Consultar Recepcion</h2>
        <tabla-consulta :consulta="consulta" :origen="3"></tabla-consulta>
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
<script src="./consultar/Consultar.js"></script>