<template>

  <v-container>
    <v-dialog v-model="dialogDelete" persistent max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Antes de Recepcionar</v-card-title>
        <v-card-text>
          <v-col cols="12" lg="12">  <p class="text-h6 text--primary">Selecciona Tipo de Referencia: </p>
            <v-form ref="form" v-model="valid">
              <v-autocomplete
                v-model="seleccionDocumento"
                :items="listaDocumentos"
                :rules="nameRules"
                label="Tipo de Referencia"
                persistent-hint
                outlined
                dense
                item-text="nombre"
                item-value="id"
                @change="cambioTipo()"
              ></v-autocomplete>
            </v-form>
          </v-col>
          <v-col v-if="seleccionDocumento != 1" cols="12" lg="12">  <p class="text-h6 text--primary">Ingresa Nº de Documento: </p>
            <v-form ref="form2" v-model="valid1">
              <v-text-field
                v-model="numDocumento"
                :rules="nameRules1"
                outlined
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </v-form>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="modalCancelar()">Cancelar</v-btn>
          <v-btn color="blue" text @click="modalSiguiente()">Siguiente</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col><v-card outlined color="transparent">
       
        <v-list-item style="padding-left: 24px">
          <v-list-item-content>
            <v-list-item-title class="text-h5">
              <p class="text-h5" > Orden de Compra: <a @click="detalleOc()">{{ cabecera && cabecera.identificacion }}</a></p>
             
            </v-list-item-title>
          </v-list-item-content>

        </v-list-item>
              
        <v-row no-gutters class="pl-3">
          <v-col cols="12" lg="6"><span class="caption">Fecha de Creación:  {{ getFechaFormat(cabecera.fec_creacion) }} </span></v-col>
          <v-col cols="12" lg="6"><span class="caption">Fecha de Recepción:  {{ date }}</span></v-col>
        </v-row>
        <v-row no-gutters class="pl-3">
          <v-col cols="12" lg="6"><span class="caption">Nombre de Proveedor : {{ cabecera.ent && cabecera.ent.razon_social }}</span></v-col>
          <v-col cols="12" lg="6"><span class="caption">Proyecto :  {{ cabecera.pro && cabecera.pro.nombre }} </span></v-col>
        </v-row>
        <v-row no-gutters class="pl-3">
          <v-col cols="12" lg="6"><span class="caption">RUT de Proveedor :  {{ cabecera.ent && cabecera.ent.rut }}</span></v-col>
          <v-col cols="12" lg="6"><span class="caption">Recepcionado por:   {{ datosUsuario.nombre }} {{ datosUsuario.apellidos }}</span></v-col>
        </v-row>
        <v-row no-gutters class="pl-3">
          <v-col cols="12" lg="6"><span class="caption"></span></v-col>
          <v-col cols="12" lg="6"><span class="caption">Tipo de Documento:   {{ cabeceraSeleccion == 33 ? 'Factura Electrónica' : cabeceraSeleccion == 52 ? 'Guía de Despacho Electrónica' : 'Sin Documento' }} </span></v-col>
        </v-row>
        <v-row no-gutters class="pl-3">
          <v-col cols="12" lg="6"><span class="caption"></span></v-col>
          <v-col cols="12" lg="4"><span class="caption">Nº de Documento:   {{ cabeceraNumero == '' ? 'Sin Nº de Documento' : cabeceraNumero }}</span></v-col>
          <v-col cols="12" lg="2">  <v-menu
            dense
            transition="slide-x-transition"
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="deep-orange"
                color="primary"
                dark
                small
                v-bind="attrs"
                dense
                v-on="on"
                @click="edicionCabecera()"
              >
                Editar
              </v-btn>
            </template>

          </v-menu></v-col>
        </v-row>

      </v-card></v-col>
    </v-row>
    <!-- <v-simple-table>
      <template v-slot:default>
        <thead bgcolor="#DADADA">
          <tr>
            <th class="text-h7 text--primary">
              Información de la Orden de Compra
            </th>
            <th class="text-h7 text--primary ">
              Información de la Recepción
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="">
            <td>
              <v-row no-gutters class="pl-3 mt-1">
                <v-col cols="12" lg="6"><span class="caption">Nº Orden de Compra:  {{ cabecera && cabecera.identificacion }}</span>
                </v-col></v-row>
              <v-row no-gutters class="pl-3">
                <v-col cols="12" lg="6"><span class="caption">Fecha de Creación:  {{ getFechaFormat(cabecera.fec_creacion) }}</span>
                </v-col></v-row>
              <v-row no-gutters class="pl-3">
                <v-col cols="12" lg="10"><span class="caption">Nombre de Proveedor : {{ cabecera && cabecera.ent.razon_social }}</span>
                </v-col></v-row>
              <v-row no-gutters class="pl-3">
                <v-col cols="12" lg="6"><span class="caption">RUT de Proveedor :  {{ cabecera && cabecera.ent.rut }}</span>
                </v-col></v-row>
            </td>
                
            <td>
              <v-row no-gutters class="pl-3">
                <v-col cols="12" lg="6"><span class="caption">Fecha de Recepción:  {{ date }}</span>
                </v-col></v-row>
              <v-row no-gutters class="pl-3">
                <v-col cols="12" lg="8"><span class="caption">Centro de Gestión:  {{ cabecera && cabecera.pro.nombre }}</span>
                </v-col></v-row>
              <v-row no-gutters class="pl-3">
                <v-col cols="12" lg="8"><span class="caption">Recepcionado por:   Bastian Medina </span>
                </v-col></v-row>
              <v-row no-gutters class="pl-3">
                <v-col cols="12" lg="8"><span class="caption">Tipo de Documento:   {{ seleccionDocumento == 33 ? 'Factura Electrónica' : 'Guía de Despacho Electrónica' }} </span>
                </v-col></v-row>
              <v-row no-gutters class="pl-3">
                <v-col cols="12" lg="8"><span class="caption">Nº de Documento:   {{ numDocumento }} </span>
                </v-col></v-row>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table> -->

  </v-container>
</template>

<script src="./cabecera-recepcion.js"></script>
