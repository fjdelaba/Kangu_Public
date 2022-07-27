<template>
  <v-card>
    <v-row>
      <v-col cols="5">
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
            @click:clear="limpiar()"
            @input="buscarMaterial()"
          ></v-text-field>
          <!-- <v-checkbox
            v-model="caseSensitive"
            dark
            hide-details
            label="Case sensitive search"
          ></v-checkbox> -->
        </v-sheet>
        <v-card-text>
          <v-treeview
            :items="items"
            :search="search"
            :filter="filter"
            :open.sync="open"
          >
            <template v-slot:append="{ item }">
              <v-btn x-small @click="agregarMaterial(item)">Agregar</v-btn>
            </template>
          </v-treeview>
        </v-card-text>

      </v-col>
      <v-col cols="5">
        <p class="text-h5">Materiales Seleccionados</p>
        <v-divider></v-divider>
        <v-row v-for="item in seleccion" :key="item.id">
          <p style="width: 350px;">{{ item.name }}</p><v-text-field
            v-model="item.cantidad"
            dense
            outlined
            label="Cantidad"
            style="width: 60px;"
          ></v-text-field> <v-btn icon small @click="eliminar(item)"><v-icon>mdi-close</v-icon></v-btn>
        </v-row>
        <!-- <v-list shaped>
        <v-subheader>REPORTS</v-subheader>
        <v-list-item-group
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in seleccion"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title v-text="`${item.name} -  ${item.mu_nombre}`"></v-list-item-title>
              <v-text-field outlined dense></v-text-field>
            </v-list-item-content>
            <v-list-item-icon @click="eliminar(item)">
              <v-icon v-text="'mdi-close'"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list> -->
      </v-col>
    </v-row>
  </v-card>
</template>

<script src="./BusquedaMaterial.js"></script>

<style scoped src="./BusquedaMaterial.css"></style>