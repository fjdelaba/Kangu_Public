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
          <template v-slot:item.id="{ item }">
            <v-row no-gutters class="pl-3">
              <v-col cols="12" lg="12">
                <div class="font-weight-bold">{{ item.id }}</div></v-col></v-row>
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
