<template>
  <v-card class="d-flex flex-column flex-grow-1">

    <!-- loading spinner -->

    <!-- information -->
    <div class="d-flex flex-column flex-grow-1">
      <v-card-title>
        <p>{{ label }}</p>
        <v-spacer></v-spacer>
        <div>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                outlined
                label="Fecha"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              scrollable
              :first-day-of-week="1"
              :weekday-format="getDay"
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </div>
      </v-card-title>
      <div>
        <v-row class="pl-3">
          <v-col cols="6">
            <v-card
              class="mx-auto"
              max-width="400"
            >
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5">
                    <p class=" text-center">DOLAR:</p>
                  </v-list-item-title>
                  <h2 class="text-h2 text-center">{{ $store.state.app.indicadores.dolar.valor | currency }}</h2>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card
              class="mx-auto"
              max-width="400"
            >
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5">
                    <p class=" text-center">EURO:</p>
                  </v-list-item-title>
                  <h2 class=" text-h2 text-center">{{ $store.state.app.indicadores.euro.valor | currency }}</h2>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col cols="8">
            <v-card
              class="mx-auto"
              max-width="400"
            >
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5">
                    <p class=" text-center">UF:</p>
                  </v-list-item-title>
                  <h2 class=" text-h2 text-center">{{ $store.state.app.indicadores.uf.valor | currency }}</h2>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      
      </div>
      <!-- <div class="chart-wrap">
        <apexchart
          type="donut"
          width="85%"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div> -->
    </div>
  </v-card>
</template>

<script src="./card-indicadores.js"></script>
