<template>
  <v-card>
    <v-card-title class="text-h5">
      {{ titulo }} {{ vendedor.nombre }}
    </v-card-title>

    <v-card-text>
      {{ texto }}
      <v-divider></v-divider>
      <v-checkbox
        v-if="!aprobada"
        v-model="enviarCorreo"
        :label="cpxTextoEnviarCorreo"
      ></v-checkbox>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        color="green darken-1"
        text
        @click="cerrar()"
      >
        OK
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script src="./DialogFinalDocumento.js"></script>
<style scoped src="./DialogFinalDocumento.css"></style>