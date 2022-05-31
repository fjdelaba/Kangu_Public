<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      grow
    >
      <v-tab>
        Documento
      </v-tab>
      <v-tab>
        Accesorios
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-sheet
      class="p-2"
      color="lighten-3"
    >
      <v-sheet
        :elevation="2"
        height="100%"
        width="100%"
        class="pb-3"
      >
        <v-list-item style="padding-left: 0px">
          <v-list-item-content>
            <v-list-item-title class="text-h5">
              Orden de Compra 45
            </v-list-item-title>
            <v-list-item-subtitle class="caption">Fecha: asdsda</v-list-item-subtitle>
            <v-list-item-subtitle class="caption">Contacto DLB: asdsda</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar
            tile
            size="80"
            color="grey"
          ></v-list-item-avatar>
        </v-list-item>

        <v-row no-gutters>
          <v-col cols="12" lg="6"><span class="caption">Proveedor: asdsadsada</span></v-col>
          <v-col cols="12" lg="6"><span class="caption">Nombre Documento: asdsadsada</span></v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" lg="6"><span class="caption">Rut: asdsadsada</span></v-col>
          <v-col cols="12" lg="6"><span class="caption">Obra: asdsadsada</span></v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" lg="6"><span class="caption">Direccion: asdsadsada</span></v-col>
          <v-col cols="12" lg="6"><span class="caption">Moneda: asdsadsada</span></v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" lg="6"><span class="caption">Contacto: asdsadsada</span></v-col>
          <v-col cols="12" lg="6"><span class="caption">Despacho: asdsadsada</span></v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" lg="6"><span class="caption">Email: asdsadsada</span></v-col>
          <v-col cols="12" lg="6"><span class="caption">Pago: asdsadsada</span></v-col>
        </v-row>
      </v-sheet>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        :hide-default-footer="true"
        dense
        class="elevation-1"
      ></v-data-table>
      <v-row justify="end" height="100">
        <v-col lg="8" md="6" class="py-3">
          <!-- {{ cpxTotalesItems }} -->
          <v-card
            height="100%"
            elevation="2"
          >
            Observacion para el proveedor</v-card>
        </v-col>
        <v-col lg="4" md="6" class="py-0 py-3 pr-2">
          <!-- {{ cpxTotalesItems }} -->
          <cuadro-resumen></cuadro-resumen>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script src="./Previsualizacion.js"></script>

<style scoped src="./Previsualizacion.css"></style>