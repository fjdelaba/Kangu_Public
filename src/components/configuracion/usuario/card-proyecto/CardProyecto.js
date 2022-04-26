export default {
  name: 'card-proyectos',
  data() {
    return {
      proyectoSinImagen:[
        'https://kangufiles.nyc3.digitaloceanspaces.com/kangu/oso2.jpeg',
        'https://kangufiles.nyc3.digitaloceanspaces.com/kangu/oso3.jpeg',
        'https://kangufiles.nyc3.digitaloceanspaces.com/kangu/oso1.jpeg',
        'https://kangufiles.nyc3.digitaloceanspaces.com/kangu/pikachu.jpeg'
      ]
    }
  },
  props:{
    proyectos:[]
  },
  computed:{
    cpxImagenAleatoria() {
      // return this.proyectoSinImagen[Math.floor(Math.random() * this.proyectoSinImagen.length)]
      return Math.floor(Math.random() * this.proyectoSinImagen.length)
    }
  },
  methods: {
    randomImage () {
      return this.proyectoSinImagen[Math.floor(Math.random() * this.proyectoSinImagen.length)]
    }
  }
}