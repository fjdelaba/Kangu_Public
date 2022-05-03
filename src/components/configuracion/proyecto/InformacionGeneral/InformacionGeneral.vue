<template>
  <v-container class="grey lighten-5">
    <v-row class="mb-6" no-gutters>
      <v-col>
        <v-card class="pa-2" outlined tile>
          <v-container>
            <v-row>
              <v-col
                cols="2"
              >
                <p>Nombre</p>
                <v-text-field
                  v-model="first"
                  label="First Name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col
                cols="2"
              >
                <p>Código</p>
                <v-text-field
                  v-model="first"
                  label="First Name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col
                cols="2"
              >
                <p>Unidades de Negocio</p>
                <v-text-field
                  v-model="first"
                  label="First Name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col
                cols="2"
              >
                <p>Valor Neto del Contrato</p>
                <v-text-field
                  v-model="first"
                  label="First Name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col
                cols="2"
              >
                <p>Presupuesto Obra</p>
                <v-text-field
                  v-model="first"
                  label="First Name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col
                cols="2"
              >
                <p>Estado</p>
                <v-text-field
                  v-model="first"
                  label="First Name"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            
            <v-row>
              <v-col
                cols="4"
              >
                <p>Mandante</p>
                <v-combobox
                  v-model="select"
                  outlined
                  :items="items"
                  :multiple="false"
                  chips
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
              <v-col>
                <v-data-table
                  :headers="headers"
                  :items="desserts"
                  :items-per-page="5"
                  class="elevation-1"
                ></v-data-table>
              </v-col>
            </v-row>
          <v-row>
              <v-col
                cols="2"
              >
                <p>Región</p>
                <v-text-field
                  v-model="first"
                  label="First Name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col
                cols="2"
              >
                <p>Comuna</p>
                <v-text-field
                  v-model="first"
                  label="First Name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col
                cols="2"
              >
                <p>sDirección</p>
                <v-text-field
                  v-model="first"
                  label="First Name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col
                cols="2"
              >
                <p>Moneda</p>
                <v-combobox
                  v-model="select"
                  outlined
                  :items="items"
                  :multiple="false"
                  chips
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
              <v-col
                cols="2"
              >
                <p>Flags</p>
                 <v-combobox
                  v-model="select"
                  outlined
                  :items="items"
                  :multiple="false"
                  chips
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
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
