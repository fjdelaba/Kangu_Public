<template>

  <v-container>
    <v-row>
      <v-col>
        <h2>LISTADO DE PROYECTOS</h2>
      </v-col>
    </v-row>
    <v-row class="mb-6" no-gutters>
      <v-breadcrumbs :items="breadcrumbs" class="pa-0"></v-breadcrumbs>
    </v-row>
    <v-row class="mb-6" no-gutters>
      <v-col >   
        <v-row class="mb-6" no-gutters>
          <v-col v-if="detalle == false" cols="12"> 
           
            <v-col> 
              <v-card>
                <v-card-title>
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
                  <v-btn
                    color="success"
                    dark
                    large
                    @click="$router.push(`/configuracion/proyectos/sent`)"
                  ><v-icon size="30" left>mdi-folder-plus-outline </v-icon> 
                    CREAR PROYECTO
                  </v-btn> 
                </v-card-title>
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
                        color="success"
                        dark
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
          <v-row class="mb-6" no-gutters>
   
          </v-row>
        </v-row></v-col>
    </v-row>
  </v-container>
</template>

<style src="./Listado/Listado.css"></style>
<script src="./Listado/Listado.js"></script>
