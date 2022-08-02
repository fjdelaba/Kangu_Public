<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-text-field
      v-model="search"
      label="Selecciona la partida"
      dense
      outlined
      solo-inverted
      hide-details
      clearable
      clear-icon="mdi-close-circle-outline"
    ></v-text-field>
    <div v-if="selPartida">Partida seleccionada: {{ selPartida[0].name }} {{ openCacheTree }}</div>
    <v-card-text>
      <v-treeview
        v-model="selPartida"
        dense
        ref="reftreeviewpartida"
        :items="items"
        :search="search"
        :filter="filter"
        :open.sync="open"
        rounded
        hoverable
        activatable
        return-object
        :multiple-active="seleccionMultiple"
        @update:active="seleccionPartida"
        @update:open="cerrarNodosAbiertos"
      >
        <template v-slot:prepend="{ item }">
          <v-icon
            v-if="item.children"
            v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
          ></v-icon>
          <v-checkbox v-if="!item.children && _origen === 2" @change="seleccionProrateoPartida(item)"></v-checkbox>
        </template>
        <template v-slot:append="{ item }">
          <v-text-field v-if="!item.children && _origen === 2 && item.seleccionado" v-model="item.cantidad" dense outlined></v-text-field>
        </template>
      </v-treeview>
    </v-card-text>
  </v-card>
</template>

<script src="./DrawerPartida.js"></script>

<style scoped src="./DrawerPartida.css"></style>