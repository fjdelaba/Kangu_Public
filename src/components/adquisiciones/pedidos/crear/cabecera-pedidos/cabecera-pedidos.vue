<template>
  <v-container>
    {{ cargarPartidas() }}
    <v-list-item style="padding-left: 24px">
 
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          Pedido: PED-15
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
      <v-col cols="12" lg="6"><v-text-field
        v-model="nombrePedido"
        label="Nombre Documento"
        outlined
        dense
      ></v-text-field></v-col>
    </v-row>
    <v-row no-gutters class="pl-3">
      <v-col cols="12" lg="6"><v-autocomplete
        v-model="proyectoPedido"
        :items="listaProyectos"
        label="Obra del Pedido"
        persistent-hint
        outlined
        dense
        item-text="nombre"
        item-value="id"
        @change="agregarMaterial"
      ></v-autocomplete></v-col>
    </v-row>
    <v-row no-gutters class="pl-3">
      <v-col cols="12" lg="6"><span class="caption">Nombre Solicitante: Bastian Medina</span></v-col>
    </v-row>
  </v-container>
</template>

<script src="./cabecera-pedidos.js"></script>