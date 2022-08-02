<template>
  <div>
    <div>
      <drawer-partida ref="refdrawerpartida" :_origen="1"></drawer-partida>
    </div>
    <v-divider></v-divider>
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
      @click:clear="limpiarMaterial()"
      @input="buscarMaterial()"
    ></v-text-field>
    <v-card-text>
      <v-treeview
        :items="listaMateriales"
        :search="busquedaMaterial"
        :open.sync="open"
        return-object
      >
        <template v-slot:append="{ item }">
         {{ item.nombre }} <v-btn v-if="cpxRefDrawerPartida" x-small @click="agregarMaterial(item)">Agregar</v-btn>
        </template>
      </v-treeview>
    </v-card-text>
  </div>
</template>

<script src="./DrawerSeleccionMaterialPartida.js"></script>

<style scoped src="./DrawerSeleccionMaterialPartida.css"></style>