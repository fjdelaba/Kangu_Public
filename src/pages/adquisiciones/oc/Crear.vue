<template>
  <v-container>
    <h2>Creacion de Orden de Compra</h2>
    <div v-if="$store.state.app.permisosUsuario.oc">
      <v-row
        no-gutters
        style="flex-wrap: nowrap;"
      >
        <v-col
          cols="12"
          style="min-width: 850px;"
          class="flex-grow-0 flex-shrink-1 w-full"
        >
          <v-stepper v-model="pasoStep" class="flex-grow-1">
            <v-stepper-header>
              <v-stepper-step
                :complete="pasoStep > 1"
                step="1"
              >
                Datos Generales {{ $store.state.app.indicadores }}
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
                <agregar-material
                  ref="refAgregarMaterial"
                  :oc_id="oc_id"
                  :pro_fk="pro_fk"
                  :tipo_documento="tipoDocumento"
                  :moneda="moneda"
                ></agregar-material>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
                ></v-card>
              </v-stepper-content>

              <v-stepper-content step="4">
                <previsualizacion
                  ref="refPrevisualizacion"
                  :aprobadores="flujoModal"
                  :lista-partidas="this.$refs.refAgregarMaterial && this.$refs.refAgregarMaterial.listaPartidas"
                  :materiales="this.$refs.refAgregarMaterial && this.$refs.refAgregarMaterial.lista_detalle"
                  :cabecera="this.$refs.refinformaciongeneraldoc && this.$refs.refinformaciongeneraldoc.oc_cab"
                  :observacion="this.$refs.refAgregarMaterial && this.$refs.refAgregarMaterial.comentarioDocumento"
                  :tipo_documento="tipoDocumento"
                ></previsualizacion>
              </v-stepper-content>
            </v-stepper-items>
            <v-row 
              align="right"
              justify="space-around"
              no-gutters
            >
              <v-col>
            
                <v-btn v-if="pasoStep > 1" class="mb-2 ml-10" color="primary" @click="retroceder()">
                  Atras
                </v-btn>
              </v-col>
              <v-col
                md="3"
                offset-md="3"
              >
                <v-btn
                  class="mb-2 ml-15"
                  depressed
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
              </v-col>
            </v-row> 
          </v-stepper>
        </v-col>
      </v-row>      
      <v-dialog
        v-model="dialogFinal"
        max-width="550"
        persistent
      >
        <DialogFinalDocumento
          :correo="email"
          :cerrar-dialog="cerrarModal"
          :titulo="cpxTituloModalFinal"
          :texto="cpxTextoModalFinal"
          :aprobada="flujoModal.length > 0"
        ></DialogFinalDocumento>
      </v-dialog> 
      <v-dialog
        v-model="dialogBorrador"
        max-width="550"
        persistent
      >
        <DialogBorradorVue :eliminar-borrador="eliminarOcBorrador" :recuperar-borrador="recuperarOcBorrador"></DialogBorradorVue>
      </v-dialog> 
    <!-- <CrearDocumento/> -->
    </div>
    <div v-else>
      <h2>No tienes permisos para ver esta seccion</h2>
    </div>
  </v-container>
</template>

<script>
import CrearDocumento from '../../../components/adquisiciones/crear-documento/CrearDocumento.vue'
import AgregarMaterial from '../../../components/adquisiciones/crear-documento/agregar-materiales/AgregarMaterial.vue'
import InformacionGeneral from '../../../components/adquisiciones/crear-documento/informacion-general/InformacionGeneral.vue'
import Previsualizacion from '../../../components/adquisiciones/crear-documento/previsualizacion/Previsualizacion.vue'
import { getMontoComprador, postCabeceraOC, updateCabeceraOC, updateOCInformacionGeneral } from '../../../graphql/adquisiciones'
import DialogFinalDocumento from '../../../components/adquisiciones/dialog-final-documento/DialogFinalDocumento.vue'
import DialogBorradorVue from '../../../components/adquisiciones/dialog-borrador/DialogBorrador.vue'
import { getFlujoAprobadoresProyecto } from '../../../graphql/aprobaciones'

