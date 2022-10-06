<template>
  <v-container class="white">
    <div v-if="$store.state.app.permisosUsuario.usuarios">
      <h2>
        Detalle Usuario
      </h2>
      <detalle-usuario :origen="1"></detalle-usuario> <!-- Confoguracion: 1; Mi Perfil :2  -->
    </div>
    <div v-else>
      <div v-if="cpxSkeleton">
        <v-skeleton-loader
          type="card-avatar, article, actions"
        ></v-skeleton-loader>
      </div>
      <div v-else>
        <card-sin-permiso></card-sin-permiso>
      </div>
  
    </div>
  </v-container>

</template>

<script>
/* eslint-disable */
import DetalleUsuario from '../../../components/configuracion/usuario/detalle/Detalle.vue'
import Skeleton from '../../../components/general/skeleton/skeleton.vue'
import CardSinPermiso from '../../../components/general/card-sin-permiso/card-sin-permiso.vue'
export default {
  name:'PageDetalleUsuario',
  components: {
    DetalleUsuario,
    Skeleton,
    CardSinPermiso
  },
    mounted() {
    },
    data() {
      return {
        skeleton:true
      };
    },
    methods: {},
    computed:{
      cpxSkeleton(){
        if(this.$store.state.app.permisosUsuario.recepcion){
          this.skeleton = false
        }
        return this.skeleton
      }
    }
}
</script>

<style>

</style>