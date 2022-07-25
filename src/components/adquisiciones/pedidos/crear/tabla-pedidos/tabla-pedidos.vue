<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn>Agregar Material</v-btn>
      </v-col></v-row>
    <v-row>
      <v-col cols="12">
          
        <v-data-table
          :headers="headers"
          :items="materiales"
          item-key="id"
          sort-by="calories"
          hide-default-footer
          class="elevation-1"
          dense
        >
          <template v-slot:item.cantidad="{ item }">
            <v-text-field
              v-model="item.cantidad"
              outlined
              dense
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <template v-slot:item.actions="{ item }">
              
            <div >
              
              <v-icon
                small
                @click="eliminarMaterial(item)"
              >
                mdi-delete {{ item }}
              </v-icon>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./tabla-pedidos.js"></script>
