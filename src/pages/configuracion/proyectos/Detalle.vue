<template>

  <v-container>
    <div v-if="$store.state.app.permisosUsuario.proyectos == false">
      <v-card class="text-center w-full error-page pa-4 mx-auto">
        <v-img src="../../../assets/images/permiso.png" max-height="250" contain />
        <div class="display-2 mt-6">OOPS!!!</div>
        <div class="mt-3 mb-6">No tienes permisos para ver está página. Contacta al administrador de Kangusoft si necesitas tener habilitada esta página</div>
        <v-btn to="/" block large color="primary">Notificar al administrador de  Kangusoft</v-btn>
      </v-card>
    </div>
    <div v-else>
      <v-row>
        <v-col>
          <h2>DETALLE DEL PROYECTO SELECCIONADO</h2>
        </v-col>
      </v-row>
      <v-row class="mb-6" no-gutters>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0"></v-breadcrumbs>
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
    </div>
  </v-container>
</template>

<script src="./Detalle/Detalle.js"></script>
