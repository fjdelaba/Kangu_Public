<template>
  <v-container class="white">
    <v-btn
      v-if="detalle == true"
      color="success"
      dark
      large
      @click="editarInformacion()"
    ><v-icon left>mdi-pencil</v-icon>
      EDITAR
    </v-btn>
    <v-btn
      v-if="detalle == false && guardarEdicion == true"
      color="success"
      dark
      large
      @click="guardarEdicion()"
    ><v-icon left>mdi-pencil</v-icon>
      GUARDAR
    </v-btn>

    <v-row class="mb-6" no-gutters>
      <v-col>
        <h3>GENERAL</h3>
        <v-divider></v-divider>
        <v-row>
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
            <p v-if="detalle == true">{{ proyecto.nombre }}</p>
          </v-col>
          <v-col cols="2" class="pb-0">
            <v-text-field
              v-if="detalle == false"
              v-model="infoGeneralProyecto.codigo"
              :rules="proyectoRules"
              label="Código"
              outlined
              dense
            ></v-text-field>
            <h4 v-if="detalle == true">Código</h4>
            <p v-if="detalle == true">{{ proyecto.codigo }}</p>
          </v-col>
          <v-col cols="2" class="pb-0">
            <v-select
              v-if="detalle == false"
              v-model="infoGeneralProyecto.celulas"
              :rules="celulasRules"
              :items="listaCelulas"
              label="Unidades de Trabajo"
              multiple
              persistent-hint
              outlined
              dense
              item-text="nombre"
              item-value="id"
            ></v-select>
            <h4 v-if="detalle == true">Unidades de Trabajo</h4>
            <p v-if="detalle == true">{{ proyecto.prouni.nombre }}</p>
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
            <p v-if="detalle == true">{{ proyecto.valor_contractual }}</p>
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
            <p v-if="detalle == true">{{ proyecto.presupuesto }}</p>
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
            <p v-if="detalle == true">{{ proyecto.pro_est.nombre }}</p>
          </v-col>
        </v-row>
        
        <v-row>
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
            <p v-if="detalle == true">{{ proyecto.mon.nombre }}</p>
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
            <p v-if="detalle == true">{{ proyecto.usu.flas[2].nombre }}</p>
          </v-col>
          <v-col class="pt-0" cols="2">
            <v-text-field
              v-if="detalle == false"
              v-model="infoGeneralProyecto.ocInicial"
              label="OC inicial"
              outlined
              dense
              value="0"
            ></v-text-field>
            <h4 v-if="detalle == true">OC Inicial</h4>
            <p v-if="detalle == true">{{ proyecto.inicio_oc }}</p>
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
            <p v-if="detalle == true">{{ proyecto.descripcion }}</p>
          </v-col>

          <v-col cols="4">
            <v-combobox
              v-if="detalle == false"
              v-model="usuarioAdministrador"
              :rules="proyectoRules"
              :items="listaUsuarios"
              label="Administrador de Obra"
              dense
              outlined
              solo
              :item-text="unirNombreApellido"
            ></v-combobox>
            <h4 v-if="detalle == true">Usuario Administrador</h4>
            <p v-if="detalle == true">
              {{ proyecto.usu.nombre }} {{ proyecto.usu.apellidos }}
            </p>
          </v-col>
          <v-col cols="8">
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
          <v-col cols="">
            <v-img
              :src="url2"
              max-height="1000"
              max-width="2000"
              contain
            ></v-img>
          </v-col> </v-row>
        <v-row>
          <v-col cols="4" >
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="picker"
                  label="Fecha de Inicio"
                  outlined
                  dense
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  @blur="date = parseDate(picker)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="picker"
                no-title
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          
          <v-col cols="4" >
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="picker2"
                  persistent-hint
                  label="Fecha Estimada de Termino"
                  outlined
                  dense
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  @blur="date = calcularFecha()"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="picker2"
                no-title
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="4" class="pb-0">
            <p v-if="!fechaCalculada">La Duración del Proyecto sera de {{ fechaCalulada }} Horas</p>
          </v-col>
        </v-row>
      </v-col></v-row>
    <h3>DIRECCIÓN</h3>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="2">
        <v-select
          v-if="detalle == false"
          v-model="infoDireccionProyecto.region"
          :items="listaRegion"
          label="Region"
          outlined
          dense
          item-text="nombre"
          item-value="id"
          @blur="cargarComunas()"
        ></v-select>
        <h4 v-if="detalle == true">Region</h4>
        <p v-if="detalle == true">{{ proyecto.com.prov.reg.nombre }}</p>
      </v-col>
      <v-col cols="2">
        <v-select
          v-if="detalle == false"
          v-model="infoDireccionProyecto.comuna"
          :items="listaComunas && listaComunas"
          label="Comuna"
          outlined
          dense
          item-text="nombre"
          item-value="id"
        ></v-select>
        <h4 v-if="detalle == true">Comuna</h4>
        <p v-if="detalle == true">{{ proyecto.com.nombre }}</p>
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
    <h3>MANDANTE {{ infoMandanteProyecto.mandante }}</h3>
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
          label="Proveedor"
          hide-no-data
          hint="Puedes buscar por nombre o por rut"
          return-object
          outlined
          dense
        ></v-autocomplete>
        <h4 v-if="detalle == true">Mandante del Proyecto</h4>
        <p v-if="detalle == true">{{ proyecto.ent.razon_social }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn
          v-if="detalle == false"
          color="success"
          dark
          large
          @click="guardarInformacion()"
        ><v-icon>mdi-content-save-all</v-icon>
          GUARDAR
        </v-btn>
      </v-col></v-row>
  </v-container>
</template>
<script src="./InformacionGeneral.js"></script>
