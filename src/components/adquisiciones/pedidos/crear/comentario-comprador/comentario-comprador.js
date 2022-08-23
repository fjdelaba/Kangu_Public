/* eslint-disable */

export default {
    components: {
     
      },
    mounted() {
    }, 
    props: {
     
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