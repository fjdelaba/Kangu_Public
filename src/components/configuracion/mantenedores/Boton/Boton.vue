<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-row v-if="mostrarBotones == true" justify="center">
          <v-col
            v-for="n in 1"
            :key="n"
            class="d-flex child-flex"
            cols="6"
          > 
            <div v-for="item in botones" :key="item" style="min-width: 100px">
              <v-btn
                color="primary"
                fab
                x-large
                dark
                @click="mostrarMantenedor(item)"
              >
                <v-icon>{{ item.icono }}</v-icon>
              </v-btn>
              <p>{{ item.nombre }}</p>
            </div>
          </v-col>
        </v-row>
        <v-row v-if="mostrarBotones == false">
          <div >
            <v-btn text color="primary" @click="mostrarBotones = true">
              <v-icon left> mdi-arrow-left </v-icon> Volver al Listado
            </v-btn>
          </div>
        </v-row>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped src="./Boton.css"></style>
<script src="./Boton.js"></script>
