<template>
  <v-container>
    <div v-if="skeleton">
      <v-skeleton-loader
        type="card-avatar, article, actions"
      ></v-skeleton-loader>
    </div>
    <div v-if="!skeleton">
      <h2>
        Detalle Consultas {{ cabeceraOcSeleccionada }}
      </h2>
<previsualizacion
        :materiales="materialesOcSeleccionada"
        :cabecera="cabecera"
        observacion=""
        :origen="3"
        :aprobadores="aprobadores"
        :tipo_documento="tipo_documento"
        :consultas="consulta"
      ></previsualizacion>

    </div>
  
  </v-container>
</template>
<script src="./detalle/detalle.js"></script>
<style src="./detalle/detalle.css"></style>