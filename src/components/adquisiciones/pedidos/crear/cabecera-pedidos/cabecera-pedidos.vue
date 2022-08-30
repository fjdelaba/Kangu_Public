<template>
  <v-container>
    <v-dialog v-model="dialogCambio" persistent max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Antes de Cambiar..</v-card-title>
        <v-card-text>
       
          <v-col cols="12" lg="12">  <p class="text-h6 text--primary">Estas apunto de cambiar el proyecto seleccionado, si lo cambias perderas los materiales asignados para este pedido.</p></v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="cancelarCambio()">Cancelar</v-btn>
          <v-btn color="blue" text @click="aprobarCambio()">Siguiente</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog> 

    <v-list-item style="padding-left: 24px">
      <v-list-item-content>
        <v-list-item-title v-if="vista == 'crear'" class="text-h5">
          Identificación: Sin Asignar
        </v-list-item-title>
        <v-list-item-title v-if="vista == 'detalle'" class="text-h5">
          Identificación: {{ cabecera.identificacion }}
        </v-list-item-title>
        <v-list-item-subtitle v-if="vista == 'crear'" class="caption">Fecha:25/07/2022 </v-list-item-subtitle>
        <v-list-item-subtitle v-if="vista == 'detalle'" class="caption">Fecha: {{ moment(cabecera.fec_creacion ).format("DD/MM/YYYY") }}</v-list-item-subtitle>
        <v-list-item-subtitle v-if="vista == 'crear'" class="caption">Contacto DLB: bmedina@dlb.cl</v-list-item-subtitle>
        <v-list-item-subtitle v-if="vista == 'detalle'" class="caption">Contacto DLB: {{ cabecera.usu.email }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        width="90px"
      >
        <v-img :src="logo"></v-img></v-list-item-avatar>
    </v-list-item>
    <v-row no-gutters class="pl-3">
      <v-col v-if="vista == 'crear'" cols="2" class="pt-1">
        <p>Nombre Documento:</p>
      </v-col>
      <v-col v-if="vista == 'detalle'" cols="6" class="pt-1">
        <p>Nombre Documento: {{ cabecera.nombre }}</p>
      </v-col>
      <v-col v-if="vista == 'crear'" cols="4">
        <v-text-field
          v-model="nombrePedido"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters class="pl-3">
      <v-col v-if="vista == 'crear'" cols="2" class="pt-">
        <p>Obra del Pedido:</p>
      </v-col>
      <v-col v-if="vista == 'detalle'" cols="6" class="pt-">
        <p>Obra: {{ cabecera.pro.nombre }}</p>
      </v-col>
      <v-col v-if="vista == 'crear'" cols="4"><v-autocomplete
        v-model="proyectoPedido"
        :items="listaProyectos"
        persistent-hint
        outlined
        dense
        item-text="nombre"
        item-value="id"
        @change="cargarPartidas"
      > <template v-slot:item="{ item }">
        <v-list-item-content>
          <v-list-item-title v-text="item.nombre"></v-list-item-title>
          <v-list-item-subtitle v-text="`codigo: ${item.codigo}`"></v-list-item-subtitle>
        </v-list-item-content>
      </template></v-autocomplete></v-col>
    </v-row>
    <v-row no-gutters class="pl-3">
      <v-col v-if="vista == 'crear'" cols="12" lg="6"><span class="caption">Nombre Solicitante: Bastian Medina</span></v-col>
      <v-col v-if="vista == 'detalle'" cols="12" lg="6"><span class="caption">Nombre Solicitante: {{ cabecera.usu.nombre }}</span></v-col>
    </v-row>
  </v-container>
</template>

<script src="./cabecera-pedidos.js"></script>
<style src="./cabeceera-pedidos.css"></style>