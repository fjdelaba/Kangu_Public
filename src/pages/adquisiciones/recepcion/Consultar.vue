<template>
  <v-container>
    <div v-if="$store.state.app.permisosUsuario.recepcion">
      <div>
        <h2>Consultar Recepcion</h2>
      </div>
    </div>
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