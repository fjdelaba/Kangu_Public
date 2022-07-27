<template>
  <v-container class="white">
    <v-row class="mb-6" no-gutters>
      <v-col>   
        <v-row class="mb-6" no-gutters>
          <v-col>     
            <h3>CUENTAS DE COSTO</h3>
            <h5> Ingrese la información para su control presupuestario. Para poder operar en ese centro de gestión es necesario contar con al menos 1 cuenta de costo.</h5>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="3"
          >
            <v-text-field
              v-model="editedItem.nombre"
              label="Nombre"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols="3"
          >
            <v-text-field
              v-model="editedItem.n"
              label="Código"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols="3"
          >
            <v-text-field
              v-model="editedItem.fat"
              label="Presupuesto asignado a la cuenta"
              outlined
              dense
              value="$0"
            ></v-text-field>
          </v-col>
          <v-col
            cols="3"
          >
            <v-btn
              color="primary"
              dark
              @click="guardarNuevoItem()"
            >
              Agregar Cuenta de Costo
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>     
            <template>
              <v-data-table
                :headers="headers"
                :items="desserts"
                :items-per-page="5"
                class="elevation-1"
                :hide-default-footer="true"
              >
              </v-data-table>
            </template>
          </v-col>
        </v-row>
         <v-row>
          <v-col
            cols="12"
          >
            <v-btn
              color="primary"
              dark
              large
            ><v-icon>mdi-content-save-all</v-icon> 
              GUARDAR
            </v-btn> 
         
          </v-col></v-row>
      </v-col></v-row>
  </v-container>
</template>
<script src="./CuentaCosto.js"></script>