<template>

  <v-container>
    <div v-if="$store.state.app.permisosUsuario.mantenedores == true">
      <h2>
        Listado Mantenedores
      </h2>
      <skeleton v-if="skeleton"> 
      </skeleton>
      <boton-mantenedor
        ref="botonMantenedor"
        :botones="listaMantenedores"
        @cargarMantenedor="cargarMantenedor"
      ></boton-mantenedor>
      <tabla-mantenedor
   
        ref="tablaMantenedor"
        :id-mantenedor="idMantenedor"
        :lista="listaMantenedor"
      ></tabla-mantenedor>
    </div>
    <div v-else>
      <skeleton v-if="skeleton"> 
      </skeleton>
      <v-card v-if="!skeleton && $store.state.app.permisosUsuario.mantenedores == false " class="text-center w-full error-page pa-4 mx-auto">
        <v-img src="../../../assets/images/permiso.png" max-height="250" contain />
        <div class="display-2 mt-6">OOPS!!!</div>
        <div class="mt-3 mb-6">No tienes permisos para ver está página. Contacta al administrador de Kangusoft si necesitas tener habilitada esta página</div>
        <v-btn to="/" block large color="primary">Notificar al administrador de  Kangusoft</v-btn>
      </v-card>
    </div>
  </v-container>
</template>

<style src="./Listado/Listado.css"></style>
<script src="./Listado/Listado.js"></script>
