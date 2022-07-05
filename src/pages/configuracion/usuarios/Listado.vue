<template>
  <v-container>
    <div v-if="skeleton">
      <v-skeleton-loader
        type="card-avatar, article, actions"
      ></v-skeleton-loader>
    </div>
    <div v-else>
      <div v-if="acceso">
        <h2>
          Listado Usuario
        </h2>
        <tabla-usuarios :usuarios="usuarios"></tabla-usuarios>
      </div>
      <div v-else>
        No tienes permisos para ver este modulo
      </div>
    </div>
  </v-container>
</template>
<script src="./Listado/Listado.js"></script>