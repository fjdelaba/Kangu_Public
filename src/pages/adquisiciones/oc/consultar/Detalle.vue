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
        :consultas="consulta"
        :tipo_documento="tipo_documento"
        :origen="3"
      ></previsualizacion>
     
      <v-btn @click="verPdf1()">Ver PDF </v-btn>
      <v-dialog v-model="verPdf"> <pdf
        ref="refpdf"
        :materiales="materialesOcSeleccionada"
        :cabecera="cabecera"
        observacion=""
        :tipo_documento="tipo_documento"
      ></pdf>  <v-btn @click="exportToPDF()">Descargar PDF </v-btn></v-dialog>

    </div>
  
  </v-container>
</template>
<script src="./detalle/detalle.js"></script>
<style src="./detalle/detalle.css"></style>