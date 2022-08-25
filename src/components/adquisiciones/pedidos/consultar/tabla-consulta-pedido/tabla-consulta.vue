<template>
  <v-container>
    <breadcrumbs :breadcrumbs="breadcrumbs"></breadcrumbs>
   
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
    
      </v-row>
       
      <v-row dense class="px-2 align-center">
        <v-spacer></v-spacer>
        <v-col cols="7" class="d-flex text-right align-center">
          <v-text-field
            v-model="lol"
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

      <v-dialog v-if="dialogDelete == true" v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Orden de Compra de este material</v-card-title>
          <v-divider></v-divider>
          <v-data-table
            :headers="headers3"
            :items="a3"
            class="flex-grow-1"
            dense
            :loading="loadingTabla"
            loading-text="Buscando pedidos"
            :hide-default-footer="true"
          ></v-data-table>
        </v-card>

      </v-dialog>
      <v-data-table
        :headers="headers"
        :items="listadoPedidos"
        class="flex-grow-1"
        dense
        :loading="loadingTabla"
        loading-text="Buscando pedidos"
        :search="lol"
        show-expand
        :expanded.sync="expanded"
        :single-expand="singleExpand"
      ><!-- v-model="selectedUsers" -->
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-data-table
              :headers="headers2"
              :items="item.ped_dets"
              class="flex-grow-1"
              dense
              :search="lol2"
              :hide-default-footer="true"
            >
              <template v-slot:item.nombre="{ item }">
                <nombre-material :nombre="item.mat.nombre" :unidad="item.mat.mat_uni.nombre" :observacion="item.observacion" ></nombre-material>
              </template>
              <template v-slot:item.cant_comprada="{ item }">
                <p @click="dialogDelete = true">{{ item.cant_comprada }}</p>
              </template>
              <template v-slot:item.cantidad="{ item }">
                <p>{{ item.cantidad }}</p>
              </template>
           
            </v-data-table>
          </td>
        </template>
     
        <template v-slot:header.estado="{ header }">
          {{ header.text }}
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon small :color="'black'">
                  mdi-filter
                </v-icon>
              </v-btn>
            </template>
            <div style="background-color: white; width: 280px">
              <v-autocomplete
                v-model="a2"
                :items="[]"
                outlined
                dense
                chips
                label="Selecciona los estados"
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
        <template v-slot:header.soli="{ header }">
          {{ header.text }}
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon small :color="'black'">
                  mdi-filter
                </v-icon>
              </v-btn>
            </template>
            <div style="background-color: white; width: 280px">
              <v-autocomplete
                v-model="a2"
                :items="[]"
                outlined
                dense
                chips
                small-chips
                multiple
                label="Selecciona los solicitantes"
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
        <template v-slot:header.proyecto="{ header }">
          {{ header.text }}
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon small :color="'black'">
                  mdi-filter
                </v-icon>
              </v-btn>
            </template>
            <div style="background-color: white; width: 280px">
              <v-autocomplete
                v-model="a2"
                :items="[]"
                outlined
                dense
                chips
                small-chips
                multiple
                label="Selecciona los centros de gestión"
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
          <div class="font-weight-bold"> <div>{{ item.nombre }}</div></div>
        </template>
        <template v-slot:item.actions="{ item }">
          <div><v-btn
            small
            @click="abrirDetalle(item)"
          > Abrir </v-btn>
          </div>
        </template> 
        <template v-slot:item.pdf="{ item }">
          <div><v-btn
            x-small
            @click="descargarPdf(item)"
          > 
            <v-icon>mdi-file-pdf-box</v-icon>
          </v-btn>
          </div>
        </template> 
        <template v-slot:item.fec_creacion="{ item }">
          <div class="font-weight-bold">{{ item.fec_creacion | formatDate('L') }}</div>
        </template>
       
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script src="./tabla-consulta.js"></script>