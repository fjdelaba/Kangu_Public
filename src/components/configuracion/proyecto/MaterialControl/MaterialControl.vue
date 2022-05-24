<template>
  
  <v-container class="grey lighten-5">
    <v-row class="mb-6" no-gutters>
      <v-col>   
        
        <v-row class="mb-6" no-gutters>
          <v-col>     
            <h3>MATERIALES A CONTROLAR</h3>
            <h5 > Estos valores serán ocupados en aprobaciones y al crear ordenes de compra.</h5>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="2"
          >
            <v-autocomplete 
              v-if="detalle == false"
              v-model="material"
              :rules="rules.material.nombre"
              :items="listaMaterial"
              :loading="isLoading"
              :search-input.sync="search"
              item-text="nombre"
              item-value="id"
              label="Material"
              hint="Busca por su nombre "
              return-object
              :hide-no-data="!mostrarNoData"
              outlined
              dense
              solo
            >
            </v-autocomplete></v-col>
          <v-col
            cols="2"
          >
            <v-text-field
              v-if="detalle == false"
              v-model="materialSeleccionado.cantidad"
              label="Cantidad"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols="2"
          >
            <v-text-field
              v-if="detalle == false"
              v-model="materialSeleccionado.unitario"
              label="Valor Unitario"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols="2"
          >
            <v-select
              v-if="detalle == false"
              v-model="monedaSeleccionada"
              :items="listaMonedas"
              label="Moneda"
              dense
              outlined
              item-text="nombre"
              item-value="id"
            ></v-select>
          </v-col>
          <v-col
            cols="3"
          >
            <v-btn
              v-if="detalle == false"
              color="primary"
              dark
              @click="guardarNuevoItem()"
            >
              Agregar Material {{ detalle }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mb-6" no-gutters>
          <v-col>     
            <template>
              <v-data-table
                v-if="detalle == false"
                :headers="headers1"
                :items="desserts"
                :items-per-page="5"
                class="elevation-1"
                :hide-default-footer="true"
              ></v-data-table>
              <v-data-table
                v-if="detalle == true"
                :headers="headers2"
                :items="materialesProyecto"
                :items-per-page="5"
                class="elevation-1"
                :hide-default-footer="true"
              ></v-data-table>
            </template>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            <v-btn
              v-if="detalle == false"
              color="success"
              dark
              large
              @click="guardarMateriales()"
            ><v-icon>mdi-content-save-all</v-icon>
              GUARDAR
            </v-btn>
         
          </v-col></v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script src="./MaterialControl.js"></script>