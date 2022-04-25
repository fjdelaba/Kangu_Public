<template>
  <div v-if="!this.$parent.$refs.botonMantenedor.mostrarBotones">
    <h2>Mantenedor {{ tituloMantenedor }}</h2>
    <h2>Mantenedor {{ lista[editedIndex] }}</h2>
    <v-col
      cols="12"
      style="min-width: 600px"
      class="flex-grow-0 flex-shrink-1 w-full"
    >
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
    
        <v-data-table
          :headers="headers"
          :items="lista"
          :items-per-page="5"
          class="elevation-1"
          style="min-width: 890px"
          :search="search"
        > 
          <template v-slot:item.nombre="{ item }">
            <v-text-field
              v-if="item.id === editedItem.id"
              v-model="editedItem.nombre"
              :hide-details="true"
              dense
              single-line
              :autofocus="true"
            ></v-text-field>
            <span v-else>{{ item.nombre }} </span>   
          </template>
          <template v-slot:item.activo="{ item }">
            <!-- <v-simple-checkbox
            v-model="item.editable"
          ></v-simple-checkbox> -->
            <v-simple-checkbox
              v-if="item.id === editedItem.id"
              v-model="editedItem.activo"
              :disabled="item.id != editedItem.id"
            ></v-simple-checkbox>
            <v-simple-checkbox
              v-else
              v-model="item.activo"
              :disabled="item.id != editedItem.id"
            ></v-simple-checkbox>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon v-if="item.id != editedItem.id" small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <div v-if="item.id === editedItem.id">
              <v-icon color="red" class="mr-3" @click="close">
                mdi-window-close
              </v-icon>
              <v-icon color="green" @click="save">
                mdi-content-save
              </v-icon>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </div>
</template>
<style src="./Tabla.css"></style>
<script src="./Tabla.js"></script>
