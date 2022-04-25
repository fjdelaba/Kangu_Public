<template>
  <div>
    {{ proyectos }}
   <v-row>
     <v-col
      v-for="proyecto in proyectos"
       :key="proyecto.id"
        class="d-flex child-flex"
        cols="2">
      <v-card
      
      :loading="loading"
      class=" my-2"
      max-width="200"
      >
      <v-img
        height="140"
        :src="proyecto.imagen ? proyecto.imagen : cpxImagenAleatoria"
      ></v-img>

      <v-card-title> {{ proyecto.nombre }} </v-card-title> 
      <v-card-text>
        <div> {{ proyecto.descripcion }} </div>
      </v-card-text>

      <v-divider class="mx-2"></v-divider>

      <v-card-subtitle class="font-weight-black"> Roles (Accesos)</v-card-subtitle>

      <v-card-text>
        <v-chip-group
          v-model="selection"
          active-class="deep-gray accent-4 white--text"
          column
        >
          <center>
            <v-chip >
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
              
                    color="green darken-1"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-cash
                  </v-icon>
                </template>
                <span>Comprador</span>
              </v-tooltip></v-chip>

            <v-chip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="blue darken-4"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-check-circle
                  </v-icon>
                </template>
                <span>Aprobador</span>
              </v-tooltip></v-chip>

            <v-chip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="black darken-1"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-account
                  </v-icon>
                </template>
                <span>Solicitante</span>
              </v-tooltip></v-chip>
          </center>

        </v-chip-group>
      </v-card-text>
    </v-card>
    </v-col>
    </v-row>
  </div>
</template>
<style scoped src="./CardProyecto.css"></style>
<script src="./CardProyecto.js"></script>
