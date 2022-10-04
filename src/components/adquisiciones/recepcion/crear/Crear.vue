<template>

  <v-container>
    <v-card>
      <v-dialog v-model="mostrar" persistent max-width="500px">
        <dialog-final
          :titulo="tituloModal"
          :texto="textoModal"
          :cerrar-dialog="cerrarDialog"
          :origen="3"
          :aprobada="true"
        ></dialog-final>
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
