<template>
  <div v-if="!this.$parent.$refs.botonMantenedor.mostrarBotones">
    <h2>Mantenedor {{ tituloMantenedor }}</h2>
    <v-col
      cols="12"
      style="min-width: 600px"
      class="flex-grow-0 flex-shrink-1 w-full"
    > 
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">¿Estas seguro que quieres eliminar esto?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="closeDelete">Cancelar</v-btn>
            <v-btn :disabled="habilitar != false" color="success" text @click="deleteItemConfirm">Si, estoy seguro</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="idMantenedor == 1"
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
          >
            Nueva Forma de Pago
          </v-btn>
          <v-btn
            v-else-if="idMantenedor == 2"
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
          >
            Nuevo Tipo de Despacho
          </v-btn>
          <v-btn
            v-else-if="idMantenedor == 5"
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
          >
            Nueva Unidad de Negocio
          </v-btn>
        </template>
        <v-card>
          <v-card-title v-if="idMantenedor == 1">
            <span class="text-h5">Nueva Forma de Pago</span>
          </v-card-title>
          <v-card-title v-else-if="idMantenedor == 2">
            <span class="text-h5">Nuevo Tipo de Despacho</span>
          </v-card-title>
          <v-card-title v-else-if="idMantenedor == 5">
            <span class="text-h5">Nueva Unidad de Negocio</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="12" xl="12">
                  <span class="text-h6">Nombre</span>
                  <v-text-field
                    v-model="editedItem.nombre"
                  ></v-text-field>
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
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="cpxRetornarCabecera"
          :items="lista"
          :items-per-page="5"
          class="elevation-1"
          style="min-width: 890px"
          :search="search"
        >
          <template v-slot:item.nombre="{ item }">
            <v-text-field
              v-if="item.id === editedItem.id"
              v-model="editedItem.nombre"
              :hide-details="true"
              dense
              single-line
              :autofocus="true"
            ></v-text-field>
            <span v-else>{{ item.nombre }} </span>
          </template>
          <template v-slot:item.activo="{ item }">
            <v-switch
              v-if="idMantenedor == 3 || idMantenedor == 4"
              v-model="item.activo"
              color="success"
              :value="item.activo"
              hide-details
              @change="saveMoneda(item)"
            ></v-switch>
            <v-simple-checkbox
              v-if="
                (item.id === editedItem.id && idMantenedor == 1) ||
                  item.id === editedItem.id && idMantenedor == 2 ||
                  item.id === editedItem.id && idMantenedor == 5
              "
              v-model="editedItem.activo"
              :disabled="item.id != editedItem.id"
            ></v-simple-checkbox>
            <v-simple-checkbox
              v-else-if="
                (item.id != editedItem.id && idMantenedor == 1) ||
                  item.id != editedItem.id && idMantenedor == 2 ||
                  item.id != editedItem.id && idMantenedor == 5
              "
              v-model="item.activo"
              :disabled="item.id != editedItem.id"
            ></v-simple-checkbox>
          </template>
          <template
            v-if="idMantenedor == 1 || idMantenedor == 2 || idMantenedor == 5"
            v-slot:item.actions="{ item }"
          >
            <v-icon
              v-if="item.id != editedItem.id"
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              v-if="item.id != editedItem.id"
              color="red"
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
            <div v-if="item.id === editedItem.id">
              <v-icon color="red" class="mr-3" @click="close">
                mdi-window-close
              </v-icon>
              <v-icon color="green" @click="save"> mdi-content-save </v-icon>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </div>
</template>
<style src="./Tabla.css"></style>
<script src="./Tabla.js"></script>
