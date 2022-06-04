<template>
  <div>
    <!-- apro: {{ aprobadores }} -->
    <v-stepper alt-labels>
      <v-stepper-header>
        <div v-for="(item, index) in aprobadores" :key="index">
          <v-stepper-step
            step=""
            :complete="origen == 1 ? true : item.aprobado"
          >
            <!-- <template #icon="step">
              <v-icon v-if="step.aprobado">mdi-close</v-icon>
              <v-icon v-else>mdi-plus</v-icon>
              //Etc ...
            </template>
            {{ item.nombre }} {{ step }} -->
            {{ item.nombre }}
          </v-stepper-step>
          <v-divider></v-divider>
        </div>
        <!-- <v-stepper-step step="2">
          Santiago Perez
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          Alex De La Barra
        </v-stepper-step> -->
      </v-stepper-header> 
    </v-stepper>

  </div>
</template>

<script src="./Pipeline.js"></script>

<style scoped src="./Pipeline.css"></style>