<template>
  <v-menu offset-y left transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-badge
        bordered
        :content="notificaciones.length"
        offset-x="22"
        offset-y="22"
        :value="notificaciones.length > 0"
      >
        <v-btn icon v-on="on">
          <v-icon @click="cargarNotificaciones($store.state.app.datosUsuario.user_id)">mdi-bell-outline</v-icon>
        </v-btn>
      </v-badge>
    </template>

    <!-- dropdown card -->
    <v-card>
      <v-list v-if="notificaciones.length > 0" three-line dense max-width="400">
        <v-subheader class="pa-2 font-weight-bold">Notificaciones</v-subheader>
        <div v-for="(item, index) in notificaciones" :key="item.id">
          <v-divider v-if="index > 0 && index < items.length" inset></v-divider>

          <v-list-item @click="()=>{}">
            <!-- <v-list-item-avatar size="32" :color="item.color"> -->
            <v-list-item-avatar size="32" color="primary">
              <v-icon dark small>{{ mostrarIcono(item.not_tip) }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.mod.nombre"></v-list-item-title>
              <v-list-item-subtitle class="caption" v-text="`Proyecto: ${item.pro.nombre}. ${item.texto}`"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="align-self-center">
              <v-list-item-action-text v-text="devolverFecha(item.fec_creacion)"></v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
        </div>
      </v-list>
      <v-list v-else>
        <v-subheader class="pa-2 font-weight-bold">No existen notificaciones</v-subheader>
      </v-list>

      <div v-if="notificaciones.length > 0" class="text-center py-2" >
        <v-btn small>Limpiar</v-btn>
      </div>
    </v-card>

    <!-- <v-card v-if="false">
      <v-list three-line dense max-width="400">
        <v-subheader class="pa-2 font-weight-bold">Notificaciones</v-subheader>
        <div v-for="(item, index) in items" :key="index">
          <v-divider v-if="index > 0 && index < items.length" inset></v-divider>

          <v-list-item @click="()=>{}">
            <v-list-item-avatar size="32" :color="item.color">
              <v-icon dark small>{{ item.icon }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle class="caption" v-text="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="align-self-center">
              <v-list-item-action-text v-text="item.time"></v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
        </div>
      </v-list>

      <div class="text-center py-2">
        <v-btn small>See all</v-btn>
      </div>
    </v-card> -->

  </v-menu>
</template>

<script>
import { getNotificaciones } from '../../graphql/general'

/*
|---------------------------------------------------------------------
| Toolbar Notifications Component
|---------------------------------------------------------------------
|
| Quickmenu to check out notifications
|
*/
export default {
  data() {
    return {
      notificaciones: [],
      items: [
        {
          title: 'Brunch this weekend?',
          color: 'primary',
          icon: 'mdi-account-circle',
          subtitle: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?',
          time: '3 min'
        },
        {
          title: 'Summer BBQ',
          color: 'success',
          icon: 'mdi-email-outline',
          subtitle: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?',
          time: '3 min'
        },
        {
          title: 'Oui oui',
          color: 'teal lighten-1',
          icon: 'mdi-airplane-landing',
          subtitle: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?',
          time: '4 min'
        },
        {
          title: 'Disk capacity is at maximum',
          color: 'teal accent-3',
          icon: 'mdi-server',
          subtitle: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?',
          time: '3 hr'
        },
        {
          title: 'Recipe to try',
          color: 'blue-grey lighten-2',
          icon: 'mdi-noodles',
          subtitle: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?',
          time: '8 hr'
        }
      ]
    }
  },
  watch: {
    '$auth.isLoading' (newCount, oldCount) {
      console.log(`tabla consultas - We have ${newCount} fruits now, yay!. ${oldCount}`)
      if (newCount === false) {
        console.log('Cargar notificaciones: ', this.$store.state.app.datosUsuario.user_id)
      }
    }
  },
  mounted() {
    if (this.$auth.isLoading === false) {
      console.log('this.$store.state.app.datosUsuario notificacion: ', this.$store.state.app.datosUsuario.user_id)
      this.cargarNotificaciones(this.$store.state.app.datosUsuario.user_id)
    }
  },
  methods: {
    texto() {
      console.log('texto')
    },  
    devolverFecha(fecha) {
      const ahora = this.$moment().format('YYYY-MM-DD[T]HH:mm:ss')
      const creacion = this.$moment(fecha)

      console.log('fecha: ', fecha)
      console.log('ahora: ', ahora)
      console.log('creacion: ', creacion)
      const transcurrido =  this.$moment().diff(fecha,'minutes')

      if (transcurrido > 1440) {
        console.log('dias')

        return `Hace ${this.$moment().diff(fecha,'days')} dias`
      } else if (transcurrido > 60) {
        console.log('horas')

        return `Hace ${this.$moment().diff(fecha,'hours')} horas`
      } else {
        console.log('miutos')

        return `Hace ${this.$moment().diff(fecha,'minutes')} minutos`
      }
    },
    mostrarIcono(tipo) {
      console.log('tipo: ', tipo)
      // eslint-disable-next-line eqeqeq
      if (tipo == 1) {
        return 'mdi-alert-circle'
      } else {
        return 'mdi-information'
      }
    },
    async cargarNotificaciones(usu_fk) {
      try {
        console.log('try subscription Notificaciones')
        console.log('usu_fk: ', usu_fk)
        const resp = await getNotificaciones(Number(usu_fk))
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const _this = this 

        console.log('_this: ', _this)
        console.log('this: ', this)
        resp.subscribe({
          next (data) {
            console.log('suscribe notificaciones ', data.data.kangusoft_not)

            _this.asignarValor()
            _this.notificaciones = JSON.parse(JSON.stringify(data.data.kangusoft_not))
            // console.log('data.data.kangusoft_usu[0].activo: ', data.data.kangusoft_usu[0].activo)
            // if (data.data.kangusoft_usu[0].activo === false) {
            //   console.log('object')
            // }
          },
          error (error) {
            console.error(error)
          } 
        })
      } catch (error) {
        console.log('error: ', error)
      }
    },
    asignarValor() {
      console.log('asignar valor: ')
    }
  }
}
</script>
