<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Crear Proveedor</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-container>
        <v-form
          ref="formCrearEntidad"
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
                v-model="ent.razon_social"
                :rules="rules.ent.razon_social"
                label="Razon Social"
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
                v-model="ent.giro"
                :rules="rules.ent.giro"
                label="Giro"
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
                v-model="ent.rut"
                :rules="rules.ent.rut"
                label="RUT"
                dense
                outlined  
                required
                @input="validarFomatoRut()"
              ></v-text-field>
            </v-col>
            <!-- <v-col
              cols="12"
              sm="6"
              md="7"
              class="pt-0"
            >
              <v-text-field
                v-model="ent.email_dte"
                :rules="rules.ent.email_dte"
                label="Email DTE"
                required
                outlined
                dense
              ></v-text-field>
            </v-col> -->
            <v-col cols="12" class="pt-0">
              <v-text-field
                v-model="ent_con.nombre"
                :rules="rules.ent_con.nombre"
                label="Nombre Contato"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-text-field
                v-model="ent_con.email"
                :rules="rules.ent_con.email"
                label="Email Contacto"
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
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        @click="cerrarDialogEntidad()"
      >
        Cancelar
      </v-btn>
      <v-btn
        color="blue darken-1"
        text
        @click="grabarEntidad()"
      >
        Crear
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script src="./ModalEntidad.js"></script>

<style scoped src="./ModalEntidad.css"></style>