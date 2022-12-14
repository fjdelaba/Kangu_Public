/* eslint-disable */
import BotonMantenedor from "../../../../components/configuracion/mantenedores/Boton/Boton.vue";
import TablaMantenedor from "../../../../components/configuracion/mantenedores/Tabla/Tabla.vue";
import  {GETCATEGORIASPRO,GETCATEGORIASOC,QUERY_FORMA_PAGO,GETBOTONES,GETCGESTADO,GETCELULAS,GETMONEDA,GETDESPACHO,getFormaPago}  from "../../../../components/graphql/querys/configuracion.js"
import Skeleton from "../../../../components/general/skeleton/skeleton.vue"

export default {
  mounted() {
    this.cargarBotones();
    // alert('COMPONENTE')
  },
  data() {
    return {
      listaMantenedores: "",
      listaMantenedor: [],
      mostrarTablaMantendedor:true,
      idMantenedor:0,
      skeleton: true
    };
  },
  methods: {
    async cargarBotones() {
      const { data } = await this.$apollo.query({
        query: GETBOTONES,
      });
      this.listaMantenedores = data.kangusoft_man;
      for(let man of this.listaMantenedores){
        console.log("man",man)
        if(man.id == 5){
          this.listaMantenedores.splice(3, 1)
        }
      }
   
      this.skeleton = false
      console.log("mante",this.listaMantenedores);
    },
    async cargarMantenedor(mantenedor) {
      this.idMantenedor = mantenedor.id
      this.mostrarTablaMantendedor = false
      console.log("ESTOY EN MANTENEDOR", mantenedor);
      switch (mantenedor.id) {
        case 2:
          this.listaMantenedor = []
          console.log( this.listaMantenedor);
          let data  = await this.$apollo.query({
            query: QUERY_FORMA_PAGO,
          });
          this.listaMantenedor = data.data.kangusoft_for_pag;
          console.log(data);
          break;
        case 3:
          this.listaMantenedor = []
          let data1 = await this.$apollo.query({
            query: GETDESPACHO,
          });
          this.listaMantenedor = data1.data.kangusoft_des_tip;
          console.log(data1)
          console.log(this.listaMantenedor);
          break;
        case 4:
          this.listaMantenedor = []
          let data2 = await this.$apollo.query({
            query: GETMONEDA,
          });
          for(let moneda of data2.data.kangusoft_emp_mon){
            console.log("mon",moneda)
            this.listaMantenedor.push({activo:moneda.activo,id:moneda.id,nombre:moneda.mon.nombre})
          }
        
          console.log("aaa",this.listaMantenedor);
          break;
        case 6:
          this.listaMantenedor = []
          let data3 = await this.$apollo.query({
            query: GETCELULAS,
          });
          this.listaMantenedor = data3.data.kangusoft_pro_uni;
          console.log(this.listaMantenedor);
          break;
          case 7:
            this.listaMantenedor = []
            let data4 = await this.$apollo.query({
              query: GETCATEGORIASPRO,
            });
            this.listaMantenedor = data4.data.kangusoft_fla;
            console.log('mantenedor query',this.listaMantenedor);
            break;
        
          case 8:
            this.listaMantenedor = []
            let data5 = await this.$apollo.query({
              query: GETCATEGORIASOC,
            });
            this.listaMantenedor = data5.data.kangusoft_fla;
       
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
    Skeleton
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
