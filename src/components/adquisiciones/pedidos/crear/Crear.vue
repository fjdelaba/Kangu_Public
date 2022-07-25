<template>
  <v-container>
    <breadcrum-pedido></breadcrum-pedido>
  
    <v-dialog v-model="mostrar" persistent max-width="500px">
      <dialog-final></dialog-final>
    </v-dialog>
  
    <v-dialog v-model="dialogDelete" persistent max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Antes de Comenzar</v-card-title>
        <v-card-text>
       
          <v-col cols="12" lg="12">  <p class="text-h6 text--primary">Ingresa Nombre del Pedido: </p></v-col>
          <v-text-field
            v-model="a"
            label="Nombre del Pedido"
            outlined
       
            dense
            v-bind="attrs"
            v-on="on"
          ></v-text-field>

          <v-col cols="12" lg="12">  <p class="text-h6 text--primary">Selecciona el Proyecto: </p></v-col>
          <v-autocomplete
            v-model="lol"
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
          <v-btn color="red" text @click="dialogDelete = false">Cancelar</v-btn>
          <v-btn color="blue" text @click="dialogDelete = false">Siguiente</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          <cabecera-pedidos></cabecera-pedidos>
        </v-sheet>
        <v-row>
          <v-col cols="12">
            <tabla-pedidos :pro_fk="lol"></tabla-pedidos>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <comentario-comprador></comentario-comprador>
          </v-col></v-row>
        <v-row>
          <v-col cols="12">
            <v-btn @click="mostrar = true">Crear Pedido</v-btn>
           
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