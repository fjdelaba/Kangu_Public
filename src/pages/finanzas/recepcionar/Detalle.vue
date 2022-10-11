<template>
  <v-container class="grey lighten-5">
    <!-- {{pdf}} -->
    <v-row justify="center">
      <v-col>
        <v-card
          class="pa-2"
        >       
          <v-card-title>
            Datos de Factura
            <v-card-actions>
              <v-btn
                color="deep-purple lighten-2"
              >
                Aprobar
              </v-btn>
              <v-btn
                color="deep-purple lighten-2"
              >
                Rechazar
              </v-btn>
              
            </v-card-actions>
          </v-card-title>
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>Empresa:</td>
                  <td> {{ datos_dte.emi_nombre }} </td>
                </tr>
                <tr>
                  <td>Folio:</td>
                  <td> {{ datos_dte.folio }} </td>
                </tr>
                <tr>
                  <td>Fecha Vencimiento:</td>
                  <td> {{ datos_dte.fec_ven }} </td>
                </tr>
                <tr>
                  <td>Neto: </td>
                  <td> {{ datos_dte.neto }} </td>
                </tr>
                <tr>
                  <td>Impuesto: </td>
                  <td> {{ datos_dte.iva_monto }} </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-card-title>
            Datos de la referencia
            <v-card-actions>
              <v-btn
                color="deep-purple lighten-2"
              >
                Asignar Referencia
              </v-btn>
              <v-btn
                color="deep-purple lighten-2"
              >
                Cambiar Referencia
              </v-btn>
            </v-card-actions>
          </v-card-title>
          {{ datos_oc_ref }}
          <v-simple-table v-if="datos_oc_ref != null " dense >
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>Identificacion:</td>
                  <td> {{ datos_oc_ref.identificacion }} </td>
                </tr>
                <tr>
                  <td>Nombre:</td>
                  <td> {{ datos_oc_ref.nombre }} </td>
                </tr>
                <tr>
                  <td>Moneda:</td>
                  <td> {{ datos_oc_ref.mon.nombre }} </td>
                </tr>
                <tr>
                  <td>Neto: </td>
                  <td> {{ datos_oc_ref.neto }} </td>
                </tr>
                <tr>
                  <td>Impuesto: </td>
                  <td> {{ datos_oc_ref.impuestos }} </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div v-if="datos_oc_ref == null">
            No existen referencias
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
      <indicador-individual titulo='Total Recepcion Obra' texto='10000'></indicador-individual>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <!-- {{ datos_dte.dte_cab_recs && datos_dte.dte_cab_recs[0].dte_cab_rec__view_monto_recepciones_obra.monto_recibido }} -->
          <v-card-title>
            Recepciones en Obra
          </v-card-title>
          <v-data-table
            :headers="headersRecepcionesObra"
            :items="datos_oc_ref.rec_cabs"
            :items-per-page="5"
            :hide-default-footer="true"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-card-title>
            Recepciones Dte
          </v-card-title>
          <v-data-table
            :headers="headersRecepcionesDte"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
            :hide-default-footer="true"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./detalle/detalle.js"></script>

<style scoped src="./detalle/detalle.css"></style>