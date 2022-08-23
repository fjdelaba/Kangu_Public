<template>
  <v-container>
    {{ comentarioPedido }}
    <v-textarea
      v-model="comentarioPedido"
      outlined
      label="Comentario al comprador"
      counter
      maxlength="120"
      @change="cargarComentario"
    ></v-textarea>
  </v-container>
</template>
<script src="./comentario-comprador.js"></script>