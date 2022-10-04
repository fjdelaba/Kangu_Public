<template>

  <v-container>
    <v-card>
      <v-dialog v-model="dialogFinal" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">¡Recepcion Completada!</v-card-title>
        </v-card>
      </v-dialog>
      <v-row>
        <cabecera-recepcion
          ref="refdatoscabecera"
          :cabecera="ocCabecera"
        ></cabecera-recepcion>
      </v-row>
      <v-row>
        <tabla-material-recepcion
          ref="refdatostabla"
          :detalle="ocDetalle"
        ></tabla-material-recepcion>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn @click="crearRecepcion()"> Crear Recepción</v-btn>
        </v-col>
      </v-row>
    </v-card>
  
  </v-container>
</template>

<script src="./Crear.js"></script>
