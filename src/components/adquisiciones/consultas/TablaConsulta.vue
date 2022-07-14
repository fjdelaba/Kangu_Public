<template>
  <div>

    <div class="d-flex flex-column flex-grow-1">
      <div class="d-flex align-center">
        <div>
          <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
        </div>
        <v-spacer></v-spacer>
      </div>

      <v-card>
        <!-- users list -->
        <v-row dense class="pa-2 align-center">
          <v-col cols="3">
            <!-- <v-autocomplete
              v-model="proyectoSeleccionado"
              :items="proyectos"
              class="flex-grow-1 mr-md-2"
              solo
              hide-details
              dense
              item-text="nombre"
              item-value="id"
              placeholder="Centro de gestion"
              hint="Centro de gestion"
              outlined
              @change="filtroCentroGestion()"
            ></v-autocomplete> -->
            <v-autocomplete
              v-model="proyectoSeleccionado"
              :items="proyectos"
              outlined
              label="Proyectos"
              item-text="nombre"
              item-value="id"
              hint="Selecciona el proyecto al que asignaras esta OC"
              dense
              return-object
            ></v-autocomplete>  
          </v-col>
          <v-col cols="5">
            <!-- <v-autocomplete
              v-if="aprobar == false"
              v-model="estadoSeleccionado"
              :items="estadosOc"
              class="flex-grow-1 mr-md-2"
              solo
              hide-details
              dense
              item-text="nombre"
              item-value="id"
              placeholder="Selecciona el Estado de la Oc"
              @change="filtroEstadoOc()"
            ></v-autocomplete> -->
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateRangeText"
                  prepend-icon="mdi-calendar"
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
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="menu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6" class="d-flex text-right align-center">
            <!-- <v-text-field
              v-model="searchQuery"
              append-icon="mdi-magnify"
              class="flex-grow-1 mr-md-2"
              solo
              hide-details
              dense
              clearable
              placeholder="Nombre o Material de Orden de Compra"
              @keyup.enter="searchUser(searchQuery)"
            ></v-text-field>
            <v-btn
              :loading="isLoading"
              icon
              small
              class="ml-2"
              @click
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn> -->
            <v-speed-dial 
              v-if="aprobar == false"
              v-model="fab"
              class="pa-4 align-center"
              :top="top"
              :bottom="bottom"
              :right="right"
              :left="left"
              :direction="direction"
              :open-on-hover="hover"
              :transition="transition"
            >
              <template v-slot:activator>
                <v-btn
                  v-model="fab"
                  color="blue"
                >
                  <v-icon v-if="fab" class="pa-1 align-center" color="white">
                    mdi-close
                  </v-icon>
                  <v-icon v-else class="pa-1 align-center" color="white">
                    mdi-microsoft-excel 
                  </v-icon>
                </v-btn>
              </template>
              <v-btn
                dark
                small
                color="indigo"
              >  <download-excel
                class="btn btn-default"
                :fetch="cargarDataExcelCabecera"
                :fields="headerExcelCabecera"
                worksheet="Mi Listado de Oc"
                name="cabeceras_oc.xls"
              >Descargar Cabeceras
              </download-excel>
              </v-btn>
              <v-btn
         
                dark
                small
                color="indigo"
              > <download-excel
                class="btn btn-default"
                :fetch="cargarDataExcelDetalle"
                :fields="headerExcelDetalle"
                worksheet="Mi Listado de Oc"
                name="lineas_oc.xls"
              >Descargar Cabeceras y Lineas
              </download-excel>
              </v-btn>
       
            </v-speed-dial>
          </v-col>
        </v-row>
       
        <v-data-table
          v-model="selectedUsers"
          :headers="cpxDinamicHeaders"
          :items="ocs"
          :search="searchQuery"
          class="flex-grow-1"
        >

          <template v-slot:item.nombre="{ item }">
            <div class="font-weight-bold"> <div>{{ item.nombre }}</div></div>
          </template>

          <template v-slot:item.actions="{ item }">
            <div><v-btn
              @click="abrirDetalle(item)"
            > Abrir </v-btn>
            </div>
          </template> 
          <template v-slot:item.fec_creacion="{ item }">
            <div class="font-weight-bold">{{ item.fec_creacion | formatDate('ll') }}</div>
          </template>
          <template v-slot:item.neto="{ item }">
            <div class="font-weight-bold">{{ item.neto | currency }}</div>
          </template>
        </v-data-table>
      </v-card>
      
    </div>
  </div>
</template>

<script src="./TablaConsulta.js"></script>
<style scoped src="./TablaConsulta.css"></style>