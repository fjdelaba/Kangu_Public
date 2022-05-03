<template>
  <v-card class="mx-auto mt-10" max-width="600" outlined>
    <v-card-title>Vuetify Inline Editor Table </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      class="elevation-1"
      fixed-header
      height="350px"
    >
      <v-divider inset></v-divider>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <div class="d-flex w-100">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              dense
              outlined
              single-line
              hide-details
            ></v-text-field>
            <v-btn
              color="primary"
              class="ml-2 white--text"
              @click="addNew"
            >
              <v-icon dark>mdi-plus</v-icon>Add
            </v-btn>
          </div>
        </v-toolbar>
      </template>
      <template v-slot:item.name="{ item }">
        <v-text-field
          v-if="item.id === editedItem.id"
          v-model="editedItem.name"
          :hide-details="true"
          dense
          single-line
          :autofocus="true"
        ></v-text-field>
        <span v-else>{{ item.name }}</span>
      </template>
      <template v-slot:item.calories="{ item }">
        <v-text-field
          v-if="item.id === editedItem.id"
          v-model="editedItem.calories"
          :hide-details="true"
          dense
          single-line
        ></v-text-field>
        <span v-else>{{ item.calories }}</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <div v-if="item.id === editedItem.id">
          <v-icon color="red" class="mr-3" @click="close">
            mdi-window-close
          </v-icon>
          <v-icon color="green" @click="save">
            mdi-content-save
          </v-icon>
        </div>
        <div v-else>
          <v-icon color="green" class="mr-3" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon color="red" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </div>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script src="./Previsualizacion.js"></script>

<style scoped src="./Previsualizacion.css"></style>