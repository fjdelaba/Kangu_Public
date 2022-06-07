<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Usuarios</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
        
      <v-col cols="auto">
        <v-dialog

            v-model="abrirDialog"
            transition="dialog-top-transition"
            max-width="700"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                v-bind="attrs"
                v-on="on"
              >Crear Usuario</v-btn>
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
                      <v-tabs grow>
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
<<<<<<< HEAD
                              <v-row >

                                <v-col
=======
                              <v-row
                                :align="align"
                                no-gutters
                              >
                                <v-col
                                  align-self="center"
>>>>>>> 7c381e4681911167285c57ab66b9dbbed1f8b7c0
                                  cols="12"
                                  sm="6"
                                  md="6"
                                >
                                  <v-text-field 
                                    v-model="usuario.rut"
<<<<<<< HEAD
=======
                                    style="width:80%"
>>>>>>> 7c381e4681911167285c57ab66b9dbbed1f8b7c0
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
<<<<<<< HEAD
=======
                                    style="width:80%"
>>>>>>> 7c381e4681911167285c57ab66b9dbbed1f8b7c0
                                    hint="Por Ejemplo, Felipe."
                                    outlined
                                    dense
                                    label="Nombres"
                                    required
                                    :rules="usuario.nombresRules"
                                  ></v-text-field>
                                </v-col>
                                <v-col
                                  cols="12"
                                  sm="6"
                                  md="6"
                                >
<<<<<<< HEAD
=======
                                  <v-text-field
                                    v-model="usuario.email"
                                    style="width:80%"
                                    hint="Por Ejemplo, FelipedelaBarra@gmail.com"
                                    dense
                                    outlined
                                    label="Email"
                                    required
                                    :rules="usuario.emailRules"
                                  ></v-text-field>
                                   
                                  <v-text-field
                                    v-model="usuario.apellidos"
                                    style="width:80%"
                                    hint="Por Ejemplo, De la Barra."
                                    dense
                                    outlined
                                    label="Apellidos"
                                    required
                                    :rules="usuario.apellidosRules"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row
                                :align="align"
                                no-gutters
                              >
                                <v-col
                                  cols="12"
                                >
>>>>>>> 7c381e4681911167285c57ab66b9dbbed1f8b7c0
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
<<<<<<< HEAD
                                    :rules="usuario.emailRules"
                                  ></v-text-field>
                                </v-col>
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
                                  
=======
                                    :rules="[v => !!v || 'Se requiere seleccionar un perfil']"
                                  ></v-select>
                                </v-col>
                              </v-row>
                              <v-row>
>>>>>>> 7c381e4681911167285c57ab66b9dbbed1f8b7c0
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
<<<<<<< HEAD
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-tab-item>
                      </v-tabs>
                    </v-card>
                  </v-app>
                </div>
              </v-card>
            </v-form>
          </template>
        </v-dialog>
      </v-col>
      
      <small>*Rellene los campos requeridos</small>
      <v-card flat>
        <v-card-text>
          <v-list
            subheader
            two-line
            flat
            dense
          >
            <v-subheader>Panel de Configuraciones</v-subheader>
  
            <v-list-item-group
              v-model="settings"
              multiple
            >
              <v-list-item>
                <template v-slot:default="{ active, }">
                  <v-list-item-action>
                    <v-switch
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
          <v-list
            subheader
            two-line
            flat
            dense
          >
            <v-subheader>Adquisiciónes</v-subheader>
  
            <v-list-item-group
              v-model="settings2"
              multiple
            >
              <v-list-item>
                <template v-slot:default="{ active, }">
                  <v-list-item-action>
                    <v-switch
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
                      :input-value="active"
                      color="primary"
                    ></v-switch>
                  </v-list-item-action>
  
                  <v-list-item-content>
                    <v-list-item-title>Orden de compras</v-list-item-title>                                        </v-list-item-content>
                </template>
              </v-list-item>
  
              <v-list-item>
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-switch
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
                      :input-value="active"
                      color="primary"
                    ></v-switch>
                  </v-list-item-action>
  
                  <v-list-item-content>
                    <v-list-item-title>Recepcion</v-list-item-title>                                        </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
  
      <v-card-actions>
        <v-btn text @click="reset()">Cerrar</v-btn>
        <v-btn
          color="primary"
          text
          :disabled="!valid"
          @click="crearUsuario()"
        >Crear</v-btn>
      </v-card-actions>

    </div>

    <v-card>
      <!-- users list -->
      <v-row dense class="pa-2 align-center">
        <v-col cols="6">
          <v-menu offset-y left>
            <template v-slot:activator="{ on }">
              <transition name="slide-fade" mode="out-in">
                <v-btn v-show="selectedUsers.length > 0" v-on="on">
                  Actions
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </transition>
            </template>
            <v-list dense>
              <v-list-item @click>
                <v-list-item-title>Verify</v-list-item-title>
              </v-list-item>
              <v-list-item @click>
                <v-list-item-title>Disable</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click>
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
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
          <v-btn
            :loading="isLoading"
            icon
            small
            class="ml-2"
            @click
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        v-model="selectedUsers"
        show-select
        :headers="headers"
        :items="usuarios"
        :search="searchQuery"
        class="flex-grow-1"
      >
        <template v-slot:item.rut="{ item }">
          <div class="font-weight-bold">
            <div>{{ item.rut }}8r</div>
          </div>
        </template>
