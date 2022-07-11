<template>
  <div>
    <v-card>
      <v-card-text>
        <div class="d-flex flex-column flex-sm-row">
          <div>
            <!--<v-img
                :src="user.avatar"
                aspect-ratio="1"
                class="blue-grey lighten-4 rounded elevation-3"
                max-width="120"
                max-height="120"
              ></v-img>
              <v-file-input
                accept="image/*"
                label="Avatar"
                style="width:150px"
                prepend-icon=""
                dense
              ></v-file-input>-->
          </div>
          <div class="flex-grow-1 pt-2 pa-sm-2">
            <v-text-field
              dense
              label="Nombre"
              placeholder="Nombre"
              :readonly="!edicion"
              outlined
              :rules="[]"
            >
            </v-text-field>
            <v-text-field
              label="Rut"
              placeholder="12.345.678-9"
              :readonly="!edicion"
              dense
              outlined
              :rules="[]"
            >
            </v-text-field>
            <v-text-field
              label="Dirección"
              placeholder="Dirección"
              :readonly="!edicion"
              dense
              outlined
              :rules="[]"
            >
            </v-text-field>
            <v-text-field
              label="Telefono"
              :readonly="!edicion"
              dense
              outlined
              :rules="[]"
            ></v-text-field>
            <v-text-field
              label="Email"
              :readonly="!edicion"
              dense
              outlined
              :rules="[]"
            ></v-text-field>
            <v-select
              :items="items"
              :rules="[(v) => !!v || 'Item is required']"
              label="Región"
              required
            ></v-select>
            <v-select
              :items="items"
              :rules="[(v) => !!v || 'Item is required']"
              label="Comuna"
              required
            ></v-select>
            <v-text-field
              label="Giro"
              :readonly="!edicion"
              dense
              outlined
              :rules="[]"
            ></v-text-field>
            <v-text-field
              label="representante"
              :readonly="!edicion"
              dense
              outlined
              :rules="[]"
            ></v-text-field>
            <v-row align="center" justify="space-around">
              <div class="mt-2">
                <v-btn color="primary" small @click="editarUsuario()"
                  >Editar</v-btn
                >
              </div>
            </v-row>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-expansion-panels>
      <v-expansion-panel v-for="(item, i) in 5" :key="i">
        <v-expansion-panel-header> Plan </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card class="mx-auto" max-width="344">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
            ></v-img>

            <v-card-title> Plan Basico </v-card-title>

            <v-card-actions>
              <v-btn color="orange lighten-2" text> Ver Plan </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text> </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
          <v-card class="mx-auto" max-width="344">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
            ></v-img>

            <v-card-title> Plan Intermedio </v-card-title>

            <v-card-actions>
              <v-btn color="orange lighten-2" text> Ver Plan </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text> </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
          <v-card class="mx-auto" max-width="344">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
            ></v-img>

            <v-card-title> Plan Avanzado </v-card-title>

            <v-card-actions>
              <v-btn color="orange lighten-2" text> Ver Plan </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text> </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
