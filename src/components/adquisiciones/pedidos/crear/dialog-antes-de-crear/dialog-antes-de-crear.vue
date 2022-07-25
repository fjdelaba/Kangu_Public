<template>
  <v-container>
    {{ dialog }}
    <v-dialog v-model="dialogDelete" persistent max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Antes de Comenzar</v-card-title>
        <v-card-text>
       
          <v-col cols="12" lg="12">  <p class="text-h6 text--primary">Ingresa Nombre del Pedido: </p></v-col>
          <v-text-field
            v-model="a"
            label="Nombre del Pedido"
            outlined
       
            dense
            v-bind="attrs"
            v-on="on"
          ></v-text-field>

          <v-col cols="12" lg="12">  <p class="text-h6 text--primary">Selecciona el Proyecto: </p></v-col>
          <v-autocomplete
            v-model="lol"
            :items="listaCelulas"
            label="Proyecto del Pedido"
            persistent-hint
            outlined
            dense
            item-text="nombre"
            item-value="id"
          ></v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialogDelete = false">Cancelar</v-btn>
          <v-btn color="blue" text @click="dialogDelete = false">Finalizar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>