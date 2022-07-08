<template>
  <v-list nav dense>
    <div v-for="(item, index) in menu" :key="index">
      <div v-if="item.key || item.text" class="pa-1 mt-2 overline">{{ item.key ? $t(item.key) : item.text }}</div>
      <nav-menu :menu="item.items" />
    </div>
  </v-list>
</template>

<script>
import NavMenu from './NavMenu'

export default {
  components: {
    NavMenu
  },
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    //ASINGACION DE PERMISOS
    // console.log('menu MainMenu: ',this.menu)
    for (const i in this.menu) {
      // console.log('men: ', i)
      // console.log('men: ', this.menu[i])
      // eslint-disable-next-line eqeqeq
      if ( i == 1) {
        // console.log('adquisiciones')
        for (const men of this.menu[i].items) {
          // console.log('men: ', men)
          // if(men.ley === 'menu.pedido' &&){

          // }
        }
      // eslint-disable-next-line eqeqeq
      } else if (i == 2) {
        // console.log('configuracion')
      }
    }
  }
}
</script>
