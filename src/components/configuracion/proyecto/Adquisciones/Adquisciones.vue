<template>
  
  <v-container class="grey lighten-5">
    <h2>
      Creacion del  Proyecto
    </h2>
    <v-row class="mb-6" no-gutters>
      <v-col>   
        <v-card class="pa-2" outlined tile>
          <v-row class="mb-6" no-gutters>
            <v-col cols="2" align-self="center">
              <h4>Administrador de Obra</h4>
            </v-col>
            <v-col cols="4">
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

          <v-row class="mb-6" no-gutters>
            <v-col cols="2" align-self="center">
              <h4>Solicitante de Pedidos</h4>
            </v-col>
            <v-col cols="4">
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
          <v-row class="mb-6" no-gutters>
            <v-col cols="2" align-self="center">
              <h4>Aprobador de Pedidos</h4>
            </v-col>
            <v-col cols="4">
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
          <h3>Flujo de Aprobación Orden de Compra</h3>
          <v-row>
            <v-col>
              <h4>Listado de aprobadores, montos y tiempos</h4>
            </v-col>
          </v-row>
    
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
            style="min-width: 890px"
          >
            <v-btn
              v-if="idMantenedor == 1"
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nueva Forma de Pago
            </v-btn></v-data-table>
          <v-row class="mb-6" no-gutters>
            <v-col cols="2" align-self="center">
              <h4>Usuarios Observadores</h4>
            </v-col>
            <v-col cols="4">
              <v-combobox
                v-model="select"
                outlined
                :items="items"
                multiple
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

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>