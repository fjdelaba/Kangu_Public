<template>

  <v-container>
    <h2>
      Detalle Consultas 
    </h2>
    <v-card outlined color="white">
      <v-row>
        <v-col cols="12">
       
          <v-list-item style="padding-left: 24px">
            <v-list-item-content>
              <v-list-item-title class="text-h5">
                <p class="text-h5" > Recepción: {{ recepcion && recepcion.identificacion }}</p>
             
              </v-list-item-title>
            </v-list-item-content>

          </v-list-item>
              
          <v-row no-gutters class="pl-3">
            <v-col cols="12" lg="6"><span class="caption">Fecha de Recepción : {{ getFechaFormat(recepcion.fec_recepcion) }} </span></v-col>
            <v-col cols="12" lg="6"><span class="caption">Proyecto : {{ recepcion.oc && recepcion.oc.pro.nombre }} </span></v-col>
          </v-row>
          <v-row no-gutters class="pl-3">
            <v-col cols="12" lg="6"><span class="caption">Nombre de Proveedor : {{ recepcion.oc && recepcion.oc.ent.razon_social }}</span></v-col>
            <v-col cols="12" lg="6"><span class="caption">Recepcionado por: {{ recepcion.usu && recepcion.usu.nombre }}  {{ recepcion.usu && recepcion.usu.apellidos }}  </span></v-col>
          </v-row>
          <v-row no-gutters class="pl-3">
            <v-col cols="12" lg="6"><span class="caption">RUT de Proveedor : {{ recepcion.oc && recepcion.oc.ent.rut }}  </span></v-col>
            <v-col cols="12" lg="4"><span class="caption">Nº de Documento: {{ recepcion.dte_cab == null? 'Sin Nº de Documento': recepcion.dte_cab && recepcion.dte_cab.folio }}   </span></v-col>
          </v-row>
          <v-row no-gutters class="pl-3">
            <v-col cols="12" lg="6"><span class="caption">Tipo de Referencia:  {{ recepcion.dte_cab == null? 'Sin Referencia': recepcion.dte_cab && recepcion.dte_cab.dte_tip.nombre }}   </span></v-col>
            <v-col cols="12" lg="4"><span class="caption">Orden de Compra: {{ recepcion.oc && recepcion.oc.identificacion }}   </span></v-col>
          </v-row>
          <v-row no-gutters class="pl-3">
            <v-col cols="12" lg="6"><span class="caption"></span></v-col>
          
            <v-col cols="12" lg="2">  <v-menu
              dense
              transition="slide-x-transition"
              bottom
              right
            >

            </v-menu></v-col>
           
          </v-row>

        </v-col>
      </v-row>
      <v-row>
        <v-col> <v-data-table
          :headers="dessertHeaders"
          :items="detalle"
          :hide-default-footer="true"
        >
          <template v-slot:item.oc_det.mat="{ item }">
            <nombre-material :nombre="item.oc_det.mat.nombre" :unidad="item.oc_det.mat.mat_uni.nombre" :observacion="item.observacion" ></nombre-material>
          </template>
           <template v-slot:item.oc_det.cant_ajustada="{ item }">
            <div >{{ item.oc_det.cant_ajustada | currency_2 }}</div>
          </template>
             <template v-slot:item.cantidad="{ item }">
            <div >{{ item.cantidad | currency_2 }}</div>
          </template>
        </v-data-table></v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea
            v-model="recepcion.comentario"
            outlined
            label="Comentario de Recepción"
            counter
            readonly
            maxlength="120"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script src="./Detalle/Detalle.js"></script>