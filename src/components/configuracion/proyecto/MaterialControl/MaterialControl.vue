<template>
  
  <v-container class="grey lighten-5">
    <v-btn
      v-if="detalle == true"
      color="success"
      dark
      large
    
      @click="editarInformacion()"
    ><v-icon left>mdi-pencil</v-icon> 
      EDITAR
    </v-btn> 
    <v-btn
      v-if="detalle == false && guardarEdicion == true"
      color="success"
      dark
      large
    
      @click="guardarDetalle()"
    ><v-icon left>mdi-content-save</v-icon> 
      GUARDAR
    </v-btn> 
    <v-btn
      v-if="detalle == false && guardarEdicion == true"
      color="warning"
      dark
      large
    
      @click="guardarDetalle()"
    ><v-icon left>mdi-cancel</v-icon> 
      CANCELAR
    </v-btn> 
    <v-row class="mb-6" no-gutters>
      <v-col>   
        
        <v-row class="mb-6" no-gutters>
          <v-col>     
            <h3>MATERIALES A CONTROLAR {{ detalle }}</h3>
            <h5 > Estos valores serán ocupados en aprobaciones y al crear ordenes de compra.</h5>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="2"
          >
            <v-autocomplete 
              v-if="detalle == false"
              v-model="material"
              :rules="rules.material.nombre"
              :items="listaMaterial"
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
              autofocus="false"
            >
            </v-autocomplete></v-col>
          <v-col
            cols="2"
          >
            <v-text-field
              v-if="detalle == false"
              v-model="materialSeleccionado.cantidad"
              label="Cantidad"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols="2"
          >
            <v-text-field
              v-if="detalle == false"
              v-model="materialSeleccionado.unitario"
              label="Valor Unitario"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols="2"
          >
            <v-select
              v-if="detalle == false"
              v-model="monedaSeleccionada"
              :items="listaMonedas"
              label="Moneda"
              dense
              outlined
              item-text="nombre"
              item-value="id"
            ></v-select>
          </v-col>
          <v-col
            cols="3"
          >
            <v-btn
              v-if="detalle == false"
              color="primary"
              dark
              @click="guardarNuevoItem()"
            >
              Agregar Material 
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mb-6" no-gutters>
          <v-col>     
            <template>
              <v-data-table
                :headers="mergedHeaders"
                :items="desserts"
                class="elevation-1"
                :hide-default-footer="true"
              >
                <template
                  v-slot:item.actions="{ item }"
                >
                  <v-icon
                    v-if="editarLinea == false"
                    color="warning"
                    @click="deleteItem2(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    v-if="editarLinea == true"
                    color="success"
                    @click="deleteItem1()"
                  >
                    mdi-content-save
                  </v-icon>
                  <v-icon
                    v-if="editarLinea == false || editarLinea == true"
                    color="red"
                    @click="deleteItem3(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <template
                  v-slot:item.cantidad="{ item }"
                >
                  <v-text-field
                    v-if="item.id == idLinea && editarLinea == true"
                    v-model="item.cantidad"
                    label="Cantidad"
                    outlined
                    dense
                  ></v-text-field> 
                
                  <p 
                    v-if="item.id != idLinea || editarLinea == false"
                  >{{ item.cantidad }}</p> 
                </template>
                 <template
                  v-slot:item.unitario="{ item }"
                >
                  <v-text-field
                    v-if="item.id == idLinea && editarLinea == true"
                    v-model="item.unitario"
                    label="Valor Unitario"
                    outlined
                    dense
                  ></v-text-field> 
                
                  <p 
                    v-if="item.id != idLinea || editarLinea == false"
                  >{{ item.unitario }}</p> 
                </template></v-data-table>
            </template>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            <v-btn
              v-if="detalle == false"
              color="success"
              dark
              large
              @click="guardarMateriales()"
            ><v-icon>mdi-content-save-all</v-icon>
              GUARDAR
            </v-btn>
         
          </v-col></v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script src="./MaterialControl.js"></script>