<template>
  <v-card>
    <v-card-title class="text-h5">
      Tienes una Orden de compra por terminar
    </v-card-title>
    <v-card-text>El dia xxxxx dejaste una orden de compra sin terminar llamada xxxxxxxxx ¿Deseas terminarla?</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="green darken-1"
        text
        @click="_eliminarBorrador()"
      >
        No, deseo eliminarla
      </v-btn>
      <v-btn
        color="green darken-1"
        text
        @click="_recuperarBorrador()"
      >
        Si
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script src="./DialogBorrador.js"></script>
<style scoped src="./DialogBorrador.css"></style>