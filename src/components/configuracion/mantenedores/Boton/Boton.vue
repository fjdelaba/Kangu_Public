<template>
  <div>
    <v-container class="md-5">
      <v-row>
        <v-col v-for="n in 1" :key="n" class="d-flex child-flex" cols="4">
          <div v-for="item in botones" :key="item" class="div2">
            <v-btn
              color="success"
              fab
              x-large
              dark
              @click="mostrarMantenedor"
            >
              <v-icon>{{ item.icono }}</v-icon>
            </v-btn>
            <p>{{ item.nombre }}</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped src="./Boton.css"></style>
<script src="./Boton.js"></script>
