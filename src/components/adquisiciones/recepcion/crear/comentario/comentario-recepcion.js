/* eslint-disable */

export default {
    components: {
     
      },
    mounted() {
    }, 
    props: {
      comentario:{
        type:String
      },
      vista: {
        type:String
      },
      _comentario:{
        type:Function
      },
    },
    data() {
      return {
        comentario:'',
      };
    },
    methods: {
      cargarComentario(){
        this._comentario(this.comentario)
        console.log('comentario:', this.comentario)
      },
    }
}