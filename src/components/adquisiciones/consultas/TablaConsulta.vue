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
        <v-row v-if="false" dense class="pa-2 align-center">
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
            v-model="proyecto"
            :items="listadoProyectos"
            outlined
            label="Proyectos"
            item-text="nombre"
            item-value="id"
            hint="Selecciona el proyecto al que asignaras esta OC"
            dense
            return-object
          ></v-autocomplete>  
      
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
            transition="scale-transition"
            offset-y
            dense
            min-width="auto"
            label="Fechas"
          ><!--  :return-value.sync="date"-->
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
                Cancel
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
          <v-autocomplete
            v-model="tipoDocumento"
            :items="listaTiposDocumentos"
            outlined
            label="Tipo Documento"
            item-text="nombre"
            item-value="id"
            dense
            @change="cargarOcs()"
          ></v-autocomplete>  
          <v-autocomplete
            v-model="moneda"
            :items="listaMonedas"
            outlined
            label="Moneda"
            item-text="nombre"
            item-value="id"
            dense
            @change="cargarOcs()"
          ></v-autocomplete> 
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
            <!-- <v-speed-dial 
              v-if="origen == 2"
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
       
            </v-speed-dial> -->
          </v-col>
        </v-row>
       
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

            <v-list dense>
              <v-list-item link> <!-- v-for="(item, i) in items" :key="i" -->
                <v-list-item-title><download-excel
                  class="btn btn-default"
                  :fetch="cargarDataExcelCabecera"
                  :fields="headerExcelCabecera"
                  worksheet="Mi Listado de Oc"
                  name="cabeceras_oc.xls"
                >Descargar Cabeceras
                </download-excel></v-list-item-title>
              </v-list-item>
              <v-list-item link> <!-- v-for="(item, i) in items" :key="i" -->
                <v-list-item-title> <download-excel
                  class="btn btn-default"
                  :fetch="cargarDataExcelDetalle"
                  :fields="headerExcelDetalle"
                  worksheet="Mi Listado de Oc"
                  name="lineas_oc.xls"
                >Descargar Lineas
                </download-excel> </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-spacer></v-spacer>
          <v-col cols="7" class="d-flex text-right align-center">
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
                  class="py-0"
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
                  Cancel
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
                @click="mostrarModalFiltros = true"
              >
                Filtros
                <v-icon dark>
                  mdi-chart-gantt
                </v-icon>
              </v-btn>
            </v-badge>
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
        ><!-- v-model="selectedUsers" -->
          <template v-slot:header.pro_nombre="{ header }">
            {{ header.text }}
            <v-menu offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon small>
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
          <template v-slot:header.razon_social="{ header }">
            {{ header.text }}
            <v-menu offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon small>
                    mdi-filter
                  </v-icon>
                </v-btn>
              </template>
              <div style="background-color: white; width: 280px">
                <v-autocomplete
                  v-model="filtros.proveedores"
                  :items="valoresFiltros._listaProveedores"
                  outlined
                  dense
                  chips
                  small-chips
                  multiple
                  label="Selecciona los proveedores"
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
           <template v-slot:header.usu_nombre="{ header }">
            {{ header.text }}
            <v-menu offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon small>
                    mdi-filter
                  </v-icon>
                </v-btn>
              </template>
              <div style="background-color: white; width: 280px">
                <v-autocomplete
                  v-model="filtros.compradores"
                  :items="valoresFiltros._listaCompradores"
                  outlined
                  dense
                  chips
                  small-chips
                  multiple
                  label="Selecciona los compradores"
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
          <template v-slot:item.nombre="{ item }">
            <div class="font-weight-bold"> <div>{{ item.usu_nombre }}</div></div>
          </template>

          <template v-slot:item.actions="{ item }">
            <div><v-btn
              x-small
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
    <v-dialog
      v-if="mostrarModalFiltros"
      v-model="mostrarModalFiltros"
      persistent
      max-width="580"
    >
      <modal-filtros :_aplicar-filtros="mostrarFiltros" :_valores-filtros="valoresFiltros" :_filtros="filtros"></modal-filtros>
    </v-dialog>
  </div>
</template>

<script src="./TablaConsulta.js"></script>
<style scoped src="./TablaConsulta.css"></style>