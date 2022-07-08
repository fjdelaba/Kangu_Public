<template>

  <v-container>
    <v-breadcrumbs :items="breadcrumbs" class="pa-0"></v-breadcrumbs>
    <v-row>
      <v-col>
        <h2>DETALLE DEL PROYECTO SELECCIONADO</h2>
      </v-col>
    </v-row>
    <v-row class="mb-6" no-gutters>
      <v-col>   
        <v-row class="mb-6" no-gutters>
          <v-col> 
            <v-tabs>

              <v-tab >
                Informacion
              </v-tab>
              <v-tab-item >
                <informacion-general ref="infoGeneral" :detalle="detalle" :idproyecto="idProyecto" ></informacion-general>
              </v-tab-item>
              <v-tab>
                Adquisiciones
              </v-tab>
              <v-tab-item >
                <adquisiciones

                  ref="adquisiciones"
                  :detalle="detalle"
                  :idproyecto="idProyecto"
                ></adquisiciones>
              </v-tab-item >
              <v-tab >
                Cuentas de Costo
              </v-tab>
              <v-tab-item >
                <cuenta-costo ref="cuentaCosto"></cuenta-costo>
              </v-tab-item>
              <v-tab >
                Control de Materiales
              </v-tab>
              <v-tab-item>
                <material-control
                  ref="mateControl"
                  :presupuesto="presupuesto"
                  :detalle="detalle"
                  :idproyecto="idProyecto"
                ></material-control>
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./Detalle/Detalle.js"></script>
