<template>
  <div>
    <v-card>
      <v-card-title class="pb-0 mb-0">
        <!-- {{ listaPartidas }} -->
        <v-row justify="center" align="center">
          <!-- {{ material }} -->
          <!-- {{ partidaGeneral }} -->
          <span class="text-h5">{{ cpxTitulo }}</span>
          <v-switch
            v-if="!cpxModoEdicion"
            v-model="cargaMasiva"
            label="Carga Masiva"
          ></v-switch>
        </v-row>
      </v-card-title>
      <div v-if="!cargaMasiva" transition="fade-transition">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="12"
                class="pb-0 mb-0"
              >
                <!-- <v-text-field
              v-model="material.nombre"
              label="Material"
              outlined
              dense
            ></v-text-field> -->
                <!-- {{ materialEdicion }} {{ materialEdicion !== undefined }} - {{ cpxModoEdicion }} -->
                <div v-if="materialEdicion !== undefined">
                  <span class="pb-3"> {{ materialEdicion.nombre }} </span>
                </div>
                <div v-else>
                  <v-autocomplete 
                    v-model="material.nombre"
                    :items="listaMaterial"
                    :rules="rules.material.nombre"
                    :loading="isLoading"
                    :search-input.sync="search"
                    item-text="nombre"
                    item-value="id"
                    label="Material"
                    hint="Busca por su nombre "
                    return-object
                    :hide-no-data="!mostrarNoData"
                    outlined
                    dense
                    solo
                  >
                    <template v-slot:no-data >
                      <v-btn
                        class="ma-2"
                        outlined
                        color="indigo"
                        @click="modalNuevoMaterial = true"
                      >
                        No existe el Material, crealo ac??
                      </v-btn>
                    </template>
                  </v-autocomplete>
                </div>

                <!-- <v-autocomplete
              v-model="material.nombre"
              :items="listaMaterial"
              :loading="isLoading"
              :search-input.sync="search"
              hide-details
              hide-selected
              item-text="nombre"
              item-value="id"
              label="Search for a coin..."
              solo
            ></v-autocomplete> -->
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="12"
                class="pb-0 pt-0 mb-0 mt-0"
              >
                <v-textarea
                  v-model="material.observacion"
                  label="Observaci??n"
                  auto-grow
                  outlined
                  rows="2"
                  row-height="25"
                  dense
                ></v-textarea>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
                lg="12"
                class="pb-0 pt-0 mb-0 mt-0"
              >
                <v-btn
                  fab
                  dark
                  x-small
                  color="primary"
                  @click="agregarProrateo()"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </v-col>    
              <!-- <div
              v-for="(textField, i) in textFields"
              :key="i"
              class="text-fields-row"
            >        -->
              <v-col
                cols="12"
                sm="6"
                md="6"
                class="pb-0 pt-0 mb-0 mt-0"
              >
                <div v-for="prorateo in material.partidas" :key="prorateo.id" class="d-flex justify-space-between">
                  <v-combobox
                    v-model="prorateo.par_fk"
                    :items="listaPartidas"
                    label="Selecciona la partida"
                    item-text="nombre"
                    item-value="id"
                    outlined
                    dense
                    :return-object="true"
                    :rules="rules.material.partida"
                    :disabled="prorateo.disabled"
                    @input="seleccionPartida()"
                  >
                    <!-- v-model="material.partida" -->
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
                  <!-- <v-text-field
                    v-model="prorateo.cantidad"
                    label="Cantidad"
                    :rules="rules.material.cantidad"
                    outlined
                    dense
                    @input="calcularTotal()"
                  ></v-text-field> -->
                  <!-- <v-text-field
                    v-model="prorateo.cantidad"
                    label="Cantidad"
                    outlined
                    dense
                    @input="calcularTotal()"
                  ></v-text-field> -->
                  <!-- 
                  <vuetify-money
                    v-model="value"
                    :label="label"
                    :placeholder="placeholder"
                    :readonly="readonly"
                    :disabled="disabled"
                    :outlined="outlined"
                    :clearable="clearable"
                    :value-when-is-empty="valueWhenIsEmpty"
                    :options="options"
                    :properties="properties"
                  /> -->

                  <!-- <v-currency-field 
                    v-model="prorateo.cantidad" 
                    label="Cantidad"
                    dense
                    :error-messages="errors.rate"
                    outlined
                    @input="calcularTotal()"
                  /> -->
                  <v-text-field
                    v-model="prorateo.cantidad"
                    label="Cantidad"
                    outlined
                    dense
                    @input="calcularTotal()"
                  ></v-text-field>

                  <!--  <input v-model="amountValue"/> {{amount}} -->

                  <!-- v-model="material.cantidad" -->
                  <v-btn
                    v-if="prorateo.eliminar"
                    fab
                    dark
                    x-small
                    color="primary"
                    @click="eliminarProrateo(prorateo)"
                  >
                    <v-icon dark>
                      mdi-minus
                    </v-icon>
                  </v-btn>
                </div>
              </v-col>
              <!-- </div> -->
              <v-col
                cols="12"
                sm="6"
                md="4"
                class="pb-0 pt-0 mb-0 mt-0"
              >
              <!-- <v-text-field
                v-model="material.cantidad"
                label="Cantidad"
                :rules="rules.material.cantidad"
                outlined
                dense
                @input="calcularTotal()"
              ></v-text-field> -->
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
                class="pb-0 pt-0 mb-0 mt-0"
              >
                <!-- <v-currency-field
                  v-model="material.precio_unitario"
                  :rules="rules.material.precio_unitario"
                  label="Precio Unitario"
                  outlined
                  dense
                  @input="calcularTotal()"
                ></v-currency-field> -->
                <v-text-field
                  v-model="material.precio_unitario"
                  label="Precio Unitario"
                  outlined
                  dense
                  @input="calcularTotal()"
                ></v-text-field>
              </v-col>
              <v-row class="pl-3" align="center">
                <v-col
                  cols="6"
                  sm="6"
                  md="12"
                  class="pb-0 pt-0 mb-0 mt-0 ml-2"
                >
                  <p class="font-weight-black">Total: {{ material.subtotal | currency }} {{ moneda.nombre }}</p>
                </v-col>
              </v-row>
            </v-row>
          </v-container>
        </v-card-text>
      </div>
      <div v-else>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="12"
              class="pb-0 mb-0"
            >
              <!-- {{ materialesSelected }} -->
              <v-text-field
                v-model="textoFiltroMaterial"
                label="Material"
                outlined
                dense
                @input="cargarMateriales()"
              ></v-text-field>
            <!-- <v-autocomplete 
              v-model="material.nombre"
              :items="listaMaterial"
              :rules="rules.material.nombre"
              :loading="isLoading"
              :search-input.sync="search"
              item-text="nombre"
              item-value="id"
              label="Material"
              hint="Busca por su nombre "
              return-object
              :hide-no-data="!mostrarNoData"
              outlined
              dense
              solo
              @focusout="limpiarAutocompleate()"
            ></v-autocomplete> -->
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="12"
              class="pb-0 mb-0"
            >
              <v-data-table
                v-model="materialesSelected"
                :headers="headers"
                :items="listaMaterial"
                item-key="id"
                show-select
                class="elevation-1"
              >
              </v-data-table>
            <!-- <v-data-table
              :headers="headers"
              :items="desserts"
              sort-by="calories"
              class="elevation-1"
              :hide-default-footer="true"
            >
              <template v-slot:top>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete">No </v-btn>
                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">Si</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table> -->
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="12"
              class="pb-0 mb-0"
            >
              Seleccionar partida general
              <v-combobox
                v-model="partidaGeneral"
                :items="listaPartidas"
                label="Selecciona la partida"
                item-text="nombre"
                item-value="id"
                outlined
                dense
                :return-object="true"
                :rules="rules.material.partida"
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
            </v-col>
          </v-row>
        </v-card-text>
      </div>
      <v-alert
        v-if="mostrarAlert"
        dense
        border="left"
        type="warning"
      >
        {{ textoAlert }}
      </v-alert>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="cerrar()"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="agregarMaterial()"
        >
          Guardar {{ modalNuevoMaterial }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="modalNuevoMaterial" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">No </v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">Si</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script src="./ModalAgregarMaterial.js"></script>
<style scoped src="./ModalAgregarMaterial.css"></style>