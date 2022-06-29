<template>
  <div>
    <p> aprobar:{{ aprobar }} , consulta:{{ consulta }}</p> 
    <div class="d-flex flex-column flex-grow-1">
      <div class="d-flex align-center py-3">
        <div>
          <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
        </div>
        <v-spacer></v-spacer>
      </div>

      <v-card>
        <!-- users list -->
        <v-row dense class="pa-2 align-center">
          <v-col cols="3">
            <v-autocomplete
              v-model="proyectoSeleccionado"
              :items="proyectos"
              class="flex-grow-1 mr-md-2"
              solo
              hide-details
              dense
              item-text="nombre"
              item-value="id"
              placeholder="Selecciona el Centro de Gestión de la Oc"
              @change="filtroCentroGestion()"
            ></v-autocomplete>
            
          </v-col>
          <v-col cols="3">
            <v-autocomplete
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
            ></v-autocomplete>
            
          </v-col>
          <v-col cols="6" class="d-flex text-right align-center">
            <v-text-field
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
            </v-btn>
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
        </v-data-table>
      </v-card>
      
    </div>
  </div>
</template>

<script src="./TablaConsulta.js"></script>
<style scoped src="./TablaConsulta.css"></style>