<template>

  <v-container>
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
              <v-row no-gutters class="pl-3 mt-1">
                <v-col cols="12" lg="6"><span class="caption">Nº Orden de Compra:  OD-1051-1</span>
                </v-col></v-row>
              <v-row no-gutters class="pl-3">
                <v-col cols="12" lg="6"><span class="caption">Fecha de Emisión:  12/01/2021</span>
                </v-col></v-row>
              <v-row no-gutters class="pl-3">
                <v-col cols="12" lg="8"><span class="caption">Nombre de Proveedor : Plaza Vespucio SpA </span>
                </v-col></v-row>
              <v-row no-gutters class="pl-3">
                <v-col cols="12" lg="6"><span class="caption">RUT de Proveedor :  76.987-563-3</span>
                </v-col></v-row>
            </td>
                
            <td>
              <v-row no-gutters class="pl-3">
                <v-col cols="12" lg="6"><span class="caption">Fecha de Emisión:  12/01/2021</span>
                </v-col></v-row>
              <v-row no-gutters class="pl-3">
                <v-col cols="12" lg="6"><span class="caption">Centro de Gestión:  Falabella Arica</span>
                </v-col></v-row>
              <v-row no-gutters class="pl-3">
                <v-col cols="12" lg="8"><span class="caption">Recepcionado por:   Alexis Reyes Sanhueza </span>
                </v-col></v-row>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

  </v-container>
</template>

<script src="./cabecera-recepcion.js"></script>
