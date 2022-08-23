<template>
  <div>
    <v-data-table
      :headers="cpxDinamicHeaders"
      :items="lineas"
      :items-per-page="lineas.length"
      hide-default-footer
      dense
      class="elevation-1"
    >
      <template v-slot:item.nombre="{ item }">
        <!-- <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:400px"> -->
        <!-- <span> <span></span>{{ item.name }} <br> <em>{{ item.observacion }}</em> </span>  -->
        <!-- {{ item.nombre }} -->
        <!-- <span> <span style="font-size: 16px"> {{ item.nombre }} - {{ item.mu_nombre }} </span> <br> <span style="font-size: 10px"> <em>{{ item.observacion }}</em> </span></span>  -->
        <nombre-obs-tabla :nombre="item.nombre" :observacion="item.observacion" :unidad="item.mu_nombre"></nombre-obs-tabla>
        <!-- </div> -->
      </template>
      <template v-slot:item.cant_ajustada="{ item }">
        <div >{{ item.cant_ajustada | currency_2 }}</div><!--class="font-weight-bold"-->
      </template>
      <template v-slot:item.cant_recepcion="{ item }">
        <div>{{ item.cant_recepcion | currency_2 }}</div>
      </template>
      <template v-slot:item.cant_por_recepcionar="{ item }">
        <div>{{ item.cant_por_recepcionar | currency_2 }}</div>
      </template>
    </v-data-table>
  </div>
</template>

<script src="./LineasOc.js"></script>

<style scoped src="./LineasOc.css"></style>