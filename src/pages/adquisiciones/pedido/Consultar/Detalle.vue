<template>
  <v-container>
    <div v-if="skeleton">
      <v-skeleton-loader
        type="card-avatar, article, actions"
      ></v-skeleton-loader>
    </div>
    <div v-if="!skeleton">
      <h2>
        Detalle Pedido
      </h2>
    </div>
  
  </v-container>
</template>
<script src="./Detalle/Detalle.js"></script>