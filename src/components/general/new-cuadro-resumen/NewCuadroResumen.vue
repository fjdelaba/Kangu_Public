<template>
  <div>
    <!-- {{ materiales }} -->
    <!-- {{ oc.moneda.nombre }} -->
    <v-data-table
      v-if="false"
      :headers="totalesHeaders"
      :items="cpxTotalesItems"
      hide-default-header
      hide-default-footer
      dense
      class="elevation-1"
    >
      <template v-if="cpxTotalesItems.length >0" v-slot:item.valor="{ item }">
        <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:85px">
          <span>{{ item.valor | currency }} a</span> 
        </div>
      </template>
    </v-data-table>
    <v-data-table
      :headers="totalesHeaders"
      :items="cpxTotalesTablaResumen"
      hide-default-header
      hide-default-footer
      dense
      class="elevation-1"
    >
      <template v-if="cpxTotalesItems.length >0" v-slot:item.valor="{ item }">
        <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:85px">
          <span v-if="oc.moneda.nombre == 'CLP'">{{ item.valor | currency }}</span> 
          <span v-if="oc.moneda.nombre == 'DOLAR'">{{ item.valor | currency_4 }}</span> 
          <span v-if="oc.moneda.nombre == 'EURO'">{{ item.valor | currency_5 }}</span> 
          <span v-if="oc.moneda.nombre == 'UF'">{{ item.valor | currency_3 }}</span> 
        </div>
      </template>
    </v-data-table>
  </div>

</template>
<script src="./NewCuadroResumen.js"></script>

<style scoped src="./NewCuadroResumen.css"></style>