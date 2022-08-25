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
        comentarioPedido:'',
      };
    },
    methods: {
      cargarComentario(){
        this._comentario(this.comentarioPedido)
        console.log('comentario:', this.comentarioPedido)
      },
    }
}