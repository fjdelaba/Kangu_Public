<template>
  <div>
    <div class="d-flex flex-column flex-grow-1">
      <div class="d-flex align-center py-3">
        <div>
          <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
        </div>
        <v-spacer></v-spacer>
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
              dense
              clearable
              placeholder="Nombre o Material de Orden de Compra"
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
          :headers="headers"
          :items="ocs"
          :search="searchQuery"
          class="flex-grow-1"
        >

          <template v-slot:item.nombre="{ item }">
            <div class="font-weight-bold"> <div>{{ item.nombre }}</div></div>
          </template>

          <template v-slot:item.actions="{ item }">
            <div><v-btn
              v-model="item.actions" 
            > Abrir </v-btn>
            </div>
          </template> 
          <template v-slot:item.fec_creacion="{ item }">
            <div class="font-weight-bold">{{ item.fec_creacion | formatDate('ll') }}</div>
          </template>
        </v-data-table>
      </v-card>
      
    </div>
  </div>
</template>

<script src="./TablaConsulta.js"></script>
<style scoped src="./TablaConsulta.css"></style>