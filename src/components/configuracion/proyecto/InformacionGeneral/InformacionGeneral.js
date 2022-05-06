/* eslint-disable */
import gql from "graphql-tag";
const GETMONEDA = gql`
  query {
    kangusoft_emp_mon(where: { activo: { _eq: true }, mon: {} }) {
      id
      emp_fk
      mon {
        nombre
      }
    }
  }`
  const GETCELULAS = gql`
  query {
    kangusoft_pro_uni(where: {activo: {_eq: true}}) {
    id
    nombre
    activo
  }
  }`
  const GETESTADO = gql`
  query {
    kangusoft_pro_est {
    nombre
    id
  }
  }`
  
  const GETFLAGS = gql`
  query {
    kangusoft_fla(where: {activo: {_eq: true}}) {
    id
    nombre
  }
  }`
   const GETREGION = gql`
   query {
    kangusoft_reg {
    nombre
    id
  }
   }`
    const GETCOMUNAS = gql`
   query($id: bigint!){
   kangusoft_prov(where: {reg_fk: {_eq: $id}}) {
    coms {
      nombre
      id
    }
  }}`
  ;

export default {
  data() {
    return {
      select: ["Vuetify", "Programming"],
      items: ["Programming", "Design", "Vue", "Vuetify"],
      headers: [
        {
          text: "Codigo",
          align: "start",
          sortable: false,
          value: "n",
        },
        { text: "Nombre", value: "name" },
        { text: "Cantidad", value: "fat" },
        { text: "Unidad Formato", value: "u" },
        { text: "Valor Unitario", value: "f" },
        { text: "Valor Total", value: "t" },
        { text: "% del Presupuesto", value: "carbs" },
      ],
      desserts: [
        {
          name: "Casco Rojo",
          n: 4132,
          fat: "145",
          carbs: "55%",
          u: "UNIDAD",
          f: "$890",
          t: "$19202",
        },
      ],
      editedIndex: -1,
      usuario: {
        firma: "",
      },
      defaultSelected: {
        name: "John",
        last: "Doe",
      },
      people: [
        {
          name: "John",
          last: "Doe",
        },
        {
          name: "Harry",
          last: "Potter",
        },
        {
          name: "George",
          last: "Bush",
        },
      ],
      infoGeneralProyecto: {
        nombre: "",
        codigo: "",
        celulas: "",
        valorC: "",
        presupuestoObra: "",
        estado: "",
        monedaGeneral: "",
        flag: "",
        monedaPersonalizada: "",
        ocInicial: "",
        descripcion: "",
        imagen: "",
      },
      infoDireccionProyecto: {
        region: "",
        comuna: "",
        direccion: "",
      },
      infoMandanteProyecto: {
        mandante: "",
      },
      monedero: {},
      celulas: {},
      estado:{},
      flags:{},
      region:{},
      comuna:[],
      a:[]
    };
  },
  mounted() {
    this.cargarMonedas();
    this.cargarCelulas();
    this.cargarEstado(); 
    this.cargarFlags();
    this.cargarRegiones();
  },
  methods: {
    previewFirma() {
      this.url2 = URL.createObjectURL(this.usuario.firma);
    },
    eliminarFirma() {
      this.url2 = null;
    },
    async cargarMonedas() {
      const data = await this.$apollo.query({
        query: GETMONEDA,
      });
      this.monedero = data.data.kangusoft_emp_mon;
      console.log("moneda:", this.monedero);
    },
    async cargarCelulas() {
      const data = await this.$apollo.query({
        query: GETCELULAS,
      });
      this.celulas = data.data.kangusoft_pro_uni;
      console.log("celulas:", this.celulas);
    },
    async cargarEstado() {
      const data = await this.$apollo.query({
        query: GETESTADO,
      });
      this.estado = data.data.kangusoft_pro_est;
      console.log("celulas:", this.celulas);
    },
    async cargarFlags() {
      const data = await this.$apollo.query({
        query: GETFLAGS,
      });
      this.flags = data.data.kangusoft_fla;
      console.log("celulas:", this.flags);
    },
    async cargarRegiones() {
      const data = await this.$apollo.query({
        query: GETREGION,
      });
      this.region = data.data.kangusoft_reg;
      console.log("region:", this.region);
    },
    async cargarComunas(id){
      this.comuna=[]
      const data = await this.$apollo.query({
        query: GETCOMUNAS,
        variables:{
          'id': id
        }
      });
      this.a = data.data.kangusoft_prov
      for(let a of this.a){
        for(let b of a.coms){
          console.log("final",b)
          this.comuna.push(b)
        }
      }
     
      console.log("comuna:", this.comuna);
    }
  },
};