export default {
  components: {
    // CrearDocumento,
    AgregarMaterial,
    InformacionGeneral,
    Previsualizacion,
    DialogFinalDocumento,
    DialogBorradorVue
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
      disabledBotonSiguiente: false,
      dialogBorrador: false,
      impuesto: 0,
      neto: 0,
      flujoModal: [],
      flujoDocumento: [],
      tipoDocumento: 0,
      tipoDocumentoBoleta: 1,
      moneda: {}
    }
  },
  computed: {
    cpxTextoAvanzar() {
      if (this.pasoStep < 4) {
        return 'Siguiente'
      } else {
        return 'Enviar'
      }   
    },
    cpxTituloModalFinal () {
      if (this.flujoModal.length > 0) {
        return 'Orden de compra en espera de aprobacion'
      } else {
        return `Orden de compra creda: ${this.identificacion}`
      }
    },
    cpxTextoModalFinal() {
      if (this.flujoModal.length > 0) {
        return 'Una vez que que esta orden de compre se aprobada, se te noficará mediante un mensaje en la seccion Notificaciones'
      } else {
        return `La orden de compra ${this.identificacion} fue creada exitosamente. Si no deseas hacer un envio inmediato al proveedor, quita la seleccion que esta abajo`
      }
    }
  },
  mounted() {
    console.log('MOUNTED CREAR')
  },
  methods: {
    eliminarOcBorrador() {
      this.dialogBorrador = false
    },
    recuperarOcBorrador() {
      this.dialogBorrador = false
    },
    async avanzar() {
      if (this.pasoStep === 1) {
        this.$store.dispatch('app/setLoading', true)
        // this.pasoStep++
        // console.log('de paso 1 a paso 2')
        if (this.$refs.refinformaciongeneraldoc.validarInformacionGeneral()) {
          this.moneda =  this.$refs.refinformaciongeneraldoc.oc_cab.moneda
          if (this.oc_id > 0) {
            try {
              const cabecera = this.$refs.refinformaciongeneraldoc.oc_cab

              this.tipoDocumento = cabecera.tipoDocumento.id
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
              this.disabledBotonSiguiente = true
              const cabecera = this.$refs.refinformaciongeneraldoc.oc_cab

              this.tipoDocumento = cabecera.tipoDocumento.id
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
              this.disabledBotonSiguiente = false
              this.$notify({
                group: 'foo',
                title: 'Creacion de Orden de Compra',
                text: 'Grabacion exitosa',
                type: 'success'
              })
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
        this.flujoModal = []
        this.flujoDocumento = []
        this.neto = 0
        this.impuesto = 0
        let totalPesos = 0
        // const { moneda } = this.$refs.refinformaciongeneraldoc.oc_cab

        // eslint-disable-next-line no-constant-condition
        // if (true) {
        //   this.pasoStep = this.pasoStep + 2
        // } else {
        //   this.pasoStep++
        // }
        // this.pasoStep++
        console.log('this.$refs.refAgregarMaterial: ', this.$refs.refAgregarMaterial)
        console.log('this.$refs.refPrevisualizacion: ', this.$refs.refPrevisualizacion.$refs.refcuadroresumen.cpxTotalesItems)
        // const totales = this.$refs.refAgregarMaterial.cpxTotalesItems
        const totales = this.$refs.refPrevisualizacion.$refs.refcuadroresumen.cpxTotalesItems
        
        console.log('totales: ', totales)
        for (const tot of totales) {
          console.log('tot: ', tot)
          // eslint-disable-next-line eqeqeq
          if (tot.item == 'Neto') {
            this.neto = tot.valor
          // eslint-disable-next-line eqeqeq
          } else if (tot.item == 'impuesto') {
            this.impuesto = tot.valor
          }
        }

        const { data: { kangusoft_apr } } = await getMontoComprador(this.$store.state.app.datosUsuario.user_id ,this.pro_fk, false)

        console.log('moneda: ', this.moneda.id)
        
        switch (this.moneda.id) {
        case 1: //UF
          totalPesos = this.neto * this.$store.state.app.indicadores.uf
          break
        case 2: // CLP
          totalPesos = this.neto
          break
        case 3: // DOLAR
          totalPesos = this.neto * this.$store.state.app.indicadores.dolar
          break
        case 4: // EURO
          totalPesos = this.neto * this.$store.state.app.indicadores.euro
          break
        default:
          break
        }
        console.log('totalPesos: ', totalPesos)
        console.log('kangusoft_apr[0].monto: ', kangusoft_apr[0])
        // if (this.neto < kangusoft_apr[0].monto) {
        if (totalPesos < kangusoft_apr[0].monto) {
          console.log('Sin Flujo')
        } else {
          console.log('Con Flujo')
          const aprobadores = await getFlujoAprobadoresProyecto(this.pro_fk, 3)

          console.log('aprobadores.data_ ', aprobadores.data.kangusoft_apr)
          const arregloAprobadores = aprobadores.data.kangusoft_apr.sort(({ monto:a }, { monto:b }) => a - b)

          console.log('arregloAprobadores antes: ', arregloAprobadores)
          if (arregloAprobadores[0].apro_final === true) {
            const aproFinal = arregloAprobadores.shift()

            arregloAprobadores.push(aproFinal)
          }
          console.log('arregloAprobadores despues: ', arregloAprobadores)
          if (arregloAprobadores.length > 0) {
            for (const apro in arregloAprobadores) {
              console.log(arregloAprobadores[apro])
              if (arregloAprobadores[apro].usu_apro_fk === this.$store.state.app.datosUsuario.user_id) continue
              // if (this.neto > arregloAprobadores[apro].monto) {
              if (totalPesos > arregloAprobadores[apro].monto) {
                this.flujoModal.push({ nombre:`${arregloAprobadores[apro].usuByUsuAproFk.nombre} ${arregloAprobadores[apro].usuByUsuAproFk.apellidos}`, id:arregloAprobadores[apro].id , monto: arregloAprobadores[apro].monto })
                this.flujoDocumento.push({ apr_fk: arregloAprobadores[apro].id, orden: (Number(apro) + 1) })
              // } else if (this.neto < arregloAprobadores[apro].monto) {
              } else if (totalPesos < arregloAprobadores[apro].monto) {
                this.flujoModal.push({ nombre:`${arregloAprobadores[apro].usuByUsuAproFk.nombre} ${arregloAprobadores[apro].usuByUsuAproFk.apellidos}`, id:arregloAprobadores[apro].id })
                this.flujoDocumento.push({ apr_fk: arregloAprobadores[apro].id, orden: (Number(apro) + 1) })
                break
              }
            }
          } else {
            console.log('no tiene lineas')
          }
        }
        console.log('flujoDocumento: ', this.flujoDocumento)
        console.log('flujoModal: ', this.flujoModal)

        if (this.$refs.refAgregarMaterial.validarAgregarMaterial()) {
          this.pasoStep = this.pasoStep + 2
        }
        console.log('de paso 2 a paso 3')
      } else if (this.pasoStep === 3) {
        console.log('paso 3')
        this.pasoStep++
        console.log('finalizar')
      } else if (this.pasoStep === 4) {
        console.log('paso 4')
        this.email = this.$refs.refinformaciongeneraldoc.oc_cab.contacto.email
        console.log('this.email: ', this.email)

        // return

        // // eslint-disable-next-line no-unreachable
        const obj = {
          oc_fk: this.oc_id ,	
          comentario:this.$refs.refAgregarMaterial.comentarioDocumento,
          est_doc_fk: this.flujoModal.length > 0 ? 1 : 2, 
          pro_fk: this.pro_fk,
          neto: this.neto,
          impuesto: this.impuesto
        }

        console.log('obj: ', obj)
        console.log('this.flujoDocumento: ', this.flujoDocumento)
        const { data: { update_oc_cabecera: { identificacion } } } = await updateCabeceraOC(obj, this.flujoDocumento)
        
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
