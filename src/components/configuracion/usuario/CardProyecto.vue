<template>
  <div>
    {{ proyectos }}
    <v-card
      v-for="proyecto in proyectos"
      :key="proyecto.id"
      :loading="loading"
      class=" my-2"
      max-width="200"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-gray"
          height="5"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="140"
        :src="proyecto.imagen"
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
  </div>
</template>
<style scoped src="./CardProyecto.css"></style>
<script src="./CardProyecto.js"></script>
