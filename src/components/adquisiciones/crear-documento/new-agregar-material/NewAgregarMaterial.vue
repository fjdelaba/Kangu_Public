<template>
  <v-container fluid><!-- style="height: 60vh;" -->
    <v-row class="px-1">
      <v-btn
        color="primary"
        dark
        small
        class="mb-2"
        @click="changeDrawerMaterial()"
      >
        Agregar Material 
      </v-btn>
    </v-row>
    <v-row>
      <!-- {{ lista }} -->
      <v-layout child-flex>
        
        <tabla-agregar-material :_lista="lista"></tabla-agregar-material>
        
      </v-layout>
    </v-row>
    <v-row justify="end" height="100">
              <v-col lg="5" md="5" class="py-3 py-3 pr- pl-5">
        <v-textarea
          v-model="comentarioDocumento"
          outlined
          label="Comentarios al proveedor"
          placeholder="Detalla algun articulo o deja claro algun compromiso"
          rows="3"
        ></v-textarea></v-col>
        <v-col lg="2" md="5" class="py-3 py-3 pr- pl-5">
        <v-file-input
          v-model="files"
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
        </v-file-input></v-col>
        <v-col lg="5" md="5" class="py-3 py-3 pr-5 pl-10">
        <!-- <cuadro-resumen :materiales="lista" :oc="{}" :tipo_documento="tipo_documento" :mostrar-tipos-documento="true"></cuadro-resumen> -->
        <new-cuadro-resumen ref="refnewcuadroresumen" :materiales="lista" :tipo_documento="tipo_documento" :mostrar-tipos-documento="true"></new-cuadro-resumen>
      </v-col>
    </v-row>
    <v-navigation-drawer
      v-model="drawerMaterial"
      absolute
      temporary
      right
      width="500"
    >
      <drawer-seleccion-material-partida ref="refdrawerseleccionmaterialpartida" :_agregarMaterial="agregarMaterial" :_mostrar_drawer_partida="mostrarDetallePartida"></drawer-seleccion-material-partida>
    </v-navigation-drawer>
  </v-container>
</template>

<script src="./NewAgregarMaterial.js"></script>

<style scoped src="./NewAgregarMaterial.css"></style>