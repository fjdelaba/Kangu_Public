<template>
  <div>
    <!-- {{_lista}} -->
    <v-data-table
      :headers="cabecera"
      :items="_lista"
      item-key="id"
      hide-default-footer
      class="elevation-1"
      :items-per-page="_lista.length"
      dense
    >
      <!-- <template v-slot:item.mat_nombre="{ item }">
        <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:400px">
          <nombre-obs-tabla :nombre="item.mat_nombre" :observacion="item.mat_unidad" :unidad="item.observacion"></nombre-obs-tabla>
        </div>
      </template> -->
      <template v-slot:item.mat_nombre="{ item }">
        <v-edit-dialog
          :return-value.sync="item.mat_nombre"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:400px">
            <nombre-obs-tabla :nombre="item.mat_nombre" :observacion="item.mat_unidad" :unidad="item.observacion"></nombre-obs-tabla>
          </div>
          <template v-slot:input>
            <v-text-field
              v-model="item.observacion"
              label="Observacion"
              single-line
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.partidas="{ item }">
        <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:70px">
          <div v-if="item.edicion">
            <div v-if="item.partidas.length > 1">
              {{ item.partidas[0].name }}
              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on, attrs }">
                  
                  <v-icon
                    small
                    class="mr-2"
                    v-bind="attrs"
                    v-on="on"
                  >  mdi-expand-all
                  </v-icon>

                </template>
                <v-card
                  class="mx-auto"
                  max-width="400"
                  tile
                >
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title v-for="p in item.partidas" :key="p.id">{{ p.name }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>  
                </v-card>
              </v-tooltip>
              <v-icon
                small
                class="mr-2"
                @click="edicionPartida(item)"
              >  mdi-pencil-circle-outline
              </v-icon>
            </div>
            <div v-else>
              {{ item.partidas[0].name }}  <v-icon
                small
                class="mr-2"
                @click="edicionPartida(item)"
              >  mdi-pencil-circle-outline
              </v-icon>
            </div>
          </div>
          <div v-else>
            <div v-if="item.partidas.length > 1">
              <span>a:</span> 
            </div>
            <div v-else>
              <span>b:{{ item.partidas[0].name }}</span> 
            </div>
          </div>
        </div>
      </template>

      <template v-slot:item.cantidad="{ item }">
        <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:70px">
          <!-- {{ item.partidas }} -->
          <div v-if="item.partidas.length > 1">
            {{ item.cantidad }}
          </div>
          <div v-else>
            <div v-if="item.edicion">
              <v-text-field
                v-model="item.cantidad"
                outlined
                dense
                @input="asignarCantidad(item)"
              ></v-text-field>
            </div>
            <div v-else> {{ item.cantidad | currency }} </div>
          </div>

          <!-- <div v-if="item.edicion">
            <v-text-field
              v-model="item.cantidad"
              outlined
              dense
              @input="calcularTotalMaterial(item)"
            ></v-text-field>
          </div>
          <div v-else>
            <span>{{ item.precio_unitario | currency }}</span> 
          </div>
        </div> -->
        </div></template>

      <template v-slot:item.precio_unitario="{ item }">
        <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:70px">
          <div v-if="item.edicion">
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
        <div v-if="item.ediciom">
          <v-icon
            small
            class="mr-2"
          ><!-- -            @click="guardarMaterial(item)"-->
            mdi-content-save
          </v-icon>
          <v-icon
            small
          ><!-- @click="eliminarMaterial(item)" -->
            mdi-delete {{ item }}
          </v-icon>
        </div>
        <div v-else>
          <v-icon
            small
            class="mr-2"
          ><!-- @click="abrirDialogMaterial(item)" -->
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
    </v-data-table>
    <v-row justify="center">
      <v-dialog
        v-model="editarPartida"
        persistent
        max-width="400"
      >
        <v-card>
          <drawer-partida :_origen="2" :_edicion-partida="edicionSeleccionPartida"></drawer-partida>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="cancelarNuevaPartida()"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="grabarNuevaPartida()"
            >
              Seleccionar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script src="./TablaAgregarMaterial.js"></script>
<style scoped src="./TablaAgregarMaterial.css"></style>