<template>
  <v-container class="py-4">
    <v-row>
      <v-col v-for="(item, i) in features" :key="i" cols="12" md="6">
        <div class="d-flex">
          <div class="mr-2">
            <v-sheet outlined rounded class="pa-2 elevation-1">
              <v-icon>{{ item.icon }}</v-icon>
            </v-sheet>
          </div>
          <div>
            <div class="text-h5">{{ item.title }}</div>
            <div class="text-h6 font-weight-light mt-1">{{ item.description }}</div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      features: [{
        icon: 'mdi-account-check-outline',
        title: 'Autenticación de punta',
        description: 'Utilizamos tecnonología de primer orden para dar seguridad a tu información'
      }, {
        icon: 'mdi-lifebuoy',
        title: 'Soporte dedicado',
        description: 'Nos preocupa que tus procesos no se detengan, es por eso que contamos con un equipo dedicado a ayudarte'
      }, {
        icon: 'mdi-email-open-multiple-outline',
        title: 'Comunicación',
        description: 'Te mantendremos siempre informado de los sucesos importantes de tus proyectos'
      }, {
        icon: 'mdi-clock-outline',
        title: 'Optimiza tus tuiempos',
        description: 'Sabemos que el tiempo es un recurso valioso. En kangu nos esforzamos para construir procesos tan simples como efectivos'
      }]
    }
  }
}
</script>
