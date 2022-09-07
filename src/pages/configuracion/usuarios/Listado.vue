<template>
  <v-container>
    <div v-if="$store.state.app.permisosUsuario.usuarios">
      <div v-if="skeleton">
        <v-skeleton-loader
          type="card-avatar, article, actions"
        ></v-skeleton-loader>
      </div>
      <div v-if="!skeleton">
        <h2>
          Listado Usuario
        </h2>
        <tabla-usuarios :usuarios="usuarios"></tabla-usuarios>
      </div>
    </div>
    <div v-else>
      <v-card class="text-center w-full error-page pa-4 mx-auto">
        <v-img src="../../../assets/images/permiso.png" max-height="250" contain />
        <div class="display-2 mt-6">OOPS!!!</div>
        <div class="mt-3 mb-6">No tienes permisos para ver está página. Contacta al administrador de Kangusoft si necesitas tener habilitada esta página</div>
        <v-btn to="/" block large color="primary">Notificar al administrador de  Kangusoft</v-btn>
      </v-card>
    </div>
  </v-container>
  <!-- <v-container>
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
  </v-container> -->
</template>
<script src="./Listado/Listado.js"></script>