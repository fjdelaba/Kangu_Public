<template>
  
  <v-container class="grey lighten-5">
    <h2>
      Creacion del  Proyecto
    </h2>
    <v-row class="mb-6" no-gutters>
      <v-col>   
        <v-card class="pa-2" outlined tile>
          <v-row class="mb-6" no-gutters>
            <v-col>     
              <h3>MATERIALES A CONTROLAR</h3>
              <h5> Estos valores serán ocupados en aprobaciones y al crear ordenes de compra.</h5>
            </v-col>
          </v-row>
          <v-row class="mb-6" no-gutters>
            <v-col>     
              <template>
                <v-data-table
                  :headers="headers"
                  :items="desserts"
                  :items-per-page="5"
                  class="elevation-1"
                >
                  <template v-slot:top>
                    <v-toolbar
                      flat
                    >
                      <v-divider
                        class="mx-4"
                        inset
                        vertical
                      ></v-divider>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        dark
                      >
                        Agregar Material a Controlar
                      </v-btn>
                    </v-toolbar></template></v-data-table>
              </template>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style src="./Listado/Listado.css"></style>
<script src="./Listado/Listado.js"></script>
