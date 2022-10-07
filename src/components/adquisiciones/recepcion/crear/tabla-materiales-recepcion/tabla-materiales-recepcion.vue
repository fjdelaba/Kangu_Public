<template>

  <v-container>
    <v-row>
      <v-dialog v-model="openModal" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">¡ATENCIÓN!</v-card-title>
          <v-card-text>Recepcionaras más de lo solicitado</v-card-text>
        </v-card>
      </v-dialog>
      <v-col >
        <v-data-table
          :headers="dessertHeaders"
          :items="detalle"
          :hide-default-footer="true"
          :items-per-page="detalle.length"
        >
          <template v-slot:item.mat="{ item }">
            <nombre-material :nombre="item.mat.nombre" :unidad="item.mat.mat_uni.nombre" :observacion="item.observacion" ></nombre-material>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              color="red"
              @click="deleteItem3(item)"
            >
              mdi-delete
            </v-icon>
          </template>
         
          <template v-slot:item.recepcionar="{ item }">
            <v-icon class="pl-9" small @click="pasarCantidad(item)" >mdi-arrow-right-bold</v-icon> 
            <v-text-field
              v-model="item.recepcionar"
              class="pt-2"
              outlined
              dense
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
           
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./tabla-materiales-recepcion.js"></script>
<style src="./tabla-materiales-recepcion.css"></style>
