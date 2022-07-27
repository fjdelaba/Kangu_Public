<template>
  <v-card>
    selection: {{ selection }} <br>
    resp: {{respSelection}}
    <v-select
    v-if="false"
      v-model="selectionType"
      :items="['leaf', 'independent']"
      label="Selection type"
    ></v-select>
    <v-row>
      <v-col>
        <v-sheet class="pa-4 primary lighten-2">
          <v-text-field
            v-model="search"
            label="Search Company Directory"
            dark
            flat
            solo-inverted
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
            @input="buscarMaterial()"
          ></v-text-field><!-- -->
          <v-checkbox
          v-if="false"
            v-model="caseSensitive"
            dark
            hide-details
            label="Case sensitive search"
          ></v-checkbox>
        </v-sheet>
        <v-treeview
          v-model="selection"
          :items="items"
          selection-type="independent"
          selectable
          return-object
          open-all
          :search="search"
          dense
          :filter="filter"
          :open.sync="open"
          :multiple-active="true"
           @input="inputTreeview()"
           @update:active="updateActive()"
           @update:open="updateOpen()"
        >
         <template v-slot:label="{ item }">
        <p>{{item.name}} - {{item.mu_nombre}}</p>
    </template>
        </v-treeview>
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
        <v-text-field
            v-model="node.cantidad"
            label="Outlined"
            outlined
            dense
          ></v-text-field>
          </div>
        </template>
      </v-col>
    </v-row>
  </v-card>
</template>

<script src="./BusquedaMaterial.js"></script>

<style scoped src="./BusquedaMaterial.css"></style>