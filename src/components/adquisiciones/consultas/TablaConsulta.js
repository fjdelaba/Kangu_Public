/* eslint-disable */
import { getDatosOcConsulta, getEstadosOc, getDetalleOcExcel, getOcConsultas } from "../../../graphql/adquisiciones";
import { getDatosGenerales } from '../../../graphql/configuracion'
import Vue from "vue";
import JsonExcel from "vue-json-excel";
import { entries } from "lodash";
import { getProyectosUsuarioAprobador, getFiltrosConsultas } from "../../../graphql/general";
Vue.component("downloadExcel", JsonExcel); 


export default {
  components: {
  },
  props: {
    // aprobar:"",
    // consulta:"",
    origen: {
      type:Number,
      default: 2 // 1 = Aprobacion, 2 = Consultas
    }
  },
  mounted() {
    // this.cargarOc()
    // this.cargarProyectos()
    // this.cargaEstados()
    // if(this.aprobar == true){
    //   this.consulta = false
    // }
    // if(this.consulta == true){
    //   this.aprobar = false
    // }
    console.log(this.$auth.isLoading);
    if (this.$auth.isLoading == false) {
      this.getProyectosUsuarioAprobar()
      this.getValoresFiltros()
    }
  },
  watch: {
    '$auth.isLoading' (newCount, oldCount) {
      console.log(`tabla consultas - We have ${newCount} fruits now, yay!. ${oldCount}`)
      if(newCount == false){
        this.getProyectosUsuarioAprobar()
        this.getValoresFiltros()
      }
    }
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Adquisiciones',
        },
        {
          text: 'Consultas'
        }
      ],
      datosExcelCabecera: {},
      datosExcelDetalle: {},
      direction: 'right',
      fab: false,
      hover: false,
      top: false,
      right: true,
      bottom: false,
      left: false,
      transition: 'slide-y-reverse-transition',
      headerExcelCabecera: {
        //: "fec_creacion",
        "Nombre Centro Gestion": "pro_nombre",
        "Identificador OC": "identificacion",
        "Nombre OC": "oc_nombre",
        "Nombre Proveedor": "razon_social",
        "Rut Proveedor": "rut",
        "Usuario Comprador": {
            callback: value => {
                return `${value.usu_nombre} ${value.usu_apellidos}`;
            }
        },
        "Moneda": "mon_nombre",
        "Monto": "neto",
        "Estado de Oc": "est_nombre", 
    },
    headerExcelDetalle: {
      //: "fec_creacion",
      "Nombre Centro Gestion": "oc.pro.nombre",
      "Identificador OC": "oc.identificacion",
      "Nombre OC": "oc.nombre",
      "Nombre Proveedor": "razon_social",
      "Rut Proveedor": ".rut",
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
      proyectos: [{ id: 0, nombre: 'Todos los Proyectos' }],
      estadosOc: [{ id: 0, nombre: 'Todos los Estados' }],
      ocsCopy: [],
      menu:false,
      // dates: [ this.$moment(new Date()).format('DD/MM/yy').toString(), this.$moment(new Date()).format('DD/MM/yy').toString()],
      dates: [ this.$moment(new Date()).subtract(7, "days").format('yy-MM-DD').toString(), this.$moment(new Date()).format('yy-MM-DD').toString()],
      // dates: ['2019-09-10', '2019-09-20'],
      aprobacionesPendientes: true,
      listadoProyectosAprobar:[{ id: 0, nombre: 'Todos' }],
      listaDocumentoEstado:[{id: 0, nombre: 'Todos'}],
      listaFormaPago:[{id: 0, nombre: 'Todos'}],
      listaMonedas: [{id: 0, nombre: 'Todos'}],
      listaTiposDespacho: [{id: 0, nombre: 'Todos'}],
      listaTiposDocumentos: [{id: 0, nombre: 'Todos'}],
      proyecto: 0,
      documentoEstado: 0,
      formaPago: 0,
      moneda: 0,
      tipoDespacho: 0,
      tipoDocumento: 0,
      listaOcs: [],
      loadingTabla: false
    }
  },
  computed: {
    dateRangeText () {
      const datePivot = []
      console.log('this.dates_ ', this.dates);
      for(let fecha of this.dates){
        datePivot.push(this.$moment(fecha).format('DD/MM/yy').toString())
      }
      datePivot.join(' ~ ')
      console.log('datePivot: ', datePivot);
      return datePivot.join(' ~ ')
      // return this.dates.join(' ~ ')
    },
    cpxDinamicHeaders() {
      if(this.origen === 1){
       return [
          // ...this.headers,
          { text: "Centro de Gestión", value: "pro_nombre", idx: 1 },
          { text: "ID OC", value: "identificacion", idx: 2 },
          { text: "Nombre OC", value: "oc_nombre", idx: 3 },
          { text: "Proveedor", value: "razon_social", sortable: false, idx: 4 },
          { text: "Comprador", value: "usu_nombre", sortable: false, idx: 4 },
          { text: "Monto", value: "neto", sortable: false, idx: 4 },
          { text: "Acción", value: "actions", sortable: false, idx: 4 }
        ]
      }else if(this.origen === 2){
          return [
          { text: "Centro de Gestión", value: "pro_nombre", idx: 1 },
          { text: "ID OC", value: "identificacion", idx: 2 },
          { text: "Nombre OC", value: "oc_nombre", idx: 3 },
          { text: "Proveedor", value: "razon_social", sortable: false, idx: 4 },
          { text: "Comprador", value: "usu_nombre", sortable: false, idx: 4 },
          { text: "Monto", value: "neto", sortable: false, idx: 4 },
          { text: "Acción", value: "actions", sortable: false, idx: 4 }
        ]
      }
      // if ( this.aprobar == true) {
      //   console.log("aprobar")
      //   return [
      //     ...this.headers,
      //     { text: "Centro de Gestión", value: "pro.nombre", idx: 1 },
      //     { text: "ID OC", value: "identificacion", idx: 2 },
      //     { text: "Nombre OC", value: "nombre", idx: 3 },
      //     { text: "Proveedor", value: "ent.razon_social", sortable: false, idx: 4 },
      //     { text: "Comprador", value: "usu.nombre", sortable: false, idx: 4 },
      //     { text: "Monto", value: "neto", sortable: false, idx: 4 },
      //     { text: "Acción", value: "actions", sortable: false, idx: 4 }
      //   ]
      // }
      // if ( this.aprobar == false) {
      //   console.log("agregar actions")
      //   return [
      //     ...this.headers,
      //     { text: "Centro de Gestión", value: "pro.nombre", idx: 1 },
      //     { text: "ID OC", value: "identificacion", idx: 2 },
      //     { text: "Nombre OC", value: "nombre", idx: 3 },
      //     { text: "Proveedor", value: "ent.razon_social", sortable: false, idx: 4 },
      //     { text: "Fecha Aprobación", value: "fec_creacion", sortable: false, idx: 4 },
      //     { text: "Comprador", value: "usu.nombre", sortable: false, idx: 4 },
      //     { text: "Monto", value: "neto", sortable: false, idx: 4 },
      //     { text: "Acción", value: "actions", sortable: false, idx: 4 }
      //   ]
      // }
      return this.headers;
    },
  },
  methods: {
    async getValoresFiltros() {
      const emp_fk =  this.$store.state.app.datosUsuario.user_tenant
      console.log('emp_fk: ', emp_fk);
      const {data} = await getFiltrosConsultas(emp_fk)
      console.log('resp getValoresFiltrosConsultas: ', data.getValoresFiltrosConsultas);
      this.listaDocumentoEstado.push(...data.getValoresFiltrosConsultas.documento_estado)
      this.listaFormaPago = [...data.getValoresFiltrosConsultas.forma_pago]
      this.listaMonedas.push(...data.getValoresFiltrosConsultas.monedas)
      this.listaTiposDespacho = data.getValoresFiltrosConsultas.tipos_despacho
      this.listaTiposDocumentos.push(...data.getValoresFiltrosConsultas.tipos_documentos);
      this.cargarOcs()
    },

    async getProyectosUsuarioAprobar() {
      const {data: {getProyectosUsuarioAprobar:{proyectos_aprobador}}} = await getProyectosUsuarioAprobador(5)
      console.log('proyectos_aprobador: ', proyectos_aprobador);
      this.listadoProyectosAprobar.push(...proyectos_aprobador)
    },
    async cargarOcs() {
      this.loadingTabla = true
      try {
        console.log('this.dates: ', this.dates);
        this.listaOcs = []
        const datos = {
          est_doc_fk: Number(this.documentoEstado),
          doc_tip_fk: Number(this.tipoDocumento),
          fec_ini: this.dates[0],
          fec_fin: this.dates[1],
          mon_fk: Number(this.moneda),
          emp_fk: Number(this.$store.state.app.datosEmpresa.id),
          origen: Number(this.origen),
          usu_apro_fk: Number(this.$store.state.app.datosUsuario.user_id),
          des_tip_fk: Number(this.tipoDespacho),
          for_pag_fk: Number(this.formaPago)
        }
        console.log('datos: ', datos);
        const {data:{getOcs: {ocs}}} = await getOcConsultas(datos)
        console.log('ocs: ', ocs);
        // this.listaOcs = ocs
        this.ocs= ocs  
      } catch (error) {
        console.log('error: ', error);
      }
      this.loadingTabla = false
      
    },
    // async cargarOc() {
    //   console.log("Cargando Datos")
    //   const { data } = await getDatosOcConsulta()
    //   console.log("Ordenes de Compra:", data.kangusoft_oc)
    //   for (let oc of data.kangusoft_oc) {
    //     // console.log("oc", oc)
    //   }
    //   this.ocs = data.kangusoft_oc
    //   this.ocsCopy = data.kangusoft_oc
    // },
    // async cargarProyectos() {
    //   const { data: { kangusoft_pro } } = await getDatosGenerales()
    //   for (let proyectos of kangusoft_pro) {
    //     this.proyectos.push({ id: proyectos.id, nombre: proyectos.nombre })
    //   }
    //   console.log('proyectos', this.proyectos)
    // },
    // async cargaEstados() {
    //   const { data: { kangusoft_est_doc } } = await getEstadosOc()
    //   for (let estado of kangusoft_est_doc) {
    //     this.estadosOc.push({ id: estado.id, nombre: estado.nombre })
    //   }

   // },
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
    // filtroCentroGestion() {
    //   if (this.proyectoSeleccionado == 0) {
    //     this.ocs = this.ocsCopy
    //   }
    //   if (this.proyectoSeleccionado != "") {
    //     this.ocs = this.ocsCopy.filter(item => {
    //       return (
    //         item.pro.id ==
    //         this.proyectoSeleccionado
    //       );
    //     });
    //   }
    // },
    // filtroEstadoOc() {
    //   if (this.estadoSeleccionado == 0) {
    //     this.ocs = this.ocsCopy
    //   }
    //   if (this.estadoSeleccionado != "") {
    //     this.ocs = this.ocsCopy.filter(item => {
    //       return (
    //         item.est_doc.id ==
    //         this.estadoSeleccionado
    //       );
    //     });
    //   }
    // },
    abrirDetalle(item){
      // if(this.consulta == true && this.aprobar == false){
      //   this.$router.push({
      //     path: "/adquisiciones/oc/consultar/detalle/",
      //     query: { id: Number(item.id),}
      // });
      // console.log("proyecto",this.$route)
      // } else if(this.aprobar == true && this.consultaz == false){
      //   this.$router.push({
      //     path: "/adquisiciones/oc/aprobar/detalle/",
      //     query: { id: Number(item.id),}
      // });
      // console.log("proyecto",this.$route)
      // }
      console.log('object: ', item);
      const path = this.origen === 1 ? '/adquisiciones/oc/aprobar/detalle/' : '/adquisiciones/oc/consultar/detalle/'
      this.$router.push({
            path,
            query: { id: Number(item.id),}
        });
     }

  }
}