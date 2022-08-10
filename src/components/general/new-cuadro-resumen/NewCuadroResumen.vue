<template>
  <div>
    <!-- {{ materiales }} -->
    <!-- {{ oc.moneda.nombre }} -->
     <v-data-table
      :headers="totalesHeaders"
      :items="cpxTotalesItems"
      hide-default-header
      hide-default-footer
      dense
      v-if="false"
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
          <span>{{ item.valor | currency }}</span> 
        </div>
      </template>
    </v-data-table>
  </div>

</template>
<script src="./NewCuadroResumen.js"></script>

<style scoped src="./NewCuadroResumen.css"></style>