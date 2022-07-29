<template>
  
  <v-data-table
    :headers="cabecera"
    :items="_lista"
    item-key="id"
    hide-default-footer
    class="elevation-1"
    :items-per-page="lista.length"
    dense
  >
  </v-data-table>
  
</template>

<script src="./TablaAgregarMaterial.js"></script>
<style scoped src="./TablaAgregarMaterial.css"></style>