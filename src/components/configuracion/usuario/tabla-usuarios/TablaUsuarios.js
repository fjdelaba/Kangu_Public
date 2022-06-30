/* eslint-disable */
import users from "../../../../pages/users/content/users";
import CopyLabel from "../../../common/CopyLabel";
import { validaRut } from "../../../../utils";
import {
  postUsuarioEsmpresa,
  getUsuarioExistente,
} from "../../../../graphql/configuracion";

export default {
  components: {
    CopyLabel,
  },
  data() {
    return {  
      alert: false,
      usuario: {
        nombres: "",
        apellidos: "",
        email: "",
        cargo: "",
        rut: "",
        perfil: "",
        imagen: "",
        firma: "",
        select: null,
        
      },
      items: ["Administrador", "Usuario"],
      usuarioRules: {
        nombresRules: [(v) => !!v || "Nombre obligatorio"],
        apellidosRules: [(v) => !!v || "Apellido obligatorio"],
        cargoRules: [(v) => !!v || "Cargo obligatorio"],
        emailRules: [
          (v) => !!v || "E-mail es obligatorio",
          (v) => /.+@.+\..+/.test(v) || "E-mail debe ser valido",
          // (v) => getValidaRutEmail(v,'')
        ],
        rutRules: [
          (v) => !!v || "Rut es obligatorio",
          (v) => validaRut(v) || "Rut NO valido",
          // (v) => getValidaRutEmail('',v)
        ],
      },

      url: null,
      url2: null,
      abrirDialog: false,
      valid: true,
      cerrarDialog: true,
      dialog: false,
      image: null,
      drawer: false,
      isLoading: false,
      switch1: false,
      switch2: false,
      switch3: false,
      switch4: false,
      switch5: false,
      switch6: false,
      switch7: false,
      switch8: false,
      switch9: false,
      switch10: false,
      switchall:false,
      visible: true,
      breadcrumbs: [
        {
          text: "Users",
          disabled: false,
          href: "#",
        },
        {
          text: "List",
        },
      ],
      settings: [],
      settings2: [],
      /*selectedItem: 1,
      items2: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' }
      ],*/
      active: 0,
      searchQuery: "",
      selectedUsers: [],
      headers: [
        { text: "Rut", align: "left", value: "rut" },
        { text: "Email", value: "email" },
        { text: "Nombre", align: "left", value: "nombre" },
        { text: "Apellido", align: "left", value: "apellidos" },
        { text: "Cargo", value: "cargo" },
        { text: "FechaCreacion", value: "fec_creacion" },
        { text: "activo", value: "activo" },
        { text: "", sortable: false, align: "right", value: "action" },
      ],
      users,
    };
  },

  props: {
    usuarios: [],
  },
  watch: {
    selectedUsers(val) {},
  },
  computed: {
    cpxValidarPermisos() {
      return (
        this.switch1 == false &&
        this.switch2 == false &&
        this.switch3 == false &&
        this.switch4 == false &&
        this.switch5 == false &&
        this.switch6 == false &&
        this.switch7 == false &&
        this.switch8 == false &&
        this.switch9 == false &&
        this.switch10 == false
      );
    },
  },

  methods: {
    searchUser() {},
    open() {},
    getEstado(estado) {
      return estado === "S" ? true : false;
    },
    previewImagen() {
      this.url = URL.createObjectURL(this.usuario.imagen);
    },

    eliminarImagen() {
      this.url = null;
      console.log("eliminar imagen");
    },
    previewFirma() {
      this.url2 = URL.createObjectURL(this.usuario.firma);
    },

    async getValidaRutEmail(email, rut) {
      console.log(email, rut);
      const usuario = await getUsuarioExistente(email, rut);

      console.log(usuario);
    },

    // async crearUsuarioEmpresa() {
    //   const usu = {
    //     nombre:this.usuario.nombres,
    //     apellidos: this.usuario.apellidos,
    //     email: this.usuario.email,
    //     cargo: this.usuario.cargo,
    //     rut: this.usuario.rut,
    //     perfil: this.usuario.perfil,
    //     imagen: this.usuario.imagen,
    //     firma: this.usuario.firma,
    //     clave: '19023',
    //     emp_fk: 1,
    //     usu_per_fk:2,
    //     activo: true
    //   }

    //   const { data } = await postUsuarioEsmpresa(usu.activo, usu.apellidos, usu.cargo, usu.clave, usu.email, usu.nombre, usu.rut, usu.emp_fk, usu.usu_per_fk)
    //   console.log(data)
    //   console.log(usu)

    //   /*this.usuario = {
    //     nombre:'',
    //     apellidos: '',
    //     email: '',
    //     cargo: '',
    //     rut: '',
    //     perfil: '',
    //     imagen: '',
    //     firma: ''
    //   }*/
    //   this.usuario ={}

    //   this.abrirDialog = false
    //   this.url2 = null
    //   this.url = null
    // },

    validarFomatoRut() {
      console.log(validaRut(this.usuario.rut));
    },
    validate() {
      this.$refs.form.validate();
    },

    reset() {
      this.$refs.form.reset();
      this.abrirDialog = false;
      this.alert = false;
    },
    async grabarUsuario(parametro) {
      let permisosUsu = [];
      if (parametro == 1) {
        if (this.switch1 == true) {
          //PROYECTOS O CG
          permisosUsu.push({ mod_fk: 7 });
        }
        if (this.switch2 == true) {
          //MAESTRO DE RECURSOS
          permisosUsu.push({ mod_fk: 8 });
        }
        if (this.switch3 == true) {
          //ENTIDAD EXTERNA
          permisosUsu.push({ mod_fk: 6 });
        }
        if (this.switch4 == true) {
          //USUARIO
          permisosUsu.push({ mod_fk: 9 });
        }
        if (this.switch5 == true) {
          //MANTENEDORES
          permisosUsu.push({ mod_fk: 10 });
        }
        if (this.switch6 == true) {
          //PEDIDOS
          permisosUsu.push({ mod_fk: 1 });
        }
        if (this.switch7 == true) {
          //COTIZACION
          permisosUsu.push({ mod_fk: 2 });
        }
        if (this.switch8 == true) {
          //ORDEN DE COMPRA
          permisosUsu.push({ mod_fk: 3 });
        }
        if (this.switch9 == true) {
          //DESPACHO
          permisosUsu.push({ mod_fk: 4 });
        }
        if (this.switch10 == true) {
          //RECEPCION
          permisosUsu.push({ mod_fk: 5 });
        }
      }
      let usuario = {
        email: this.usuario.email,
        rut: this.usuario.rut,
        nombre: this.usuario.nombres,
        apellidos: this.usuario.apellidos,
        cargo: this.usuario.cargo,
        // emp_fk: 1,
        emp_fk: this.$store.state.app.datosEmpresa.id,
        usu_per_fk: 2,
      };
      if(parametro == 2){
        permisosUsu.push({ mod_fk: 0 })
      }
      const { data } = await postUsuarioEsmpresa(usuario,permisosUsu);
      console.log(data);
      this.abrirDialog = false;
      this.alert = false;
      this.$refs.datosUsuario.reset();
    },

    async crearUsu() {
      if (!this.$refs.datosUsuario.validate()) return;
      if (this.cpxValidarPermisos) {
        this.alert = true;
        return;
      } else {
        this.grabarUsuario(1); //1 = grabar con permiso
      }
    },

    permisoUsu() {
      this.active = 1;
      this.alert = false;
    },
    eliminarFirma() {
      this.url2 = null;
      console.log("eliminar firma");
    },
  },
};
