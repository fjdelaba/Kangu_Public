<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="facturas"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:item.fec_emision="{ item }">
        <v-chip
          class="ma-2"
          :color="colorChipFecha(item.fec_emision)"
          label
          outlined
        >
          {{ formatoFecha(item) }}
        </v-chip>
      </template>
      <template v-slot:item.valido="{ item }">
        <!-- {{ item.valido }} -->
        <div v-if="item.valido == 1">
          <v-chip
          small
            class="ma-2"
            color="green"
            text-color="white"
          >
            Valido
          </v-chip>
        </div>
        <div v-if="item.valido == 2">
          <v-chip
          x-small
            class="ma-2"
            color="orange"
            text-color="white"
          >
            Sin Referencia
          </v-chip>
        </div>
      </template>
      <template v-slot:item.dte_for_pag="{ item }">
        {{ item.dte_for_pag.nombre }} 
      </template>
      <template v-slot:item.total="{ item }">
        {{ item.total | currency }} 
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="descargarFactura(item)">
          mdi-file-download-outline
        </v-icon>
        <!-- <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon> -->
        <v-btn x-small> Aprobar </v-btn>
        <v-btn x-small @click=" abrirDetalle(item) "> Ver Detalle </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script src="./tabla.js"></script>
<style scope src="./tabla.css"></style>
