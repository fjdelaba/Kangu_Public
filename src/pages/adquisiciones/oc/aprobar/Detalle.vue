<template>
  <v-container>
    <div>
      <h2>Detalle Aprobar</h2>
      <previsualizacion :materiales="[]" :cabecera="[]" observacion=""></previsualizacion>
    </div>
  </v-container>
</template>

<script>
import Previsualizacion from '../../../../components/adquisiciones/crear-documento/previsualizacion/Previsualizacion.vue'
export default {
  components: {
    Previsualizacion
  }
}
</script>

<style>

</style>