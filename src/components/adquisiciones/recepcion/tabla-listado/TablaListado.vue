<template>
  <div>
    <!-- {{ dates }} -->
    <div class="d-flex flex-column flex-grow-1">
      <div class="d-flex align-center">
        <div>
          <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
        </div>
        <v-spacer></v-spacer>
      </div>
      <!-- {{ocs}} -->
      <v-card>
      
        <v-row dense class="pa-2 align-center">
        
        </v-row>
       
        <v-row dense class="px-2">
          <v-col cols="8" class="d-flex text-right">     
            <v-text-field
              v-model="searchQuery"
              append-icon="mdi-magnify"
              class="flex-grow-1 mr-md-2"
              solo
              hide-details
              dense
              clearable
              placeholder="Buscar"
              @keyup.enter="searchUser(searchQuery)"
            ></v-text-field>
        
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              dense
              min-width="auto"
              label="Fechas"
            ><!--  :return-value.sync="date"-->
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateRangeText"
                  prepend-icon=""
                  readonly
                  outlined
                  dense
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="dates"
                no-title
                range
                scrollable
                dense
                :first-day-of-week="1"
                @change="cargarOcs()"
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  dense
                  @click="menu = false"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  dense
                  @click="$refs.menu.save(date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col></v-row>
        <template>
          <v-data-table
            :headers="dessertHeaders"
            :items="cpxDatosTabla"
            item-key="name"
            class="elevation-1"
            :search="searchQuery"
            :loading="loadingTabla"
          >
            <template v-slot:header.pro.pro_nombre="{ header }">
              {{ header.text }}
              <v-menu offset-y :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon small :color="filtros.proyectos.length > 0 ? 'red' : ''">
                      mdi-filter
                    </v-icon>
                  </v-btn>
                </template>
                <div style="background-color: white; width: 280px">
                  <v-autocomplete
                    v-model="filtros.proyectos"
                    :items="valoresFiltros._listaProyectos"
                    outlined
                    dense
                    chips
                    label="Selecciona los proyectos"
                    small-chips
                    multiple
                    item-text="nombre"
                    item-value="id"
                  ></v-autocomplete>
                  <v-btn
                    small
                    text
                    color="primary"
                    class="ml-2 mb-2"
                    @click="dessertName = ''"
                  >Limpiar</v-btn>
                </div>
              </v-menu>
            </template>
            <template v-slot:header.ent.razon_social="{ header }">
              {{ header.text }}
              <v-menu offset-y :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon small :color="filtros.proveedor.length > 0 ? 'red' : ''">
                      mdi-filter
                    </v-icon>
                  </v-btn>
                </template>
                <div style="background-color: white; width: 280px">
                  <v-autocomplete
                    v-model="filtros.proveedor"
                    :items="valoresFiltros._listaProveedor"
                    outlined
                    dense
                    chips
                    label="Selecciona los proyectos"
                    small-chips
                    multiple
                    item-text="nombre"
                    item-value="id"
                  ></v-autocomplete>
                  <v-btn
                    small
                    text
                    color="primary"
                    class="ml-2 mb-2"
                    @click="dessertName = ''"
                  >Limpiar</v-btn>
                </div>
              </v-menu>
            </template>
            <template v-slot:top>
            </template>
            <template v-slot:item.actions="{ item }">
              <div><v-btn
                x-small
                @click="abrirDetalle(item)"
              > Seleccionar </v-btn>
              </div>
            </template> 
            <template v-slot:item.neto="{ item }">
              <div class="font-weight-bold">{{ item.oc__view_monto_recepciones_obra != null? item.neto - item.oc__view_monto_recepciones_obra.monto_recibido : item.neto | currency }}</div>
            </template>
           
          </v-data-table>
        </template></v-card>
    </div></div></template>
   
<script src="./TablaListado.js"></script>