<template>
  <v-container>
    <v-list-item style="padding-left: 24px">
 
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          Identificación: Sin Asignar
        </v-list-item-title>
        <v-list-item-subtitle class="caption">Fecha:25/07/2022 </v-list-item-subtitle>
        <v-list-item-subtitle class="caption">Contacto DLB: bmedina@dlb.cl</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        width="90px"
      >
        <v-img src=""></v-img></v-list-item-avatar>
    </v-list-item>
    <v-row no-gutters class="pl-3">
      <v-col cols="2" class="pt-1">
        <p>Nombre Documento:</p>
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="nombrePedido"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters class="pl-3">
        <v-col cols="2" class="pt-">
        <p>Obra del Pedido:</p>
      </v-col>
      <v-col cols="4"><v-autocomplete
        v-model="proyectoPedido"
        :items="listaProyectos"
        persistent-hint
        outlined
        dense
        item-text="nombre"
        item-value="id"
        @change="cargarPartidas"
      ></v-autocomplete></v-col>
    </v-row>
    <v-row no-gutters class="pl-3">
      <v-col cols="12" lg="6"><span class="caption">Nombre Solicitante: Bastian Medina</span></v-col>
    </v-row>
  </v-container>
</template>

<script src="./cabecera-pedidos.js"></script>
<style src="./cabeceera-pedidos.css"></style>