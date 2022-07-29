<template>
  <div>
    Busqueda de Material
    <v-divider></v-divider>
    <v-text-field
      v-model="busquedaMaterial"
      label="Ingresa tu busqueda"
      dark
      solo-inverted
      hide-details
      outlined
      dense
      clearable
      clear-icon="mdi-close-circle-outline"
      @click:clear="limpiar()"
      @input="buscarMaterial()"
    ></v-text-field>
    <v-card-text>
      <v-treeview
        :items="listaMateriales"
        :search="busquedaMaterial"
        :open.sync="open"
      ><!-- :filter="filter" -->
        <template v-slot:append="{ item }">
          <v-btn x-small @click="agregarMaterial(item)">Agregar</v-btn>
        </template>
      </v-treeview>
    </v-card-text>

    Busqueda de Partida
    <v-divider></v-divider>
  </div>
</template>

<script src="./DrawerSeleccionMaterialPartida.js"></script>

<style scoped src="./DrawerSeleccionMaterialPartida.css"></style>