<template>
  <v-container>
    <div v-if="skeleton">
      <v-skeleton-loader
        type="card-avatar, article, actions"
      ></v-skeleton-loader>
    </div>
    <div v-if="$store.state.app.permisosUsuario.oc == false && skeleton == false">
      <v-card class="text-center w-full error-page pa-4 mx-auto">
        <v-img src="../../../../assets/images/permiso.png" max-height="250" contain />
        <div class="display-2 mt-6">OOPS!!!</div>
        <div class="mt-3 mb-6">No tienes permisos para ver está página. Contacta al administrador de Kangusoft si necesitas tener habilitada esta página</div>
        <v-btn to="/" block large color="primary">Notificar al administrador de  Kangusoft</v-btn>
      </v-card>
    </div>
    <v-row
      v-if="!skeleton && $store.state.app.permisosUsuario.oc == true"
      no-gutters
      style="flex-wrap: nowrap;"
    >
      <v-col
        cols="12"
        style="min-width: 850px;"
        class="flex-grow-1 flex-shrink-1 w-full"
      >
        <div>
          <h2>Detalle Aprobar </h2>
          <previsualizacion
            :materiales="materialesOcSeleccionada"
            :cabecera="cabecera"
            observacion=""
            :origen="2"
            :aprobadores="aprobadores"
            :tipo_documento="tipo_documento"
          ></previsualizacion>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script src="./detalle/detalle.js"></script>