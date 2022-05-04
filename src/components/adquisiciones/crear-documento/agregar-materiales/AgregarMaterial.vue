<template>
  <v-card min-width="1000" min-height="500" >
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
      :hide-default-footer="true"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Agregar Material
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="12"
                      class="pb-0 mb-0"
                    >
                      <v-text-field
                        v-model="editedItem.name"
                        label="Material"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="12"
                      class="pb-0 pt-0 mb-0 mt-0"
                    >
                      <v-textarea
                        v-model="editedItem.name"
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
                      <v-text-field
                        v-model="editedItem.calories"
                        label="Cantidad"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      class="pb-0 pt-0 mb-0 mt-0"
                    >
                      <v-text-field
                        v-model="editedItem.fat"
                        label="Precio Unitario"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="12"
                      class="pb-0 pt-0 mb-0 mt-0"
                    >
                      <v-text-field
                        v-model="editedItem.protein"
                        label="Partida"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Agregar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.name="{ item }">
        <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:200px">
          <!-- <span> <span></span>{{ item.name }} <br> <em>{{ item.observacion }}</em> </span>  -->
          <span> <span style="font-size: 16px">{{ item.name }}</span> <br> <span style="font-size: 10px"> <em>{{ item.name }}</em> </span></span> 
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
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
  </v-card>
</template>

<script src="./AgregarMaterial.js"></script>
<style scoped src="./AgregarMaterial.css"></style>