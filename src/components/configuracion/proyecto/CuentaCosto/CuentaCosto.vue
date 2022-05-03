<template>
  <v-container class="grey lighten-5">
    <v-row class="mb-6" no-gutters>
      <v-col>   
        <v-card class="pa-2" outlined tile>
          <v-row class="mb-6" no-gutters>
            <v-col>     
              <h3>CUENTAS DE COSTO</h3>
              <h5> Ingrese la información para su control presupuestario. Para poder operar en ese centro de gestión es necesario contar con al menos 1 cuenta de costo.</h5>
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
                        Agregar Cuenta de Costo
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