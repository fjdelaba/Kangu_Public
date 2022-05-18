<template>
  <v-card>
    <v-card-title class="pb-0 mb-0">
      <v-row justify="center" align="center">
        <span class="text-h5">{{ cpxTitulo }}</span>
        <v-switch
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
                @focusout="limpiarAutocompleate()"
              >
              
                <template v-slot:no-data >
              
                  <v-btn
                    class="ma-2"
                    outlined
                    color="indigo"
                    @click="mostrarDialog()"
                  >
                    No existe el proveedor, crealo acá
                  </v-btn>
                
                </template>
              </v-autocomplete>
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
                label="Obserbacion"
                auto-grow
                outlined
                rows="3"
                row-height="25"
                shaped
                dense
              ></v-textarea>
            </v-col>
              
            <v-col
              cols="12"
              sm="6"
              md="6"
              class="pb-0 pt-0 mb-0 mt-0"
            >
              <v-combobox
                v-model="material.partida"
                :items="listaPartidas"
                label="Selecciona la partida"
                v-bind="attrs"
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
            <v-col
              cols="12"
              sm="6"
              md="4"
              class="pb-0 pt-0 mb-0 mt-0"
            >
              <v-text-field
                v-model="material.cantidad"
                label="Cantidad"
                :rules="rules.material.cantidad"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="2"
              class="pb-0 pt-0 mb-0 mt-0"
            >
              <v-btn
                fab
                dark
                small
                color="primary"
              >
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-col>
                  
            <v-col
              cols="12"
              sm="6"
              md="6"
              class="pb-0 pt-0 mb-0 mt-0"
            >
              <v-text-field
                v-model="material.unitario"
                :rules="rules.material.unitario"
                label="Precio Unitario"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-row class="pl-3" align="center">
              <v-col
                cols="12"
                sm="6"
                md="6"
                class="pb-0 pt-0 mb-0 mt-0"
              >
                <p class="font-weight-black">Total: {{ material.subtotal }}</p>
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
            {{ materialesSelected }}
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
              v-model="material.partida"
              :items="listaPartidas"
              label="Selecciona la partida"
              v-bind="attrs"
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
        Guardar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script src="./ModalAgregarMaterial.js"></script>
<style scoped src="./ModalAgregarMaterial.css"></style>