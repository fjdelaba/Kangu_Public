<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ cpxTitulo }}</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        {{ datosContacto }}
        {{ idProveedor }}
        <v-container>
          <v-form
            ref="formContacto"
            v-model="valid"
            lazy-validation
          >
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
                class="pt-0"
              >
                <v-text-field
                  v-model="ent_con.nombre"
                  :rules="rules.ent_con.nombre"
                  label="Nombre"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
                class="pt-0"
              >
                <v-text-field
                  v-model="ent_con.email"
                  :rules="rules.ent_con.email"
                  label="Email"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
          centered
        >
          asdasdsa

          <template v-slot:action="{ attrs }">
            <v-btn
              color="blue"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="cerrarDialogContacto(false)"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="grabar()"
        >
          {{ cpxTextoBoton }}
        </v-btn>
        
      </v-card-actions>
    </v-card>
  </div>
</template>
<script src="./ModalContacto.js"></script>

<style scoped src="./ModalContacto.css"></style>