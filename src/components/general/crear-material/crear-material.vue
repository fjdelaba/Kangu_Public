<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Crear Material</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-container>
        <v-form
          ref="formMaterial"
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
                v-model="nombreMat"
                label="Nombre Material"
                required
                outlined
                readonly
                dense
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="12"
              class="pt-0"
            >
              <v-autocomplete
                v-model="selectionFamilia"
                :rules="rules.mat.fam"
                :items="listaFamilia"
                item-text="nombre"
                item-value="id"
                label="Familia del Material"
                required
                outlined
                dense
              ></v-autocomplete>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="12"
              class="pt-0"
            >
              <v-autocomplete
                v-model="selectionUnidad"
                :rules="rules.mat.unidad"
                :items="listaUnidad"
                item-text="nombre"
                item-value="id"
                label="Unidad del Material"
                required
                outlined
                dense
              ></v-autocomplete>
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
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        @click="cerrarDialogMat()"
      >
        Cancelar
      </v-btn>
      <v-btn
        color="blue darken-1"
        text
        @click="grabarMaterial()"
      >
        Crear
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script src="./crear-material.js"></script>
