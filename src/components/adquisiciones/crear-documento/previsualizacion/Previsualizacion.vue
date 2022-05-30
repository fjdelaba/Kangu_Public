<template>
  <div>
    <v-sheet
      class="pa-2"
      color="grey lighten-3"
    >
      <v-sheet
        :elevation="2"
        height="100%"
        width="100%"
      >
      <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          Headline 5
        </v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

      <v-row no-gutters>
       <v-col cols="12" lg="6">Proveedor: asdsadsada</v-col>
       <v-col cols="12" lg="6">RUT: asdsadsada</v-col>
      </v-row>
      <v-row no-gutters>
       <v-col cols="12" lg="6">Rut: asdsadsada</v-col>
       <v-col cols="12" lg="6">RUT: asdsadsada</v-col>
      </v-row>
      <v-row no-gutters>
       <v-col cols="12" lg="6">Direccion: asdsadsada</v-col>
       <v-col cols="12" lg="6">RUT: asdsadsada</v-col>
      </v-row>
      <v-row no-gutters>
       <v-col cols="12" lg="6">Contacto: asdsadsada</v-col>
       <v-col cols="12" lg="6">RUT: asdsadsada</v-col>
      </v-row>
      <v-row no-gutters>
       <v-col cols="12" lg="6">Email: asdsadsada</v-col>
       <v-col cols="12" lg="6">RUT: asdsadsada</v-col>
      </v-row>
       </v-sheet>
       <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
    </v-sheet>
  </div>
</template>

<script src="./Previsualizacion.js"></script>

<style scoped src="./Previsualizacion.css"></style>