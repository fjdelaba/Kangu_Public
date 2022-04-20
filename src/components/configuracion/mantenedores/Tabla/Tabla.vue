<template>
  <div v-if="!this.$parent.$refs.botonMantenedor.mostrarBotones">
    <h2>Tabla Mantenedor</h2>
    <v-col
      cols="12"
      style="min-width: 600px"
      class="flex-grow-0 flex-shrink-1 w-full"
    >
      <v-data-table
        :headers="headers"
        :items="lista"
        :items-per-page="5"
        class="elevation-1"
        style="min-width: 1550px"
      ></v-data-table>
    </v-col>
  </div>
</template>
<style src="./Tabla.css"></style>
<script src="./Tabla.js"></script>
