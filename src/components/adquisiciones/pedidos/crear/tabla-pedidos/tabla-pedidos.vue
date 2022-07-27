<template>
  <v-container>
  
    <v-row>

      <v-dialog v-if="agregar" v-model="agregar" max-width="500px">
        <agregar-material :cerrar-dialog-material_="abrirMaterial" :moneda="moneda" :lista-partidas="listaPartidas" :material-edicion="undefined"></agregar-material>
      </v-dialog>

    </v-row>
    <v-row>
     
      <v-col >
        <v-btn @click="agregarMat()">Agregar Material {{ agregar }}</v-btn>
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
