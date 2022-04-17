<template>
  <v-container class="pt-0 pb-4">
    <v-row>
      <v-col
        v-for="(item, i) in stats"
        :key="i"
        cols="12"
        sm="6"
        lg="3"
      >
        <div class="text-center">
          <div class="text-h2 text-number font-weight-light">{{ item.value }}</div>
          <v-responsive max-width="300" class="mx-auto">
            <div class="font-weight-regular my-2">{{ item.text }}</div>
            <div class="text-h6 text-lg-h5">{{ item.title }}</div>
          </v-responsive>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      stats: [{
        title: 'Clientes',
        value: '4,253',
        text: 'Empresas que han confiado en nosotros'
      }, {
        title: 'Proyectos',
        value: '1,283,787',
        text: 'Proyectos que estan siendo gestionados con Kangu'
      }, {
        title: 'Usuarios',
        value: '1,348',
        text: 'Cantidad de Usuarios que utilizan Kangu'
      }, {
        title: 'Otro valor',
        value: '331,234',
        text: 'Otro valor y otro texto'
      }]
    }
  }
}
</script>
