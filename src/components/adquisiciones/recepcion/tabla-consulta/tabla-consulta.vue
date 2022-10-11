<template>
  <div>
    <!-- {{ dates }} -->
    <div class="d-flex flex-column flex-grow-1">
      <div class="d-flex align-center">
        <div>
          <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
        </div>
        <v-spacer></v-spacer>
        <!-- {{ filtros }} -->
      </div>
      <!-- {{ocs}} -->
      <v-card>
        <!-- users list -->
        <v-row dense class="px-2 align-center">

          <v-menu
            dense
            transition="slide-x-transition"
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-if="origen == 2"
                class="deep-orange"
                color="primary"
                dark
                v-bind="attrs"
                dense
                v-on="on"
              >
                Acciones
              </v-btn>
            </template>

          </v-menu>
          <v-spacer></v-spacer>
          <v-col cols="8" class="d-flex text-right align-center">
            <v-text-field
              v-model="buscarOcs"
              append-icon="mdi-magnify"
              class="flex-grow-1 mr-md-2"
              solo
              hide-details
              dense
              clearable
              placeholder="Buscar"
            ></v-text-field><!--@keyup.enter="searchUser(searchQuery)"-->
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
                  class="pt-2 mt-2"
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
          
          <!-- <v-btn
            :loading="isLoading"
            icon
            small
            class="ml-2"
            @click
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn> -->
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="cpxDatosTabla"
          class="flex-grow-1"
          dense
          :loading="loadingTabla"
          loading-text="Buscando Recepciones"
          :search="buscarOcs"
          :items-per-page="25"
        >
          <template v-slot:header.oc.pro.nombre="{ header }">
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
          <template v-slot:header.oc.ent.razon_social="{ header }">
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
          <template v-slot:item.fec_recepcion="{ item }">
            <div class="font-weight-bold">{{ getFechaFormat(item.fec_recepcion) }}</div>
          </template>
          <template v-slot:item.monto="{ item }">
            <div class="font-weight-bold">{{ item.monto | currency }}</div>
          </template>
          <template v-slot:item.action="{ item }">
            <div>
              <v-row>
                <v-col cols="3">
                  <v-btn
                    small
                    @click="abrirDetalle(item)"
                  > Abrir </v-btn>
                </v-col>
                <v-col v-if="item.dte_cab_fk != null" class="pl-4" cols="3">
                  <v-btn
                    small
                    @click="descargarDte(item)"
                  ><v-icon>mdi-file-pdf-box</v-icon> </v-btn>
                </v-col>
              </v-row>
            </div>
          </template>
        </v-data-table>
      </v-card>
      
    </div>
    
  </div>
</template>

<script src="./tabla-consulta.js"></script>
