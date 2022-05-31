<template>
  <v-container class="white">
    <v-row class="mb-6" no-gutters>
      <v-col>
        <h3>PEDIDOS  {{ usuariosPedido.usuSolicitante }} </h3>
        <v-divider></v-divider>
       
        <v-row>
          <v-col cols="2" class="pt-4">
            <h4>Solicitante de Pedidos</h4>
          </v-col>
          <v-col cols="4" class="pb-0">
            <v-combobox
              v-model="usuariosPedido.usuSolicitante" 
              :rules="celulasRules"
              :items="selectUsuario"
              label="Usuario"
              multiple
              dense
              outlined
              :item-text="item => item.nombre +'  '+ item.apellidos"
              :readonly="detalle == true"
            >
            </v-combobox>
        
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2" class="pb-0">
            <h4>Aprobador de Pedidos</h4>
          </v-col>
          <v-col cols="4">
            <v-combobox
              v-model="usuariosPedido.usuAprobador"
              :items="selectUsuario"
              label="Usuario"
              dense
              outlined
              :item-text="item => item.nombre +'  '+ item.apellidos"
              :readonly="detalle == true"
            ></v-combobox>
          </v-col>
        </v-row>
        <h3>ORDEN DE COMPRA</h3>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <h3>Flujo de Aprobación Orden de Compra </h3>
          </v-col>
        </v-row>
        <v-row> </v-row>

        <v-data-table
          v-if="detalle == false"
          :headers="headers"
          :items="cpxTablaOrdenada"
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
                       
                         <v-combobox
                           v-model="usuarioAprobador.usuario" 
                           :rules="celulasRules"
                           filled
                           outlined
                           solo
                           :items="cpxUsuariosAprobadoresFiltrados"
                           dense
                           item-text="nombre"
                           item-value="id"
                         ></v-combobox>
                         <v-text-field
                           v-if="!cpxAprobadorFinal" 
                           v-model="usuarioAprobador.monto" 
                           :rules="celulasRules"
                           label="Hasta que Monto Aprobara"
                           outlined
                           dense
                           value
                         ></v-text-field>
                         <v-select
                           v-if="!cpxAprobadorFinal" 
                           v-model="usuarioAprobador.tiempo" 
                           :rules="celulasRules"
                           :items="items2"
                           label="Tiempo de Aprobación"
                           outlined
                           dense
                         ></v-select>
                         <v-checkbox
                           v-if="cpxAprobadorFinal"
                           v-model="aprobadorFinal"
                           disabled
                           label="Aprobador Final"
                         ></v-checkbox>
                         <p v-if="cpxAprobadorFinal" class="letracolor"><v-icon color="red">mdi-asterisk</v-icon> Estas Agregando al Aprobador Final, esto solo se hace una vez.</p>
                         <v-col cols="12" sm="6" md="4"> </v-col>
                       </v-col></v-row>
                   </v-container>
                 </v-card-text>

                 <v-card-actions>
                   <v-spacer></v-spacer>
                   <v-btn color="red" text @click="close"> Cancelar </v-btn>
                   <v-btn
                     color="success"
                     text
                     :disabled="habilitar != false"
                     @click="agregarAprobador()"
                   >
                     Guardar
                   </v-btn>
                 </v-card-actions>
               </v-card>
             </v-dialog>
           </v-toolbar>
         </template>
          <template
            v-slot:item.monto="{ item }"
          >
            <div v-if="item.apro_final == true">
              <v-icon>mdi-infinity</v-icon> 
            </div>
            <div v-else>
              <p>${{ item.monto }}</p> 
            </div>
          
          </template>
          <template
            v-slot:item.tiempo="{ item }"
          >
            <div v-if="item.apro_final == true">
              <v-icon>mdi-infinity</v-icon> 
            </div>
            <div v-else>
              <p>{{ item.tiempo }}</p> 
            </div>
          
          </template>
          <template
            v-slot:item.actions="{ item }"
          >
            <v-icon
              color="red"
              
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
        <v-data-table
          v-if="detalle == true"
          :headers="headers4"
          :items="tablaAprobadores"
          :items-per-page="5"
          class="elevation-1"
          style="min-width: 890px"
          :hide-default-footer="true"
        ><template
           v-slot:item.monto="{ item }"
         >
           <div v-if="item.apro_final == true">
             <v-icon>mdi-infinity</v-icon> 
           </div>
           <div v-else>
             <p>${{ item.monto }}</p> 
           </div>
          
         </template>
          <template
            v-slot:item.tiempo="{ item }"
          >
            <div v-if="item.apro_final == true">
              <v-icon>mdi-infinity</v-icon> 
            </div>
            <div v-else>
              <p>{{ item.tiempo }}</p> 
            </div>
          
          </template>
        </v-data-table>
        <v-row>
          <v-col> </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h3>Listado de Compradores asignados</h3>
          </v-col>
        </v-row>

        <v-data-table
          v-if="detalle == false"
          :headers="headers2"
          :items="cpxTablaOrdenadaComprador"
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
                   Agregar Comprador
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
                         <v-select
                           v-model="usuariosCompradores.usuario" 
                           :rules="celulasRules"
                           :items="usuario"
                           label="Nombre"
                           outlined
                           dense
                           :item-text="item => item.nombre +'  '+ item.apellidos"
                           :item-value="[]"
                         ></v-select>
                         <v-text-field
                           v-model="usuariosCompradores.monto" 
                           :rules="celulasRules"
                           outlined
                           label="Monto máximo de compra"
                           dense
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
                     @click="guardarNuevoItem2()"
                   >
                     Guardar
                   </v-btn>
                 </v-card-actions>
               </v-card>
             </v-dialog>
             <v-dialog
               v-model="dialog0"
               width="500"
             >

               <v-card>
                 <v-card-title>
                   <span class="text-h5">¡ATENCIÓN!</span>
                 </v-card-title>

                 <v-card-text>
                   <v-container>
                     <v-row>
                       <v-col cols="12" sm="6" md="12" xl="12">
                         <h3 class="letracolor">NO PUEDES ELIMINAR A ESTE USUARIO COMPRADOR PORQUE TAMBIEN ES APROBADOR</h3>
                       </v-col>
                       <v-col cols="12" sm="6" md="4"> </v-col>
                     </v-row>
                   </v-container>
                 </v-card-text>

                 <v-card-actions>
                   <v-spacer></v-spacer>
                   <v-btn color="success" text @click="close"> De Acuerdo </v-btn>
                 </v-card-actions>
               </v-card>
             </v-dialog>
           </v-toolbar></template>
          <template
            v-slot:item.monto="{ item }"
          >
            <div v-if="item.apro_final == true">
              <v-icon>mdi-infinity</v-icon> 
            </div>
            <div v-else>
              <p>${{ item.monto }}</p> 
            </div>
          
          </template>
          <template
            v-slot:item.actions="{ item }"
          >
            <v-icon
              color="red"
              
              @click="deleteItem2(item)"
            >
              mdi-delete
            </v-icon>
          </template>
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
                  v-model="otrosUsuarios"
                  :items="usuario"
                  label="Usuario"
                  multiple
                  dense
                  outlined
                  :item-text="item => item.nombre +'  '+ item.apellidos"
                  :item-value="[]"
                  :readonly="detalle == true"
                >
                </v-combobox>
               
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn
                  color="success"
                  dark
                  large
                  @click="guardarAdquisiciones()"
                ><v-icon>mdi-content-save-all</v-icon>
                  GUARDAR
                </v-btn>
              </v-col></v-row>
          </v-col>
        </v-row>
      </v-col></v-row></v-container>
</template>

<script src="./Adquisiciones.js"></script>
<style src="./Adquisiciones.css"></style>