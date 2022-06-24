<template>
  <div>
    <h2>
      Detalle Consultas
    </h2>
    <previsualizacion :materiales="[]" :cabecera="[]" observacion=""></previsualizacion>
  </div>
  
</template>

<script>
import Previsualizacion from '../../../../components/adquisiciones/crear-documento/previsualizacion/Previsualizacion'
export default {
  components: {
    Previsualizacion
  }
}
</script>

<style>

</style>