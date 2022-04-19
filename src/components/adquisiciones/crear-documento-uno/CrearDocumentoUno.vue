<template>
  <v-row :align="align" no-gutters style="height: 150px">
    <v-col v-for="n in 3" :key="n">
      <v-card class="pa-2" outlined tile> One of three columns </v-card>
    </v-col>
  </v-row>
</template>

<script src="./CrearDocumentoUno.js"></script>

<style scoped src="./CrearDocumentoUno.css"></style>
