/* eslint-disable */
import BotonMantenedor from "../../../../components/configuracion/mantenedores/Boton/Boton.vue";
import TablaMantenedor from "../../../../components/configuracion/mantenedores/Tabla/Tabla.vue";
import  {QUERY_FORMA_PAGO,GETBOTONES,GETCGESTADO,GETCELULAS,GETMONEDA,GETDESPACHO,getFormaPago}  from "../../../../components/graphql/querys/configuracion.js"


export default {
  mounted() {
    this.cargarBotones();
    // alert('COMPONENTE')
  },
  data() {
    return {
      listaMantenedores: "",
      listaMantenedor: "",
      mostrarTablaMantendedor:true,
      idMantenedor:0
    };
  },
  methods: {
    async cargarBotones() {
      const { data } = await this.$apollo.query({
        query: GETBOTONES,
      });
      this.listaMantenedores = data.kangusoft_man;
      console.log(this.listaMantenedores);
    },
    async cargarMantenedor(mantenedor) {
      this.idMantenedor = mantenedor.id
      this.mostrarTablaMantendedor = false
      console.log("ESTOY EN MANTENEDOR", mantenedor);
      switch (mantenedor.id) {
        case 2:
          console.log( this.listaMantenedor);
          let data  = await this.$apollo.query({
            query: QUERY_FORMA_PAGO,
          });
          this.listaMantenedor = data.data.kangusoft_for_pag;
          console.log(data);
          break;
        case 3:
          let data1 = await this.$apollo.query({
            query: GETDESPACHO,
          });
          this.listaMantenedor = data1.data.kangusoft_des_tip;
          console.log(data1)
          console.log(this.listaMantenedor);
          break;
        case 4:
          let data2 = await this.$apollo.query({
            query: GETMONEDA,
          });
          this.listaMantenedor = data2.data.kangusoft_mon;
          console.log("aaa",this.listaMantenedor);
          break;
          case 5:
          let data4 = await this.$apollo.query({
            query:  GETCGESTADO,
          });
          this.listaMantenedor = data4.data.kangusoft_pro_est;
          console.log("aaa",this.listaMantenedor);
          break;
        case 6:
         
          let data3 = await this.$apollo.query({
            query: GETCELULAS,
          });
          this.listaMantenedor = data3.data.kangusoft_pro_uni;
          console.log(this.listaMantenedor);
          break;
        default:
          break;
      }
      this.mostrarTablaMantendedor = true
    },
  },
  computed:{
    cpxMostrarMantenedor(){
      return this.listaMantenedor.length > 0 && this.mostrarTablaMantendedor
    }
  },
  components: {
    BotonMantenedor,
    TablaMantenedor,
  },
  watch: {
    // whenever question changes, this function will run
    question(newQuestion, oldQuestion) {
      if (newQuestion.indexOf('?') > -1) {
        this.getAnswer()
      }
    }
  },
};
