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
      <v-dialog v-model="openModal" persistent max-width="500px">
        <v-card>
          <v-card-title class="text-h5">¡ATENCIÓN!</v-card-title>
          <v-card-text>Tienes una o varias lineas que estan recepcionando mas de lo solicitado, porfavor deja un comentario</v-card-text>
          <v-row>
            <v-col>
              <v-textarea
                v-model="comentarioModal"
                outlined
                label="Comentario de Recepción"
                counter
                maxlength="120"
              ></v-textarea>
            </v-col>
          
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="cancelarCrear()">Cancelar</v-btn>
            <v-btn color="blue" text @click="confirmacionCrear()">Siguiente</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
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
      <v-row v-if="!openModal">
        <comentario ref="refcomentario" :vista="'crear'" :_comentario="cargarComentario"></comentario>
      </v-row>
      <v-row v-if="!openModal">
        <v-col cols="12">
          <v-btn @click="crearRecepcion()"> Crear Recepción</v-btn>
        </v-col>
      </v-row>
    </v-card>
  
  </v-container>
</template>

<script src="./Crear.js"></script>
