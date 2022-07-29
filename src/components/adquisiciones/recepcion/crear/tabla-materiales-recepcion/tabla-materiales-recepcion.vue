<template>

  <v-container>
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
          <template v-slot:item.id="{ }">
            <nombre-material :nombre="nombre" :unidad="unidad" :observacion="obs" ></nombre-material>
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
  </v-container>
</template>

<script src="./tabla-materiales-recepcion.js"></script>
