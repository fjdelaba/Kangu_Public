<template>
  <v-container>
    <div>
      <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
    </div>
    <div v-if="skeleton">
      <v-skeleton-loader
        type="card-avatar, article, actions"
      ></v-skeleton-loader>
    </div>
    <div v-if="!skeleton">
      <h2>
        Detalle Pedido
      </h2>
     
      <v-card >
        <v-sheet
          class=" mt-3"
          color="lighten-3"
        >
          <v-sheet
            :elevation="2"
            height="100%"
            width="100%"
            class="pb-3 pt-3"
          >    
            <cabecera-pedidos ref="refdatoscabecera" :cabecera="cabeceraPed" :vista="'detalle'" ></cabecera-pedidos>
        
          </v-sheet>
          <v-row>
            <v-col cols="12">
             
            </v-col>

          </v-row>
          <v-row>  
            <v-col cols="6">
              <comentario-comprador ref="refcomentario" :vista="'detalle'" :comentario="comentarioPed"></comentario-comprador>
            </v-col>
            <v-col cols="4">
              <h2>ADJUNTAR ARCHIVO</h2>
              <v-file-input
                v-model="adjuntos"
                placeholder="¿Que archivos deseas agregar?"
                label="Seleccion de archivos"
                multiple
                prepend-icon="mdi-paperclip"
                :clearable="false"
                @change="chang()"
                @click="clic()"
              >
                <template v-slot:selection="{ text, file }">
                  <v-chip
                    small
                    label
                    color="primary"
                    close
                    @click:close="eliminarAdjunto(file)"
                  >
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
            </v-col>
          </v-row></v-sheet></v-card>
    </div>
  
  </v-container>
</template>
<script src="./Detalle/Detalle.js"></script>