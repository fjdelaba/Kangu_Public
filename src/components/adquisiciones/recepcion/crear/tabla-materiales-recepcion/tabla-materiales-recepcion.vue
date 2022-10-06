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
          <template v-slot:item.cant_recepcion="{ item }">
     
            {{ item.oc_det__view_recepciones_lista == null? '0' : item.oc_det__view_recepciones_lista.total_recibido }}
          </template>
          <template v-slot:item.cant_despacho="{ item }">
     
            {{ calcularSaldo(item) }}<v-icon class="pl-9" small @click="pasarCantidad(item)" >mdi-arrow-right-bold</v-icon> 
          </template>
          <template v-slot:item.recepcionar="{ item }">
            <v-text-field
              v-model="item.recepcionar"
              class="pt-2"
              outlined
              dense
              v-bind="attrs"
              v-on="on"
              @change="modalAviso(item)"
            ></v-text-field>
          </template>
           
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./tabla-materiales-recepcion.js"></script>
<style src="./tabla-materiales-recepcion.css"></style>
