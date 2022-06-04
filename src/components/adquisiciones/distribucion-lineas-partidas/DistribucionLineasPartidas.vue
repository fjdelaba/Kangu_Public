<template>
  <div>
      {{ materiales }}
    <p class="ma-0">Lineas</p> 
    <v-divider class="mb-2"></v-divider>
    <v-data-table
      :headers="headersLineas"
      :items="dataLineas"
      class="elevation-1"
      hide-default-footer
      dense
    >
      <template v-slot:item.calories="{ item }">
        <v-chip
          :color="getColor(item.calories)"
          dark
          small
        >
          {{ item.calories }}
        </v-chip>
      </template>
    </v-data-table>
    <p class="mt-4 mb-0">Partidas</p> 
    <v-divider class="mb-2"></v-divider>
    <v-data-table
      :headers="origen == 0 ? headersPartidasOC : headersPartidasApro"
      :items="dataPartidas"
      class="elevation-1"
      hide-default-footer
      dense
    >
      <template v-slot:item.calories="{ item }">
        <v-chip
          :color="getColor(item.calories)"
          dark
          small
        >
          {{ item.calories }}
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script src="./DistribucionLineasPartidas.js"></script>
<style scoped src="./DistribucionLineasPartidas.css"></style>