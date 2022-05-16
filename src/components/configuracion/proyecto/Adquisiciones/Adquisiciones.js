/* eslint-disable */
import gql from "graphql-tag";
const GETUSUARIO = gql`
  query {
    kangusoft_usu(where: { emp_fk: { _eq: "1" } }) {
      id
      email
      nombre
      apellidos
    }
  }
`;
export default {
  data() {
    return {
      celulasRules: [
        (v) => !!v || 'Este Campo es Obligatorio'
      ],
      select: ["Vuetify", "Programming"],
      items: ["Programming", "Design", "Vue", "Vuetify"],
      items2: ["24 HORAS", "48 HORAS"],
      usuario: [],
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "Hasta", value: "monto", filterable: true, sortable: true },
        { text: "Tiempo de Aprobación", value: "tiempo" },
        { text: "Accion", value: "actions" },
      ],
      headers2: [
        { text: "Nombre", value: "nombre" },
        { text: "Monto Máximo de Compra", value: "monto" },
        { text: "Accion", value: "actions" },
      ],
      desserts: [],
      tablaCompradores: [],
      dialog: false,
      dialogo: false,
      dialog0: false,
      dialogDelete: false,

      editedIndex: -1,
      editedItem: {
        name: "",
        n: "",
        fat: "",
        carbs: "",
      },
      aux: "",
      habilitar: false,
      tenant: "",
      usuariosPedido: {
        usuAdmin: "",
        usuSolicitante: "",
        usuAprobador: "",
      },
      usuarioAprobador: {
        usuario: "",
        monto: "",
        tiempo: "",
      },
      usuariosCompradores: {
        usuario: "",
        monto: "",
      },
      tablaAprobador: [],
      tablaAprobadorFinal: [],
      aprobadorFinal: true,
      usuarioLogin: "",
      selectUsuario: [],
    };
  },
  mounted() {
    this.cargarUsuarios();
    this.usuarioLogin =
      this.$auth && this.$auth.user["https://kangusoft.cl/jwt/hasura"].user_id;
    this.tenant =
      this.$auth &&
      this.$auth.user["https://kangusoft.cl/jwt/hasura"].user_tenant;
  },
  computed: {
    cpxUsuariosAprobadores() {
      return this.usuario.filter((el) => {
        return this.tablaAprobador.some((f) => {
          return f.nombre.id === el.userid && f.projectid === el.projectid;
        });
      });
    },
    cpxAprobadorFinal() {
      let cont = 0;
      for (let apro of this.tablaAprobador) {
        if (apro.apro_final == true) {
          cont++;
        }
      }
      return this.tablaAprobador.length == 0 || cont == 0;
    },
    cpxTablaOrdenada() {
      let tablaOrdenada = this.tablaAprobador.sort(function (a, b) {
        return parseFloat(a.monto) - parseFloat(b.monto);
      });
      let final = this.tablaAprobador[0];
      this.tablaAprobador.push(final);
      this.tablaAprobador.shift();
      return tablaOrdenada;
    },
    cpxTablaOrdenadaComprador() {
      let tablaOrdenada = this.tablaCompradores.sort(function (a, b) {
        return parseFloat(a.monto) - parseFloat(b.monto);
      });
      let final = this.tablaCompradores[0];
      this.tablaCompradores.push(final);
      this.tablaCompradores.shift();
      return tablaOrdenada;
    },
    cpxUsuariosAprobadoresFiltrados() {
      return this.usuario.filter(
        (obj1) =>
          !this.tablaAprobador.find((obj2) => {
            console.log("obj1:", obj1, "obj2:", obj2);
            return obj1.id == obj2.usu_apro_fk;
          })
      );
    },
  },
  methods: {
    agregarAprobador() {
      const aprobador = {
        nombre:
          this.usuarioAprobador.usuario.nombre +
          " " +
          this.usuarioAprobador.usuario.apellidos,
        monto: this.aprobadorFinal == true ? 0 : this.usuarioAprobador.monto,
        tiempo: this.aprobadorFinal == true ? 0 : this.usuarioAprobador.tiempo,
        usu_apro_fk: this.usuarioAprobador.usuario.id,
        mod_fk: 3,
        usu_fk: this.usuarioLogin,
        flujo: true,
        apro_final: this.aprobadorFinal,
      };
      console.log("aprobador", aprobador);
      this.tablaAprobador.push(aprobador);
      this.tablaCompradores = Object.values(this.tablaAprobador);
      console.log("dessert:", this.tablaCompradores);
      if (this.validarAprobadorFinal() == true) {
        this.aprobadorFinal = false;
      }
      this.limpiarFormUsuarios();
    },

    //TODO: RETORNA TRUE SI EXISTE APROBADOR
    validarAprobadorFinal() {
      let cont = 0;
      for (let apro of this.tablaAprobador) {
        if (apro.apro_final == true) {
          cont++;
        }
      }
      return cont > 0;
    },

    async cargarUsuarios() {
      const data = await this.$apollo.query({
        query: GETUSUARIO,
      });
      this.usuario = data.data.kangusoft_usu;
      this.selectUsuario = data.data.kangusoft_usu;

      console.log("usuarios:", this.usuario);
    },
    guardarNuevoItem() {
      // if (this.tablaAprobador.length > 0) {
      //   for (let usu of this.tablaAprobador) {
      //     console.log("USUARIO primer if:", usu);
      //     if (usu.nombre.id == this.usuariosAprobadores.nombre.id) {
      //       alert("NO PUEDES REPETIR UN USUARIO");
      //       return (this.usuariosAprobadores = {
      //         nombre: "",
      //         monto: "",
      //         tiempo: "",
      //       });
      //     }
      //   }
      // }
      // for (let usu of this.usuario) {
      //   console.log("USUARIO for :", usu);
      //   if (usu.id == this.usuariosAprobadores.nombre.id) {
      //     this.tablaAprobador.push(this.usuariosAprobadores);
      //     this.tablaCompradores = Object.values(this.tablaAprobador);
      //     this.usuariosAprobadores = {
      //       nombre: "",
      //       monto: "",
      //       tiempo: "",
      //     };
      //   }
      //   if (this.tablaAprobador.length == 1) {
      //     this.tablaAprobadorFinal = Object.values(this.tablaAprobador);
      //   }
      // }
      // this.cargarUsuarios();
      // console.log("this apro", this.tablaAprobador);
      // console.log("this tablaCompradores", this.tablaCompradores);
      console.log("vmodel", this.usuariosAprobadores);
    },
    guardarNuevoItem2() {
      console.log("usu comprador:", this.usuariosCompradores.nombre);
      const comprador = {
        nombre:this.usuariosCompradores.usuario.nombre ,
        apr_tip_fk: 3,
        usu_fk: this.usuarioLogin,
        pro_fk: 1,
        usu_apro_fk: this.usuariosCompradores.usuario.id,
        monto: this.usuariosCompradores.monto,
      };
      console.log("comprador", comprador);
      this.tablaCompradores.push(comprador);
      // this.tablaCompradores = Object.values(this.tablaAprobador)
      console.log("dessert:", this.tablaCompradores);

      this.limpiarFormUsuarios();
      this.close();
    },
    close() {
      this.dialog = false;
      this.dialogo = false;
      this.dialog0 = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.limpiarFormUsuarios();
    },
    limpiarFormUsuarios() {
      this.usuarioAprobador = {
        usuario: "",
        monto: "",
        tiempo: "",
      };
    },
    deleteItem(item) {
      this.editedIndex = this.tablaAprobador.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.tablaAprobador.splice(this.editedIndex, 1);
      this.tablaCompradores.splice(this.tablaAprobador, 1);
      if (this.validarAprobadorFinal() == false) {
        this.aprobadorFinal = true;
      }
    },
    deleteItem2(item) {
      this.editedIndex = this.tablaCompradores.indexOf(item);
      this.editedItem = Object.assign({}, item);
      let cont = 0 
      for(let usu of this.tablaAprobador){
        console.log("usu",usu)
        console.log("usu edit",this.editedItem)
       if(item.usu_apro_fk == usu.usu_apro_fk){
         cont++
       }
      }
    
      if (cont > 0) {
        this.dialog0 = true;
      } else {
        console.log("entre else")
        this.tablaCompradores.splice(this.editedIndex, 1);
        if (this.validarAprobadorFinal() == false) {
          this.aprobadorFinal = true;
        }
      }
    
    },

    async guardarAdquisiciones(){
      console.log("aprobador:",this.tablaAprobador)
      let aprobadores = []
      let compradores = []
      for(let a of this.tablaAprobador){
        console.log("a",a)
      aprobadores.push({apr_tip_fk:3,monto:a.monto,tiempo:a.tiempo,usu_fk:this.usuarioLogin,pro_fk:'',flujo:a.flujo,mon_fk:'',usu_apro_fk:a.usu_apro_fk,apro_final:a.apro_final})  
      console.log("apro:", aprobadores)  
    }
    for(let b of this.tablaCompradores){
      compradores.push({apr_tip_fk:3,usu_fk:this.usuarioLogin,pro_fk:'',usu_apro_fk:b.usu_apro_fk,monto:b.monto})
      console.log("b",b)
    }
      // const aproPed = {
      //   usu_apro_fk:this.usuariosPedido.usuAprobador.id,
      //   usu_fk:this.usuarioLogin,
      //   apr_tip_fk: 1,
      //   tiempo:''
      // }
      // const { data } = await this.$apollo.mutate({
      //   mutation: INSERTINFORMACIONGENERAL ,
      //   variables: {
      //   aprobador:this.tablaAprobador,
      //   comprador:this.tablaCompradores
      //   }
      //  })
  },
}
};
