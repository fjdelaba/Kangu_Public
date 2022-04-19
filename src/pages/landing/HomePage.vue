<template>
  <div>
    <v-sheet>
      <v-container class="py-6 pt-lg-15 text-center">
        <h1 class="text-h4 text-sm-h3 text-md-h2 text-lg-h1">Atreteve a <span class="primary--text">simplificar tus procesos</span></h1>
        <h2 class="text-h6 text-sm-h5 mt-4 w-full w-md-8-12 w-xl-half mx-auto">Da un paso adelante en la gestion de los procesos en tu empresa y optimiza tus tiempos dar atención a lo que realmente importa</h2>
        <div class="mt-8">
          <v-btn x-large class="my-1 mx-sm-1 w-full w-sm-auto" color="primary">Prueba Kangu</v-btn>
          <v-btn x-large class="my-1 mx-sm-1 w-full w-sm-auto">Quiero saber mas {{ process && process.env.AUTH_DOMAIN }}</v-btn>
        </div>
      </v-container>
    </v-sheet>

    <Partners />

    <Stats />

    <v-container>
      <v-divider></v-divider>
    </v-container>

    <Feature2 />

    <Feature1 />

    <Pricing />

    <CallToAction />
  </div>
</template>

<script>
import Partners from '@/components/landing/Partners.vue'
import Stats from '@/components/landing/Stats.vue'
import Pricing from '@/components/landing/Pricing.vue'
import Feature1 from '@/components/landing/Feature1.vue'
import CallToAction from '@/components/landing/CallToAction.vue'
import Feature2 from '@/components/landing/Feature2.vue'

export default {
  components: {
    Partners,
    Stats,
    Pricing,
    Feature1,
    Feature2,
    CallToAction
  }
}
</script>
