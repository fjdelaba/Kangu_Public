/* eslint-disable */
import { getDatosOcConsulta,getEstadosOc } from "../../../graphql/adquisiciones";
import { getDatosGenerales } from '../../../graphql/configuracion'

export default {
  components: {
  },
  mounted() {
    this.cargarOc()
    this.cargarProyectos()
    this.cargaEstados()
  },
  data() {
    return {
      headers: [

        { text: "Centro de Gestión", value: "pro.nombre", idx: 1 },
        { text: "ID OC", value: "identificacion", idx: 2 },
        { text: "Nombre OC", value: "nombre", idx: 3 },
        { text: "Proveedor", value: "ent.razon_social", sortable: false, idx: 4 },
        { text: "Fecha Aprobación", value: "fec_creacion", sortable: false, idx: 4 },
        { text: "Comprador", value: "usu.nombre", sortable: false, idx: 4 },
        { text: "Monto", value: "neto", sortable: false, idx: 4 },
        { text: "Acción", value: "actions", sortable: false, idx: 4 }

      ],
      ocs: [],
      proyectoSeleccionado: "",
      estadoSeleccionado:"",
      proyectos: [{ id: 0, nombre: 'Todos los Proyectos' }],
      estadosOc: [{id:0,nombre:'Todos los Estados'}],
      ocsCopy: []

    };
  },
  computed: {

  },
  methods: {
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
    async cargaEstados(){
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
    filtroEstadoOc(){
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
    }

  }
}