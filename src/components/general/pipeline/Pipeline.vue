<template>
  <div>
    <!-- adasdsa {{ aprobadores }} -->
    <v-row
      v-if="aprobadores.length > 0"
      align="center"
      justify="center"
    >
      <v-col :cols="12" lg="8" align-self="center">
        <v-stepper alt-labels class="elevation-0">
          <v-stepper-header>
            <div v-for="(item, index) in aprobadores" :key="index">
              <v-stepper-step
                step=""
                complete
                :editable="getAprobadorRechazadoEsperando(item)"
                :edit-icon="getIconoRechazadoEsperando(item)"
                complete-icon="check"
              > 
                <!-- <template #icon="step">
              <v-icon v-if="step.aprobado">mdi-close</v-icon>
              <v-icon v-else>mdi-plus</v-icon>
              //Etc ...
            </template>
            {{ item.nombre }} {{ step }} -->
                <!-- {{ item.nombre }} -->
                <!-- {{ item }} -->
              </v-stepper-step>
              <v-divider></v-divider>
               {{ item.nombre }}
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
      </v-col>
    </v-row>  
    <v-row
      v-else
      align="center"
      justify="center"
    >
      No existe flujo para esta oc
    </v-row>
  </div>
</template>

<script src="./Pipeline.js"></script>

<style scoped>

</style>