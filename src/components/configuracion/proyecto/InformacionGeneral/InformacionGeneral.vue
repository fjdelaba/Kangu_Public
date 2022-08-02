<template>
  <v-container class="white">
    <v-btn
      v-if="detalle == true"
      color="primary"
      dark
      large
      @click="editarInformacion()"
      class="mb-3"
    ><v-icon left>mdi-pencil</v-icon>
      EDITAR
    </v-btn>
   
    <v-row no-gutters>
      <v-col>
        <h3>GENERAL</h3>
        <v-divider></v-divider>

        <v-form
          ref="infoGeneral"
          v-model="valid"
        >
          <v-row >
          
            <v-col cols="2" class="pb-0">
              <v-text-field
                v-if="detalle == false"
                v-model="infoGeneralProyecto.nombre"
                :rules="proyectoRules"
                label="Nombre"
                outlined
                dense
              ></v-text-field>
              <h4 v-if="detalle == true">Nombre</h4>
              <p v-if="detalle == true">{{ proyecto && proyecto.nombre }}</p>
            </v-col>
          
            <v-col cols="2" class="pb-0">
              <v-text-field
                v-if="detalle == false"
                v-model="infoGeneralProyecto.codigo"
                :rules="codigoRules"
                label="Código"
                outlined
                dense
                @blur="validaCodigo1()"
              ></v-text-field>
              <h4 v-if="detalle == true">Código</h4>
              <p v-if="detalle == true">{{ proyecto && proyecto.codigo }}</p>
            </v-col>
            <v-col cols="2" class="pb-0">
              <v-autocomplete
                v-if="detalle == false"
                v-model="infoGeneralProyecto.celulas"
                :rules="celulasRules"
                :items="listaCelulas"
                label="Unidades de Trabajo"
                persistent-hint
                outlined
                dense
                item-text="nombre"
                item-value="id"
              ></v-autocomplete>
              <h4 v-if="detalle == true">Unidades de Trabajo</h4>
              <p v-if="detalle == true">{{ proyecto.prouni && proyecto.prouni.pro_uni.nombre }}</p>
            </v-col>
            <v-col cols="2" class="pb-0">
              <v-text-field
                v-if="detalle == false"
                v-model="infoGeneralProyecto.valorC"
                :rules="proyectoRules"
                label="Valor Contrato"
                outlined
                dense
                type="number"
              ></v-text-field>
              <h4 v-if="detalle == true">Valor Contractual</h4>
              <p v-if="detalle == true">{{ proyecto && proyecto.valor_contractual | currency }}</p>
            </v-col>
            <v-col cols="2" class="pb-0">
              <v-text-field
                v-if="detalle == false"
                v-model="infoGeneralProyecto.presupuestoObra"
                :rules="proyectoRules"
                label="Presupuesto de Obra"
                outlined
                dense
              ></v-text-field>
              <h4 v-if="detalle == true">Presupuesto de Obra</h4>
              <p v-if="detalle == true">{{ proyecto && proyecto.presupuesto | currency }}</p>
            </v-col>
            <v-col cols="2" class="pb-0">
              <v-autocomplete
                v-if="detalle == false"
                v-model="infoGeneralProyecto.estado"
                :items="listaEstados"
                label="Estado"
                outlined
                dense
                item-text="nombre"
                item-value="id"
                value="1"
              ></v-autocomplete>
              <h4 v-if="detalle == true">Estado</h4>
              <p v-if="detalle == true">{{ proyecto.pro_est && proyecto.pro_est.nombre }}</p>
            </v-col>
          </v-row>
          <v-row class="filaContenidoStep3Ste">
            <v-col cols="2" class="pt-0">
              <v-autocomplete
                v-if="detalle == false"
                v-model="infoGeneralProyecto.monedaGeneral"
                :rules="proyectoRules"
                :items="listaMonedas"
                label="Moneda"
                dense
                outlined
                item-text="nombre"
                item-value="id"
              ></v-autocomplete>
              <h4 v-if="detalle == true">Moneda</h4>
              <p v-if="detalle == true">{{ proyecto.mon && proyecto.mon.nombre }}</p>
            </v-col>
            <v-col class="pt-0" cols="2">
              <v-select
                v-if="detalle == false"
                v-model="infoGeneralProyecto.flag"
                :items="listaFlags"
                label="Etiquetas"
                multiple
                persistent-hint
                outlined
                dense
                item-text="nombre"
                item-value="id"
              ></v-select>
              <h4 v-if="detalle == true">Etiquetas</h4>
              <p v-if="detalle == true">{{ proyecto.fla && proyecto.fla.fla.nombre ? proyecto.fla.fla.nombre : "Sin Etiqueta" }}</p>
            </v-col>
            <v-col class="pt-0" cols="2">
              <v-text-field
                v-if="detalle == false"
                v-model="infoGeneralProyecto.ocInicial"
                label="OC inicial"
                outlined
                dense
              ></v-text-field>
              <h4 v-if="detalle == true">OC Inicial</h4>
              <p v-if="detalle == true">{{ proyecto && proyecto.inicio_oc }}</p>
            </v-col>
            <v-col class="pt-0" cols="6">
              <v-textarea
                v-if="detalle == false"
                v-model="infoGeneralProyecto.descripcion"
                label="Descripción"
                auto-grow
                outlined
                rows="1"
                row-height="15"
                dense
              ></v-textarea>
              <h4 v-if="detalle == true">Descripción</h4>
              <p v-if="detalle == true">{{ proyecto && proyecto.descripcion ? proyecto.descripcion : "Sin Descripción" }}</p>
            </v-col>
          </v-row>
        </v-form>
        <v-row>
          <v-col v-if="detalle == false" cols="4" class="pb-0 pt-0">
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :prepend-icon="false"
                  append-icon="event"
                  :value="computedDateFormattedMomentjs"
                  clearable
                  label="Fecha de Inicio"
                  readonly
                  dense
                  outlined
                  v-bind="attrs"
                  v-on="on"
                  @click:clear="date = null"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                :first-day-of-week="1"
                :weekday-format="getDay"
                @change="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>   
          <v-col v-if="detalle == false" cols="4" class="pb-0 pt-0">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :prepend-icon="false"
                  append-icon="event"
                  :value="computedDateFormattedMomentjs2"
                  clearable
                  label="Fecha Estimada de Termino"
                  readonly
                  dense
                  :rules="[cpxValidaFecha, fechasRules]"
                  outlined
                  v-bind="attrs"
                  v-on="on"
                  @click:clear="date2 = null"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date2"
               
                :first-day-of-week="1"
                :weekday-format="getDay"
                @change="menu2 = false"
              ></v-date-picker>
            </v-menu> 
          </v-col>
          <v-col v-if="detalle == false" cols="4" class="pb-0 pt-0">
            <p v-if="computedDateFormattedMomentjs2 != ''">La Duracion del Proyecto sera de :{{ cpxCalcularFecha }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="pt-0">
            <v-combobox
              v-if="detalle == false"
              v-model="usuarioAdministrador"
              :rules="proyectoRules"
              :items="listaUsuarios"
              label="Administrador de Obra"
              dense
              outlined
              :item-text="unirNombreApellido"
            ></v-combobox>
            <h4 v-if="detalle == true">Usuario Administrador</h4>
            <p v-if="detalle == true">
              {{ proyecto.usu && proyecto.usu.nombre }}  {{ proyecto.usu && proyecto.usu.apellidos }}
            </p>
          </v-col>
          <v-col cols="4" class="pt-0">
            <v-file-input
              v-if="detalle == false"
              v-model="usuario.firma"
              label="Imagen"
              outlined
              dense
              :prepend-icon="false"
              append-icon="mdi-camera"
              @change="previewFirma"
              @click:clear="eliminarFirma"
            ></v-file-input>
            <h4 v-if="detalle == true">Imagen</h4>
          </v-col>
          <v-row v-if="usuario.firma" justify="center" ><v-img
            :src="url2"
            max-height="123"
            max-width="178"
            contain
          ></v-img></v-row>
        </v-row>  
      </v-col></v-row>
    <h3>DIRECCIÓN</h3>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="2">
        <v-autocomplete
          v-if="detalle == false"
          v-model="infoDireccionProyecto.region"
          :items="listaRegion"
          label="Region"
          outlined
          dense
          item-text="nombre"
          item-value="id"
          @blur="cargarComunas()"
        ></v-autocomplete>
        <h4 v-if="detalle == true">Region</h4>
        <p v-if="detalle == true">{{ proyecto.com && proyecto.com.prov.reg.nombre }}</p>
      </v-col>
      <v-col cols="2">
        <v-autocomplete
          v-if="detalle == false"
          v-model="infoDireccionProyecto.comuna"
          :items="listaComunas && listaComunas"
          label="Comuna"
          outlined
          dense
          item-text="nombre"
          item-value="id"
        ></v-autocomplete>
        <h4 v-if="detalle == true">Comuna</h4>
        <p v-if="detalle == true">{{ proyecto.com && proyecto.com.nombre }}</p>
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-if="detalle == false"
          v-model="infoDireccionProyecto.direccion"
          label="Dirección"
          outlined
          dense
        ></v-text-field>
        <h4 v-if="detalle == true">Dirección</h4>
        <p v-if="detalle == true">{{ proyecto.direccion }}</p>
      </v-col>
    </v-row>
    <h3>MANDANTE</h3>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="4">
        <v-autocomplete
          v-if="detalle == false"
          v-model="infoMandanteProyecto.mandante"
          :items="listaMandante"
          :loading="isLoading"
          :search-input.sync="search"
          item-text="razon_social"
          item-value="id"
          label="Mandante"
          :hide-no-data="!mostrarNoData"
          hint="Puedes buscar por nombre o por rut"
          outlined
          dense
          @focusout="limpiarAutocompleate()"
        >
        
          <template v-slot:item="{ item }">
            <v-list-item-content>
              <v-list-item-title v-text="`${item.razon_social}`"></v-list-item-title>
              <!-- <v-list-item-subtitle v-text="`codigo: ${item.codigo}`"></v-list-item-subtitle>  -->
            </v-list-item-content>
          </template> 
          <template v-slot:no-data >
              
            <v-btn
              class="ma-2"
              outlined
              color="indigo"
              @click="mostrarDialog()"
            >
              No existe el proveedor, crealo acá
            </v-btn>
                
          </template>
        </v-autocomplete>
        <h4 v-if="detalle == true">Mandante del Proyecto</h4>
        <p v-if="detalle == true">{{ proyecto.ent && proyecto.ent.razon_social }}</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog
        v-model="mostrarDialogCrearEntidad"
        persistent
        max-width="600px"
      >
        <modal-entidad :cerrar-dialog="cerrarDialog"></modal-entidad>
      </v-dialog>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn
          v-if="detalle == false"
          color="primary"
          dark
          large
          :loading="loadingInfoGeneral"
          :disabled="loadingInfoGeneral"
          @click="guardarInformacion()"
        ><v-icon>mdi-content-save-all</v-icon>
          GUARDAR
        </v-btn>
        <v-btn
          v-if="detalle == false && guardarEdicion == true"
          color="warning"
          dark
          large
          @click="cancelarEdicion()"
        ><v-icon left>mdi-cancel</v-icon>
          CANCELAR
        </v-btn>

      </v-col></v-row>
  </v-container>
</template>
<script src="./InformacionGeneral.js"></script>
