<template>
  <div>
    <v-data-table
      :headers="totalesHeaders"
      :items="cpxTotalesItems"
      hide-default-header
      hide-default-footer
      dense
      class="elevation-1"
    ></v-data-table>
  </div>

</template>
<script src="./CuadroResumen.js"></script>

<style scoped src="./CuadroResumen.css"></style>