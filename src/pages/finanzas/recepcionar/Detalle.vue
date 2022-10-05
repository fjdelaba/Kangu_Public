<template>
  <v-container class="grey lighten-5">
    <!-- {{pdf}} -->
    <v-row justify="center">
      <v-col>
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-card-title>
            Recepciones en Obra
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            :hide-default-footer="true"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-card-title>
            Recepciones Dte
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
            :hide-default-footer="true"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <iframe :src="pdf" width="800" height="600"></iframe>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./detalle/detalle.js"></script>

<style scoped src="./detalle/detalle.css"></style>