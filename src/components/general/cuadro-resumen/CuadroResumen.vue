<template>
  <div>
    <v-radio-group
      v-if="tipo_documento == 7 && mostrarTiposDocumento"
      v-model="tipoBoleta"
      row
      @change="seleccionTipoBoleta()"
    >
      <v-radio
        label="Liquido"
        :value="1"
      ></v-radio>
      <v-radio
        label="Bruto"
        :value="2"
      ></v-radio>
    </v-radio-group>
    <v-data-table
      :headers="totalesHeaders"
      :items="cpxTotalesItems"
      hide-default-header
      hide-default-footer
      dense
      class="elevation-1"
    >
      <template v-slot:item.valor="{ item }">
        <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:85px">
          <span>{{ item.valor | currency }}</span> 
        </div>
      </template>
    </v-data-table>
  </div>

</template>
<script src="./CuadroResumen.js"></script>

<style scoped src="./CuadroResumen.css"></style>