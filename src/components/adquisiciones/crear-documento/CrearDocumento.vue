<template>
  <v-row
    no-gutters
    style="flex-wrap: nowrap;"
  >
    <v-col
      cols="5"
      style="min-width: 700px;"
      class="flex-grow-0 flex-shrink-1"
    >
      <v-stepper v-model="e1" class="flex-grow-1">
        <v-stepper-header>
          <v-stepper-step
            :complete="e1 > 1"
            step="1"
          >
            Datos Generales
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 2"
            step="2"
          >
            Materiales
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">
            Previsualozacion
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-form v-model="valid">
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="firstname"
                      :rules="nameRules"
                      :counter="10"
                      label="First name"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="lastname"
                      :rules="nameRules"
                      :counter="10"
                      label="Last name"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    ></v-text-field>
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
