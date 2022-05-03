<template>
  <div>
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
            <v-stepper-step
              :complete="pasoStep > 1"
              step="1"
            >
              Datos Generales
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="pasoStep > 2"
              step="2"
            >
              Selección de Lineas
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step 
              :complete="pasoStep > 3"
              step="3"
            >
              Materiales
            </v-stepper-step>

            <v-stepper-step step="4">
              Previsualización
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <informacion-general></informacion-general>
            </v-stepper-content>

            <v-stepper-content step="2">
              <agregar-material></agregar-material>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              ></v-card>
            </v-stepper-content>

            <v-stepper-content step="4">
              <previsualizacion></previsualizacion>
            </v-stepper-content>
          </v-stepper-items>
          <v-btn
            color="primary"
            @click="avanzar()"
          >
            {{ textoAvanzar }}
          </v-btn>

          <v-btn @click="retroceder()">
            Atras
          </v-btn>
        </v-stepper>
      </v-col>
    </v-row>    
    <!-- <CrearDocumento/> -->
  </div>
</template>

<script>
import CrearDocumento from '../../../components/adquisiciones/crear-documento/CrearDocumento.vue'
import AgregarMaterial from '../../../components/adquisiciones/crear-documento/agregar-materiales/AgregarMaterial.vue'
import InformacionGeneral from '../../../components/adquisiciones/crear-documento/informacion-general/InformacionGeneral.vue'
import Previsualizacion from '../../../components/adquisiciones/crear-documento/previsualizacion/Previsualizacion.vue'
export default {
  components: {
    // CrearDocumento,
    AgregarMaterial,
    InformacionGeneral,
    Previsualizacion
  },
  data() {
    return {
      e1: 1,
      pasoStep: 1
    }
  },
  computed: {
    textoAvanzar() {
      if (this.pasoStep < 4) {
        return 'Siguiente'
      } else {
        return 'Enviar'
      }   
    }
  },
  methods: {
    avanzar() {
      this.pasoStep++
    },
    retroceder() {
      this.pasoStep--
    }
  }
}
</script>

<style></style>
