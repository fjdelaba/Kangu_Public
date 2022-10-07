<template>
  <v-card class="mx-auto" max-width="250">
    <v-list-item>
      <!-- <v-list-item-content> -->
        <v-list-item-title class="text-h6">
          {{ titulo }}
        </v-list-item-title>
      <!-- </v-list-item-content> -->
    </v-list-item>

    <v-card-text>
      <v-row align="center">
        <v-col class="text-h5">
          {{ texto | currency}}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script src="./IndicadorIndividual.js"></script>