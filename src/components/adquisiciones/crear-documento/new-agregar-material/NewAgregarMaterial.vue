<template>
  <v-container fluid style="height: 60vh;">
    <v-row class="px-1">
      <v-btn
        color="primary"
        dark
        small
        class="mb-2"
        @click="changeDrawerMaterial()"
      >
        Agregar Material 
      </v-btn>
    </v-row>
    <v-row>
      <v-layout child-flex>
        <tabla-agregar-material :lista="lista" :cabecera="cabecera" :_agregar-material="agregarMaterial"></tabla-agregar-material>
        
      </v-layout>
    </v-row>
    <v-row>
      <v-col align-self="end" cols="4">
        <cuadro-resumen :materiales="lista" :oc="{}" :tipo_documento="tipo_documento" :mostrar-tipos-documento="true"></cuadro-resumen>
      </v-col>
    </v-row>
    <v-navigation-drawer
      v-model="drawerMaterial"
      absolute
      temporary
      right
      width="500"
    >
      <drawer-seleccion-material-partida></drawer-seleccion-material-partida>
    </v-navigation-drawer>
  </v-container>
</template>

<script src="./NewAgregarMaterial.js"></script>

<style scoped src="./NewAgregarMaterial.css"></style>