<template>

  <v-container>
    <v-row>
      <v-col>
        <h2>Listado de proyectos</h2>
      </v-col>
    </v-row>
    <v-row class="mb-1" no-gutters>
      <v-breadcrumbs :items="breadcrumbs" class="pa-0"></v-breadcrumbs>
    </v-row>
    <div v-if="skeleton">
      <v-skeleton-loader
        type="card-avatar, article, actions"
      ></v-skeleton-loader>
        
    </div>
    <v-row v-if="!skeleton" class="mb-1" no-gutters>
      <v-col >   
        <v-row class="mb-0" no-gutters>
          <v-col v-if="detalle == false" cols="12"> 
          <v-row dense class="px-1 align-center">
          <v-btn
                    color="primary"
                    dark
                    class="ml-3"
                    @click="$router.push(`/configuracion/proyectos/sent`)"
                  >
                    Crear Proyecto
                  </v-btn> 
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
                    placeholder="p.ej. filtrar por codigo, nombre proyecto, mandante, monto y estado"
                    @keyup.enter="searchUser(searchQuery)"
                  ></v-text-field>
           </v-col>
           </v-row>
            <v-col> 
              <v-card>
                <template>
                  <v-data-table
                    :headers="headers"
                    :items="proyectos"
                    :items-per-page="10"
                    :search="searchQuery"
                    class="elevation-1"
                    loading="true"
                  >
                    <template v-slot:item.actions="{item}">
                      <v-btn
                        
                        @click="abrirDetalle(item)"
                      ><v-icon left>mdi-eye</v-icon> 
                        Detalle 
                      </v-btn> 
                    </template> 
                    <template v-slot:item.valor_contractual="{item}">
                      <p>{{ item.valor_contractual | currency }}</p>
                    </template>
                  </v-data-table>
                </template>
              </v-card></v-col>
          </v-col>

        </v-row></v-col>
    </v-row>
  </v-container>
</template>

<style src="./Listado/Listado.css"></style>
<script src="./Listado/Listado.js"></script>
