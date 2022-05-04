<template>
  <v-container class="grey lighten-5">
    <v-row class="mb-6" no-gutters>
      <v-col>
        <h3>PEDIDOS</h3>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="2" class="pb-0">
            <h4>Administrador de Obra</h4>
          </v-col>
          <v-col cols="4" class="pb-0">
            <v-combobox
              v-model="a"
              :items="items"
              label="Usuario"
              dense
              outlined
            ></v-combobox>
            <!-- <template v-slot:selection="data">
                 <v-chip
                  :key="JSON.stringify(data.item)"
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  :disabled="data.disabled"
                  @click:close="data.parent.selectItem(data.item)"
                >
                  <v-avatar
                    class="accent white--text"
                    left
                    v-text="data.item.slice(0, 1).toUpperCase()"
                  ></v-avatar>
                  {{ data.item }}
                </v-chip> 
              </template> -->
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2" class="pt-4">
            <h4>Solicitante de Pedidos</h4>
          </v-col>
          <v-col cols="4" class="pb-0">
            <v-combobox
              v-model="select"
              :items="items"
              label="Usuario"
              multiple
              dense
              outlined
            >
              <!-- <template v-slot:selection="data">
                 <v-chip
                  :key="JSON.stringify(data.item)"
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  :disabled="data.disabled"
                  @click:close="data.parent.selectItem(data.item)"
                >
                  <v-avatar
                    class="accent white--text"
                    left
                    v-text="data.item.slice(0, 1).toUpperCase()"
                  ></v-avatar>
                  {{ data.item }}
                </v-chip> 
              </template> -->
            </v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2" class="pb-0">
            <h4>Aprobador de Pedidos</h4>
          </v-col>
          <v-col cols="4">
            <v-combobox
              v-model="b"
              :items="items"
              label="Usuario"
              dense
              outlined
            ></v-combobox>
          </v-col>
        </v-row>
        <h3>ORDEN DE COMPRA</h3>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <h3>Flujo de Aprobación Orden de Compra</h3>
          </v-col>
        </v-row>
        <v-row> </v-row>
        
        <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="5"
          class="elevation-1"
          style="min-width: 890px"
          :hide-default-footer="true"
        ><template v-slot:top>
          <v-toolbar flat>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  Agregar Aprobador
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Nuevo Aprobador</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="12" xl="12">
                        <span class="text-h6">Nombre</span>
                        <v-text-field v-model="editedItem.name"></v-text-field>
                        <span class="text-h6">Hasta que Monto Aprobara</span>
                        <v-text-field v-model="editedItem.fat"></v-text-field>
                        <span class="text-h6">Tiempo de Aprobación</span>
                        <v-text-field v-model="editedItem.carbs"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4"> </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red" text @click="close"> Cancelar </v-btn>
                  <v-btn
                    color="success"
                    text
                    :disabled="habilitar != false"
                    @click="guardarNuevoItem()"
                  >
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar></template>
        </v-data-table>
        <v-row>
          <v-col>

          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h3>Listado de Compradores asignados</h3>
          </v-col>
        </v-row>

        <v-data-table
          :headers="headers2"
          :items="desserts2"
          :items-per-page="5"
          class="elevation-1"
          style="min-width: 890px"
          :hide-default-footer="true"
        ><template v-slot:top>
          <v-toolbar flat>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialogo" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  Agregar Aprobador
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Nuevo Comprador</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="12" xl="12">
                        <span class="text-h6">Nombre</span>
                        <v-text-field v-model="editedItem.name"></v-text-field>
                        <span class="text-h6">Monto máximo de compra</span>
                        <v-text-field v-model="editedItem.fat"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4"> </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red" text @click="close"> Cancelar </v-btn>
                  <v-btn
                    color="success"
                    text
                    :disabled="habilitar != false"
                    @click="guardarNuevoItem2()"
                  >
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar></template>
        </v-data-table>
        <v-row>
          <v-col>
            <h3>OTROS USUARIOS</h3>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="2" class="pb-0">
                <h4>Usuarios Observadores</h4>
              </v-col>
              <v-col cols="4" class="pb-0">
                <v-combobox
                  v-model="c"
                  :items="items"
                  label="Usuario"
                  multiple
                  dense
                  outlined
                >
                  <!-- <template v-slot:selection="data">
                 <v-chip
                  :key="JSON.stringify(data.item)"
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  :disabled="data.disabled"
                  @click:close="data.parent.selectItem(data.item)"
                >
                  <v-avatar
                    class="accent white--text"
                    left
                    v-text="data.item.slice(0, 1).toUpperCase()"
                  ></v-avatar>
                  {{ data.item }}
                </v-chip> 
              </template> -->
                </v-combobox>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <v-btn
                  color="success"
                  dark
                  large
                ><v-icon>mdi-content-save-all</v-icon> 
                  GUARDAR
                </v-btn> 
         
              </v-col></v-row>
          </v-col>
        </v-row>
      </v-col></v-row></v-container>
</template>

<script src="./Adquisiciones.js"></script>
