<template>

  <v-container>  
    <h2>
      Listado Mantenedores
    </h2>
   
    <boton-mantenedor
      ref="botonMantenedor"
      :botones="listaMantenedores"
      @cargarMantenedor="cargarMantenedor"
    ></boton-mantenedor>
    <tabla-mantenedor
      v-if="cpxMostrarMantenedor"
      ref="tablaMantenedor"
      :id-mantenedor="idMantenedor"
      :lista="listaMantenedor.length > 0 && listaMantenedor"
    ></tabla-mantenedor></v-container>
</template>

<style src="./Listado/Listado.css"></style>
<script src="./Listado/Listado.js"></script>
