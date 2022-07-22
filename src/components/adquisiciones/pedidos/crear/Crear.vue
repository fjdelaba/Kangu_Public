<template>
  <v-container>
    <v-dialog v-model="dialogDelete" persistent max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Antes de Comenzar</v-card-title>
        <v-card-text>
       
          <v-col cols="12" lg="12">  <p class="text-h6 text--primary">Ingresa Nombre del Pedido: </p></v-col>
          <v-text-field
            v-model="a"
            label="Nombre del Pedido"
            outlined
       
            dense
            v-bind="attrs"
            v-on="on"
          ></v-text-field>

          <v-col cols="12" lg="12">  <p class="text-h6 text--primary">Selecciona el Proyecto: </p></v-col>
          <v-autocomplete
            v-model="lol"
            :items="listaCelulas"
            label="Proyecto del Pedido"
            persistent-hint
            outlined
            dense
            item-text="nombre"
            item-value="id"
          ></v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialogDelete = false">Cancelar</v-btn>
          <v-btn color="blue" text @click="dialogDelete = false">Finalizar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card >
      <v-sheet
        class=" mt-3"
        color="lighten-3"
      >
        <v-sheet
          :elevation="2"
          height="100%"
          width="100%"
          class="pb-3 pt-3"
        >    
        
          <v-row no-gutters class="pl-3">
            <v-col cols="12" lg="6"><span class="caption">Nombre Documento: JUANITO PEREZ PEDIDO</span></v-col>
          </v-row>
          <v-row no-gutters class="pl-3">
            <v-col cols="12" lg="6"><span class="caption">Obra: FALABELLA RETAIL</span></v-col>
          </v-row>
          <v-row no-gutters class="pl-3">
            <v-col cols="12" lg="6"><span class="caption">Nombre Solicitante: Bastian Medina</span></v-col>
          </v-row>
        </v-sheet>
        <v-row>
          <v-col cols="12">
            <v-btn>Agregar Material</v-btn>
          </v-col></v-row>
        <v-row>
          <v-col cols="12">
          
            <v-data-table
              :headers="headers"
              :items="materiales"
              item-key="id"
              sort-by="calories"
              hide-default-footer
              class="elevation-1"
              dense
            >
              <template v-slot:item.cantidad="{ item }">
                <v-text-field
                  v-model="item.cantidad"
                  outlined
                  dense
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <template v-slot:item.actions="{ item }">
              
                <div >
              
                  <v-icon
                    small
                    @click="eliminarMaterial(item)"
                  >
                    mdi-delete {{ item }}
                  </v-icon>
                </div>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              outlined
              label="Comentario al comprador"
              :value="observacion"
              :readonly="true"
            ></v-textarea>
          </v-col></v-row>
      
      </v-sheet></v-card>
 
  </v-container>
</template>
 
<style scoped>
.text-h4 {
color: #0096C7;
}
</style>

<script src="./Crear.js"></script>

<style scoped src="./Crear.css"></style>