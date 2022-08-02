<template>

  <div>
    <div v-if="skeleton">
      <v-skeleton-loader
        type="card-avatar, article, actions"
      ></v-skeleton-loader>
        
    </div>
    <div v-if="!skeleton">
      <div class="d-flex flex-column flex-grow-1">
        <div class="d-flex align-center">
          <div>
            <v-breadcrumbs :items="breadcrumbs" class="pa-0"></v-breadcrumbs>
          </div>
        
          <v-col cols="auto">
            <v-dialog
              v-model="abrirDialog"
              transition="dialog-top-transition"
              max-width="650"
            >
              <modal-entidad></modal-entidad>
            </v-dialog>
          </v-col>
        </div>
        
        <!-- users list -->
        
        <v-row dense class="px-2 align-center">
          <v-btn
                color="primary"
                @click="abrirDialog = true"
                >Crear Proveedor</v-btn>
          <v-spacer></v-spacer>
          <v-col cols="6" class="d-flex text-right align-center">
            <v-text-field
              v-model="searchQuery"
              append-icon="mdi-magnify"
              class="flex-grow-1 mr-md-2"
              solo
              hide-details
              dense---
              clearable
              placeholder="p.ej. filtrar por rut, correo electrónico, nombre, etc."
              @keyup.enter="searchUser(searchQuery)"
            ></v-text-field>
          </v-col>
          
        </v-row>
   
        <v-data-table
          v-if="!skeleton"
          v-model="selectedUsers"
          :headers="headers"
          :items="proveedores"
          :search="searchQuery"
          class="flex-grow-1"
          dense
        >
        <v-row dense>
          <template v-slot:item.rut="{ item }">
            <div class="font-weight-bold">
              <div>{{ item.rut }}</div>
            </div>
          </template>

          <template v-slot:item.razon_social="{ item }">
            <div class="font-weight-bold">
              <div>{{ item.razon_social }}</div>
            </div>
          </template>
          <template v-slot:item.activo="{ item }">
            
              <v-checkbox v-model="item.activo" :disabled="true"></v-checkbox>
      
          </template>

          <template v-slot:item.fec_creacion="{ item }">
            <div>{{ item.fec_creacion | formatDate("ll") }}</div>
          </template>
          </v-row>
          <template v-slot:item.action="{ item }">
            <div class="actions">
              <v-btn small @click="cargarDetalle(item.id)">
                Abrir
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
  
</template>

<script src="./Tabla-proveedor.js"></script>
<style scoped src="./Tabla-proveedor.css"></style>
