<template>
  <v-card min-width="1000" min-height="500" >
    <!-- {{ lista_detalle }} -->
    <!-- {{ listaPartidas }} -->
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
    <v-alert
      :value="mostartAlertMaterial"
      color="orange"
      dark
      icon="mdi-alert"
      transition="scale-transition"
    >
      Los siguientes materiales no fueron agregados por que existian anteriormente. <v-btn
        color="primary"
        x-small
        @click="mostartAlertMaterial = false"
      >
        Cerrar
      </v-btn>
      <br>
      <ul>
        <li v-for="(item, index) in textoMaterial" :key="index">{{ item }}</li>
      </ul>
    </v-alert>
    <!-- <v-data-table
      :headers="headers"
      :items="materiales"
      item-key="id"
      sort-by="calories"
      hide-default-footer
      class="elevation-1"
      :items-per-page="materiales.length"
      dense
    > -->
    <v-data-table
      :headers="headers"
      :items="lista_detalle"
      item-key="id"
      sort-by="calories"
      hide-default-footer
      class="elevation-1"
      :items-per-page="lista_detalle.length"
      dense
    >
      <template v-slot:item.mat="{ item }">
        <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:400px">
          <!-- <span> <span></span>{{ item.name }} <br> <em>{{ item.observacion }}</em> </span>  -->
          <!-- {{ item.nombre }} -->
          <span> <span style="font-size: 16px"> {{ item.mat.nombre }} - {{ item.mat.mat_uni.nombre }} </span> <br> <span style="font-size: 10px"> <em>{{ item.observacion }}</em> </span></span> 
        </div>
      </template>
      <template v-slot:item.oc_det_pars="{ item, attrs}">
        <div v-if="item.oc_det_pars.length > 1">
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-chip
                class="ma-2"
                color="green"
                text-color="white"
                small
                v-on="on"
              >
                {{ item.oc_det_pars.length }} partidas
              </v-chip>
            </template>
            <v-card
              class="mx-auto"
              max-width="400"
              tile
            >
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title v-for="p in item.partidas" :key="p.id">{{ p.par_fk.nombre }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>  
            </v-card>
          </v-tooltip>
        </div>
        <div v-else>
          <div v-if="item.editable">
            <div v-if="item.oc_det_pars[0].par_fk" >
              <v-combobox
                v-model="item.oc_det_pars[0].par_fk"
                :items="listaPartidas"
                label="Selecciona la partida"
                v-bind="attrs"
                item-text="nombre"
                :item-value="item.id"
                outlined
                dense
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
              <v-combobox
                v-model="item.oc_det_pars[0].par_fk"
                :items="listaPartidas"
                label="Selecciona la partida"
                v-bind="attrs"
                item-text="nombre"
                :item-value="item.id"
                outlined
                dense
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
          </div>
          <div v-else>
            <v-chip
              class="ma-2"
              color="primary"
              text-color="white"
              small
            >
              <!-- {{ item.oc_det_pars[0].par_fk }} -->
              {{ getNombrePartida(item.oc_det_pars[0].par_fk) }}
            </v-chip>
          </div>
        </div>
        <!-- <div v-if="item.editable">
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
        </div> -->
        
      </template>
      <template v-slot:item.cantidad="{ item }">
        <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:70px">
          <div v-if="item.editable">
            <div v-if="item.oc_det_pars.length > 1">
              <span>{{ item.cantidad | currency }}</span> 
            </div>
            <div v-else>
              <v-text-field
                v-model="item.oc_det_pars[0].cantidad"
                outlined
                dense
                @input="calcularTotalMaterial(item)"
              ></v-text-field>
            </div>
          </div>
          <div v-else>
            <span>{{ item.cantidad | currency_2 }}</span> 
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
            <span>{{ item.precio_unitario | currency }}</span> 
          </div>
        </div>
      </template>
      <template v-slot:item.total="{ item }">
        <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:70px">
          <span>{{ item.total | currency }}</span> 
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <div v-if="item.editable">
          <v-icon
            small
            class="mr-2"
            @click="guardarMaterial(item)"
          >
            mdi-content-save
          </v-icon>
          <v-icon
            small
            @click="eliminarMaterial(item)"
          >
            mdi-delete {{ item }}
          </v-icon>
        </div>
        <div v-else>
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
        </div>
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
    <v-row justify="end">
      <v-col lg="8" md="6" class="py-3">
        <!-- {{ cpxTotalesItems }} -->
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
        </v-file-input>
        <v-textarea
          v-model="comentarioDocumento"
          outlined
          label="Comentarios al proveedor"
          placeholder="Detalla algun articulo o deja claro algun compromiso"
          rows="3"
        ></v-textarea>
      </v-col>
      <v-col lg="4" md="6" class="py-0 py-3 pr-2">
        <!-- {{ cpxTotalesItems }} -->
        <!-- <v-data-table
          :headers="totalesHeaders"
          :items="cpxTotalesItems"
          hide-default-header
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:item.valor="{ item }">
            <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:70px">
              <span>{{ item.valor | currency }}</span> 
            </div>
          </template>
        </v-data-table> -->
        <cuadro-resumen :materiales="lista_detalle"></cuadro-resumen>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialogMaterial"
      persistent
      max-width="600px"
    >
      <modal-agregar-material v-if="dialogMaterial" :material-edicion="materialEdicion" :cerrar-dialog-material_="cerrarDialogMaterial" :lista-partidas="JSON.parse(JSON.stringify(listaPartidas))"></modal-agregar-material></v-dialog>
    <v-dialog
      v-model="dialogValidacion"
      persistent
      max-width="550"
    >
      <template>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Aun no puedes avanzar al siguiente paso
        </v-card-title>
        <v-card-text>Para avanzar al siguiente paso debes tener por lo menos un material agregado y no tener lineas en edicion</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialogValidacion = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script src="./AgregarMaterial.js"></script>
<style scoped src="./AgregarMaterial.css"></style>