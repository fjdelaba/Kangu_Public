<template>
  <v-row>
    <v-col
      v-for="n in 1"
      :key="n"
      class="d-flex child-flex"
      cols="12"
    >
      <div
        v-for="(item, index) in aprobadores" 
        :key="index"
      >

        <v-card
          max-width="180"
          class="mx-auto"
        >
    
          <v-img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsbc3nYXHYzE9WxzdCE-8pWLeTp4gPEnA0RA2MaykvlsMk01s45Ji-V5IBRZr9y8aVnak&usqp=CAU"
            height="150px"
            dark
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
            <v-avatar v-if="item.avatar != null" size="120" class="ml-4 mt-2">
              <img
                alt="user"
                :src="item.avatar"
              >
            </v-avatar>
            <v-avatar
              v-else
              color="blue"
              size="120"
              class="ml-4 mt-2"
            >
              <span class="white--text text-h5">{{ item.iniciales }}</span>
               
            </v-avatar>
          </v-img>
          <div class="text-center">
            <v-list >
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.nombre }}</v-list-item-title>
               
                  <v-divider class="mx-2 mt-2 mb-2" ></v-divider>
                  <p class="text-body-2 text--primary text-justify">{{ item.comentario ? `${item.comentario}` : "Sin Comentario" }}</p>
                  <v-divider class="mx-2 mt-2 mb-2" ></v-divider>
                  <p class="text-body-2 text--primary text-justify font-italic">{{ item.fecha ? `${item.fecha}` : "" }}</p>
                  
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-action></v-list-item-action>
                <v-list-item-icon>
                  <v-icon v-if="item.aprobado == true" color="primary" x-large class="pl- pb-2">mdi-checkbox-marked-circle</v-icon>
                  <v-icon v-if="item.aprobado == null || item.aprobado == undefined" color="primary" x-large class="pl- pb-2">mdi-pause-circle</v-icon>
                  <v-icon v-if="item.aprobado == false" color="primary" x-large class="pl- pb-2">mdi-close-circle</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </div>
        </v-card>
      </div>
    </v-col> 
    <!--separacion card-->
  </v-row>
</template> 
<script src="./pipeline.js"></script>