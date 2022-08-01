/* eslint-disable */

export default {
    components: {

      },
      props: {
        nombre: String,
        },
    mounted() {
    },
    data() {
      return {
       respEdicion: ''
      };
    },
    methods: {
      habilitarEdicion(){
       this.respEdicion = true
       this.$emit('modal', this.respEdicion);
      }
    }
}