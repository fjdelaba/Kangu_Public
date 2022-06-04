<template>
  <div>
    <v-tabs
      v-model="tab"
      grow
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#documento">
        Documento
      </v-tab>
      <v-card-text>
        <v-row >
          <v-col
            cols="12"
          >
            <v-text-field 
              v-model="usuario.rut"
              dense
              hint="Por Ejemplo, 19728579-6"
              outlined
              label="Rut"
              required
              class="ma-0 pa-0"
              :rules="usuario.rutRules"
              @input="validarFomatoRut()"
            ></v-text-field>
            <v-text-field
              v-model="usuario.nombres"
              hint="Por Ejemplo, Felipe."
              outlined
              dense
              label="Nombres"
              required
              :rules="usuario.nombresRules"
            ></v-text-field>
            <v-text-field
              v-model="usuario.apellidos"
              hint="Por Ejemplo, De la Barra."
              dense
              outlined
              label="Apellidos"
              required
              :rules="usuario.apellidosRules"
            ></v-text-field>
            <v-text-field
              v-model="usuario.email"
              hint="Por Ejemplo, FelipedelaBarra@gmail.com"
              dense
              outlined
              label="Email"
              required
              :rules="usuario.emailRules"
            ></v-text-field>
            <v-text-field
              v-model="usuario.cargo"
              hint="Por Ejemplo, Supervisor,"
              dense
              outlined
              label="Cargo"
              :rules="usuario.cargoRules"
            ></v-text-field>
            <v-select
              v-model="usuario.perfil"
              dense
              outlined
              :items="items"
              label="Perfil"
              data-vv-name="select"
              required
              :rules="[v => !!v || 'Se requiere seleccionar un perfil']"
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
          ><v-file-input
             v-model="usuario.imagen"
             prepend-icon="mdi-camera"
             label="Ingrese Imagen de Perfil" 
             @click:clear="eliminarImagen"
             @change="previewImagen"
           >
           </v-file-input>
            <v-row v-if="usuario.imagen" justify="center" > <v-avatar size="120"> <v-img
              :src="url"
              min-width="auto"
              min-height="auto"
              rounded
            ></v-img>
            </v-avatar></v-row>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
          ><v-file-input 
             v-model="usuario.firma"
             label="Ingrese Firma"
             @click:clear="eliminarFirma"
             @change="previewFirma"
           >
           </v-file-input>
            <v-row v-if="usuario.firma" justify="center" ><v-img
              :src="url2"
              max-height="123"
              max-width="178"
              contain
            ></v-img></v-row>
          </v-col></v-row>
        <small>*Rellene los campos requeridos</small>
        <v-card-actions>
          <v-btn text @click="reset()">Cerrar</v-btn>
          <v-btn
            color="primary"
            text
            :disabled="!valid"
            @click="crearUsuario()"
          >Crear</v-btn>
        </v-card-actions>
      </v-card-text>

      <v-tab href="">
        Permisos
      </v-tab>

    </v-tabs>

    <!-- <v-tabs
      v-model="tab"
      background-color="transparent"
      grow
    >
      <v-tab>
        Documento
      </v-tab>
      <v-tab>
        Accesorios
      </v-tab>
    </v-tabs> -->

    <v-tabs-items v-model="tab">
      <v-tab-item
        value="documento"
      >
        <v-card flat>
          <v-sheet
            class="p-2"
            color="lighten-3"
          >
            <v-sheet
              :elevation="2"
              height="100%"
              width="100%"
              class="pb-3"
            >
              <v-list-item style="padding-left: 0px">
                <v-list-item-content>
                  <v-list-item-title class="text-h5">
                    Orden de Compra 45 mat
                  </v-list-item-title>
                  <v-list-item-subtitle class="caption">Fecha: asdsda</v-list-item-subtitle>
                  <v-list-item-subtitle class="caption">Contacto DLB: asdsda</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  width="90px"
                >

                  <v-img :src="logo"></v-img></v-list-item-avatar>
              </v-list-item>

              <v-row no-gutters>
                <v-col cols="12" lg="6"><span class="caption">Proveedor: {{ cabecera.proveedor.razon_social }}</span></v-col>
                <v-col cols="12" lg="6"><span class="caption">Nombre Documento: asdsadsada</span></v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" lg="6"><span class="caption">Rut: {{ cabecera.proveedor.rut }}</span></v-col>
                <v-col cols="12" lg="6"><span class="caption">Obra: {{ cabecera.proyecto.nombre }}</span></v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" lg="6"><span class="caption">Direccion: {{ cabecera.proyecto.direccion }}</span></v-col>
                <v-col cols="12" lg="6"><span class="caption">Moneda: {{ cabecera.moneda.nombre }}</span></v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" lg="6"><span class="caption">Contacto: {{ cabecera.contacto.nombre }}</span></v-col>
                <v-col cols="12" lg="6"><span class="caption">Despacho: {{ cabecera.tipoDespacho.nombre }}</span></v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" lg="6"><span class="caption">Email: {{ cabecera.contacto.email }}</span></v-col>
                <v-col cols="12" lg="6"><span class="caption">Pago: {{ cabecera.formaPago.nombre }}</span></v-col>
              </v-row>
            </v-sheet>
            <v-data-table
              :headers="headers"
              :items="materiales"
              :items-per-page="5"
              :hide-default-footer="true"
              dense
              class="elevation-1"
            >
              <template v-slot:item.nombre="{ item }">
                <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:400px">
                  <!-- <span> <span></span>{{ item.name }} <br> <em>{{ item.observacion }}</em> </span>  -->
                  <span> <span style="font-size: 12px">{{ item.nombre }} - {{ item.unidad }} </span></span>
                </div>
              </template>
              <template v-slot:item.cantidad="{ item }">
                <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:20px">
                  <!-- <span> <span></span>{{ item.name }} <br> <em>{{ item.observacion }}</em> </span>  -->
                  <span> <span style="font-size: 12px">{{ item.cantidad }} </span></span>
                </div>
              </template>
              <template v-slot:item.precio_unitario="{ item }">
                <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:20px">
                  <!-- <span> <span></span>{{ item.name }} <br> <em>{{ item.observacion }}</em> </span>  -->
                  <span style="font-size: 12px">{{ item.precio_unitario }} </span>
                </div>
              </template>
              <template v-slot:item.total="{ item }">
                <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:20px">
                  <!-- <span> <span></span>{{ item.name }} <br> <em>{{ item.observacion }}</em> </span>  -->
                  <span style="font-size: 12px">{{ item.total }} </span>
                </div>
              </template></v-data-table>
            <v-row justify="end" height="100">
              <v-col lg="8" md="6" class="py-3">
                <!-- {{ cpxTotalesItems }} -->
                <!-- <v-card
            height="100%"
            elevation="2"
          >{{ observacion }}</v-card> -->
                <v-textarea
                  outlined
                  label="Comentario al proveedor"
                  :value="observacion"
                  :readonly="true"
                ></v-textarea>
              </v-col>
              <v-col lg="4" md="6" class="py-0 py-3 pr-2">
                <!-- {{ cpxTotalesItems }} -->
                <cuadro-resumen :materiales="materiales"></cuadro-resumen>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card>
      </v-tab-item>
      <v-tab-item
        value="flujo"
        class="mb-6 pb-6"
      >
        <pipeline class="mt-5"></pipeline>
        <v-textarea
          v-model="comentarioAprobadores"
          outlined
          label="Comentario a los aprobadores"
        ></v-textarea>
        <!-- <e-charts
          ref="pie"
          style="width: 100%; top: -60px "
          autoresize
          :options="pie"
          auto-resize
        /> -->
      </v-tab-item>
    </v-tabs-items>

  </div>
</template>

<script src="./Previsualizacion.js"></script>

<style scoped src="./Previsualizacion.css"></style>