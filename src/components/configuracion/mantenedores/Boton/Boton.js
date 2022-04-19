/* eslint-disable */
export default {
  props: {
   botones: Array
  },
 
 
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    mostrarMantenedor(){
      console.log("dialog:")
      this.dialogVisible = true
      if(this.dialogVisible == true){
       alert("HOLA")
      }
    }
  }
 
}