<template>
  <v-container>
    <v-textarea
      v-if="vista == 'crear'" 
      v-model="comentarioPedido"
      outlined
      label="Comentario al comprador"
      counter
      maxlength="120"
      @change="cargarComentario"
    ></v-textarea>
    <v-textarea
      v-if="vista == 'detalle'" 
      v-model="comentario"
      outlined
      label="Comentario al comprador"
      counter
      readonly
      maxlength="120"
      @change="cargarComentario"
    ></v-textarea>
  </v-container>
</template>
<script src="./comentario-comprador.js"></script>