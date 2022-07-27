<template>
  
  <v-container class="white">
    <v-btn
      v-if="detalle == true"
      color="success"
      dark
      large
    
      @click="editarInformacion()"
    ><v-icon left>mdi-pencil</v-icon> 
      EDITAR
    </v-btn> 
   
    <v-row class="mb-6" no-gutters>
      <v-col>   
        
        <v-row class="mb-6" no-gutters>
          <v-col>     
            <h3>MATERIALES A CONTROLAR </h3>
            <h5 > Estos valores serán ocupados en aprobaciones y al crear ordenes de compra.</h5>
          </v-col>
        </v-row>
        <v-row class="mb-6" no-gutters>
          <v-form
            ref="material"
            v-model="valid"
          >
            <v-col >
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
                required
              >
              </v-autocomplete>
            </v-col>
          </v-form>
          <v-form
            ref="material"
            v-model="valid"
          >
            <v-col >
              <v-text-field
                v-if="detalle == false"
                v-model="materialSeleccionado.cantidad"
                :rules="rules.material.cantidad"
                label="Cantidad"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
          </v-form>
          <v-form
            ref="material"
            v-model="valid"
          >
            <v-col>
              <v-text-field
                v-if="detalle == false"
                v-model="materialSeleccionado.valor_unitario"
                :rules="rules.material.unitario"
                label="Valor Unitario"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
          </v-form>
          <v-form
            ref="material"
            v-model="valid"
          >
            <v-col>
              <v-select
                v-if="detalle == false"
                v-model="monedaSeleccionada"
                :items="listaMonedas"
                :rules="rules.material.unitario"
                label="Moneda"
                dense
                outlined
                item-text="nombre"
                item-value="id"
                required
              ></v-select>
            </v-col>
          </v-form>
          <v-col cols="2" class="pb-0">
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
        <v-alert
          v-if="cpxMostrarAlert"
          border="left"
          type="warning"
        >
          TU TOTAL DE LINEAS <strong>EXCEDE</strong> TU <strong>PRESUPUESTO</strong> DE ESTE PROYECTO
        </v-alert>
        <v-row class="mb-6" no-gutters>
        
          <v-col>     
            <template>
              <v-data-table
                :headers="mergedHeaders"
                :items="desserts"
                class="elevation-1"
                :items-per-page="desserts.length"
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
                    @click="deleteItem1(item)"
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
                  >{{ item.cantidad | currency_2 }}</p> 
                </template>
                <template
                  v-slot:item.valor_unitario="{ item }"
                >
                  <v-text-field
                    v-if="item.id == idLinea && editarLinea == true"
                    v-model="item.valor_unitario"
                    label="Valor Unitario"
                    outlined
                    dense
                  ></v-text-field> 
                
                  <p 
                    v-if="item.id != idLinea || editarLinea == false"
                  >{{ item.valor_unitario | currency }}</p> 
                </template>
                <template
                  v-slot:item.total="{ item }"
                >
                  <p 
                    v-if="item.id != idLinea || editarLinea == false"
                  >{{ item.total | currency }}</p> 
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
              color="primary"
              dark
              large
              :loading="loading4"
          
              @click="guardarMateriales()"
            ><v-icon>mdi-content-save-all</v-icon>
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
          </v-col> </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script src="./MaterialControl.js"></script>