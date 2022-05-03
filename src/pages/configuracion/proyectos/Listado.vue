<template>

  <v-container>
    <v-row>
      <v-col>
        <h2>CREACION DE PROYECTO</h2>
      </v-col>
    </v-row>
    <v-row class="mb-6" no-gutters>
      <v-col>   
        <v-row class="mb-6" no-gutters>
          <v-col> 
            <v-tabs>

              <v-tab href="#search">
                Informacion General
              </v-tab>
              <v-tab-item value="search">
                <cuenta-costo></cuenta-costo>
              </v-tab-item>
              <v-tab href="#searcha">
                Adquisiciones
              </v-tab>
              <v-tab-item value="searcha">
                <adquisiciones></adquisiciones>
              </v-tab-item>
              <v-tab href="#searchas">
                Cuentas de Costo
              </v-tab>
              <v-tab-item value="searchas">
                <cuenta-costo></cuenta-costo>
              </v-tab-item>
              <v-tab href="#searchass">
                Materiales a Controlar
              </v-tab>
              <v-tab-item value="searchass">
                <material-control></material-control>
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style src="./Listado/Listado.css"></style>
<script src="./Listado/Listado.js"></script>
