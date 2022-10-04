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
            <v-badge
              bordered
              color="error"
              icon="mdi-check"
              overlap
              :value="cpxMostrarBadge"
            >
              <v-btn
                dark
                small
                class="mx-1"
                color="primary"
              >
                Filtros
                <v-icon dark>
                  mdi-chart-gantt
                </v-icon>
              </v-btn>
            </v-badge>
            <v-btn
              dark
              small
              class="mx-1"
              color="primary"
              @click="limpiarFiltros()"
            >
              <v-icon x-small dark>
                mdi-broom
              </v-icon>
            </v-btn>
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
          :headers="cpxDinamicHeaders"
          :items="cpxDatosTabla"
          class="flex-grow-1"
          dense
          :loading="loadingTabla"
          loading-text="Buscando ordenes de compra"
          :search="buscarOcs"
          show-expand
          :expanded.sync="expanded"
          :single-expand="singleExpand"
          :items-per-page="25"
        >
        </v-data-table>
      </v-card>
      
    </div>
    
  </div>
</template>

<script src="./tabla-consulta.js"></script>
