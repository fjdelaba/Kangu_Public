<template>

  <v-container>
    <v-row>
      <v-row v-if="mostrarBotones == true" justify="center">
        <v-card>
          <v-col
            v-for="n in 1"
            :key="n"
            class="d-flex child-flex"
            cols="10"
          > 
            <div v-for="item in botones" :key="item" style="min-width: 100px" class=" mr-5 mt-5">
              <v-btn
                color="primary"
                fab
                x-large
                dark
                class="ml-2"
                @click="mostrarMantenedor(item)"
              >
                <v-icon>{{ item.icono }}</v-icon>
              </v-btn>
              <p class="mt-2 text-center">{{ item.nombre }}</p>
            </div>
            
          </v-col>
        </v-card>
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

</template>
<style scoped src="./Boton.css"></style>
<script src="./Boton.js"></script>
