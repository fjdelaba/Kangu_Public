<template>
  <div>
    <div>
    </div>
    <div class="d-flex flex-column flex-grow-1">
      <div class="d-flex align-center">
        <div>
          <!-- <div class="display-1">Usuarios</div> -->
          <v-breadcrumbs :items="breadcrumbs" class="pa-0"></v-breadcrumbs>
        </div>
        
        <v-col cols="auto">
          <v-dialog
            v-model="abrirDialog"
            persistent
            transition="dialog-top-transition"
            max-width="650"
          >
            <template v-slot:activator="{ }">
             
            </template>
            <template >
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-card >
                  <div id="app" >
                    <v-card>
                      <v-toolbar
                        flat
                        color="primary"
                        dark
                      >
                        <v-toolbar-title>Creación de Usuario</v-toolbar-title>
                      </v-toolbar>
                      <v-alert
                        :value="alert"        
                        prominent
                        type="error"
                        transition="dialog-bottom-transition"
                      >
                        <v-row align="center">
                          <v-col class="">
                            Antes de crear este usuario ¿Desea asignarle permisos?
                          </v-col>
                          <v-col class="shrink">
                            <v-btn @click="permisoUsu()">Si</v-btn>
                          </v-col>
                          <v-col class="shrink">
                            <v-btn @click="grabarUsuario(2)">No</v-btn>
                          </v-col>
                        </v-row>
                      </v-alert>
                      <v-tabs v-model="active" grow>
                        <v-tab >
                          <v-icon left>
                            mdi-account
                          </v-icon>
                          Datos
                        </v-tab>
                        <v-tab >
                          <v-icon left>
                            mdi-lock
                          </v-icon>
                          Permisos 
                        </v-tab>
                        
                        <v-tab-item>

                          <v-card flat>
                            <v-card-text>
                              <v-form
                                ref="datosUsuario"
                                v-model="valid"
                              >
                                <v-row
                                  no-gutters
                                >
                              
                                  <v-col
                                  
                                    cols="12"
                                    sm="6"
                                    md="6"
                                  >
                                    <v-text-field 
                                      v-model="usuario.rut"
                                      style="width:90%"
                                      dense
                                      tabindex="1"
                                      hint="Por Ejemplo, 19728579-6"
                                      outlined
                                      label="Rut"
                                      required
                                      class="mt-2  pl-5"
                                      :rules="usuarioRules.rutRules"
                                      @input="validarFomatoRut()"
                                    ></v-text-field>
                                    <v-text-field
                                      v-model="usuario.nombres"
                                      style="width:90%"
                                      hint="Por Ejemplo, Felipe."
                                      outlined
                                      tabindex="3"
                                      dense
                                      label="Nombres"
                                      required
                                      class="ma-0  pl-5"
                                      :rules="usuarioRules.nombresRules"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="6"
                                  >
                                    <v-text-field
                                      v-model="usuario.email"
                                      style="width:90%"
                                      hint="Por Ejemplo, FelipedelaBarra@gmail.com"
                                      dense
                                      tabindex="2"
                                      outlined
                                      label="Email"
                                      required
                                      :rules="usuarioRules.emailRules"
                                      class="mt-2  pl-5"
                                    ></v-text-field>
                                   
                                    <v-text-field
                                      v-model="usuario.apellidos"
                                      style="width:90%"
                                      hint="Por Ejemplo, De la Barra."
                                      dense
                                      tabindex="4"
                                      outlined
                                      label="Apellidos"
                                      class="ma-0  pl-5"
                                      required
                                      :rules="usuarioRules.apellidosRules"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="6"
                                  >
                                    <v-text-field
                                      v-model="usuario.cargo"
                                      hint="Por Ejemplo, Supervisor,"
                                      dense
                                      outlined
                                      tabindex="5"
                                      label="Cargo"
                                      :rules="usuarioRules.cargoRules"
                                      style="width:90%"
                                      class="ma-0  pl-5"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="6"
                                  >
                                    {{ usuario.perfil }}
                                    <v-select
                                      v-model="usuario.perfil"
                                      :items="items"
                                      dense
                                      style="width:90%"
                                      outlined
                                      tabindex="6"
                                      class="ma-0  pl-5"
                                      label="Perfil"
                                      data-vv-name="select"
                                      required
                                      item-text="nombre"
                                      item-value="id"
                                      :rules="[v => !!v || 'Se requiere seleccionar un perfil']"
                                    ></v-select>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="6"
                                  ><v-file-input
                                     v-model="usuario.imagen"
                                     prepend-icon="mdi-camera"
                                     label="Ingrese Imagen de Perfil" 
                                     style="width:85%"
                                     tabindex="7"
                                     @click:clear="eliminarImagen"
                                     @change="previewImagen"
                                   >
                                   </v-file-input>
                                    <v-row v-if="usuario.imagen" justify="center" > <v-avatar size="120"> <v-img
                                      :src="url"
                                      tabindex="none"
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
                                     tabindex="8"
                                     style="width:85%"
                                     @click:clear="eliminarFirma"
                                     @change="previewFirma"
                                   >
                                   </v-file-input>
                                    <v-row v-if="usuario.firma" justify="center" ><v-img
                                      :src="url2"
                                      tabindex="none"
                                      max-height="123"
                                      max-width="178"
                                      contain
                                    ></v-img></v-row>
                                  </v-col> </v-row>
                                <p class="text-right">
                                  Rellene los campos requeridos.
                                </p>
                              </v-form></v-card-text>
                            
                          </v-card>
                        </v-tab-item>
                        <v-tab-item>
                          <v-card flat>
                            <v-row dense flat>
                              <v-subheader>Seleccionar todos los permisos</v-subheader>
                              <v-list-item>
                                <template v-slot:default="{ }">
                                  <v-list-item-action>
                                    <v-switch
                                      v-model="switchall"
                                      color="primary"
                                      @click="permisoTotales()"
                                    ></v-switch>
                                  </v-list-item-action>
  
                                  <v-list-item-content>
                                    <v-list-item-title>Todos los permisos</v-list-item-title>
                                  </v-list-item-content>
                                </template>
                              </v-list-item>
                            </v-row>
                            <v-row>
                              <v-col>
                                <v-list
                                  subheader
                                  flat
                                  dense
                                >
                                  <v-subheader>Panel de Configuraciones</v-subheader>
                                  
                                  <v-list-item-group
                                    multiple
                                  >
                                    <v-list-item>
                                      <template v-slot:default="{ active, }">
                                        <v-list-item-action>
                                          <v-switch
                                            v-model="permisoCentroGestion"
                                            :input-value="active"
                                            color="primary"
                                          ></v-switch>
                                        </v-list-item-action>
  
                                        <v-list-item-content>
                                          <v-list-item-title>Centro de Gestión</v-list-item-title>
                                        </v-list-item-content>
                                      </template>
                                    </v-list-item>
  
                                    <v-list-item>
                                      <template v-slot:default="{ active }">
                                        <v-list-item-action>
                                          <v-switch
                                            v-model="permisoMateriales"
                                            :input-value="active"
                                            color="primary"
                                          ></v-switch>
                                        </v-list-item-action>
  
                                        <v-list-item-content>
                                          <v-list-item-title>Maestro de recursos</v-list-item-title>
                                        </v-list-item-content>
                                      </template>
                                    </v-list-item>
  
                                    <v-list-item>
                                      <template v-slot:default="{ active }">
                                        <v-list-item-action>
                                          <v-switch
                                            v-model="permisoEntidadExterna"
                                            :input-value="active"
                                            color="primary"
                                          ></v-switch>
                                        </v-list-item-action>
  
                                        <v-list-item-content>
                                          <v-list-item-title>Entidad Externa</v-list-item-title>                                        </v-list-item-content>
                                      </template>
                                    </v-list-item>
  
                                    <v-list-item>
                                      <template v-slot:default="{ active }">
                                        <v-list-item-action>
                                          <v-switch
                                            v-model="permisoUsuario"
                                            :input-value="active"
                                            color="primary"
                                          ></v-switch>
                                        </v-list-item-action>
  
                                        <v-list-item-content>
                                          <v-list-item-title>Usuarios</v-list-item-title>                                        </v-list-item-content>
                                      </template>
                                    </v-list-item>
                                    <v-list-item>
                                  
                                      <template v-slot:default="{ active }">
                                        <v-list-item-action>
                                          <v-switch
                                            v-model="permisoMatenedores"
                                            :input-value="active"
                                            color="primary"
                                          ></v-switch>
                                        </v-list-item-action>
  
                                        <v-list-item-content>
                                          <v-list-item-title>Mantenedores</v-list-item-title>                                        </v-list-item-content>
                                      </template>
                                    </v-list-item>
                                  </v-list-item-group>
                                </v-list>
                              </v-col>
                              <v-col>
                                <v-subheader>Adquisiciónes</v-subheader>
  
                                <v-list-item-group
                                  multiple
                                >
                                  <v-list-item>
                                    <template v-slot:default="{ active, }">
                                      <v-list-item-action>
                                        <v-switch
                                          v-model="permisoPedidos"
                                          :input-value="active"
                                          color="primary"
                                        ></v-switch>
                                      </v-list-item-action>
  
                                      <v-list-item-content>
                                        <v-list-item-title> Pedidos</v-list-item-title>
                                      </v-list-item-content>
                                    </template>
                                  </v-list-item>
  
                                  <v-list-item>
                                    <template v-slot:default="{ active }">
                                      <v-list-item-action>
                                        <v-switch
                                          v-model="permisoCotizacion"
                                          :input-value="active"
                                          color="primary"
                                        ></v-switch>
                                      </v-list-item-action>
  
                                      <v-list-item-content>
                                        <v-list-item-title>Cotización</v-list-item-title>
                                      </v-list-item-content>
                                    </template>
                                  </v-list-item>
 
                                  <v-list-item>
                                    <template v-slot:default="{ active }">
                                      <v-list-item-action>
                                        <v-switch
                                          v-model="permisoOrdenCompra"
                                          :input-value="active"
                                          color="primary"
                                        ></v-switch>
                                      </v-list-item-action>
  
                                      <v-list-item-content>
                                        <v-list-item-title>Orden de compra</v-list-item-title>                                        </v-list-item-content>
                                    </template>
                                  </v-list-item>
  
                                  <v-list-item>
                                    <template v-slot:default="{ active }">
                                      <v-list-item-action>
                                        <v-switch
                                          v-model="permisoDespacho"
                                          :input-value="active"
                                          color="primary"
                                        ></v-switch>
                                      </v-list-item-action>
  
                                      <v-list-item-content>
                                        <v-list-item-title>Despacho</v-list-item-title>                                        </v-list-item-content>
                                    </template>
                                  </v-list-item>
                                  <v-list-item>
                                    <template v-slot:default="{ active }">
                                      <v-list-item-action>
                                        <v-switch
                                          v-model="permisoRecepcion"
                                          :input-value="active"
                                          color="primary"
                                        ></v-switch>
                                      </v-list-item-action>
  
                                      <v-list-item-content>
                                        <v-list-item-title>Recepcion</v-list-item-title>                                        </v-list-item-content>
                                    </template>
                                  </v-list-item>
     
                                </v-list-item-group></v-col></v-row></v-card>
                        </v-tab-item></v-tabs>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text tabindex="9" @click="reset()">Cerrar</v-btn>
                        
                        <v-btn
                          :loading="loadingCrearUsu"
                          :disabled="loadingCrearUsu"
                          color="blue"
                          text
                          tabindex="10"
                          @click="crearUsu()"
                        >Crear</v-btn>
                      </v-card-actions>
                    </v-card>
                  </div>
                </v-card>
              </v-form>
            </template>
          </v-dialog>
        </v-col>
      </div>
        
      <!-- users list -->
        
      <v-row dense class="px-2 align-center">

        <v-btn
          color="primary"
          @click="abrirDialog = true"
        >Crear Usuario</v-btn>
        <v-spacer></v-spacer>
        <v-col cols="6" class="d-flex text-right align-center">
          <v-text-field
            v-model="searchQuery"
            append-icon="mdi-magnify"
            class="flex-grow-1 mr-md-2"
            solo
            hide-details
            dense---
            clearable
            placeholder="p.ej. filtrar por rut, correo electrónico, nombre, etc."
            @keyup.enter="searchUser(searchQuery)"
          ></v-text-field>
          <!-- <v-btn
            :loading="isLoading"
            icon
            small
            class="ml-2"
            @click
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn> -->
        </v-col>
      </v-row>
      <v-data-table
        v-model="selectedUsers"
        :headers="headers"
        :items="usuarios"
        :search="searchQuery"
        class="flex-grow-1"
        dense
      >
      
        <template v-slot:item.rut="{ item }">
          <div class="font-weight-bold">
            <div>{{ item.rut }}</div>
          </div>
        </template>
      
        <template v-slot:item.nombre="{ item }">
          <div class="font-weight-bold">
            <div>{{ item.nombre }}</div>
          </div>
        </template>
        <template v-slot:item.apellidos="{ item }">
          <div class="font-weight-bold">
            <div>{{ item.apellidos }}</div>
          </div>
        </template>
        <template v-slot:item.email="{ item }">
          <div class="d-flex align-center py-1">
            <v-avatar size="32" class="elevation-1 grey lighten-3">
              <v-img :src="item.avatar"></v-img>
            </v-avatar>
            <div class="ml-1 caption font-weight-bold">
              <copy-label :text="item.email" />
            </div>
          </div>
        </template>

        <!-- <template v-slot:item.verified="{ item }">
            <v-icon v-if="item.verified" small color="success">
              mdi-check-circle
            </v-icon>
            <v-icon v-else small>
              mdi-circle-outline
            </v-icon>
          </template> -->
      
        <v-row dense>
        <template v-slot:item.activo="{ item }">
          <div>
            <v-simple-checkbox v-model="item.activo" :disabled="true"></v-simple-checkbox>
          </div>
        </template>
        </v-row>
          <v-row dense>
        <template v-slot:item.cargo="{ item }">
          <v-chip label small class="font-weight-bold" color="primary">{{
            item.cargo | capitalize
          }}</v-chip>
        </template>

        <template v-slot:item.fec_creacion="{ item }">
          <div>{{ item.fec_creacion | formatDate("ll") }}</div>
        </template>
          </v-row>
        <template v-slot:item.action="{ item }">
          <div class="actions">
            <v-btn small @click="cargarDetalle(item.id)">
              Abrir
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </div>
  </div>
  
</template>

<script src="./TablaUsuarios.js"></script>
<style scoped src="./TablaUsuarios.css"></style>
