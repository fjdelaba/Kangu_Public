<template>

  <v-container>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Antes de Finalizar</v-card-title>
        <v-card-text>
          <v-col cols="12" lg="12">  <p class="text-h6 text--primary">Selecciona Tipo de Documento a referenciar: </p></v-col>
          <v-autocomplete
            v-model="lol"
            :items="listaCelulas"
            label="Tipo de Documento a referenciar"
            persistent-hint
            outlined
            dense
            item-text="nombre"
            item-value="id"
          ></v-autocomplete>
          <v-col cols="12" lg="12">  <p class="text-h6 text--primary">Ingresa Nº de Documento: </p></v-col>
          <v-text-field
            v-model="a"
            outlined
            dense
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialogDelete = false">Cancelar</v-btn>
          <v-btn color="blue" text @click="dialogDelete = false">Finalizar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12">
        <v-simple-table>
          <template v-slot:default>
            <thead bgcolor="#DADADA">
              <tr>
                <th class="text-h7 text--primary">
                  Informacion de la Orden de Compra
                </th>
                <th class="text-h7 text--primary ">
                  Informacion de la Recepcion
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="">
                <td>
                  <p class="mt-2">Nº Orden de Compra:  OD-1051-1</p> 
                  <p class="text-h8 text--primary">Fecha de Emisión:  12/01/2021</p> 
                  <p class="text-h8 text--primary ">Nombre de Proveedor : Plaza Vespucio SpA </p>
                  <p class="text-h8 text--primary">RUT de Proveedor :  76.987-563-3 </p>
                </td>
                
                <td>
                  <p class="text-h8 text--primary">Fecha de Emisión:  12/01/2021</p> 
                  <p class="text-h8 text--primary ">Centro de Gestión:  Falabella Arica</p>
                  <p class="text-h8 text--primary">Recepcionado por:   Alexis Reyes Sanhueza </p>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="dessertHeaders"
          :items="desserts"
          class="elevation-1"
        >
          <template v-slot:item.actions="{}">
            <div><v-icon
              large
              color="red"
            >
              mdi-delete 
            </v-icon>
            </div>
          </template> 
          <template v-slot:item.id="{ item }">
            <div class="font-weight-bold">{{ item.id }}</div>
          </template>
          <template v-slot:item.monto="{ item }">
            <v-text-field
              v-model="item.monto"
              outlined
              dense
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-btn @click="dialogDelete = true">Crear</v-btn>
  </v-container>
</template>

<script src="./Crear.js"></script>
