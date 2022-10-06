<template>
  <v-container>
    <div v-if="$store.state.app.permisosUsuario.pedido == true">
      <div>
        <h2>Crear Pedido</h2>
        <crear-pedido ref="refcrearpedido"></crear-pedido>
       
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
<script src="./Crear/Crear.js"></script>
