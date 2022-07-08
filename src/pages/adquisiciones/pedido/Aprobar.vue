<template>
  <v-container>
    <div v-if="$store.state.app.permisosUsuario.pedido">
      <div>
        <h2>Aprobar Pedido</h2>
      </div></div>
    <div v-else>
      <h2>No tienes permisos para ver esta seccion</h2>
    </div>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>