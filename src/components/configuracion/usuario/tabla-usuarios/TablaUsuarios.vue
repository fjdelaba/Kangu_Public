<template>
  <div>
    <div>
      <!-- {{ usuarios }}-->
    </div>
    <div class="d-flex flex-column flex-grow-1">
      <div class="d-flex align-center py-3">
        <div>
          <div class="display-1">Usuarios</div>
          <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
        </div>
        <v-spacer></v-spacer>
        <v-row justify="space-around">
          <v-col cols="auto">
            <v-dialog transition="dialog-top-transition" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                >Crear Usuario</v-btn>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-toolbar
                    color="primary"
                    dark
                  >Creación de Usuario</v-toolbar>
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
                          :error-messages="emailErrors"
                          label="Rut"
                          required
                          class="ma-0 pa-0"
                          @input="$v.rut.$touch()"
                          @blur="$v.rut.$touch()"
                        ></v-text-field>
                        <v-text-field
                          v-model="usuario.nombres"
                          hint="For example, flowers or used cars"
                          dense
                          outlined
                          :error-messages="nombreErrors"
                          label="Nombres"
                          required
                          class="ma-0 pa-0"
                          @input="$v.name.$touch()"
                          @blur="$v.name.$touch()"
                        ></v-text-field>
                        <v-text-field
                          v-model="usuario.apellidos"
                          hint="For example, flowers or used cars"
                          dense
                          outlined
                          :error-messages="apellidosErrors"
                          label="Apellidos"
                          required
                          @input="$v.apellidos.$touch()"
                          @blur="$v.apellidos.$touch()"
                        ></v-text-field>
                        <v-text-field
                          v-model="usuario.email"
                          hint="For example, flowers or used cars"
                          dense
                          outlined
                          :error-messages="cargoErrors"
                          label="Email"
                          required
                          @input="$v.email.$touch()"
                          @blur="$v.email.$touch()"
                        ></v-text-field>
                        <v-text-field
                          v-model="usuario.cargo"
                          hint="Por Ejemplo, Supervisor"
                          dense
                          outlined
                          :error-messages="cargoErrors"
                          label="Cargo"
                          required
                          @input="$v.cargo.$touch()"
                          @blur="$v.cargo.$touch()"
                        ></v-text-field>
                        <v-select
                          v-model="usuario.perfil"
                          hint="For example, flowers or used cars"
                          dense
                          outlined
                          :items="items"
                          :error-messages="errors"
                          label="Perfil"
                          data-vv-name="select"
                          required
                        ></v-select>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      ><v-file-input v-model="usuario.imagen" prepend-icon="mdi-camera" @click:clear="eliminarImagen" @change="previewImagen" >
                       </v-file-input>
                        <v-img :src="url"></v-img>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      ><v-file-input v-model="usuario.firma" @click:clear="eliminarFirma" @change="previewFirma">
                       </v-file-input>
                        <v-img :src="url2"></v-img>
                      </v-col></v-row>
                    <small>*Rellene los campos requeridos</small>
                    <v-card-actions>
                      <v-btn text @click="dialog.value = false">Cerrar</v-btn>
                      <v-btn
                        color="primary"
                        text
                        @click="dialog.value = true"
                      >Crear</v-btn>
                    </v-card-actions>
                  </v-card-text>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
        </v-row>
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
  </div>
</template>

<script src="./TablaUsuarios.js"></script>
<style scoped src="./TablaUsuarios.css"></style>
