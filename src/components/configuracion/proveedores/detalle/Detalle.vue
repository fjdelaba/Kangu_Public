<template>
  <div class="my-2">
    <div>
      <v-breadcrumbs :items="breadcrumbs" class="pa-0"></v-breadcrumbs>

      <div>
        <div v-if="skeleton">
          <v-skeleton-loader
            type="card-avatar, article, actions"
          ></v-skeleton-loader>
        
        </div>
        <div v-if="!skeleton">  
          <v-card
            :loading="loadingDatosGenerales"
            :disabled="loadingDatosGenerales"
          >
            <v-card-text>
              <div class="d-flex flex-column flex-sm-row">
                <div class="flex-grow-1 pt-2 pa-sm-2">
                  <v-form
                  
                    ref="formEditProveedor"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-text-field
                      v-model="proveedor.razon_social"
                      dense
                      label="Razon Social"
                      :readonly="!edicion"
                      outlined
                      required
                      :rules="razonRules" 
                    ></v-text-field>
                    <v-text-field
                      v-model="proveedor.rut"
                      label="Rut"
                      :readonly="!edicion"
                      dense
                      outlined
                      required
                      :rules="rutRules" 
                    ></v-text-field>
                    <v-text-field
                      v-model="proveedor.giro"
                      dense
                      label="Giro"
                      :readonly="!edicion"
                      outlined
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="proveedor.direccion"
                      dense
                      label="Dirección"
                      :readonly="!edicion"
                      outlined
                      required
                      :rules="direccionRules" 
                    ></v-text-field>
                    <v-text-field
                      v-model="proveedor.emailContacto"
                      dense
                      label="Email Contacto"
                      :readonly="!edicion"
                      outlined
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="proveedor.emailDte"
                      dense
                      label="Email DTE"
                      :readonly="!edicion"
                      outlined
                      required
                    ></v-text-field>
                    <v-row align="center" justify="space-around">
                      <!-- <div v-if="cpxOrigenConfiguracion"> -->
                      <div v-if="edicion" class="mt-2">
                        <v-btn
                          color="primary"
                          :loading="loadingEdicionProveedor"
                          :disabled="loadingEdicionProveedor"
                          small
                          @click="grabarEdicionProveedor()"
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
                          {{ cpxTextoBotonUpdateEstado }}
                          <template v-slot:loader>
                            <span class="custom-loader">
                              <v-icon light>mdi-cached</v-icon>
                            </span>
                          </template></v-btn>
                      </div>
                      <!-- </div> -->
                    </v-row>
                  </v-form></div>
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
                            <v-form
                              ref="formEditContacto"
                              v-model="valid"
                              lazy-validation
                            >
                              <v-text-field
                                v-model="contactoSeleccionado.nombre"
                                dense
                                label="Nombre"
                                outlined
                                required
                                :rules="nombreRules" 
                              ></v-text-field>
                              <v-text-field
                                v-model="contactoSeleccionado.email"
                                label="Email"
                                dense
                                outlined
                                required
                                :rules="emailRules"
                              ></v-text-field>
                              <v-btn

                                text
                                @click="dialog = false"
                              >
                                Cancelar
                              </v-btn>
                              <v-btn
                                :loading="loadingEdicionContacto"
                                :disabled="loadingEdicionContacto"
                                color="blue"
                                text
                                @click="guardarEdicionContacto()"
                              >
                                Aceptar
                              </v-btn></v-form></div></v-card-text>
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
                            <v-form
                              ref="formNuevoContacto"
                              v-model="valid"
                              lazy-validation
                            >
                              <v-text-field
                                v-model="nuevoContactoProveedor.nombre"
                                dense
                                label="Nombre"
                                outlined
                                required
                                :rules="nombreRules"
                              ></v-text-field>
                              <v-text-field
                                v-model="nuevoContactoProveedor.email"
                                label="Email"
                                dense
                                outlined
                                required
                                :rules="emailRules"
                              ></v-text-field>
                              <v-btn
                           
                                text
                                @click="dialogCrearContacto = false"
                              >
                                Cancelar
                              </v-btn>
                              <v-btn
                                color="blue"
                                text
                                :loading="loadingCrearContacto"
                                :disabled="loadingCrearContacto"
                                @click="crearNuevoContacto()"
                              >
                                Agregar
                              </v-btn></v-form></div></v-card-text>
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
                ¿Deseas {{ cpxTextoBotonUpdateEstado }} este Proveedor?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  @click="dialogDesactivar = false"
                >
                  NO
                </v-btn>
                <v-btn 
                  :loading="loadingDeshabilitar"
                  :disabled="loadingDeshabilitar"
                  color="blue" 
                  text 
                  @click="deshabilitarProveedor()"
                >
                  Si
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script src="./Detalle.js"></script>
<style scoped src="./Detalle.css"></style>
