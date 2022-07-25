<template>
  <v-card>
    <v-card-title class="text-h5">
      Filtros
    </v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <!-- Estado -->
        <v-col
          :cols="6"
        >
          <v-card
            class="pa-2"
            tile
            outlined
          >
            Estado
          </v-card>
        </v-col>
        <v-col
          :cols="6"
        >
          <v-card
            class="pa-1"
            tile
            outlined
          >
            <v-autocomplete
              v-model="filtros.estados"
              :items="_valoresFiltros._listaEstados"
              outlined
              dense
              chips
              small-chips
              multiple
              item-text="nombre"
              item-value="id"
            ></v-autocomplete>
          </v-card>
        </v-col>
        <!-- Fin Estado -->

        <!-- Moneda -->
        <v-col
          :cols="6"
        >
          <v-card
            class="pa-2"
            tile
            outlined
          >
            Moneda
          </v-card>
        </v-col>
        <v-col
          :cols="6"
        >
          <v-card
            class="pa-1"
            tile
            outlined
          >
            <v-autocomplete
              v-model="filtros.monedas"
              :items="_valoresFiltros._listaMonedas"
              outlined
              dense
              chips
              small-chips
              multiple
              item-text="nombre"
              item-value="id"
            ></v-autocomplete>
          </v-card>
        </v-col>
        <!-- Fin Moneda -->

        <!-- Despacho -->
        <v-col
          :cols="6"
        >
          <v-card
            class="pa-2"
            tile
            outlined
          >
            Despacho
          </v-card>
        </v-col>
        <v-col
          :cols="6"
        >
          <v-card
            class="pa-1"
            tile
            outlined
          >
            <v-autocomplete
              v-model="filtros.despachos"
              :items="_valoresFiltros._listaDespachos"
              outlined
              dense
              chips
              small-chips
              multiple
              item-text="nombre"
              item-value="id"
            ></v-autocomplete>
          </v-card>
        </v-col>
        <!-- Fin Despacho -->

        <!-- Pago -->
        <v-col
          :cols="6"
        >
          <v-card
            class="pa-2"
            tile
            outlined
          >
            Forma Pago
          </v-card>
        </v-col>
        <v-col
          :cols="6"
        >
          <v-card
            class="pa-1"
            tile
            outlined
          >
            <v-autocomplete
              v-model="filtros.formasPago"
              :items="_valoresFiltros._listaFormasPago"
              outlined
              dense
              chips
              small-chips
              multiple
              item-text="nombre"
              item-value="id"
            ></v-autocomplete>
          </v-card>
        </v-col>

        <!-- Estaod Lineas -->
        <v-col
          :cols="6"
        >
          <v-card
            class="pa-2"
            tile
            outlined
          >
            Estado Lineas
          </v-card>
        </v-col>
        <v-col
          :cols="6"
        >
          <v-card
            class="pa-1"
            tile
            outlined
          >
            <v-autocomplete
              v-model="filtros.estadoLineas"
              :items="_valoresFiltros._listaEstadoLineas"
              outlined
              dense
              chips
              small-chips
              multiple
              item-text="nombre"
              item-value="id"
            ></v-autocomplete>
          </v-card>
        </v-col>
    
        <!-- Pago -->
        <v-col
          :cols="6"
        >
          <v-card
            class="pa-2"
            tile
            outlined
          >
            Tipo Documento
          </v-card>
        </v-col>
        <v-col
          :cols="6"
        >
          <v-card
            class="pa-1"
            tile
            outlined
          >
            <v-autocomplete
              v-model="filtros.tiposDocumento"
              :items="_valoresFiltros._listaTiposDocumento"
              outlined
              dense
              chips
              small-chips
              multiple
              item-text="nombre"
              item-value="id"
            ></v-autocomplete>
          </v-card>
        </v-col>

        <!-- Monto -->
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="green darken-1"
        text
        @click="_aplicarFiltros({})"
      >
        Cancelar
      </v-btn>
      <v-btn
        color="green darken-1"
        text
        @click="aplicarFiltros()"
      >
        Filtrar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script src="./ModalFiltros.js"></script>

<style scoped src="./ModalFiltros.css"></style>