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
  }
`;
const GETCELULAS = gql`
  query {
    kangusoft_pro_uni(where: { activo: { _eq: true } }) {
      id
      nombre
      activo
    }
  }
`;
const GETESTADO = gql`
  query {
    kangusoft_pro_est {
      nombre
      id
    }
  }
`;

const GETFLAGS = gql`
  query {
    kangusoft_fla(where: { activo: { _eq: true } }) {
      id
      nombre
    }
  }
`;
const GETREGION = gql`
  query {
    kangusoft_reg {
      nombre
      id
    }
  }
`;
const GETCOMUNAS = gql`
  query ($id: bigint!) {
    kangusoft_prov(where: { reg_fk: { _eq: $id } }) {
      coms {
        nombre
        id
      }
    }
  }
`;
const INSERTFLAGS = gql`
  mutation insertflags($flags: [kangusoft_pro_fla_insert_input!]!) {
    insert_kangusoft_pro_fla(objects: $flags) {
      returning {
        pro_fk
        fla_fk
      }
    }
  }
`;
const INSERTCELULAS = gql`
  mutation insertcelulas($celulas: [kangusoft_pro_prouni_insert_input!]!) {
    insert_kangusoft_pro_prouni(objects: $celulas) {
      affected_rows
    }
  }
`;
const INSERTPROYECTO = gql`
  mutation insertProyecto(
    $nombre: String!
    $pro_est_fk: bigint!
    $valor_contractual: numeric!
    $com_fk: bigint!
    $direccion: String!
    $ent_fk: bigint!
    $usu_fk: bigint!
    $fec_creacion: timestamp!
    $inicio_oc: bigint!
    $emp_fk: bigint!
    $emp_mon_fk: bigint!
    $codigo: String!
    $descripcion: String!
    $presupuesto: numeric!
  ) {
    insert_kangusoft_pro(
      objects: {
        nombre: $nombre
        pro_est_fk: $pro_est_fk
        valor_contractual: $valor_contractual
        com_fk: $com_fk
        direccion: $direccion
        ent_fk: $ent_fk
        fec_creacion: $fec_creacion
        usu_fk: $usu_fk
        inicio_oc: $inicio_oc
        emp_fk: $emp_fk
        emp_mon_fk: $emp_mon_fk
        codigo: $codigo
        descripcion: $descripcion
        presupuesto: $presupuesto
      }
    ) {
      returning {
        id
        nombre
      }
    }
  }
`;

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
      estado: {},
      flags: {},
      region: {},
      comuna: [],
      a: [],
      usuLogin: "",
      fecha: "",
      aut0: "",
      finalFlag: [],
      finalCelulas:[]
    };
  },
  mounted() {
    this.cargarMonedas();
    this.cargarCelulas();
    this.cargarEstado();
    this.cargarFlags();
    this.cargarRegiones();
    this.aut0 = this.$auth.user["https://kangusoft.cl/jwt/hasura"].user_tenant;
    this.usuLogin = this.$auth.user["https://kangusoft.cl/jwt/hasura"].user_id;
    this.fecha = this.$moment(new Date()).format();
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

      console.log("USUARIO:", this.usuLogin, "aut0:", this.aut0);
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
    async cargarComunas(id) {
      this.comuna = [];
      const data = await this.$apollo.query({
        query: GETCOMUNAS,
        variables: {
          id: id,
        },
      });
      this.a = data.data.kangusoft_prov;
      for (let a of this.a) {
        for (let b of a.coms) {
          console.log("final", b);
          this.comuna.push(b);
        }
      }

      console.log("comuna:", this.comuna);
    },
    async guardarInformacion() {
      console.log("INFO GENERAL");
      const { data } = await this.$apollo.mutate({
        mutation: INSERTPROYECTO,
        variables: {
          emp_fk: this.aut0,
          nombre: this.infoGeneralProyecto.nombre,
          pro_est_fk: this.infoGeneralProyecto.estado,
          valor_contractual: this.infoGeneralProyecto.valorC,
          com_fk: this.infoDireccionProyecto.comuna,
          direccion: this.infoDireccionProyecto.direccion,
          ent_fk: 350,
          fec_creacion: this.fecha,
          usu_fk: this.usuLogin,
          inicio_oc: this.infoGeneralProyecto.ocInicial,
          codigo: this.infoGeneralProyecto.codigo,
          emp_mon_fk: this.infoGeneralProyecto.monedaGeneral,
          descripcion: this.infoGeneralProyecto.descripcion,
          presupuesto: this.infoGeneralProyecto.presupuestoObra,
        },
      });
      console.log("INSERT PROYECTO", data);
      console.log("ID PROYECTO", data.insert_kangusoft_pro.returning[0].id);
      console.log("FLAG", this.infoGeneralProyecto.flag);
      for (let a of this.infoGeneralProyecto.flag) {
        console.log("a", a)
        console.log("FLAG", data.insert_kangusoft_pro.returning[0].id)
        this.finalFlag.push({pro_fk: data.insert_kangusoft_pro.returning[0].id,fla_fk: a});
      }
      for (let b of this.infoGeneralProyecto.celulas) {
        console.log("b", b)
        console.log("FLAG", data.insert_kangusoft_pro.returning[0].id)
        this.finalCelulas.push({pro_fk: data.insert_kangusoft_pro.returning[0].id,pro_uni_fk: b});
      }
      console.log("VA",this.finalFlag)

      const data2 = await this.$apollo.mutate({
        mutation: INSERTFLAGS,
        variables: {
          flags: this.finalFlag,
        },
      });
      const data3 = await this.$apollo.mutate({
        mutation: INSERTCELULAS,
        variables: {
          celulas: this.finalCelulas,
        },
      });
      console.log("INSERT flags", data2);
      console.log("INSERT CELULAS", data3);
    },
  },
};
