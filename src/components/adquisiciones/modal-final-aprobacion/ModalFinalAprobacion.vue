<template>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          Orden de compra aprobada
        </div>
        <v-list-item-subtitle>Ingresa un comentario de tu desicion</v-list-item-subtitle>
        <v-textarea
          v-model="comentario"
          outlined
          name="input-7-4"
        ></v-textarea>
      </v-list-item-content>
    </v-list-item>
  
    <v-card-actions>
      <v-btn
        color="primary"
        @click="redirigir()"
      >
        Terminar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script src="./ModalFinalAprobacion.js"></script>

<style scoped src="./ModalFinalAprobacion.css"></style>