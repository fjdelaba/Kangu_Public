<template>
  <v-container>
    <v-select
      v-model="selectionType"
      :items="['leaf', 'independent']"
      label="Selection type"
    ></v-select>
    <v-row>
      <v-col>
        <v-treeview
          v-model="selection"
          :items="items"
          :selection-type="selectionType"
          selectable
          return-object
          open-all
        ></v-treeview>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col
        class="pa-6"
        cols="6"
      >
        <template v-if="!selection.length">
          No nodes selected.
        </template>
        <template v-else>
          <div
            v-for="node in selection"
            :key="node.id"
          >
            {{ node.name }}
          </div>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./BusquedaMaterial.js"></script>

<style scoped src="./BusquedaMaterial.css"></style>