=======
                                </v-col> </v-row>
                            </v-card-text>
                            <small>*Rellene los campos requeridos</small>
                          </v-card>
                        </v-tab-item>
                        <v-tab-item>
                          <v-card flat>
                            <v-row>
                              <v-col>
                                <v-list
                                  subheader
                                  flat
                                  dense
                                >
                                  <v-subheader>Panel de Configuraciones</v-subheader>
  
                                  <v-list-item-group
                                    v-model="settings"
                                    multiple
                                  >
                                    <v-list-item>
                                      <template v-slot:default="{ active, }">
                                        <v-list-item-action>
                                          <v-switch
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
                                  v-model="settings2"
                                  multiple
                                >
                                  <v-list-item>
                                    <template v-slot:default="{ active, }">
                                      <v-list-item-action>
                                        <v-switch
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
                                          :input-value="active"
                                          color="primary"
                                        ></v-switch>
                                      </v-list-item-action>
  
                                      <v-list-item-content>
                                        <v-list-item-title>Orden de compras</v-list-item-title>                                        </v-list-item-content>
                                    </template>
                                  </v-list-item>
  
                                  <v-list-item>
                                    <template v-slot:default="{ active }">
                                      <v-list-item-action>
                                        <v-switch
                                          :input-value="active"
                                          color="primary"
                                        ></v-switch>
                                      </v-list-item-action>
  
                                      <v-list-item-content>
                                        <v-list-item-title>Despacho</v-list-item-title>                                        </v-list-item-content>
                                    </template>
                                  </v-list-item>
                                
                                  <template v-slot:default="{ active }">
                                    <v-list-item-action>
                                      <v-switch
                                        :input-value="active"
                                        color="primary"
                                      ></v-switch>
                                    </v-list-item-action>

                                  </template>
                                </v-list-item-group></v-col></v-row></v-card>
                        </v-tab-item></v-tabs>
                      <v-card-actions>
                        <v-btn text @click="reset()">Cerrar</v-btn>
                        <v-btn
                          color="primary"
                          text
                          :disabled="!valid"
                          @click="crearUsuario()"
                        >Crear</v-btn>
                      </v-card-actions>
                    </v-card>
                  </div>
                </v-card>
              </v-form>
            </template>
          </v-dialog>
        </v-col>
        
        <!-- users list -->
        <v-row dense class="pa-2 align-center">
          <v-col cols="6">
            <v-menu offset-y left>
              <template v-slot:activator="{ on }">
                <transition name="slide-fade" mode="out-in">
                  <v-btn v-show="selectedUsers.length > 0" v-on="on">
                    Actions
                    <v-icon right>mdi-menu-down</v-icon>
                  </v-btn>
                </transition>
              </template>
              <v-list dense>
                <v-list-item @click>
                  <v-list-item-title>Verify</v-list-item-title>
                </v-list-item>
                <v-list-item @click>
                  <v-list-item-title>Disable</v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item @click>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
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
            <v-btn
              :loading="isLoading"
              icon
              small
              class="ml-2"
              @click
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-col>
        </v-row>
>>>>>>> 7c381e4681911167285c57ab66b9dbbed1f8b7c0

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
              <v-img :src="item.avatar" />
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

        <template v-slot:item.activo="{ item }">
          <div>
            <v-checkbox v-model="item.activo" :disabled="true"></v-checkbox>
          </div>
        </template>

        <template v-slot:item.cargo="{ item }">
          <v-chip label small class="font-weight-bold" color="primary">{{
            item.cargo | capitalize
          }}</v-chip>
        </template>

        <template v-slot:item.fec_creacion="{ item }">
          <div>{{ item.fec_creacion | formatDate("ll") }}</div>
        </template>

<<<<<<< HEAD
        <template v-slot:item.action="{}">
          <div class="actions">
            <v-btn icon to="/users/edit">
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
=======
          <template v-slot:item.action="{}">
            <div class="actions">
              <v-btn icon to="/users/edit">
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </div>
    </div>
  </div></template>
>>>>>>> 7c381e4681911167285c57ab66b9dbbed1f8b7c0

<script src="./TablaUsuarios.js"></script>
<style scoped src="./TablaUsuarios.css"></style>
