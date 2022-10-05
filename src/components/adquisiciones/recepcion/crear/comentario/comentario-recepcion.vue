<template>
  <v-container>
    <v-textarea
      v-if="vista == 'crear'" 
      v-model="comentario"
      outlined
      label="Comentario de Recepción"
      counter
      maxlength="120"
      @change="cargarComentario"
    ></v-textarea>
    <v-textarea
      v-if="vista == 'detalle'" 
      v-model="comentario"
      outlined
      label="Comentario de Recepción"
      counter
      readonly
      maxlength="120"
      @change="cargarComentario"
    ></v-textarea>
  </v-container>
</template>
<script src="./comentario-recepcion.js"></script>