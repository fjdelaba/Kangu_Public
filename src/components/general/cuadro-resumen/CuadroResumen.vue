<template>
  <div>
    <v-data-table
      :headers="totalesHeaders"
      :items="cpxTotalesItems"
      hide-default-header
      hide-default-footer
      dense
      class="elevation-1"
    >
      <template v-slot:item.valor="{ item }">
        <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:70px">
          <span>{{ item.valor | currency }}</span> 
        </div>
      </template></v-data-table>
  </div>

</template>
<script src="./CuadroResumen.js"></script>

<style scoped src="./CuadroResumen.css"></style>