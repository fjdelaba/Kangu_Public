<template>
  <div>

    <v-expansion-panels
      v-model="panel"
      multiple
    >
      <v-expansion-panel>
        <v-expansion-panel-header v-if="disabledPanelMaterial"> {{ cpxTextoPanelPartida }}</v-expansion-panel-header>
        <v-expansion-panel-header v-else> <p class="font-weight-black">{{ cpxTextoPanelPartida }}</p></v-expansion-panel-header>
        <v-expansion-panel-content>
          <drawer-partida ref="refdrawerpartida" :_origen="1" :_seleccion-partida="seleccionPartidaDrawer"></drawer-partida>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel :disabled="disabledPanelMaterial">
        <v-expansion-panel-header> Seleccion de Material</v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- Busqueda de Material
          <v-divider></v-divider> -->
          <v-text-field
            ref="textFieldMaterial"
            v-model="busquedaMaterial"
            autofocus
            label="Ingresa tu busqueda"
            dark
            solo-inverted
            hide-details
            outlined
            dense
            clearable
            clear-icon="mdi-close-circle-outline"
            @click:clear="limpiarMaterial()"
            @input="buscarMaterial()"
          ></v-text-field>
          <v-card-text>
            <v-treeview
              :items="listaMateriales"
              :search="busquedaMaterial"
              :open.sync="open"
              return-object
            >
              <template v-slot:append="{ item }">
                {{ item.nombre }} <v-btn v-if="cpxRefDrawerPartida" x-small @click="agregarMaterial(item)">Agregar</v-btn>
              </template>
            </v-treeview>
          </v-card-text>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>

    <div>
      
    </div>
    <v-divider></v-divider>
    
  </div>
</template>

<script src="./DrawerSeleccionMaterialPartida.js"></script>

<style scoped src="./DrawerSeleccionMaterialPartida.css"></style>