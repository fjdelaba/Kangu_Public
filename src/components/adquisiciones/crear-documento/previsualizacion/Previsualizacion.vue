<template>
  <div class="" >
    <v-card>
      <v-tabs
        v-model="tab"
        grow
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#documento" >
          Ver Documento
        </v-tab>

        <v-tab href="#flujo" @click="clickTab()" @change="changeTab()">
          Aprobar
        </v-tab>

      </v-tabs>
    </v-card>

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

    <v-tabs-items v-model="tab" >
      <v-tab-item
        value="documento"
      >
        <v-card >
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
              <v-list-item style="padding-left: 24px">
                <v-list-item-content>
                  <v-list-item-title class="text-h5">
                    Orden de Compra: Borrador
                  </v-list-item-title>
                  <v-list-item-subtitle class="caption">Fecha: {{ cpxFecha }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="caption">Contacto DLB: {{ $store.state.app.datosEmpresa.email }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  width="90px"
                >
                  <v-img :src="logo"></v-img></v-list-item-avatar>
              </v-list-item>
              
              <v-row no-gutters class="pl-3">
                <v-col cols="12" lg="6"><span class="caption">Proveedor: {{ cabecera.proveedor && cabecera.proveedor.razon_social }}</span></v-col>
                <v-col cols="12" lg="6"><span class="caption">Nombre Documento: {{ cabecera && cabecera.nombre }}</span></v-col>
              </v-row>
              <v-row no-gutters class="pl-3">
                <v-col cols="12" lg="6"><span class="caption">Rut: {{ cabecera.proveedor && cabecera.proveedor.rut }}</span></v-col>
                <v-col cols="12" lg="6"><span class="caption">Obra: {{ cabecera.proyecto.nombre }}</span></v-col>
              </v-row>
              <v-row no-gutters class="pl-3">
                <v-col cols="12" lg="6"><span class="caption">Direccion: {{ cabecera.proyecto.direccion }}</span></v-col>
                <v-col cols="12" lg="6"><span class="caption">Moneda: {{ cabecera.moneda.nombre }}</span></v-col>
              </v-row>
              <v-row no-gutters class="pl-3">
                <v-col cols="12" lg="6"><span class="caption">Contacto: {{ cabecera.contacto.nombre }}</span></v-col>
                <v-col cols="12" lg="6"><span class="caption">Despacho: {{ cabecera.tipoDespacho.nombre }}</span></v-col>
              </v-row>
              <v-row no-gutters class="pl-3">
                <v-col cols="12" lg="6"><span class="caption">Email: {{ cabecera.contacto.email }}</span></v-col>
                <v-col cols="12" lg="6"><span class="caption">Pago: {{ cabecera.formaPago.nombre }}</span></v-col>
              </v-row>
            </v-sheet>
            <v-row v-if="aprobacion == true">
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-divider></v-divider>
              
            </v-row>
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
                      <span>{{ item.cantidad | currency_2 }}</span> 
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
                    <span>{{ item.cantidad | currency_2 }}</span> 
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
                    <span>{{ item.precio_unitario | currency }}</span> 
                  </div>
                </div>
              </template>
              <template v-slot:item.total="{ item }">
                <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:70px">
                  <span>{{ item.total | currency }}</span> 
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
              <v-col lg="5" md="5" class="py-3 py-3 pr- pl-5">
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
              <v-col lg="2" md="5" class="py-3 py-3 pr- pl-5">
                <v-list dense>
                  <v-subheader>Archivos</v-subheader>
                  <v-list-item-group
                    v-model="selectedItem"
                    color="primary"
                  >
                    <v-list-item
                      v-for="(item, i) in cabecera.adjuntos"
                      :key="i"
                      :href="item.url"
                      target="_blank"
                    >
                      <!-- <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                      </v-list-item-icon> -->
                      <v-list-item-content>
                        <v-list-item-title v-text="item.nombre"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
              <v-col lg="5" md="5" class="py-3 py-3 pr-5 pl-10">
                <!-- {{ cpxTotalesItems }} -->
                <!-- {{materiales}}-{{tipo_documento}} -->
                <cuadro-resumen
                  ref="refcuadroresumen"
                  :oc="cabecera"
                  :materiales="materiales"
                  :tipo_documento="tipo_documento"
                  :mostrar-tipos-documento="false"
                ></cuadro-resumen>
              </v-col>
              
              <v-row justify="end" height="100">
                <v-col lg="3" md="5" class="py- py- pr- pl-16" >
                  <v-speed-dial
                    v-model="fab"
                    :top="top"
                    :bottom="bottom"
                    :right="right"
                    :left="left"
                    :direction="direction"
                    :open-on-hover="hover"
                    :transition="transition"
                  >
                    <template v-slot:activator>
                      <v-btn
                        v-model="fab"
                        color="blue darken-2"
                        dark
                        fab
                        elevation="24"
                      >
                        <v-icon v-if="fab">
                          mdi-close
                        </v-icon>
                        <v-icon v-else>
                          mdi-file-document-outline
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-btn
                      fab
                      dark
                      small
                      elevation="24"
                      color="green"
                      @click="descargarOcPDF()"
                    >
                      <v-icon>mdi-file-download-outline</v-icon>
                    </v-btn>
                    <v-btn
                      fab
                      dark
                      small
                      elevation="24"
                      color="indigo"
                    >
                      <v-icon>mdi-share-all</v-icon>
                    </v-btn>
                  </v-speed-dial>
                </v-col>
              </v-row>
            </v-row>
          </v-sheet>
        </v-card>
      </v-tab-item>

      <v-tab-item
        value="flujo"
      >
        <v-card class="mx-auto" tile>
       
          <v-row>
            <v-col class="py-3 py-3 pr-5 pl-10 pt-5 rounded-0">
              <template>
                <v-card
                  class="mx-auto"
                  color="#FAFAFA"
                  max-width="800"
                  elevation="2"
                  tile
                >
                  <!-- {{ aprobadores }} - {{ cabecera }} - {{ $auth.isLoading }} -->
                  <!-- {{ cabecera }} -->
                  <div class="text-center pt-5 pb-5 rounded-0"> <v-list-item-title class="text-h4 font-weight-bold ">Total: {{ Number(cabecera.neto + cabecera.impuestos) | currency }}</v-list-item-title>
                    <v-list-item-subtitle class="py-3 text-h5">Impuestos: {{ cabecera.impuestos | currency }} - Neto: {{ cabecera.neto | currency }}</v-list-item-subtitle>
                    <div class="text-center">
                      
                      <v-chip
                        class="ma-2"
                        color="teal"
                        text-color="white"
                      >
                        <v-avatar left>
                          <!-- <v-icon>mdi-checkbox-marked-circle</v-icon> -->
                          <v-icon>mdi-cash-multiple</v-icon>
                        </v-avatar>
                        {{ cabecera.moneda.nombre }}
                      </v-chip>
                      <v-chip
                        class="ma-2"
                        color="teal"
                        text-color="white"
                      >
                        <v-avatar left>
                          <!-- <v-icon>mdi-checkbox-marked-circle</v-icon> -->
                          <v-icon>mdi-file-document</v-icon>
                        </v-avatar>
                        {{ cabecera.tipoDocumento }}
                      </v-chip>
                      <v-chip
                        class="ma-2"
                        color="teal"
                        text-color="white"
                      >
                        <v-avatar left>
                          <!-- <v-icon>mdi-checkbox-marked-circle</v-icon> -->
                          <v-icon>mdi-office-building-outline</v-icon>
                        </v-avatar>
                        {{ cabecera.proveedor.razon_social }}
                      </v-chip>
                      
                      <v-chip
                        v-if="cabecera.comentario && cabecera.comentario.length > 0"
                        class="ma-2"
                        color="teal accent-4"
                        outlined
                      >
                        <v-tooltip
                          v-model="show"
                          top
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              icon
                              v-bind="attrs"
                              v-on="on"
                            >
                              <v-icon left>
                                mdi-book-plus
                              </v-icon>
                            </v-btn></template>
                          <span>{{ cabecera.comentario }}</span>
                        </v-tooltip>
                        Comentario
                      </v-chip>
                    </div>
                    <v-row v-if="mostrarBotones && aprobacion" dense class="px-7 align-center py-5" justify="space-around">
                      <v-col class="pr-5">
                        <v-btn
                          color="success"
                          @click="desicionFluo(true)"
                        >Aprobar
                        </v-btn>
                        <v-btn
                          class="ml-5"
                          color="error"
                          @click="desicionFluo(false)"
                        >Rechazar
                        </v-btn>
                      </v-col>
                    </v-row >
                  </div>
                </v-card>
              </template>
            </v-col>
            <!-- <v-row justify="center" height="max-height">
          <v-col lg="7" md="5" class="py-3  pr-5 ">
            <v-textarea
              label="Comentario"
              auto-grow
              outlined
              rows="18"
              row-height="15"
            ></v-textarea>
            </v-col>
          </v-row>-->
          </v-row>
          <v-row v-if="aprobacion == true">
          
          <!-- <v-divider></v-divider>
          <v-divider></v-divider>
          <v-divider></v-divider>
          <v-divider></v-divider> -->
          </v-row>
           
          <template v-if="false">
            <v-row>
              <v-col
                v-for="n in 4"
                :key="n"
                class="d-flex child-flex"
                cols="3"
              >
                <v-card
                  max-width="180"
                  class="mx-auto"
                >
                  <v-img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsbc3nYXHYzE9WxzdCE-8pWLeTp4gPEnA0RA2MaykvlsMk01s45Ji-V5IBRZr9y8aVnak&usqp=CAU"
                    height="150px"
                    dark
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                    <v-avatar size="120" class="ml-4 mt-2">
                      <img
                        alt="user"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSPRIMCWe8gvtzKvKQoFOX3M31DzIy_3HkLA&usqp=CAU"
                      >
                    </v-avatar>
                  </v-img>
                  <div class="text-center">
                    <v-list >
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Keznit</v-list-item-title>
          
                          <v-divider class="mx-5 mt-2 mb-2" ></v-divider>
                          <p class="text-body-2 text--primary text-justify">Se Aprueba la Orden de compra porque hay plata.</p>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-action></v-list-item-action>
                        <v-list-item-icon>
                          <v-icon color="primary" x-large class="pl- pb-2">mdi-checkbox-marked-circle</v-icon>
                        </v-list-item-icon>
                      </v-list-item>
                    </v-list>
                  </div>
                </v-card>
              </v-col> 
              <!--separacion card-->
            </v-row>
          </template> 

          <!--<pipeline :aprobadores="aprobadores" class="mt-1"></pipeline>-->
          <distribucion-lineas-partidas v-if="false"></distribucion-lineas-partidas>
        <!-- <e-charts
          ref="pie"
          style="width: 100%; top: -60px "
          autoresize
          :options="pie"
          auto-resize
        /> -->
        
        </v-card>
      </v-tab-item>
      
    </v-tabs-items>
    <v-dialog
      v-model="dialogDesicion"
      max-width="550"
      persistent
    >
      <modal-final-aprobacion :_redirigir="redirigirListadoAprobaciones" :mod_fk="3" :id_doc="cabecera.id" :id_apro="id_apro"></modal-final-aprobacion>
    </v-dialog> 
  </div>
</template>
<style scoped>
.text-h4 {
color: #0096C7;
}
</style>

<script src="./Previsualizacion.js"></script>

<style scoped src="./Previsualizacion.css"></style>