<template>
  <div>
    <v-tabs
      v-model="tab"
      grow
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#documento">
        Documento
      </v-tab>

      <v-tab href="#flujo" @click="clickTab()" @change="changeTab()">
        Flujo y Distribucion
      </v-tab>

    </v-tabs>

    <!-- <v-tabs
      v-model="tab"
      background-color="transparent"
      grow
    >
      <v-tab>
        Documento
      </v-tab>
      <v-tab>
        Accesorios
      </v-tab>
    </v-tabs> -->

    <v-tabs-items v-model="tab">
      <v-tab-item
        value="documento"
      >
        <v-card flat>
          <v-sheet
            class="p-2"
            color="lighten-3"
          >
            <v-sheet
              :elevation="2"
              height="100%"
              width="100%"
              class="pb-3"
            >
              <v-list-item style="padding-left: 0px">
                <v-list-item-content>
                  <v-list-item-title class="text-h5">
                    Orden de Compra: Borrador
                  </v-list-item-title>
                  <v-list-item-subtitle class="caption">Fecha: {{ cpxFecha }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="caption">Contacto DLB: asdsda</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  width="90px"
                >

                  <v-img :src="logo"></v-img></v-list-item-avatar>
              </v-list-item>

              <v-row no-gutters>
                <v-col cols="12" lg="6"><span class="caption">Proveedor: {{ cabecera.proveedor.razon_social }}</span></v-col>
                <v-col cols="12" lg="6"><span class="caption">Nombre Documento: asdsadsada</span></v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" lg="6"><span class="caption">Rut: {{ cabecera.proveedor.rut }}</span></v-col>
                <v-col cols="12" lg="6"><span class="caption">Obra: {{ cabecera.proyecto.nombre }}</span></v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" lg="6"><span class="caption">Direccion: {{ cabecera.proyecto.direccion }}</span></v-col>
                <v-col cols="12" lg="6"><span class="caption">Moneda: {{ cabecera.moneda.nombre }}</span></v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" lg="6"><span class="caption">Contacto: {{ cabecera.contacto.nombre }}</span></v-col>
                <v-col cols="12" lg="6"><span class="caption">Despacho: {{ cabecera.tipoDespacho.nombre }}</span></v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" lg="6"><span class="caption">Email: {{ cabecera.contacto.email }}</span></v-col>
                <v-col cols="12" lg="6"><span class="caption">Pago: {{ cabecera.formaPago.nombre }}</span></v-col>
              </v-row>
            </v-sheet>
            <v-btn
              color="success"
            >Descargar Oc
            </v-btn>
            <v-data-table
              :headers="headers"
              :items="materiales"
              item-key="id"
              sort-by="calories"
              hide-default-footer
              class="elevation-1"
              :items-per-page="materiales.length"
              dense
            >
              <template v-slot:item.mat="{ item }">
                <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:400px">
                  <!-- <span> <span></span>{{ item.name }} <br> <em>{{ item.observacion }}</em> </span>  -->
                  <!-- {{ item.nombre }} -->
                  <span> <span style="font-size: 16px"> {{ item.mat.nombre }} - {{ item.mat.mat_uni.nombre }} </span> <br> <span style="font-size: 10px"> <em>{{ item.observacion }}</em> </span></span> 
                </div>
              </template>
              <template v-slot:item.oc_det_pars="{ item, attrs}">
                <div v-if="item.oc_det_pars.length > 1">
                  <v-tooltip right>
                    <template v-slot:activator="{ on }">
                      <v-chip
                        class="ma-2"
                        color="green"
                        text-color="white"
                        small
                        v-on="on"
                      >
                        {{ item.oc_det_pars.length }} partidas
                      </v-chip>
                    </template>
                    <v-card
                      class="mx-auto"
                      max-width="400"
                      tile
                    >
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title v-for="p in item.partidas" :key="p.id">{{ p.par_fk.nombre }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>  
                    </v-card>
                  </v-tooltip>
                </div>
                <div v-else>
                  <div v-if="item.editable">
                    <div v-if="item.oc_det_pars[0].par_fk" >
                      <v-combobox
                        v-model="item.oc_det_pars[0].par_fk"
                        :items="listaPartidas"
                        label="Selecciona la partida"
                        v-bind="attrs"
                        item-text="nombre"
                        :item-value="item.id"
                        outlined
                        dense
                      >
                        <template #item="data">
                          <v-tooltip bottom>
                            <template #activator="{ on, attrs }">
                              <v-layout wrap v-bind="attrs" v-on="on">
                                <v-list-item-content>
                                  <v-list-item-title>{{ data.item.nombre }}</v-list-item-title>
                                </v-list-item-content>
                              </v-layout>
                            </template>
                            <span>{{ `${data.item.path}` }}</span>
                          </v-tooltip>
                        </template>
                      </v-combobox>
                    </div>
                    <div v-else>
                      <v-combobox
                        v-model="item.oc_det_pars[0].par_fk"
                        :items="listaPartidas"
                        label="Selecciona la partida"
                        v-bind="attrs"
                        item-text="nombre"
                        :item-value="item.id"
                        outlined
                        dense
                      >
                        <template #item="data">
                          <v-tooltip bottom>
                            <template #activator="{ on, attrs }">
                              <v-layout wrap v-bind="attrs" v-on="on">
                                <v-list-item-content>
                                  <v-list-item-title>{{ data.item.nombre }}</v-list-item-title>
                                </v-list-item-content>
                              </v-layout>
                            </template>
                            <span>{{ `${data.item.path}` }}</span>
                          </v-tooltip>
                        </template>
                      </v-combobox>
                    </div>
                  </div>
                  <div v-else>
                    <v-chip
                      class="ma-2"
                      color="primary"
                      text-color="white"
                      small
                    >
                      <!-- {{ item.oc_det_pars[0].par_fk }} -->
                      {{ getNombrePartida(item.oc_det_pars[0].par_fk) }}
                    </v-chip>
                  </div>
                </div>
                <!-- <div v-if="item.editable">
          <v-combobox
            v-model="item.par"
            :items="listaPartidas"
            label="Selecciona la partida"
            v-bind="attrs"
            item-text="nombre"
            item-value="id"
            outlined
            dense
            :return-object="true"
          >
            <template #item="data">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-layout wrap v-bind="attrs" v-on="on">
                    <v-list-item-content>
                      <v-list-item-title>{{ data.item.nombre }}</v-list-item-title>
                    </v-list-item-content>
                  </v-layout>
                </template>
                <span>{{ `${data.item.path}` }}</span>
              </v-tooltip>
            </template>
          </v-combobox>
        </div>
        <div v-else>
          <span>{{ item.par.nombre }}</span> 
        </div> -->
        
              </template>
              <template v-slot:item.cantidad="{ item }">
                <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:70px">
                  <div v-if="item.editable">
                    <div v-if="item.oc_det_pars.length > 1">
                      <span>{{ item.cantidad }}</span> 
                    </div>
                    <div v-else>
                      <v-text-field
                        v-model="item.oc_det_pars[0].cantidad"
                        outlined
                        dense
                        @input="calcularTotalMaterial(item)"
                      ></v-text-field>
                    </div>
                  </div>
                  <div v-else>
                    <span>{{ item.cantidad }}</span> 
                  </div>
                  <!-- <span> <span></span>{{ item.name }} <br> <em>{{ item.observacion }}</em> </span>  -->
                  <!-- <span> <span style="font-size: 16px">{{ item.nombre }}</span> <br> <span style="font-size: 10px"> <em>{{ item.observacion }}</em> </span></span>  -->
                </div>
              </template>
              <template v-slot:item.precio_unitario="{ item }">
                <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:70px">
                  <div v-if="item.editable">
                    <v-text-field
                      v-model="item.precio_unitario"
                      outlined
                      dense
                      @input="calcularTotalMaterial(item)"
                    ></v-text-field>
                  </div>
                  <div v-else>
                    <span>{{ item.precio_unitario }}</span> 
                  </div>
                </div>
              </template>
              <template v-slot:item.actions="{ item }">
                <div v-if="item.editable">
                  <v-icon
                    small
                    class="mr-2"
                    @click="guardarMaterial(item)"
                  >
                    mdi-content-save
                  </v-icon>
                  <v-icon
                    small
                    @click="eliminarMaterial(item)"
                  >
                    mdi-delete {{ item }}
                  </v-icon>
                </div>
                <div v-else>
                  <v-icon
                    small
                    class="mr-2"
                    @click="abrirDialogMaterial(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    small
                    @click="eliminarMaterial(item)"
                  >
                    mdi-delete {{ item }}
                  </v-icon>
                </div>
              </template>
              <template v-slot:no-data>
                <!-- <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn> -->
                Sin datos
              </template>
            </v-data-table>
            <v-row justify="end" height="100">
              <v-col lg="8" md="6" class="py-3">
                <!-- {{ cpxTotalesItems }} -->
                <!-- <v-card
            height="100%"
            elevation="2"
          >{{ observacion }}</v-card> -->
                <v-textarea
                  outlined
                  label="Comentario al proveedor"
                  :value="observacion"
                  :readonly="true"
                ></v-textarea>
              </v-col>
              <v-col lg="4" md="6" class="py-0 py-3 pr-2">
                <!-- {{ cpxTotalesItems }} -->
                <cuadro-resumen :materiales="materiales"></cuadro-resumen>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card>
      </v-tab-item>

      <v-tab-item
        value="flujo"
        class="mb-6 pb-6"
      >

        <v-btn
          color="success"
          @click="aprueboOc()"
        >Aprobar
        </v-btn>
               
        <v-btn
          color="error"
          @click="rechazoOc()"
        >Rechazar
        </v-btn>
        <pipeline :aprobadores="aprobadores" class="mt-5"></pipeline>
        
        <distribucion-lineas-partidas></distribucion-lineas-partidas>
        <!-- <e-charts
          ref="pie"
          style="width: 100%; top: -60px "
          autoresize
          :options="pie"
          auto-resize
        /> -->
      </v-tab-item>
    </v-tabs-items>

  </div>
</template>

<script src="./Previsualizacion.js"></script>

<style scoped src="./Previsualizacion.css"></style>