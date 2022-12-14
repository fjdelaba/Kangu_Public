/* eslint-disable */
import { getComunas, getProveedores } from "../../../../graphql/general.js";
import {
  getDatosGenerales,
  getProyecto,
  getProyectoCodigoDuplicado,
} from "../../../../graphql/configuracion.js";
import { postProyectoInformacion } from "../../../../graphql/configuracion.js";
import moment from "moment";
import ModalEntidad from "../../../general/modal-entidad/ModalEntidad.vue";

export default {
  components: {
    ModalEntidad,
  },

  data() {
    return {
      mostrarError: false,
      date: new Date().toISOString().substr(0, 10),
      date2: "",
      daysOfWeek: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
      menu1: false,
      menu2: false,
      grabado: false,
      idProyectoCreado: 2,
      proyectoSeleccionado: "",
      isLoading: false,
      search: null,
      valid: true,
      proyectoRules: [(v) => !!v || "Este Campo es Obligatorio"],
      codigoRules: [
        (v) => !!v || "Este Campo es Obligatorio",
      ],
      celulasRules: [(v) => !!v || "Selecciona una Unidad"],
      fechasRules: [
        (v) =>
          !!v ||
          "La fecha seleccionada no puede ser antes de la fecha de inicio",
      ],
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
      active: "",
      infoGeneralProyecto: {
        nombre: "",
        codigo: "",
        celulas: "",
        valorC: "",
        presupuestoObra: "",
        estado: 1,
        monedaGeneral: "",
        flag: "",
        monedaPersonalizada: "",
        ocInicial: 1,
        descripcion: "",
        imagen: "",
      },
      loadingInfoGeneral:false,
      infoDireccionProyecto: {
        region: "",
        comuna: "",
        direccion: "",
      },
      infoMandanteProyecto: {
        mandante: "",
      },
      listaMonedas: [],
      listaCelulas: [],
      listaEstados: [],
      listaFlags: [],
      listaRegion: [],
      listaComunas: [],
      listaUsuarios: [],
      listaMandante: [],
      proyecto: {},
      usuLogin: "",
      aut0: "",
      usuarioAdministrador: "",
      guardarEdicion: false,
      fechaCalulada: "",
      mostrarNoData: false,
      mostrarDialogCrearEntidad: false,
      proyectosBD: [],
      datosEmpresa: "",
      datosUsuario: "",
      loading4: false,

    };
  },
  props: {
    id: Function,
    detalle: Boolean,
    idproyecto: Number,
  },
  mounted() {

    setTimeout(() => {
      console.log("this.idproyecto", this.idproyecto);
      if (this.detalle == true) {
        this.proyectoSeleccionado = this.idproyecto;
        this.cargarProyecto();
      }
    }, 10);

    this.cargarInformacionGeneral();
    this.aut0 = 1;
    this.usuLogin = 1;
  },
  computed: {

    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("DD/MM/yy") : "";
    },
    computedDateFormattedMomentjs2() {
      return this.date2 ? moment(this.date2).format("DD/MM/yy") : "";
    },
    cpxCalcularFecha() {
      let a = this.$moment(this.date);
      let b = this.$moment(this.date2);

      this.fechaCalulada = b.diff(a, "hours");
      console.log("fecha", this.fechaCalulada);
      if (this.fechaCalulada == 24 || this.fechaCalulada > 24) {
        let dias = b.diff(a, "days");
        console.log("dias", dias);
        if (this.fechaCalulada == 24) {
          return dias + " " + "D??a";
        } else if (this.fechaCalulada > 24 && this.fechaCalulada < 168) {
          return dias + " " + "D??as";
        } else if (this.fechaCalulada > 168 || this.fechaCalulada == 168) {
          let semanas = b.diff(a, "weeks");
          console.log("semanas", semanas);
          if (this.fechaCalulada == 168 || this.fechaCalulada < 335) {
            return semanas + " " + "Semana";
          } else if (this.fechaCalulada > 335 && this.fechaCalulada < 671) {
            return semanas + " " + "Semanas";
          } else if (this.fechaCalulada == 672 || this.fechaCalulada > 672) {
            let mes = b.diff(a, "months");
            console.log("mes", mes);
            if (this.fechaCalulada == 672 || this.fechaCalulada < 1343) {
              return mes + " " + "Mes";
            } else if (this.fechaCalulada > 1343 && this.fechaCalulada < 8760) {
              return mes + " " + "Meses";
            } else if (
              this.fechaCalulada > 8760 ||
              this.fechaCalulada == 8760
            ) {
              let year = b.diff(a, "years");
              if (this.fechaCalulada == 8760 || this.fechaCalulada < 17520) {
                return year + " " + "A??o";
              } else if (
                this.fechaCalulada > 8760 &&
                this.fechaCalulada < 876000
              ) {
                return year + " " + "A??os";
              }
            }
          }
        }
      }
    },
  },
  methods: {
    mostrarDialog() {
      this.mostrarDialogCrearEntidad = true;
    },
    cpxValidaFecha(val) {
      console.log("FECHA value", val);
      console.log("FECHA value2", this.computedDateFormattedMomentjs);
      if (val <= this.computedDateFormattedMomentjs) {
        return `Esta fecha debe ser MAYOR a la de Inicio`;
      } else {
        return true;
      }
    },
    cerrarDialog() {
      this.mostrarDialogCrearEntidad = false;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    getDay(date) {
      console.log("date:", date);
      let i = new Date(date).getDay(date);
      return this.daysOfWeek[i];
    },
    limpiarAutocompleate() {
      setTimeout(() => {
        console.log("PASO POR AQU?? !!!!");
        this.mostrarNoData = false;
        this.search = "";
      }, 500);
    },
    fetchEntriesDebounced() {
      clearTimeout(this._timerId);
      this.mostrarNoData = false;
      this._timerId = setTimeout(() => {
        this.buscarProveedor();
      }, 1000);
    },
    async buscarProveedor() {
      const { data } = await getProveedores(`%${this.search}%`);

      this.isLoading = false;
      this.listaMandante = data.kangusoft_ent;
      console.log("search data: ", data);
      if (this.listaMandante.length === 0) {
        this.mostrarNoData = true;
      }
    },

    unirNombreApellido(item) {
      return item.nombre + " " + item.apellidos;
    },

    previewFirma() {
      this.url2 = URL.createObjectURL(this.usuario.firma);
    },
    eliminarFirma() {
      this.url2 = null;
    },

    async cargarComunas() {
      const {
        data: { kangusoft_prov },
      } = await getComunas(this.infoDireccionProyecto.region);
      for (let prov of kangusoft_prov) {
        for (let com of prov.coms) {
          console.log("coms", com);
          this.listaComunas.push({ id: com.id, nombre: com.nombre });
        }
        this.listaComunas = this.listaComunas.sort(function (a, b) {
          if (a.nombre > b.nombre) {
            return 1
          }
          if (a.nombre < b.nombre) {
            return -1
          }
          if (a.nombre == b.nombre) {
            return 0
          }
        })
      }
    },
    cancelarEdicion() {
      this.detalle = true;
      this.guardarEdicion = false;
    },
    //hola
    editarInformacion() {
      this.detalle = false;
      this.guardarEdicion = true;
      this.infoGeneralProyecto.nombre = this.proyecto.nombre;
      this.infoGeneralProyecto.codigo = this.proyecto.codigo;
      this.infoGeneralProyecto.celulas = this.proyecto.prouni.id;
      this.infoGeneralProyecto.valorC = this.proyecto.valor_contractual;
      this.infoGeneralProyecto.presupuestoObra = this.proyecto.presupuesto;
      this.infoGeneralProyecto.estado = this.proyecto.pro_est.id;
      this.infoGeneralProyecto.monedaGeneral = this.proyecto.mon.id;
      this.infoGeneralProyecto.flag = this.proyecto.fla.id;
      this.infoGeneralProyecto.ocInicial = this.proyecto.inicio_oc;
      this.infoGeneralProyecto.descripcion = this.proyecto.descripcion;
      this.usuarioAdministrador =
        this.proyecto.usu.nombre + " " + this.proyecto.usu.apellidos;
      this.infoDireccionProyecto.region = this.proyecto.com.prov.reg.id;
      this.infoDireccionProyecto.comuna = this.proyecto.com.id;
      this.infoDireccionProyecto.direccion = this.proyecto.nombre;
      this.infoMandanteProyecto.mandante = this.proyecto.ent.id;
      this.search(this.proyecto.ent.nombre);
    },
    guardarEdicion() {
      this.detalle = true;
      this.guardarEdicion = false;
    },
    async cargarProyecto() {
      const {
        data: { kangusoft_pro, kangusoft_pro_prouni, kangusoft_pro_fla },
      } = await getProyecto(this.proyectoSeleccionado);
      console.log(
        "aaa",
        kangusoft_pro,
        kangusoft_pro_prouni,
        kangusoft_pro_fla
      );
      if( kangusoft_pro_fla.length > 0){
        this.proyecto.fla = kangusoft_pro_fla[0];
      }
      if( kangusoft_pro_prouni.length > 0){
        this.proyecto.prouni = kangusoft_pro_prouni[0];
      }
      this.proyecto = kangusoft_pro[0];
      this.proyecto.fla = kangusoft_pro_fla[0];
      this.proyecto.prouni = kangusoft_pro_prouni[0];
      console.log("aa2", this.proyecto);
    },
    returnValidaCodigo() {
      return this.mostrarError
    },
    async validaCodigo1() {
      let kangusoft_pro1 = []
      let val = this.infoGeneralProyecto.codigo
      console.log("val", val)
      if (this.infoGeneralProyecto.codigo.length > 0 && val != undefined) {
        const {
          data: { kangusoft_pro },
        } = await getProyectoCodigoDuplicado(val)
        console.log("dataaaa", kangusoft_pro)
        kangusoft_pro1 = kangusoft_pro
        console.log("dataaaa1", kangusoft_pro1)

      }
      if (kangusoft_pro1.length > 0) {
        return this.mostrarError = false
      } else if (kangusoft_pro1.length == 0) {
        return this.mostrarError = true
      }

      console.log("error ", this.mostrarError)
    },
    async cargarInformacionGeneral() {
      const {
        data: {
          kangusoft_emp_mon,
          kangusoft_pro,
          kangusoft_fla,
          kangusoft_pro_est,
          kangusoft_pro_uni,
          kangusoft_reg,
          kangusoft_usu,
        },
      } = await getDatosGenerales();
      for (let mon of kangusoft_emp_mon) {
        this.listaMonedas.push({ id: mon.mon.id, nombre: mon.mon.nombre });
      }
      for (let flag of kangusoft_fla) {
        this.listaFlags.push({ id: flag.id, nombre: flag.nombre });
      }
      for (let estado of kangusoft_pro_est) {
        this.listaEstados.push({ id: estado.id, nombre: estado.nombre });
      }
      for (let uni of kangusoft_pro_uni) {
        this.listaCelulas.push({ id: uni.id, nombre: uni.nombre });
      }
      for (let region of kangusoft_reg) {
        this.listaRegion.push({ id: region.id, nombre: region.nombre });

      }
      this.listaRegion = this.listaRegion.sort(function (a, b) {
        if (a.nombre > b.nombre) {
          return 1
        }
        if (a.nombre < b.nombre) {
          return -1
        }
        if (a.nombre == b.nombre) {
          return 0
        }
      })

      for (let usu of kangusoft_usu) {
        this.listaUsuarios.push({
          id: usu.id,
          nombre: usu.nombre,
          apellidos: usu.apellidos,
        });
      }
      for (let pro of kangusoft_pro) {
        this.proyectosBD.push(pro);
      }
    },

    async guardarInformacion() {
      this.loadingInfoGeneral = true
      this.datosEmpresa = this.$store.state.app.datosEmpresa
      this.datosUsuario = this.$store.state.app.datosUsuario
      console.log("datosUsuario", this.datosUsuario)
      console.log("datosEmpresa", this.datosEmpresa)
      this.loading4 = true
      this.$refs.infoGeneral.validate();
      console.log("validacion", this.$refs.infoGeneral.validate());
      if (this.infoGeneralProyecto.ocInicial == 1) {
        this.infoGeneralProyecto.ocInicial = 0
      }
      if (this.$refs.infoGeneral.validate() == true) {
        let finalCelulas = [];
        let finalFlag = [];
        let inf = {
          // emp_fk: this.aut0,
          emp_fk: this.datosEmpresa.id,
          nombre: this.infoGeneralProyecto.nombre,
          pro_est_fk: this.infoGeneralProyecto.estado,
          valor_contractual: Number(this.infoGeneralProyecto.valorC),
          com_fk: this.infoDireccionProyecto.comuna,
          direccion: this.infoDireccionProyecto.direccion,
          ent_fk: this.infoMandanteProyecto.mandante,
          usu_fk: this.datosUsuario.user_id ,
          inicio_oc: Number(this.infoGeneralProyecto.ocInicial),
          codigo: this.infoGeneralProyecto.codigo,
          mon_fk: this.infoGeneralProyecto.monedaGeneral,
          descripcion: this.infoGeneralProyecto.descripcion,
          presupuesto: Number(this.infoGeneralProyecto.presupuestoObra),
          adm_obra_fk: this.usuarioAdministrador.id,
        };
        console.log("inf:", inf);

        finalCelulas.push({ pro_uni_fk: this.infoGeneralProyecto.celulas });

        for (let a of this.infoGeneralProyecto.flag) {
          finalFlag.push({ fla_fk: a });
        }

        const { data } = await postProyectoInformacion(
          inf,
          finalFlag,
          finalCelulas
        );
        console.log(data);
        this.idProyectoCreado = data.insert_pro_informacion.id_proyecto_;
        this.grabado = true;
        this.active = 1;
        this.monedaPaso2 = this.infoGeneralProyecto.monedaGeneral
        this.$emit(
          "id",
          this.active,
          this.grabado,
          inf.presupuesto,
          this.infoGeneralProyecto.presupuestoObra
        );
        this.$notify({
          group: "foo",
          title: "Creacion de Proyecto",
          text: "Se a Creado con Exito Informacion General",
          type: "success",
        });
        setTimeout(() => {
          this.loading4 = false
        }, 4000)
        this.loadingInfoGeneral = false
      } else {
        this.valid = false;
      }
    },
  },
  watch: {
    async search(val) {
      if (this.isLoading) return;
      this.isLoading = true;
      this.fetchEntriesDebounced();
    },
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
      this.dateFormatted2 = this.formatDate(this.date2);
    },
  },
};
