<template>
  <div>
    <v-row
      no-gutters
      style="flex-wrap: nowrap;"
    >
      <v-col
        cols="12"
        style="min-width: 850px;"
        class="flex-grow-0 flex-shrink-1 w-full"
      >
        <!-- {{ pasoStep }} -->
        <v-stepper v-model="pasoStep" class="flex-grow-1">
          <v-stepper-header>
            <v-stepper-step
              :complete="pasoStep > 1"
              step="1"
            >
              Datos Generales
            </v-stepper-step>

            <v-divider></v-divider>
            <!-- :complete="pasoStep > 2" -->
            <v-stepper-step
              :complete="false"
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

            <v-divider></v-divider>

            <v-stepper-step step="4">
              Previsualización
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <informacion-general ref="refinformaciongeneraldoc"></informacion-general>
            </v-stepper-content>

            <v-stepper-content step="2">
              <agregar-material ref="refAgregarMaterial"></agregar-material>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              ></v-card>
            </v-stepper-content>

            <v-stepper-content step="4">
              <previsualizacion :materiales="this.$refs.refAgregarMaterial && this.$refs.refAgregarMaterial.materiales" :cabecera="this.$refs.refinformaciongeneraldoc && this.$refs.refinformaciongeneraldoc.oc_cab" :observacion="this.$refs.refAgregarMaterial && this.$refs.refAgregarMaterial.comentarioDocumento"></previsualizacion>
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
      if (this.pasoStep === 1) {
        this.pasoStep++
        // console.log('de paso 1 a paso 2')
        // if (this.$refs.refinformaciongeneraldoc.validarInformacionGeneral()) {
        //   this.pasoStep++
        // } else {
        //   console.log('por aca no')
        // }
      } else if (this.pasoStep === 2) {
        // eslint-disable-next-line no-constant-condition
        if (true) {
          this.pasoStep = this.pasoStep + 2
        } else {
          this.pasoStep++
        }
        // this.pasoStep++
        console.log('this.$refs.refAgregarMaterial.validarAgregarMaterial()_ ', this.$refs.refAgregarMaterial.validarAgregarMaterial())
        // if (this.$refs.refAgregarMaterial.validarAgregarMaterial()) {
        //   this.pasoStep++
        // }
        // console.log('de paso 2 a paso 3')
      } else if (this.pasoStep === 3) {
        this.pasoStep++
        console.log('finalizar')
      }
    },
    retroceder() {
      if (this.pasoStep === 4) {
        this.pasoStep = this.pasoStep - 2
      } else {
        this.pasoStep--
      }
    }
  }
}
</script>

<style></style>
