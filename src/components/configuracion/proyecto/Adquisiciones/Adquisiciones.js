/* eslint-disable */
import {postProyectoAdquisiciones, getAprobadoresProyecto,getUsuariosProyecto} from '../../../../graphql/configuracion.js'
import gql from "graphql-tag";
import { apolloClient } from '../../../../client.js';
const GETUSUARIO = gql`
  query {
    kangusoft_usu {
      id
      email
      nombre
      apellidos
    }
  }
`;
export default {
  props: {
    id: Number,
    detalle:Boolean,
    idproyecto: Number
},
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
      headers4: [
        { text: "Nombre", value: "usu.nombre" },
        { text: "Hasta", value: "monto", filterable: true, sortable: true },
        { text: "Tiempo de Aprobación", value: "tiempo" },
        { text: "Accion", value: "actions" },
      ],
      headers2: [
        { text: "Nombre", value: "nombre" },
        { text: "Monto Máximo de Compra Directa", value: "monto" },
        { text: "Accion", value: "actions" },
      ],
      headers3: [
        { text: "Nombre", value: "usu.nombre" },
      ],
      desserts: [],
      tablaCompradores: [],
      dialog: false,
      dialogo: false,
      dialog0: false,
      dialogDelete: false,
      active:'',
      editedIndex: -1,
      editedItem: {
        name: "",
        n: "",
        fat: "",
        carbs: "",
      },
      otrosUsuarios:'',
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
      proyectoSeleccionado:'',
      tablaDetalleApro:[],
      tablaSolicitantesPed:[],
      tablaOtrosUsuarios:[],
      tablaAprobadores:[],
      guardarEdicion: false,
    };
  },
  mounted() {
    setTimeout(() => {
      console.log("this.idproyectoSeleccionado",this.idproyecto)
      console.log("this.idproyectocreado",this.id)
      if(this.detalle == true){
        this.proyectoSeleccionado =this.idproyecto
        this.cargarAprobadores()
        this.cargarUsuariosTotal()
      }
    }, 2000);
  
    this.cargarUsuarios();
    this.usuarioLogin =
      this.$auth && this.$auth.user["https://kangusoft.cl/jwt/hasura"].user_id;
    this.tenant =
      this.$auth &&
      this.$auth.user["https://kangusoft.cl/jwt/hasura"].user_tenant;
  },
  computed: {
    cpxReadOnly(){
     if(this.detalle == true){
       return true
     } else{
       return false
     }
    },
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
    editarAdquisiciones() {
      this.detalle = false
      this.guardarEdicion = true
    },
    async cargarUsuariosTotal(){
      let soli = {}
      let solicitantesPed = []
      let obs = {}
      let usuariosObservadores = []
      const { data : {kangusoft_pro_usu_per}} = await getUsuariosProyecto(this.proyectoSeleccionado)
        for(let usu of kangusoft_pro_usu_per){
          console.log("usu",usu)
          if(usu.usu_per_fk == 5){
            console.log("SOLICITANTE")
            this.tablaSolicitantesPed.push(usu)
          }
          if(usu.usu_per_fk == 5 && this.detalle == true){
            console.log("SOLICITANTE")
            soli.id = usu.id
            soli.nombre = usu.usu.nombre
            soli.apellidos = usu.usu.apellidos
            console.log("usu soli:",soli)

            solicitantesPed.push(soli)
            this.usuariosPedido.usuSolicitante = solicitantesPed
          }
          if(usu.usu_per_fk == 7 && this.detalle == true){
            console.log("SOLICITANTE")
            obs.id = usu.id
            obs.nombre = usu.usu.nombre
            obs.apellidos = usu.usu.apellidos
            console.log("usu soli:",soli)

            usuariosObservadores.push(obs)
            this.otrosUsuarios = usuariosObservadores
          }
          if(usu.usu_per_fk == 7){
            console.log("OBSERVADOR")
            this.tablaOtrosUsuarios.push(usu)
          }
        
        }
        
 
      },
   async cargarAprobadores(){
     let usuAprobadorPed = {}
    const { data : {kangusoft_apr}} = await getAprobadoresProyecto(this.proyectoSeleccionado)
    for (let apro of kangusoft_apr){
      if(apro.mod_fk == 1){
        console.log("apro",apro)
        this.tablaDetalleApro.push(apro)
      }
      if(this.detalle == true && apro.mod_fk == 1){
        console.log("entre")
        usuAprobadorPed.id = apro.id
        usuAprobadorPed.nombre = apro.usu.nombre
        usuAprobadorPed.apellidos = apro.usu.apellidos
        this.usuariosPedido.usuAprobador = usuAprobadorPed
        
       
      }
      if(apro.mod_fk == 3 && apro.monto == 0){
        this.tablaAprobadores.push(apro)
      }else if(apro.mod_fk == 3 && apro.monto != 0){
        this.tablaAprobadores.push(apro)
      }
     
    }
    },

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
      this.close()
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
    cancelarEdicion() {
      this.detalle = true
      this.guardarEdicion = false
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
      let aprobadores = []
      let compradores = []
      let perfiles =[]
      let id = this.id
      let aprobadorPed = {
        "usu_apro_fk":this.usuariosPedido.usuAprobador.id,
        "usu_fk":1,
        "mod_fk":1,
        "apr_tie_fk": 1,
        "mon_fk":2
      }
      console.log("ped",aprobadorPed)
      console.log("aprobador:", this.usuariosPedido.usuSolicitante)
      console.log("id:", id)
      for(let a of this.tablaAprobador){
      aprobadores.push({mod_fk:3,apr_tie_fk: 1,monto:21312,usu_fk:1,pro_fk:this.id,flujo:a.flujo,mon_fk:1,usu_apro_fk:a.usu_apro_fk,apro_final:a.apro_final})  
      console.log("apro:", aprobadores)  
    }
    for(let b of this.tablaCompradores){
      compradores.push({mod_fk:3,usu_fk:1,pro_fk:this.id,usu_apro_fk:b.usu_apro_fk,monto:2341,mon_fk:1})
      console.log("b",compradores)
    }
    for(let c of this.usuariosPedido.usuSolicitante){
      perfiles.push({usu_per_fk:5,usu_fk:c.id})
      console.log("c",perfiles)
    }
    for(let d of this.otrosUsuarios){
      perfiles.push({usu_per_fk:7,usu_fk:d.id})
      console.log("d",perfiles)
    }
    this.active = 3

    const { data } = await postProyectoAdquisiciones(id,perfiles,aprobadorPed,aprobadores,compradores)
    console.log(data)
    console.log(id,perfiles,aprobadorPed,aprobadores,compradores)
    this.$emit('id',this.active)
  },
  
}
};
