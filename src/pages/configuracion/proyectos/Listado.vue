<template>

  <v-container>
    <v-breadcrumbs :items="breadcrumbs" class="pa-0"></v-breadcrumbs>
    <v-row>
      <v-col>
        <h2 v-if="detalle == false">LISTADO DE PROYECTOS</h2>
        <h2 v-if="detalle == true">DETALLE DEL PROYECTO SELECCIONADO</h2>
      </v-col>
    </v-row>
    <v-row class="mb-6" no-gutters>
      <v-col >   
        <v-row class="mb-6" no-gutters>
          <v-col v-if="detalle == false" cols="12"> 
            <v-btn
              color="success"
              dark
              large
              @click="$router.push(`/configuracion/proyectos/sent`)"
            ><v-icon size="30" left>mdi-folder-plus-outline </v-icon> 
              CREAR PROYECTO
            </v-btn> 
            <v-col> 
              <v-card>
                <v-card-title>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <template>
                  <v-data-table
                    :headers="headers"
                    :items="proyectos"
                    :items-per-page="10"
                    :search="search"
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
