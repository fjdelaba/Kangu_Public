<template>
  <div class="my-2">
    <div>
      <v-breadcrumbs :items="breadcrumbs" class="pa-0"></v-breadcrumbs>

      <div>
        <v-card
          :loading="loadingDatosGenerales"
          :disabled="loadingDatosGenerales"
        >
          <v-card-text>
            <div class="d-flex flex-column flex-sm-row">
              <div class="flex-grow-1 pt-2 pa-sm-2">
                <v-text-field
                  v-model="proveedor.razon_social"
                  dense
                  label="Razon Social"
                  :readonly="!edicion"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="proveedor.rut"
                  label="Rut"
                  :readonly="!edicion"
                  dense
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="proveedor.giro"
                  dense
                  label="Giro"
                  :readonly="!edicion"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="proveedor.direccion"
                  dense
                  label="Dirección"
                  :readonly="!edicion"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="proveedor.emailContacto"
                  dense
                  label="Email Contacto"
                  :readonly="!edicion"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="proveedor.emailDte"
                  dense
                  label="Email DTE"
                  :readonly="!edicion"
                  outlined
                ></v-text-field>
                <v-row align="center" justify="space-around">
                  <!-- <div v-if="cpxOrigenConfiguracion"> -->
                  <div v-if="edicion" class="mt-2">
                    <v-btn
                      color="primary"
                      :loading="loadingDatosGenerales"
                      :disabled="loadingDatosGenerales"
                      small
                      @click="grabarEdicionUsuario()"
                    >Guardar</v-btn>
                    <v-btn
                      color="primary"
                      small
                      @click="cancelarEdicionProveedor()"
                    >Cancelar</v-btn>
                  </div>
                  <div v-else class="mt-2">
                    <v-btn
                      color="primary"
                      small
                      @click="editarProveedor()"
                    >Editar</v-btn>
                  </div>
                  <div class="mt-2">
                    <v-btn
                      :loading="loading4"
                      :disabled="loading4"
                      :color="proveedor.activo ? 'error' : 'success'"
                      small
                      @click="cambiarEstadoProvedoor()"
                    >
                      Desabilitar Proveedor
                      <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>mdi-cached</v-icon>
                        </span>
                      </template></v-btn>
                  </div>
                  <!-- </div> -->
                </v-row>
              </div>
            </div></v-card-text>
        </v-card>

        <v-expansion-panels v-model="panel" multiple class="mt-3">
          <v-expansion-panel v-model="panel" multiple class="mt-3">
            <v-expansion-panel-header class="title">
              Contactos    </v-expansion-panel-header>
            <v-expansion-panel-content class="body-2">
              <v-btn
                depressed
                color="primary"
                @click="dialogCrearContacto = true"
              > Agregar Contacto</v-btn> 
              <v-row>
                <v-col
                  v-for="item in contactosProveedor"
                  :key="item"
                  class="d-flex child-flex"
                  cols="3"
                >
                  <v-card
                    class="my-2"
                    max-width="290"
                  >
                    <template slot="progress">
                      <v-progress-linear
                        color="deep-gray"
                        height="5"
                        indeterminate
                      ></v-progress-linear>
                    </template>

                    <v-card-title> {{ item.nombre }}</v-card-title>

                    <v-divider class="mx-2"></v-divider>

                    <v-card-text class="font-weight-black">
                      <div>{{ item.email }}</div>
                    </v-card-text>

                    <v-card-text>
                      <v-chip-group
                        active-class="deep-gray accent-4 white--text"
                        column
                      >
                        <center>
                          <v-btn
                            color="primary"
                            small
                            @click="editarContacto(item)"
                          >Editar</v-btn>
                        </center>
                      </v-chip-group>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row justify="center">
                <!--!> DIALOGO PARA EDITAR CONTACTOS <-->
                <v-dialog v-model="dialog" persistent max-width="500">
                  <v-card>
                    <v-card-title class="text-h5">
                      Edición del Contacto
                    </v-card-title>
                    <v-card-text>Aqui podras editar al usuario seleccionado</v-card-text>
                    <v-card-actions>
                      <v-card-text>
                        <div class="flex-grow-1 pt-2 pa-sm-2">
                          <v-text-field
                            v-model="contactoSeleccionado.nombre"
                            dense
                            label="Nombre"
                            outlined
                          ></v-text-field>
                          <v-text-field
                            v-model="contactoSeleccionado.email"
                            label="Email"
                            dense
                            outlined
                          ></v-text-field>
                          <v-btn
                           
                            color="green darken-1"
                            text
                            @click="dialog = false"
                          >
                            Cancelar
                          </v-btn>
                          <v-btn
                            color="green darken-1"
                            text
                            @click="guardarEdicionContacto()"
                          >
                            Aceptar
                          </v-btn></div></v-card-text>
                      <v-spacer></v-spacer>
                    
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                
                <!--!>DIALOG CREACION CONTACTO<-->
                <v-dialog v-model="dialogCrearContacto" persistent max-width="500">
                  <v-card>
                    <v-card-title class="text-h5">
                      Creación de Contacto
                    </v-card-title>
                    <v-card-text>Aqui podras crear un nuevo contacto al proveedor seleccionado</v-card-text>
                    <v-card-actions>
                      <v-card-text>
                        <div class="flex-grow-1 pt-2 pa-sm-2">
                          <v-text-field
                            v-model="nuevoContactoProveedor.nombre"
                            dense
                            label="Nombre"
                            outlined
                          ></v-text-field>
                          <v-text-field
                            v-model="nuevoContactoProveedor.email"
                            label="Email"
                            dense
                            outlined
                          ></v-text-field>
                          <v-btn
                           
                            color="green darken-1"
                            text
                            @click="dialogCrearContacto = false"
                          >
                            Cancelar
                          </v-btn>
                          <v-btn
                            color="green darken-1"
                            text
                            @click="crearNuevoContacto()"
                          >
                            Agregar
                          </v-btn></div></v-card-text>
                      <v-spacer></v-spacer>
                    
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <!--!> DIALOGO PARA DESHABILITAR PROVEEDOR <-->
      </div>
      <v-row justify="center">
        <v-dialog v-model="dialogDesactivar" persistent max-width="500">
          <v-card>
            <v-card-title class="text-h5">
              ¿Deseas deshabilitar este Proveedor?
            </v-card-title>
            <v-card-text>Esta accion tiene efecto inmediato en la aplicion.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="dialogDesactivar = false"
              >
                NO
              </v-btn>
              <v-btn color="green darken-1" text @click="deshabilitarUsuario()">
                Si
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </div>
</template>
<script src="./Detalle.js"></script>
<style scoped src="./Detalle.css"></style>
