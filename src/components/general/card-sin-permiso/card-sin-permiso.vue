<template>
  <v-container>
    <v-card class="text-center w-full error-page pa-4 mx-auto">
      <v-img src="../../../assets/images/permiso.png" max-height="250" contain />
      <div class="display-2 mt-6">OOPS!!!</div>
      <div class="mt-3 mb-6">No tienes permisos para ver está página. Contacta al administrador de Kangusoft si necesitas tener habilitada esta página</div>
      <v-btn to="/" block large color="primary">Notificar al administrador de  Kangusoft</v-btn>
    </v-card>
  </v-container>
</template>