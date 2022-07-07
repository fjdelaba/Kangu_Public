/* eslint-disable */
import { getDatosOcConsulta, getEstadosOc, getDetalleOcExcel } from "../../../graphql/adquisiciones";
import { getDatosGenerales } from '../../../graphql/configuracion'
import Vue from "vue";
import JsonExcel from "vue-json-excel";
import { entries } from "lodash";
Vue.component("downloadExcel", JsonExcel); 


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
      datosExcelCabecera: {},
      datosExcelDetalle: {},
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
        //: "fec_creacion",
        "Nombre Centro Gestion": "pro.nombre",
        "Identificador OC": "identificacion",
        "Nombre OC": "nombre",
        "Nombre Proveedor": "ent.razon_social",
        "Rut Proveedor": "ent.rut",
        "Usuario Comprador": {
            field: "usu",
            callback: value => {
                return `${value.nombre} ${value.apellidos}`;
            }
        },
        "Moneda": "mon.nombre",
        "Monto": "neto",
        "Estado de Oc": "est_doc.nombre", 
    },
    headerExcelDetalle: {
      //: "fec_creacion",
      "Nombre Centro Gestion": "oc.pro.nombre",
      "Identificador OC": "oc.identificacion",
      "Nombre OC": "oc.nombre",
      "Nombre Proveedor": "oc.ent.razon_social",
      "Rut Proveedor": "oc.ent.rut",
      "Usuario Comprador": {
        field: "oc.usu",
        callback: value => {
            return `${value.nombre} ${value.apellidos}`;
        }
    },
      "Codigo": "mat.id",
      "Material": "mat.nombre",
      "Cantdad": "cantidad",
      "Precio": "precio_unitario",
      "Total": "total",
      "Impuestos":"oc.impuestos",
      "Moneda": "oc.mon.nombre",
      "Monto Oc": "oc.neto",
      "Estado de Oc": "oc.est_doc.nombre", 
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

    async cargarOc() {
      console.log("Cargando Datos")
      const { data } = await getDatosOcConsulta()
      console.log("Ordenes de Compra:", data.kangusoft_oc)
      for (let oc of data.kangusoft_oc) {
        console.log("oc", oc)
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
   async cargarDataExcelDetalle() {
    console.log("Cargando Datos")
    const { data } = await getDetalleOcExcel()
   let datosOcDetalle = data.kangusoft_oc_det
      for(let detalle of datosOcDetalle){
        console.log("OC", detalle)
        if(detalle.oc.neto == null){
          detalle.oc.neto = 0
        } else if(detalle.oc.neto != null){
          detalle.oc.neto  = new Intl.NumberFormat('es-CL').format( detalle.oc.neto )
        }
        if( detalle.precio_unitario == null){
          console.log("SI!")
        } else if(detalle.precio_unitario  != null){
          detalle.precio_unitario   = new Intl.NumberFormat('es-CL').format(detalle.precio_unitario  )
        }
        if( detalle.total == null){
          console.log("SI2!")
        } else if(detalle.total != null){
          detalle.total  = new Intl.NumberFormat('es-CL').format( detalle.total )
        }
        if( detalle.cantidad == null){
          console.log("SI3!")
        } else if(detalle.cantidad != null){
          detalle.cantidad  = new Intl.NumberFormat('es-CL').format( detalle.cantidad )
        }
        if(detalle.oc.identificacion == "" || detalle.oc.identificacion == null ){
          detalle.oc.identificacion = "Sin Identificador"
        }
        if(detalle.oc.impuestos == null){
          detalle.oc.impuestos = 0 
        }else if(detalle.oc.impuestos != null){
          detalle.oc.impuestos = new Intl.NumberFormat('es-CL').format( detalle.oc.impuestos )
        }
        // detalle.precio_unitario = new Intl.NumberFormat('es-CL').format(detalle.precio_unitario)
        //  detalle.total = new Intl.NumberFormat('es-CL').format(detalle.total)
        //  detalle.cantidad  = new Intl.NumberFormat('es-CL').format(detalle.cantidad)
         
      }
      return datosOcDetalle;
  },
    
    cargarDataExcelCabecera() {
      //alert('Se genero el archivo cabeceras_oc.xls')
      console.log("METODO EXCEL:", this.ocs);
      for(let oc of this.ocs){
   
        if(oc.neto != null){
          console.log("FORMATO:", new Intl.NumberFormat('es-CL').format(oc.neto))
         oc.neto = new Intl.NumberFormat('es-CL').format(oc.neto)
        }else if( oc.neto == null){
          oc.neto = 0
        }
       
      }
      return this.ocs;
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
        this.ocs = this.ocsCopy.filter(item => {
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