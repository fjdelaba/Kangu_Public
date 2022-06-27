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
        {{ pasoStep }}
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
              <agregar-material ref="refAgregarMaterial" :oc_id="oc_id"></agregar-material>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              ></v-card>
            </v-stepper-content>

            <v-stepper-content step="4">
              prev
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
import { postCabeceraOC } from '../../../graphql/adquisiciones'
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
      pasoStep: 1,
      oc_id: 0
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
    async avanzar() {
      if (this.pasoStep === 1) {
        this.$store.dispatch('app/setLoading', true)
        // this.pasoStep++
        // console.log('de paso 1 a paso 2')
        if (this.$refs.refinformaciongeneraldoc.validarInformacionGeneral()) {
          try {
            const cabecera = this.$refs.refinformaciongeneraldoc.oc_cab

            console.log('cabecera: ', cabecera)
            const datosCabecera = {
              des_tip_fk: cabecera.tipoDespacho.id, 
              doc_tip_fk: cabecera.tipoDocumento.id, 
              emp_fk: 1, // Cambiar 
              ent_con_fk: cabecera.contacto.id, 
              ent_fk: cabecera.proveedor.id, 
              est_doc_fk: 4, 
              for_pag_fk: cabecera.formaPago.id, 
              mon_fk: cabecera.moneda.id, 
              nombre: cabecera.nombre, 
              pro_fk: cabecera.proyecto.id, 
              usu_fk: 3 // Cambiar
            }

            console.log('datosCabecera: ', datosCabecera)

            const returnPostCabecera = await postCabeceraOC(datosCabecera)

            console.log(returnPostCabecera.data.insert_kangusoft_oc.returning[0].id)
            this.oc_id = returnPostCabecera.data.insert_kangusoft_oc.returning[0].id
            this.pasoStep++
          } catch (error) {
            console.log('error: ', error)
          }

        } else {
          console.log('por aca no')
        }
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
