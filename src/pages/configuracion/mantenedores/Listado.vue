<template>
  <div>
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
    ></tabla-mantenedor>
  </div>
</template>

<style src="./Listado/Listado.css"></style>
<script src="./Listado/Listado.js"></script>
