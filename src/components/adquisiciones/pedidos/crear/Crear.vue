<template>
  <v-container>
    <breadcrum-pedido :breadcrumbs="breadcrumbs"></breadcrum-pedido>
  
    <v-dialog v-model="mostrar" persistent max-width="500px">
      <dialog-final :titulo="tituloModal" :texto="textoModal" :correo="correoModal" :cerrar-dialog="cerrarDialog" ></dialog-final>
    </v-dialog>
  
    <!-- <v-dialog v-model="dialogDelete" persistent max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Antes de Comenzar</v-card-title>
        <v-card-text>
       
          <v-col cols="12" lg="12">  <p class="text-h6 text--primary">Ingresa Nombre del Pedido: </p></v-col>
         
          <v-col cols="12" lg="12">  <p class="text-h6 text--primary">Selecciona el Proyecto: </p></v-col>
          <v-autocomplete
            v-model="proyectoPedido"
            :items="listaProyectos"
            label="Proyecto del Pedido"
            persistent-hint
            outlined
            dense
            item-text="nombre"
            item-value="id"
          ></v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="cancelarPedido()">Cancelar</v-btn>
          <v-btn color="blue" text @click="cargarAprobadorPedido()">Siguiente</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
 
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
          <cabecera-pedidos ref="refdatoscabecera" :usu_id="usu_id" :_devuelve-pro-fk="cargarPartidas" ></cabecera-pedidos>
        
        </v-sheet>
        <v-row>
          <v-col cols="12">
            <tabla-pedidos ref="tablapedido" :pro_fk="idProyecto" ></tabla-pedidos>
          </v-col>

        </v-row>
        <v-row>
          <v-col cols="6">
            <comentario-comprador></comentario-comprador>
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
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn @click="crearPedido()">Crear Pedido</v-btn>
          </v-col></v-row>
        <v-row>
        </v-row></v-sheet></v-card>
 
  </v-container>
</template>
 
<style scoped>
.text-h4 {
color: #0096C7;
}
</style>

<script src="./Crear.js"></script>

<style scoped src="./Crear.css"></style>