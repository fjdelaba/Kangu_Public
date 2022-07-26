<template>
  <v-data-table
    :headers="cabecera"
    :items="lineas"
    :items-per-page="lineas.length"
    hide-default-footer
    dense
    class="elevation-1"
  >
    <template v-slot:item.cant_ajustada="{ item }">
      <div class="font-weight-bold">{{ item.cant_ajustada | currency_2 }}</div>
    </template>
    <template v-slot:item.cant_recepcion="{ item }">
      <div class="font-weight-bold">{{ item.cant_recepcion | currency_2 }}</div>
    </template>
    <template v-slot:item.cant_por_recepcionar="{ item }">
      <div class="font-weight-bold">{{ item.cant_por_recepcionar | currency_2 }}</div>
    </template>
</v-data-table>
</template>

<script src="./LineasOc.js"></script>

<style scoped src="./LineasOc.css"></style>