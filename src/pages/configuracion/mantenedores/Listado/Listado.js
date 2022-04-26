/* eslint-disable */
import BotonMantenedor from "../../../../components/configuracion/mantenedores/Boton/Boton.vue";
import TablaMantenedor from "../../../../components/configuracion/mantenedores/Tabla/Tabla.vue";
import gql from "graphql-tag";

const GETPAGO = gql`
  query {
    kangusoft_forma_pago {
      nombre
      id
      editable
    }
  }
`;
const GETDESPACHO = gql`
 query MyQuery {
  
  kangusoft_desp_tipo {
    nombre
    id
  }
}
`;
const GETMONEDA = gql`
 query {
  kangusoft_moneda {
    activo
    id
    nombre
  }
}
`;
const GETCELULAS = gql`
  query {
  kangusoft_cg_unidad {
    activa
    fec_creacion
    id
    nombre
    usu_creacion_fk
  }
}
`;
const GETCGESTADO = gql`
query {
  kangusoft_cg_estado {
    id
    nombre
  }
}`
const GETBOTONES = gql`
  query {
    kangusoft_mantendores {
      icono
      id
      link
      nombre
    }
  }
`;
export default {
  mounted() {
    this.cargarBotones();
    // alert('COMPONENTE')
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    // kangusoft_mantendores2: {
    //   query() {
    //     return GETPAGO;
    //   },
    //   update: (data) => data.kangusoft_mantendores,
    // },
    // kangusoft_mantendores: {
    //   query() {
    //     return GETBOTONES;
    //   },
    //   update: (data) => data.kangusoft_mantendores,
    // },
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
      this.listaMantenedores = data.kangusoft_mantendores;
      console.log(this.listaMantenedores);
    },
    async cargarMantenedor(mantenedor) {
      this.idMantenedor = mantenedor.id
      this.mostrarTablaMantendedor = false
      console.log("ESTOY EN MANTENEDOR", mantenedor);
      switch (mantenedor.id) {
        case 1:
          let data  = await this.$apollo.query({
            query: GETPAGO,
          });
          this.listaMantenedor = data.data.kangusoft_forma_pago;
          console.log(data);
          break;
        case 2:
          let data1 = await this.$apollo.query({
            query: GETDESPACHO,
          });
          this.listaMantenedor = data1.data.kangusoft_desp_tipo;
          console.log(data1)
          console.log(this.listaMantenedor);
          break;
        case 3:
          let data2 = await this.$apollo.query({
            query: GETMONEDA,
          });
          this.listaMantenedor = data2.data.kangusoft_moneda;
          console.log("aaa",this.listaMantenedor);
          break;
          case 4:
          let data4 = await this.$apollo.query({
            query:  GETCGESTADO,
          });
          this.listaMantenedor = data4.data.kangusoft_cg_estado;
          console.log("aaa",this.listaMantenedor);
          break;
        case 5:
         
          let data3 = await this.$apollo.query({
            query: GETCELULAS,
          });
          this.listaMantenedor = data3.data.kangusoft_cg_unidad;
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
