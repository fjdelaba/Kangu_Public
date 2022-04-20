<template>
  <div>
    <h2>Listado Mantenedores</h2>
    <boton-mantenedor
      ref="botonMantenedor"
      :botones="listaMantenedores"
      @cargarMantenedor="cargarMantenedor"
    ></boton-mantenedor>
    <tabla-mantenedor
      ref="tablaMantenedor"
      :lista="listaMantenedor"
    ></tabla-mantenedor>
  </div>
</template>

<style src="./Listado/Listado.css"></style>
<script src="./Listado/Listado.js"></script>
