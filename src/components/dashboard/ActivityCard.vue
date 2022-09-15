<template>
  <v-card>
    <v-card-title>
      <div>{{ $t('dashboard.activity') }}</div>
      <v-spacer></v-spacer>
     
    </v-card-title>

    <v-card-text>
      <v-timeline class="pa-0" dense align-top>
        <v-timeline-item v-for="(item, index) in activity" :key="index" :color="item.color" small>
          <strong>Nombre de OC: {{ item.nombre }}</strong>
          <div class="caption">
            <div>Proyecto: {{ item.pro.nombre }}</div>
            <div>Fecha de Creacion: {{ getFechaFormat(item.fec_creacion) }}</div>
            <div>Estado: {{ item.est_doc.nombre }}</div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
/*
|---------------------------------------------------------------------
| DEMO Dashboard Card Component
|---------------------------------------------------------------------
|
| Demo card component to be used to gather some ideas on how to build
| your own dashboard component
|
*/
/* eslint-disable */
import moment from 'moment'
import {getUltimasOC } from '../../graphql/general'
export default {
  data() {
    return {
      menu: [
        { icon: 'mdi-refresh', text: 'Refresh' },
        { icon: 'mdi-delete-outline', text: 'Clear' }
      ],
      activity: [],
      datosUsuario:''
    }
  },
      mounted() {
     this.cargarOcs()
    },
     methods: {
      async cargarOcs() {
            this.datosUsuario = this.$store.state.app.datosUsuario
            const {data: { kangusoft_oc } } = await getUltimasOC(this.datosUsuario.user_id);
            console.log("kangusoft_oc:",kangusoft_oc)
            for(let oc of kangusoft_oc){
                this.activity.push(oc)
           
            }
        },
           getFechaFormat(fecha){
      return moment(fecha).format("DD/MM/YYYY")
    },
  }
}
</script>
