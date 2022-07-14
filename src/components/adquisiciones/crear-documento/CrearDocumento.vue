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
  
      <v-stepper v-model="pasoStep" class="flex-grow-1">
        <v-stepper-header>
          <!-- -->
          <v-stepper-step
            :rules="[() => validarPasoUno]"
            :complete="pasoStep > 1"
            step="1"
          >Datos Generales</v-stepper-step>
          <!-- -->
          <v-divider></v-divider>

          <v-stepper-step
            :complete="pasoStep > 2"
            step="2"
          >
            Seleccion de Lineas
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="pasoStep > 3" step="3">
            Materiales
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="4">
            Previsualizacion
          </v-stepper-step>

        </v-stepper-header>

        <v-stepper-items >
          <v-stepper-content step="1">
            <!-- <v-btn-toggle
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
            </v-btn-toggle> -->
            <v-form ref="formPaso1" v-model="valid" lazy-validation>
              <!-- <v-container class="ma-0 pa-0"> -->
              <p class="ma-0">Informacion General</p> 
              <v-divider></v-divider>
              <v-row >
                <v-col 
                  cols="12"
                  md="4"
                  class="mb-0"
                >
                  <v-combobox
                    v-model="proyecto"
                    :rules="proyectoRules"
                    outlined
                    label="Proyectos"
                    :items="listaProyectos"
                    item-text="nombre"
                    item-value="id"
                    hint="Selecciona el proyecto al que asignaras esta OC"
                    dense
                  ></v-combobox>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="nombreOC"
                    label="Nombre de OC"
                    value=""
                    :rules="nombreOCRules"
                    hint="Ingresa un nombre descriptivo a esta OC"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-combobox
                    v-model="moneda"
                    :rules="monedaRules"
                    clearable
                    outlined
                    label="Moneda"
                    :items="listaMonedas"
                    item-text="nombre"
                    item-value="id"
                    hint="¿En que moneda generaras esta OC?"
                    dense
                  ></v-combobox>
                </v-col>
              </v-row>
              <v-row >
                <v-col 
                  cols="12"
                  md="6"
                  class="pt-0"
                >
                  <v-combobox
                    v-model="tipoDocumento"
                    :rules="tipoDocumentoRules"
                    clearable
                    outlined
                    :items="listaTipoDocumento"
                    item-text="nombre"
                    item-value="id"
                    label="Tipo Documento"
                    hint="¿Que documento contable generará esta OC?"
                    dense
                  ></v-combobox>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                  class="pt-0"
                >
                  <v-combobox
                    v-model="tipoOC"
                    :rules="tipoOCRules"
                    clearable
                    outlined
                    :items="listaTipoOC"
                    item-text="nombre"
                    item-value="id"
                    label="Tipo Documento"
                    hint="¿Que documento contable generará esta OC?"
                    dense
                  ></v-combobox>
                </v-col>
              </v-row>
              <p class="ma-0">Proveedor</p>
              <v-divider  
                :key="index"
              ></v-divider>
              <v-row>
                    
                <v-col
                  cols="12"
                  md="6"
                >
                  <!-- valor: {{ proveedor.id }} -->
                  <v-autocomplete
                    v-model="proveedor"
                    :rules="proveedorRules"
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
                    v-model="vendedor"
                    :rules="vendedorRules"
                    clearable
                    outlined
                    label="Vendedor"
                    hint="Indicanos a que vendedor debe llegar esta OC"
                    dense
                  ></v-combobox>
                </v-col>
           
              </v-row>
              <p class="ma-0">Condiciones</p>
              <v-divider
                :key="index"
              ></v-divider>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-combobox
                    v-model="pago"
                    :rules="pagoRules"
                    clearable
                    outlined
                    :items="listaFormaPago"
                    item-text="nombre"
                    item-value="id"
                    label="Forma de pago"
                    hint="Selecciona como pagarás esta OC"
                    dense
                  ></v-combobox>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-combobox
                    v-model="despacho"
                    :rules="despachoRules"
                    clearable
                    outlined
                    :items="listaDespacho"
                    item-text="nombre"
                    item-value="id"
                    label="Despacho/Retiro"
                    hint="¿Como llegarán los materiales a tu proyecto?"
                    dense
                  ></v-combobox>
                </v-col>
           
              </v-row>
              <!-- </v-container> -->
            </v-form>
            <v-row
              align="start"
              justify="space-around"
            >
              <v-col cols="12" md="4">
                <v-btn
                  color="primary"
                  @click="atras()"
                >
                  Atras
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="siguiente()"
                >
                  siguiente
                </v-btn>
              </v-col>
              <v-col cols="12" md="4">

              </v-col>
              <v-col cols="12" md="4">

              </v-col>
            </v-row>

            <!-- <v-btn text>
              Cancel
            </v-btn> -->
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>

            <v-btn
              color="primary"
              @click="pasoStep = 3"
            >
              Siguiente
            </v-btn>

            <!-- <v-btn text>
              Cancel
            </v-btn> -->
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>

            <v-btn
              color="primary"
              @click="pasoStep = 4"
            >
              siguiente
            </v-btn>

            <!-- <v-btn text>
              Cancel
            </v-btn> -->
          </v-stepper-content>
          <v-stepper-content step="4">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>

            <v-btn
              color="primary"
              @click="pasoStep = 1"
            >
              siguiente
            </v-btn>

            <!-- <v-btn text>
              Cancel
            </v-btn> -->
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-col>
  </v-row>
</template>

<script src="./CrearDocumento.js"></script>

<style scoped src="./CrearDocumento.css"></style>
