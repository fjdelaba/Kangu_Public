<template>

  <v-container>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Antes de Recepcionar</v-card-title>
        <v-card-text>
          <v-col cols="12" lg="12">  <p class="text-h6 text--primary">Selecciona Tipo de Documento a referenciar: </p></v-col>
          <v-autocomplete
            v-model="seleccionDocumento"
            :items="listaDocumentos"
            label="Tipo de Documento a referenciar"
            persistent-hint
            outlined
            dense
            item-text="nombre"
            item-value="id"
          ></v-autocomplete>
          <v-col cols="12" lg="12">  <p class="text-h6 text--primary">Ingresa Nº de Documento: </p></v-col>
          <v-text-field
            v-model="numDocumento"
            outlined
            dense
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialogDelete = false">Cancelar</v-btn>
          <v-btn color="blue" text @click="dialogDelete = false">Siguiente</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script src="./modal-finalizar.js"></script>
