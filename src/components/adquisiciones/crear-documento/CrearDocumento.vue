<template>
  <v-row
    no-gutters
    style="flex-wrap: nowrap;"
  >
    <v-col
      cols="12"
      style="min-width: 600px;"
      class="flex-grow-0 flex-shrink-1 w-full"
    >

      <v-stepper v-model="e1" class="flex-grow-1">
        <v-stepper-header>
          <!-- -->
          <v-stepper-step
            :complete="e1 > 1"
            step="1"
          >Datos Generales</v-stepper-step>
          <!-- -->
          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 2"
            step="2"
          >
            Seleccion de Lineas
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 3" step="3">
            Materiales
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="4">
            Previsualozacion
          </v-stepper-step>

        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-btn-toggle
              v-model="text"
              tile
              color="deep-purple accent-3"
              group
            >
              <v-btn value="directa">
                Directa
              </v-btn>

              <v-btn value="pedido">
                Desde Pedido
              </v-btn>

              <v-btn value="cotizacion">
                Desde Cotizacion
              </v-btn>
            </v-btn-toggle>

            <v-form v-model="valid">
              <v-container >
                <p>Informacion General</p> 
                <v-divider></v-divider>
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-autocomplete
                      v-model="model"
                      :items="items"
                      :loading="isLoading"
                      :search-input.sync="search"
                      hide-no-data
                      hide-selected
                      item-text="Description"
                      item-value="API"
                      label="Centro de Gestion"
                      return-object
                      outlined
                      dense
                      hint="Selecciona el proyecto al que asignaras esta OC"
                    ></v-autocomplete>
                  </v-col>

                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-text-field
                      label="Nombre de OC"
                      value=""
                      hint="Ingresa un nombre descriptivo a esta OC"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-combobox
                      clearable
                      outlined
                      label="Moneda"
                      hint="¿En que moneda generaras esta OC?"
                      dense
                    ></v-combobox>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-combobox
                      clearable
                      outlined
                      label="Tipo Documento"
                      hint="¿Que documento contable generará esta OC?"
                      dense
                    ></v-combobox>
                  </v-col>
                </v-row>
                <p>Proveedor</p>
                <v-divider
                  :key="index"
                ></v-divider>
                <v-row>
                    
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-autocomplete
                      v-model="model"
                      :items="items"
                      :loading="isLoading"
                      :search-input.sync="search"
                      hide-no-data
                      hide-selected
                      item-text="Description"
                      item-value="API"
                      label="Proveedor"
                      return-object
                      outlined
                      hint="Puedes buscar por nombre o por rut"
                      dense
                    ></v-autocomplete>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-combobox
                      clearable
                      outlined
                      label="Contacto"
                      hint="Indicanos a que vendedor debe llegar esta OC"
                      dense
                    ></v-combobox>
                  </v-col>
           
                </v-row>
                <p>Condiciones</p>
                <v-divider
                  :key="index"
                ></v-divider>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-autocomplete
                      v-model="model"
                      :items="items"
                      :loading="isLoading"
                      :search-input.sync="search"
                      hide-no-data
                      hide-selected
                      item-text="Description"
                      item-value="API"
                      label="Forma de pago"
                      return-object
                      outlined
                      hint="Selecciona como pagarás esta OC"
                      dense
                    ></v-autocomplete>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-combobox
                      clearable
                      outlined
                      label="Despacho/Retiro"
                      hint="¿Como llegarán los materiales a tu proyecto?"
                      dense
                    ></v-combobox>
                  </v-col>
           
                </v-row>
              </v-container>
            </v-form>

            <v-btn
              color="primary"
              @click="e1 = 2"
            >
              Continue
            </v-btn>

            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>

            <v-btn
              color="primary"
              @click="e1 = 3"
            >
              Continue
            </v-btn>

            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>

            <v-btn
              color="primary"
              @click="e1 = 4"
            >
              Continue
            </v-btn>

            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>
          <v-stepper-content step="4">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>

            <v-btn
              color="primary"
              @click="e1 = 1"
            >
              Continue
            </v-btn>

            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-col>
  </v-row>
</template>

<script src="./CrearDocumento.js"></script>

<style scoped src="./CrearDocumento.css"></style>
