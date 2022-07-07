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
            <v-tabs v-model="active">
              <v-tab>
                Informacion
              </v-tab>
              <v-tab-item >
                <informacion-general ref="infoGeneral" @id="cambioStep1" ></informacion-general>
              </v-tab-item>
              <v-tab :disabled="!grabado" >
                Adquisiciones
              </v-tab>
              <v-tab-item  >
                <adquisiciones
                  :id="idPro"
                  ref="adquisiciones"
                  :moneda="moneda"
                 
                  :grabado="idPro"
                  @id="cambioStep2"
                ></adquisiciones>
              </v-tab-item >
              <v-tab :disabled="!grabado">
                Cuentas de Costo
              </v-tab>
              <v-tab-item >
                <cuenta-costo ref="cuentaCosto"></cuenta-costo>
              </v-tab-item>
              <v-tab :disabled="!grabado">
                Control de Materiales
              </v-tab>
              <v-tab-item>
                <material-control :id="idPro" ref="mateControl" :presupuesto="presupuesto"></material-control>
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style src="./Creacion/Creacion.css"></style>
<script src="./Creacion/Creacion.js"></script>
