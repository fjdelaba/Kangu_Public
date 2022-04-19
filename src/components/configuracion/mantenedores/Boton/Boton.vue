<template>
  <div>
    <v-row no-gutters>
       <v-col order="12">
        <div class="div2">
          <v-btn  color="success" fab x-large dark>
            <v-icon>mdi-currency-usd</v-icon>
          </v-btn>
          <p>Moneda</p>
        </div>
     </v-col>
       <v-col order="12">
        <div class="div2">
          <v-btn color="success" fab x-large dark>
            <v-icon>mdi-account-hard-hat</v-icon>
          </v-btn>
          <p>Estado Centro de Gestión</p>
        </div>
          </v-col>
       <v-col order="12">
        <div class="div2">
          <v-btn color="success" fab x-large dark>
            <v-icon>mdi-briefcase-search</v-icon>
          </v-btn>
          <p>Unidades</p>
        </div>
          </v-col>
       <v-col>
        <div class="div2">
          <v-btn color="success" fab x-large dark>
            <v-icon>mdi-cash-multiple</v-icon>
          </v-btn>
          <p>Forma de Pago</p>
        </div>
          </v-col>
       <v-col>
        <div class="div2">
          <v-btn color="success" fab x-large dark>
            <v-icon>mdi-truck-check</v-icon>
          </v-btn>
          <p>Tipo de Despacho</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<style scoped src="./Boton.css"></style>
<script src="./Boton.js"></script>
