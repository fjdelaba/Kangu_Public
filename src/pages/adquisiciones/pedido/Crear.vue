<template>
  <v-container>
    <div v-if="$store.state.app.permisosUsuario.pedido">
      <div>
        <h2>Crear Pedido</h2>
        <crear-pedido ref="refcrearpedido"></crear-pedido>
       
      </div></div>
    <div v-else>
      <h2>No tienes permisos para ver esta seccion</h2>
    </div>
  </v-container>

</template>
<script src="./Crear/Crear.js"></script>
