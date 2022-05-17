<template>

  <v-container>
    <v-row>
      <v-col>
        <h2>CREACION DE PROYECTO {{ idPro }}</h2>
      </v-col>
    </v-row>
    <v-row class="mb-6" no-gutters>
      <v-col>   
        <v-row class="mb-6" no-gutters>
          <v-col> 
            <v-tabs>

              <v-tab href="#search">
                Informacion
              </v-tab>
              <v-tab-item value="search">
                <informacion-general ref="infoGeneral" @guardarInformacion="idProyecto"></informacion-general>
              </v-tab-item>
              <v-tab href="#searcha">
                Adquisiciones
              </v-tab>
              <v-tab-item value="searcha">
                <adquisiciones ref="adquisiciones" :id-proyecto="idMantenedor"></adquisiciones>
              </v-tab-item >
              <v-tab href="#searchas">
                Cuentas de Costo
              </v-tab>
              <v-tab-item value="searchas">
                <cuenta-costo ref="cuentaCosto"></cuenta-costo>
              </v-tab-item>
              <v-tab href="#searchass">
                Materiales
              </v-tab>
              <v-tab-item value="searchass">
                <material-control ref="mateControl"></material-control>
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
