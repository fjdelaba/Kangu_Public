/* eslint-disable */
import { getDatosOcConsulta, getEstadosOc } from "../../../graphql/adquisiciones";
import { getDatosGenerales } from '../../../graphql/configuracion'

export default {
  components: {
  },
  props: {
    aprobar:"",
    consulta:""
  },
  mounted() {
    this.cargarOc()
    this.cargarProyectos()
    this.cargaEstados()
    if(this.aprobar == true){
      this.consulta = false
    }
    if(this.consulta == true){
      this.aprobar = false
    }
  },
  data() {
    return {
      direction: 'right',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: false,
      left: false,
      transition: 'slide-y-reverse-transition',
      headerExcelCabecera: {
        "Codigo OC": "identificacion_key",
        "Fecha Creacion": {
            field: "fec_creacion",
            callback: value => {
                return `${this.$moment(value).format("DD/MM/YYYY")}`;
            }
        },

        //: "fec_creacion",
        "Codigo Centro Gestion": "centro_gestion.codigo",
        "Nombre Centro Gestion": "centro_gestion.nombre",
        "Nombre OC": "nombre",
        "Usuario Comprador": {
            field: "usuario_comprador",
            callback: value => {
                return `${value.nombre} ${value.apellidos}`;
            }
        },
        Aprobador: {
            field: "aprobacion_proceso",
            callback: value => {
                let aprobador = "";
                for (let i = 0; i < value.length; i++) {
                    console.log("value:", value[i]);
                    aprobador =
                        aprobador +
                        `${value[i].aprobacion.aprobador.nombre} ${value[i].aprobacion.aprobador.apellidos}`;
                }
                /*                         for (let i = 0; i < value.length; i++) {

                                                        for (let a = 0; a < value.length[i].aprobacion_proceso.length; a++) {

                                                            aprobador = aprobador + ` - ${value[i].aprobacion_proceso[a].aprobacion.aprobador.nombre} ${value[i].aprobacion_proceso[a].aprobacion.aprobador.apellidos}`;
                                                        }
                                                    } */
                console.log(aprobador);
                return `${aprobador}`;
            }
        }, // ulti
        "Rut Proveedor": "proveedor.entidad_externa.rut",
        "Nombre Proveedor": "proveedor.entidad_externa.razon_social",
        "Neto Original": "neto",
        IVA: "iva",
        Estado: "estado.nombre",

        "Tipo OC": {
            field: "ped_fk",
            callback: value => {
                //return `${this.getTipoOC({})}`;
                console.log("value: ", value);
                if (value == "") {
                    return "Directa";
                } else {
                    return "Desde Pedido";
                }
                //return `${value}`;
            }
        }
    },
      headers: [
      ],
      ocs: [],
      ocSeleccionada:"",
      proyectoSeleccionado: "",
      estadoSeleccionado: "",
      proyectos: [{ id: 0, nombre: 'Todos los Proyectos' }],
      estadosOc: [{ id: 0, nombre: 'Todos los Estados' }],
      ocsCopy: []

    };
  },
  computed: {
    cpxDinamicHeaders() {
      if ( this.aprobar == true) {
        console.log("aprobar")
        return [
          ...this.headers,
          { text: "Centro de Gestión", value: "pro.nombre", idx: 1 },
          { text: "ID OC", value: "identificacion", idx: 2 },
          { text: "Nombre OC", value: "nombre", idx: 3 },
          { text: "Proveedor", value: "ent.razon_social", sortable: false, idx: 4 },
          { text: "Comprador", value: "usu.nombre", sortable: false, idx: 4 },
          { text: "Monto", value: "neto", sortable: false, idx: 4 },
          { text: "Acción", value: "actions", sortable: false, idx: 4 }
        ]
      }
      if ( this.aprobar == false) {
        console.log("agregar actions")
        return [
          ...this.headers,
          { text: "Centro de Gestión", value: "pro.nombre", idx: 1 },
          { text: "ID OC", value: "identificacion", idx: 2 },
          { text: "Nombre OC", value: "nombre", idx: 3 },
          { text: "Proveedor", value: "ent.razon_social", sortable: false, idx: 4 },
          { text: "Fecha Aprobación", value: "fec_creacion", sortable: false, idx: 4 },
          { text: "Comprador", value: "usu.nombre", sortable: false, idx: 4 },
          { text: "Monto", value: "neto", sortable: false, idx: 4 },
          { text: "Acción", value: "actions", sortable: false, idx: 4 }
        ]
      }
      return this.headers;
    },
  },
  methods: {
    descargarExcel(command) {
      this.$message("Descargando " + command);
  },
    async cargarOc() {
      console.log("Cargando Datos")
      const { data } = await getDatosOcConsulta()
      console.log("Ordenes de Compra:", data.kangusoft_oc)
      for (let oc of data.kangusoft_oc) {
        console.log("oc", oc)
        oc.usu.nombre = oc.usu.nombre + ' ' + oc.usu.apellidos
      }
      this.ocs = data.kangusoft_oc
      this.ocsCopy = data.kangusoft_oc
    },
    async cargarProyectos() {
      const { data: { kangusoft_pro } } = await getDatosGenerales()
      for (let proyectos of kangusoft_pro) {
        this.proyectos.push({ id: proyectos.id, nombre: proyectos.nombre })
      }
      console.log('proyectos', this.proyectos)
    },
    async cargaEstados() {
      const { data: { kangusoft_est_doc } } = await getEstadosOc()
      for (let estado of kangusoft_est_doc) {
        this.estadosOc.push({ id: estado.id, nombre: estado.nombre })
      }

    },
    filtroCentroGestion() {
      if (this.proyectoSeleccionado == 0) {
        this.ocs = this.ocsCopy
      }
      if (this.proyectoSeleccionado != "") {
        this.ocs = this.ocsCopy.filter(item => {
          return (
            item.pro.id ==
            this.proyectoSeleccionado
          );
        });
      }
    },
    filtroEstadoOc() {
      if (this.estadoSeleccionado == 0) {
        this.ocs = this.ocsCopy
      }
      if (this.estadoSeleccionado != "") {
        this.ocs = this.ocs.filter(item => {
          return (
            item.est_doc.id ==
            this.estadoSeleccionado
          );
        });
      }
    },
    abrirDetalle(item){
      if(this.consulta == true && this.aprobar == false){
        this.$router.push({
          path: "/adquisiciones/oc/consultar/detalle/",
          query: { id: Number(item.id),}
      });
      console.log("proyecto",this.$route)
      } else if(this.aprobar == true && this.consulta == false){
        this.$router.push({
          path: "/adquisiciones/oc/aprobar/detalle/",
          query: { id: Number(item.id),}
      });
      console.log("proyecto",this.$route)
      }
      
     }

  }
}