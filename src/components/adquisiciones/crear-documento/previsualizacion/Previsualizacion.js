/* eslint-disable */
import CuadroResumen from "../../../general/cuadro-resumen/CuadroResumen.vue";
import NewCuadroResumen from "../../../general/new-cuadro-resumen/NewCuadroResumen.vue";
import Pipeline from "../../../general/pipeline/Pipeline.vue";
import DistribucionLineasPartidas from "../../../adquisiciones/distribucion-lineas-partidas/DistribucionLineasPartidas.vue";
import ModalFinalAprobacion from "../../../adquisiciones/modal-final-aprobacion/ModalFinalAprobacion.vue"
import {
  getAprobadoresProyecto,
  updateFlujoAprobacionOC,
} from "../../../../graphql/aprobaciones";
import { creaPdfOC2 } from '../../../../utils/pdf-template-nuevo'

export default {
  name: "Previsualizacion",
  components: {
    CuadroResumen,
    Pipeline,
    DistribucionLineasPartidas,
    ModalFinalAprobacion,
    NewCuadroResumen
  },
  props: {
    materiales: [],
    cabecera: {},
    observacion: "",
    listaPartidas: [],
    origen: { // 1 = crear, 2 = aprobacion, 3 = consultar
      Type: Number,
      default: 0
    },
    regla: [],
    aprobadores: [],
    tipo_documento: {
      type: Number,
      default: 0,
    },
    files:{
      Type: Array,
      default: () =>[]
    }
  },

  data() {
    return {
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
      direction: "left",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: false,
      bottom: false,
      left: true,
      transition: "slide-y-reverse-transition",
      icon: "mdiClockTimeEightOutline",
      datosUsuario: "",
      datosEmpresa: "",
      // materiales: [],
      // cabecera: {},
      logo: "https://kangufiles.nyc3.digitaloceanspaces.com/kangu/logo_dlb.png",
      headers: [
        {
          text: "Material",
          align: "start",
          sortable: false,
          value: "mat_nombre",
          width: "400px",
        },
        // { text: 'C.C', value: 'oc_det_pars', sortable: false, width: '200px' },
        {
          text: "Cant.",
          value: "cantidad",
          width: "100px",
          sortable: false,
          align: "center",
        },
        {
          text: "P. Unitario",
          value: "precio_unitario",
          width: "100px",
          sortable: false,
          align: "center",
        },
        {
          text: "Subtotal",
          value: "total",
          width: "100px",
          sortable: false,
          align: "center",
        },
        // { text: 'Acciones', value: 'actions', sortable: false }
      ],
      tab: "documento",
      comentarioAprobadores: "",
      apruebo: "a",
      resumenesTotales: "",
      comentario: "",
      mostrarBotones: false,
      dialogDesicion: false,
      id_apro:0,
      nombreArchivos:[]
    };
  },
  methods: {
    getNombreArchivos(){
      this.nombreArchivos = []
      console.log('getNombreArchivos')
      for (const file of this.files) {
        console.log('File: ', file)
        this.nombreArchivos.push(file.name)
      }
    },
    // async cargarAprobadores() {
    //   this.aprobadores = []
    //   const { data:{ kangusoft_apr } } = await getAprobadoresProyecto()

    //   for (const apro of kangusoft_apr) {
    //     this.aprobadores.push({ nombre:`${apro.usuByUsuAproFk.nombre} ${apro.usuByUsuAproFk.apellidos}`, id:apro.id })
    //   }
    //   console.log('this.aprobadores: ', this.aprobadores)
    // },
    changeTab() {
      console.log("change");
    },
    clickTab() {
      console.log("click");
      // this.cargarAprobadores()
    },
    getNombrePartida(idPartida) {
      const searchObject = this.listaPartidas.find((partida) => {
        console.log("partida: ", partida);
        console.log("idPartida: ", idPartida);

        return Number(partida.id) === Number(idPartida);
      });

      console.log("searchObject: ", searchObject);

      return searchObject.nombre;
    },

    async desicionFluo(op) {
      try {
        this.apruebo = true;
        // this.regla = [() => true]
        console.log(" this.apruebo", this.apruebo);
        for (let aprpro of this.aprobadores) {
          console.log(aprpro);
          console.log(
            "Number(this.datosUsuario.user_id): ",
            Number(this.datosUsuario.user_id)
          );
          console.log("Number(aprpro.id_user): ", Number(aprpro.id_user));
          if (Number(this.datosUsuario.user_id) === Number(aprpro.id_user)) {
            this.id_apro = aprpro.id_apr;
          }
          console.log("aprpro_ ", aprpro);
        }
        const aprobacion = {
          aprobado: op,
          comentario: this.comentario,
          id: this.id_apro,
          oc_fk: this.cabecera.id,
        };
        console.log("aprobacion: ", aprobacion);
        const resp = await updateFlujoAprobacionOC(aprobacion);
        for (let aprpro of this.aprobadores) {
          console.log("aprpro despues: ", aprpro);
          if (Number(this.datosUsuario.user_id) === Number(aprpro.id_user)) {
            aprpro.aprobado = op;
          }
        }

        console.log(resp);
      } catch (error) {
        console.log("error");
      }
      this.dialogDesicion = true;
    },
    redirigirListadoAprobaciones() {
      this.$router.push({path:'/adquisiciones/oc/aprobar'});
    },
    async descargarOcPDF() {
      this.totalesItems();
      const totalesCuadroResumen = await this.$refs.refcuadroresumen
        .cpxTotalesItems;
      const tot = [];
      console.log(this.$refs.refcuadroresumen.cpxTotalesItems);
      for (let lineaCuadroResumen of totalesCuadroResumen) {
        console.log(lineaCuadroResumen);
        if (lineaCuadroResumen.item === "impuesto") {
          continue;
        } else {
          tot.push(lineaCuadroResumen);
        }
      }
      console.log(tot);
      console.log("envio a pdf ;",this.cabecera.id, this.datosEmpresa,1)
      await creaPdfOC2(this.cabecera.id, this.datosEmpresa,1);
    },
    rechazoOc() {
      this.apruebo = false;
      this.regla = [() => false];
      console.log(" this.apruebo", this.cpxvalidacion);
    },
    totalesItems() {
      // let neto = 0
      // let iva = 0
      // const retencion = 0
      // let total = 0
      // const descuento = 0
      // for (const linea of this.materiales) {
      //   console.log('linea: ', linea)
      //   neto += Number(linea.total)
      // }
      // iva = neto * 0.19
      // total = iva + neto
      // console.log(neto, iva, total)
      // this.resumenesTotales =  [
      //   { item: 'Neto', valor: neto },
      //   { item: 'IVA', valor: iva },
      //   { item: 'Total', valor: total }
      // ]
      // return [
      //   { item: 'Neto', valor: neto },
      //   { item: 'IVA', valor: iva },
      //   { item: 'Total', valor: total }
      // ]
    },
    activarPanelAprobacion() {
      console.log("this.aprobadores: ", this.aprobadores);
      if (this.aprobadores === undefined || this.aprobadores.length <= 0)
        return;
      for (let aprpro of this.aprobadores) {
        console.log(aprpro);
        console.log(
          "Number(this.datosUsuario.user_id): ",
          Number(this.datosUsuario.user_id)
        );
        console.log("Number(aprpro.id_user): ", Number(aprpro.id_user));
        if (Number(this.datosUsuario.user_id) === Number(aprpro.id_user)) {
          console.log("Este es");
          this.mostrarBotones = true;
        }
        console.log("aprpro_ ", aprpro);
      }
    },
  },
  mounted() {
    if(this.origen === 2){
      this.tab = 'flujo'
    }
    console.log("this.$auth.isLoading: ", this.$auth.isLoading);
    if (this.$auth.isLoading == false) {
      this.datosEmpresa = this.$store.state.app.datosEmpresa;
      this.datosUsuario = this.$store.state.app.datosUsuario;
      this.activarPanelAprobacion();
    }
    console.log("EMPRESA:", this.datosEmpresa, "USUARIO:", this.datosUsuario);
  },
  watch: {
    "$auth.isLoading"(newCount, oldCount) {
      console.log(
        `Listado - We have ${newCount} fruits now, yay!. ${oldCount}`
      );
      if (newCount === false) {
        this.datosEmpresa = this.$store.state.app.datosEmpresa;
        this.datosUsuario = this.$store.state.app.datosUsuario;
        console.log(
          "EMPRESA:",
          this.datosEmpresa,
          "USUARIO:",
          this.datosUsuario
        );
        this.activarPanelAprobacion();
      }
    },
    aprobadores(newCount, oldCount) {
      console.log(
        `provisualizacion :::: - We have ${newCount} fruits now, yay!. ${oldCount}`
      );
      this.activarPanelAprobacion();
    },
  },
  computed: {
    cpxFecha() {
      return this.$moment(new Date()).format("DD/MM/yy");
    },
    cpxFiles() {
      console.log('Paso por aca');
      if(this.origen === 2 || this.origen === 3){
        return this.cabecera.adjuntos
      }else if(this.origen === 1) {
        console.log('Paso por este sector');
        for (const file of this.files) {
          console.log('File: ', file)
        }
        return this.files
      }
    }
  },
};
