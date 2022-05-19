<template>
  <v-card min-width="1000" min-height="500" >
    <v-row>
      <v-col cols="12" ld="6" md="6" class="py-0">
        <v-btn
          color="primary"
          dark
          small
          class="mb-2"
          @click="abrirDialogMaterial()"
        >
          Agregar Material
        </v-btn>
      </v-col>
      <v-col cols="12" ld="6" md="6" class="py-0 text-right">
        <v-btn
          color="primary"
          dark
          small
          class="mb-2 mx-2"
          @click="grabarMateriales()"
        >
          Grabar Cambios
        </v-btn>
        <v-btn
          color="primary"
          dark
          small
          class="mb-2"
          @click="editarMateriales()"
        >
          Edicion General
        </v-btn>
      </v-col>
    </v-row>
    <!-- {{ materiales }} -->
    <v-data-table
      :headers="headers"
      :items="materiales"
      sort-by="calories"
      class="elevation-1"
      :hide-default-footer="true"
    >
      <template v-slot:item.nombre="{ item }">
        <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:400px">
          <!-- <span> <span></span>{{ item.name }} <br> <em>{{ item.observacion }}</em> </span>  -->
          <span> <span style="font-size: 16px">{{ item.nombre }} - {{ item.unidad }} </span> <br> <span style="font-size: 10px"> <em>{{ item.observacion }}</em> </span></span> 
        </div>
      </template>
      <template v-slot:item.par_fk="{ item }">
        <div v-if="item.editable">
          <v-combobox
            v-model="item.par"
            :items="listaPartidas"
            label="Selecciona la partida"
            v-bind="attrs"
            item-text="nombre"
            item-value="id"
            outlined
            dense
            :return-object="true"
          >
            <template #item="data">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-layout wrap v-bind="attrs" v-on="on">
                    <v-list-item-content>
                      <v-list-item-title>{{ data.item.nombre }}</v-list-item-title>
                    </v-list-item-content>
                  </v-layout>
                </template>
                <span>{{ `${data.item.path}` }}</span>
              </v-tooltip>
            </template>
          </v-combobox>
        </div>
        <div v-else>
          <span>{{ item.par.nombre }}</span> 
        </div>
        
      </template>
      <template v-slot:item.cantidad="{ item }">
        <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:70px">
          <div v-if="item.editable">
            <v-text-field
              v-model="item.cantidad"
              outlined
              dense
              @input="calcularTotalMaterial(item)"
            ></v-text-field>
          </div>
          <div v-else>
            <span>{{ item.cantidad }}</span> 
          </div>
          <!-- <span> <span></span>{{ item.name }} <br> <em>{{ item.observacion }}</em> </span>  -->
          <!-- <span> <span style="font-size: 16px">{{ item.nombre }}</span> <br> <span style="font-size: 10px"> <em>{{ item.observacion }}</em> </span></span>  -->
        </div>
      </template>
      <template v-slot:item.precio_unitario="{ item }">
        <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:70px">
          <div v-if="item.editable">
            <v-text-field
              v-model="item.precio_unitario"
              outlined
              dense
              @input="calcularTotalMaterial(item)"
            ></v-text-field>
          </div>
          <div v-else>
            <span>{{ item.precio_unitario }}</span> 
          </div>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="abrirDialogMaterial(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="eliminarMaterial(item)"
        >
          mdi-delete {{ item }}
        </v-icon>
      </template>
      <template v-slot:no-data>
        <!-- <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn> -->
        Sin datos
      </template>
    </v-data-table>
    <v-row>
      <v-col lg="6" md="4" class="py-0">
        <v-chip
          class="ma-2"
          color="indigo"
          text-color="white"
        >
          <v-avatar left>
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
          Mike
        </v-chip>
      </v-col>
      <v-col lg="6" md="4" class="py-0">
        <v-chip
          class="ma-2"
          color="indigo"
          text-color="white"
        >
          <v-avatar left>
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
          Mike
        </v-chip>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialogMaterial"
      persistent
      max-width="600px"
    >
      <modal-agregar-material v-if="dialogMaterial" :material-edicion="materialEdicion" :cerrar-dialog-material_="cerrarDialogMaterial"></modal-agregar-material></v-dialog>
  </v-card>
</template>

<script src="./AgregarMaterial.js"></script>
<style scoped src="./AgregarMaterial.css"></style>