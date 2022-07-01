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
              <agregar-material ref="refAgregarMaterial" :oc_id="oc_id" :pro_fk="pro_fk"></agregar-material>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              ></v-card>
            </v-stepper-content>

            <v-stepper-content step="4">
              <previsualizacion :lista-partidas="this.$refs.refAgregarMaterial && this.$refs.refAgregarMaterial.listaPartidas" :materiales="this.$refs.refAgregarMaterial && this.$refs.refAgregarMaterial.lista_detalle" :cabecera="this.$refs.refinformaciongeneraldoc && this.$refs.refinformaciongeneraldoc.oc_cab" :observacion="this.$refs.refAgregarMaterial && this.$refs.refAgregarMaterial.comentarioDocumento"></previsualizacion>
            </v-stepper-content>
          </v-stepper-items>
          <v-btn
            color="primary"
            :loading="disabledBotonSiguiente"
            :disabled="disabledBotonSiguiente"
            @click="avanzar()"
          >
            {{ cpxTextoAvanzar }}
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>

          <v-btn v-if="pasoStep > 1" @click="retroceder()">
            Atras
          </v-btn>
        </v-stepper>
      </v-col>
    </v-row>      
    <v-dialog
      v-model="dialogFinal"
      max-width="550"
      persistent
    >
      <DialogFinalDocumento :correo="email" :cerrar-dialog="cerrarModal" :titulo="`Orden de compra creda: ${identificacion}`" :texto="`La orden de compra ${identificacion} fue creada exitosamente. Si no deseas hacer un envio inmediato al proveedor, quita la seleccion que esta abajo`"></DialogFinalDocumento>
    </v-dialog> 
    <!-- <CrearDocumento/> -->
  </div>
</template>

<script>
import CrearDocumento from '../../../components/adquisiciones/crear-documento/CrearDocumento.vue'
import AgregarMaterial from '../../../components/adquisiciones/crear-documento/agregar-materiales/AgregarMaterial.vue'
import InformacionGeneral from '../../../components/adquisiciones/crear-documento/informacion-general/InformacionGeneral.vue'
import Previsualizacion from '../../../components/adquisiciones/crear-documento/previsualizacion/Previsualizacion.vue'
import { postCabeceraOC, updateCabeceraOC, updateOCInformacionGeneral } from '../../../graphql/adquisiciones'
import DialogFinalDocumento from '../../../components/adquisiciones/dialog-final-documento/DialogFinalDocumento.vue'
export default {
  components: {
    // CrearDocumento,
    AgregarMaterial,
    InformacionGeneral,
    Previsualizacion,
    DialogFinalDocumento
  },
  data() {
    return {
      e1: 1,
      pasoStep: 1,
      oc_id: 0,
      pro_fk: 0,
      dialogFinal: false,
      identificacion: '',
      email:'',
      loader: null,
      disabledBotonSiguiente: false
    }
  },
  computed: {
    cpxTextoAvanzar() {
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
          this.loader = this.disabledBotonSiguiente.toString()
          if (this.oc_id > 0) {
            try {
              const cabecera = this.$refs.refinformaciongeneraldoc.oc_cab
              const datosCabecera = {
                des_tip_fk: cabecera.tipoDespacho.id, 
                doc_tip_fk: cabecera.tipoDocumento.id, 
                // emp_fk: 1, // Cambiar 
                emp_fk: this.$store.state.app.datosEmpresa.id, // Cambiar 
                ent_con_fk: cabecera.contacto.id, 
                ent_fk: cabecera.proveedor.id, 
                // est_doc_fk: 4, 
                for_pag_fk: cabecera.formaPago.id, 
                mon_fk: cabecera.moneda.id, 
                nombre: cabecera.nombre, 
                pro_fk: cabecera.proyecto.id, 
                ped_fk: null
              }

              const resp = await updateOCInformacionGeneral(this.oc_id, datosCabecera)

              console.log('resp: ', resp)
              this.pasoStep++ 
            } catch (error) {
              console.log('error: ', error)
            }
          } else {
            try {
              const cabecera = this.$refs.refinformaciongeneraldoc.oc_cab

              console.log('cabecera: ', cabecera)
              const datosCabecera = {
                des_tip_fk: cabecera.tipoDespacho.id, 
                doc_tip_fk: cabecera.tipoDocumento.id, 
                // emp_fk: 1, // Cambiar 
                emp_fk: this.$store.state.app.datosEmpresa.id, // Cambiar 
                ent_con_fk: cabecera.contacto.id, 
                ent_fk: cabecera.proveedor.id, 
                est_doc_fk: 4, 
                for_pag_fk: cabecera.formaPago.id, 
                mon_fk: cabecera.moneda.id, 
                nombre: cabecera.nombre, 
                pro_fk: cabecera.proyecto.id, 
                // usu_fk: 3 // Cambiar
                usu_fk: this.$store.state.app.datosUsuario.user_id // Cambiar
              }

              console.log('datosCabecera: ', datosCabecera)

              const returnPostCabecera = await postCabeceraOC(datosCabecera)

              console.log(returnPostCabecera.data.insert_kangusoft_oc.returning[0].id)
              this.oc_id = returnPostCabecera.data.insert_kangusoft_oc.returning[0].id
              this.pro_fk = cabecera.proyecto.id
              this.$refs.refAgregarMaterial.getPartidas(cabecera.proyecto.id)
              this.pasoStep++
            } catch (error) {
              console.log('error: ', error)
            }

          }
          this.loader = null
        } else {
          console.log('por aca no')
        }
      } else if (this.pasoStep === 2) {
        // eslint-disable-next-line no-constant-condition
        // if (true) {
        //   this.pasoStep = this.pasoStep + 2
        // } else {
        //   this.pasoStep++
        // }
        // this.pasoStep++
        if (this.$refs.refAgregarMaterial.validarAgregarMaterial()) {
          this.pasoStep = this.pasoStep + 2
        }
        console.log('de paso 2 a paso 3')
      } else if (this.pasoStep === 3) {
        this.pasoStep++
        console.log('finalizar')
      } else if (this.pasoStep === 4) {
        this.email = this.$refs.refinformaciongeneraldoc.oc_cab.contacto.email
        console.log('this.email: ', this.email)
        const totales = this.$refs.refAgregarMaterial.cpxTotalesItems

        console.log('totales: ', totales)
        let iva = 0
        let neto = 0

        for (const tot of totales) {
          console.log('tot: ', tot)
          // eslint-disable-next-line eqeqeq
          if (tot.item == 'Neto') {
            neto = tot.valor
          // eslint-disable-next-line eqeqeq
          } else if (tot.item == 'IVA') {
            iva = tot.valor
          }
        }
        
        const obj = {
          oc_fk: this.oc_id ,	
          comentario:this.$refs.refAgregarMaterial.comentarioDocumento,
          est_doc_fk: 1, 
          pro_fk: this.pro_fk,
          neto,
          iva
        }

        console.log('obj: ', obj)
        const { data: { update_oc_cabecera: { identificacion } } } = await updateCabeceraOC(obj)
        
        this.identificacion = identificacion
        // this.pasoStep++
        this.dialogFinal = true
        console.log('finalizar')
      }
    },
    retroceder() {
      if (this.pasoStep === 4) {
        this.pasoStep = this.pasoStep - 2
      } else {
        this.pasoStep--
      }
    },
    cerrarModal() {
      this.dialogFinal = false
    }
  }
}
</script>

<style scoped>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
