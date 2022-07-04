<template>
  <v-container>
    <v-row
      no-gutters
      style="flex-wrap: nowrap;"
    >
      <v-col
        cols="12"
        style="min-width: 850px;"
        class="flex-grow-1 flex-shrink-1 w-full"
      >
        <div>
          <h2>Detalle Aprobar</h2>
          <previsualizacion :materiales="materialesOcSeleccionada" :cabecera="cabecera" observacion="" :aprobacion="aprobacion"></previsualizacion>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script src="./detalle/detalle.js"></script>