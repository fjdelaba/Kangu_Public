<template>
  <v-card min-width="1000" min-height="500" >
    <v-btn
      color="primary"
      dark
      class="mb-2"
      @click="abrirDialogMaterial()"
    >
      Agregar Material
    </v-btn>
    <v-btn
      color="primary"
      dark
      class="mb-2"
      @click="abrirDialogMaterialMasivo()"
    >
      Agregar Materiales
    </v-btn>

    <v-data-table
      :headers="headers"
      :items="materiales"
      sort-by="calories"
      class="elevation-1"
      :hide-default-footer="true"
    >
      <template v-slot:item.name="{ item }">
        <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:200px">
          <!-- <span> <span></span>{{ item.name }} <br> <em>{{ item.observacion }}</em> </span>  -->
          <span> <span style="font-size: 16px">{{ item.name }}</span> <br> <span style="font-size: 10px"> <em>{{ item.name }}</em> </span></span> 
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
        >
          mdi-delete {{ item }}
        </v-icon>
      </template>
      <template v-slot:no-data>
        <!-- <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn> -->
        Sin datos
      </template>
    </v-data-table>
    <v-dialog
      v-model="dialogMaterial"
      persistent
      max-width="600px"
    >
      <modal-agregar-material></modal-agregar-material></v-dialog>
  </v-card>
</template>

<script src="./AgregarMaterial.js"></script>
<style scoped src="./AgregarMaterial.css"></style>