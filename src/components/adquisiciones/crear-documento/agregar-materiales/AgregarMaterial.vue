<template>
  <v-card min-width="1000" min-height="500" >
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      fixed-header
      height="100%"
    >
      <v-divider inset></v-divider>
      <template v-slot:item.name="{ item }">
        <div v-if="item.id === editedItem.id">
          <v-text-field
            v-model="editedItem.name"
            :hide-details="true"
            dense
            single-line
            :autofocus="true"
          ></v-text-field>
          <v-text-field
            v-model="editedItem.name"
            :hide-details="true"
            dense
            single-line
            :autofocus="true"
          ></v-text-field>
        </div>
        <div v-else class="d-flex align-center display: inline-block mt-2 mb-2">
         <span> {{ item.name }}</span> <br> <span>{{ item.name }}</span> 
        </div>
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

<script src="./AgregarMaterial.js"></script>
<style scoped src="./AgregarMaterial.css"></style>