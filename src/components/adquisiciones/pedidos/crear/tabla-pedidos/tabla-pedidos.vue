<template>
  <v-container>
    <v-row>

      <!-- <v-dialog v-if="agregar" v-model="agregar" max-width="500px"> -->
      <v-navigation-drawer
        v-if="agregar"
        v-model="agregar"
        absolute
        temporary
        right
        width="500"
      >
        <agregar-material ref="refdrawerseleccionmaterialpartida" :_mostrar_drawer_partida="agregar" :_agregarMaterial="abrirMaterial" ></agregar-material> 
      </v-navigation-drawer>

      <!-- </v-dialog> -->

    </v-row>
    <v-row>
     
      <v-col >
        <v-btn @click="agregarMat()">Agregar Material </v-btn>
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
          <template v-slot:item.mat="{ item }">
            <nombre-material :nombre="item.mat" :unidad="item.unidad" :observacion="item.observacion" ></nombre-material>
          </template>
        
          <template v-slot:item.cc="{ item }">
            <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:70px">
              {{ item.partidas[0].name }}
            </div>
          </template>
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
                color="red"
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
