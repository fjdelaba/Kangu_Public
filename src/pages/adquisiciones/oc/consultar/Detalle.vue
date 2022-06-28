<template>
  <v-container>
    <div>
      <h2>
        Detalle Consultas {{ cabeceraOcSeleccionada }}
      </h2>
      <previsualizacion :materiales="materialesOcSeleccionada" :cabecera="cabecera" observacion=""></previsualizacion>
    </div>
  </v-container>
</template>
<script src="./detalle/detalle.js"></script>