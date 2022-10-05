/* eslint-disable */
import { getDatosOcConsulta, getEstadosOc, getDetalleOcExcel, getOcConsultas, getOcsUsuario } from "../../../graphql/adquisiciones";
import { getDatosGenerales } from '../../../graphql/configuracion'
import Vue from "vue";
import JsonExcel from "vue-json-excel";
import { entries } from "lodash";
import { getProyectosUsuarioAprobador, getFiltrosConsultas, getProyectosUsuarioConsultar } from "../../../graphql/general";
import ModalFiltros from '../modal-filtros/ModalFiltros.vue'
import LineasOc from '../lineas-oc/LineasOc.vue'
import {creaPdfOC } from '../../../utils/pdf-oc-template'
import { creaPdfOC2 } from "../../../utils/pdf-template-nuevo";
import moment from 'moment'
Vue.component("downloadExcel", JsonExcel); 


export default {
  components: {
    ModalFiltros,
    LineasOc,
  },
  props: {
    origen: {
      type:Number,
      default: 2 // 1 = Aprobacion, 2 = Consultas
    }
  },
  mounted() {
    console.log("this.$$auth.isLoading",this.$auth.isLoading);
    if (this.$auth.isLoading == false) {
      this.datosEmpresa = this.$store.state.app.datosEmpresa;
      this.cargarListaProyecto()
      // this.getValoresFiltros()
      this.cargarOcs()
    }
  },
  watch: {
    '$auth.isLoading' (newCount, oldCount) {
      console.log(`tabla consultas - We have ${newCount} fruits now, yay!. ${oldCount}`)
      if(newCount == false){
        this.cargarListaProyecto()
        // this.getValoresFiltros()
        this.cargarOcs()
      }
    }
  },
  data() {
    return {
      expanded: [],
      singleExpand: false,
      breadcrumbs: [
        {
          text: 'Adquisiciones',
        },
        {
          text: 'Consultas'
        }
      ],
      verPdf:false,
      datosEmpresa: "",
      datosExcelCabecera: {},
      datosExcelDetalle: {},
      direction: 'right',
      fab: false,
      hover: false,
      top: false,
      right: true,
      bottom: false,
      left: false,
      actualizarDoc:false,
      transition: 'slide-y-reverse-transition',
      headerExcelCabecera: {
       
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
        "Fecha de Creacion": {
          callback: value => {
              return  this.$moment(value.fec_creacion).format('DD/MM/yy').toString();
          }
      },
        "Monto": "neto",
        "Estado de Oc": "est_nombre", 
    },
    headerExcelDetalle: {
      "Nombre Centro Gestion": "pro_nombre",
      "Identificador OC": "identificacion",
      "Nombre OC": "oc_nombre",
      "Nombre Proveedor": "razon_social",
      "Rut Proveedor": "rut",
      "Usuario Comprador": "comprador",
      "Codigo": "mat_fk",
      "Material": "material",
      "Cantdad": "cantidad",
      "Precio": "precio",
      "Total": "total",
      "Impuestos":"impuestos",
      "Moneda": "mon_nombree",
      "Monto Oc": "neto",
      "Estado de Oc": "estado", 
  },
      headers: [
      ],
      ocs: [],
      oc1: [],
      proyectos: [{ id: 0, nombre: 'Todos los Proyectos' }],
      estadosOc: [{ id: 0, nombre: 'Todos los Estados' }],
      ocsCopy: [],
      menu:false,
      dates: [ this.$moment(new Date()).subtract(30, "days").format('yy-MM-DD').toString(), this.$moment(new Date()).add(1, 'days').format('yy-MM-DD').toString()],
      aprobacionesPendientes: true,
      listadoProyectos:[{ id: 0, nombre: 'Todos' }],
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
      loadingTabla: false,
      mostrarModalFiltros: false,
      buscarOcs: '',
      valoresFiltros: {
        _listaEstados:[],
        _listaMonedas:[],
        _listaDespachos:[],
        _listaFormasPago:[],
        _listaEstadoLineas:[],
        _listaTiposDocumento:[],
        _listaProyectos: [], // Este filtro no viene desde el modal
        _listaProveedores: [], // Este filtro no viene desde el modal
        _listaCompradores: [] // Este filtro no viene desde el modal
      },
      filtros:{
        estados: [],
        monedas: [],
        despachos: [],
        formasPago: [],
        estadoLineas: [],
        tiposDocumento: [],
        proyectos: [], // Este filtro no viene desde el modal
        proveedores: [], // Este filtro no viene desde el modal
        compradores: [] // Este filtro no viene desde el modal
      },
      mostrarBudgeFiltros: false,
      mostrarDialogPdf: false
    }
  },
  computed: {
    cpxListaOc(){
        return this.items.reduce(function(acc, v) {
           return [...acc, ...v.lineas]
        }, [])
    },
    cpxDatosTabla() {

    //   this.ocs.reduce(function(oc, v) {
    //     console.log('ov.lineas: ', v.lineas);
    //     this.oc1.push('asdasd')
    //     return [...oc, ...v.lineas]
    //  }, [])
      return this.ocs.filter(oc => {
        let agregar = true;
        console.log('OC: ', oc);
        if (this.filtros.estados.length > 0) {
          console.log("oc.est_doc_fk.est",oc.est_doc_fk)
          agregar = agregar && this.filtros.estados.includes(oc.est_doc_fk)
        }
        if (this.filtros.monedas.length > 0) {
          agregar = agregar && this.filtros.monedas.includes(oc.mon_fk)
        }
        if (this.filtros.despachos.length > 0) {
          agregar = agregar && this.filtros.despachos.includes(oc.des_tip_fk)
        }
        if (this.filtros.formasPago.length > 0) {
          agregar = agregar && this.filtros.formasPago.includes(oc.for_pag_fk)
        }
        if (this.filtros.estadoLineas.length > 0) {
          agregar = agregar && this.filtros.estadoLineas.includes(oc.est_lin_fk)
        }
        if (this.filtros.tiposDocumento.length > 0) {
          agregar = agregar && this.filtros.tiposDocumento.includes(oc.doc_tip_fk)
        }
        if (this.filtros.proyectos.length > 0) {
          agregar = agregar && this.filtros.proyectos.includes(oc.pro_fk)
        }
        if (this.filtros.proveedores.length > 0) {
          agregar = agregar && this.filtros.proveedores.includes(oc.ent_fk)
        }
        if (this.filtros.compradores.length > 0) {
          agregar = agregar && this.filtros.compradores.includes(oc.usu_fk)
        }
        return agregar;
      });
    },
    cpxMostrarBadge(){
      return this.filtros.estados.length > 0 || this.filtros.monedas.length > 0 || this.filtros.despachos.length > 0 || this.filtros.formasPago.length > 0
      || this.filtros.estadoLineas.length > 0 || this.filtros.tiposDocumento.length > 0
    },
    dateRangeText () {
      const datePivot = []
      console.log('this.dates_ ', this.dates);
      for(let fecha of this.dates){
        datePivot.push(this.$moment(fecha).format('DD/MM/yy').toString())
      }
      datePivot.join(' ~ ')
      console.log('datePivot: ', datePivot);
      return datePivot.join(' ~ ')
    },
    cpxDinamicHeaders() {
      if(this.origen === 1){
       return [
          { text: "Centro de Gestión", value: "pro_nombre", idx: 1 },
          { text: "ID OC", value: "identificacion", idx: 2 },
          { text: "Nombre OC", value: "oc_nombre", idx: 3 },
          { text: "Proveedor", value: "razon_social", sortable: true, idx: 4 },
          { text: "lineas", value: "lineasJson", sortable: true, align: ' d-none', idx: 8},
          // { text: "Comprador", value: "usu_nombre", sortable: true, idx: 5 },
          { text: "Creado", value: "fec_creacion", sortable: true, idx: 6 },
          { text: "Monto", value: "neto", sortable: true, idx: 7 },
          { text: "Acción", value: "actions", sortable: false, idx: 8 },
          { text: "Acción", value: "pdf", sortable: false, idx: 9 },
          // { text: "Acción 1", value: "pdf1", sortable: false, idx: 9 },
        ]
      }else if(this.origen === 2){
          return [
          { text: "Centro de Gestión", value: "pro.pro_nombre", idx: 1 },
          { text: "ID OC", value: "identificacion", idx: 2 },
          { text: "Nombre OC", value: "oc_nombre", idx: 3 },
          { text: "Proveedor", value: "ent.razon_social", sortable: true, idx: 4 },
          { text: "lineas", value: "materiales", sortable: true,align: ' d-none', idx: 5},
          // { text: "Comprador", value: "usu_nombre", sortable: true, idx: 6 },
          { text: "Creado", value: "fec_creacion", sortable: true, idx: 7 },
          { text: "Monto", value: "neto", sortable: true, idx: 8 },
          { text: "Acción", value: "actions", sortable: false, idx: 9 },
          { text: "", value: "pdf", sortable: false, idx: 10 }
          // { text: "Acción 1", value: "pdf1", sortable: false, idx: 9 },
        ]
      }
      else if(this.origen === 3){
        return [
        { text: "Centro de Gestión", value: "pro_nombre", idx: 1 },
        { text: "ID OC", value: "identificacion", idx: 2 },
        { text: "Nombre OC", value: "oc_nombre", idx: 3 },
        { text: "Proveedor", value: "razon_social", sortable: true, idx: 4 },
        { text: "lineas", value: "lineasJson", sortable: true,align: ' d-none', idx: 5},
        // { text: "Comprador", value: "usu_nombre", sortable: true, idx: 6 },
        { text: "Creado", value: "fec_creacion", sortable: true, idx: 7 },
        { text: "Monto", value: "neto", sortable: true, idx: 8 },
        { text: "Acción", value: "actions", sortable: false, idx: 9 },
        { text: "", value: "pdf", sortable: false, idx: 10 }
        // { text: "Acción 1", value: "pdf1", sortable: false, idx: 9 },
      ]
    }
      return this.headers;
    },
  },
  methods: {
    getFechaFormat(fecha){
      return moment(fecha).format("DD/MM/YYYY")
    },
    moment() {
      return moment();
    },
    mostrarPDF(){
      this.verPdf = true
      
      setTimeout(() => {
        this.actualizarPDF()
      }, 10)
    
    },
    actualizarPDF(){
     this.actualizarDoc = true
      console.log("this.$refs.refpdf",this.$refs.refpdf)
      this.$refs.refpdf.verPdf(this.actualizarDoc)
    },
    exportToPDF () {
      console.log("this.$refs.refpdf",this.$refs)
      this.$refs.refpdf.exportToPDF()
      
    },
    async descargarPdf(item) {
      try {
        console.log('item: ', item);

        // const cabecera = {
        //   proveedor:{
        //     direccion: item.ent_direccion,
        //     razon_social: item.razon_social,
        //     rut: item.rut,
        //   },
        //   contacto:{
        //     nombre: item.ec_nombre,
        //     email: item.ec_email
        //   },
        //   fec_creacion: item.fec_creacion,
        //   identificacion: item.identificacion,
        //   nombre: item.oc_nombre,
        //   proyecto: {
        //     nombre: item.pro_nombre
        //   },
        //   moneda:{
        //     nombre: item.mon_nombre
        //   },
        //   tipoDespacho:{
        //     nombre: item.desp_nombre
        //   },
        //   formaPago:{
        //     nombre: item.fp_nombre
        //   }
        // }
        // console.log('cabecera: ', cabecera);
  
        // const materiales = []
        // for(const linea of item.lineas){
        //   console.log('linea: ', linea);
        //   const lineas = {
        //     cantidad: linea.cant_ajustada,
        //     total: Number(linea.cant_ajustada) * Number(linea.precio_unitario),
        //     precio_unitario: linea.precio_unitario,
        //     mat:{
        //       nombre: linea.nombre,
        //       mat_uni: {
        //         nombre: linea.mu_nombre
        //       }
        //     },
        //     observacion: linea.observacion
        //   }
  
        //   materiales.push(lineas)
        // }
        // console.log('materiales: ', materiales);
        // const total =  (Number(item.neto) + Number(Math.abs(item.impuestos)))
        // console.log('total: ', total)
        // const totales = [
        //   { item: 'Neto', valor: item.neto },
        //   { item: 'IVA (19%)', valor:  Math.abs(item.impuestos) },
        //   { item: 'Total', valor: total}
        // ]
        // console.log('totales: ', totales);
        console.log("envio a pdf ;",item.id, this.datosEmpresa,1)
         await creaPdfOC2(item.id,this.datosEmpresa, 1) 
      } catch (error) {
        console.log('error tablaConsulta: ', error);
      }
    },
    limpiarFiltros(){
      console.log('Limpiar !!!! ');
      this.filtros.proyectos = [] // Este filtro no viene desde el modal
      this.filtros.proveedores = [] // Este filtro no viene desde el modal
      this.filtros.compradores = []
    },
    cargarListaProyecto(){
      if(this.origen === 1){
        this.getProyectosUsuarioAprobar()
      }else if(this.origen === 2){
        this.getProyectosUsuarioConsultas()
      }
    },
    // async getValoresFiltros() {
    //   const emp_fk =  this.$store.state.app.datosUsuario.user_tenant
    //   console.log('emp_fk: ', emp_fk);
    //   const {data} = await getFiltrosConsultas(emp_fk)
    //   console.log('resp getValoresFiltrosConsultas: ', data.getValoresFiltrosConsultas);
    //   this.listaDocumentoEstado.push(...data.getValoresFiltrosConsultas.documento_estado)
    //   this.listaFormaPago = [...data.getValoresFiltrosConsultas.forma_pago]
    //   this.listaMonedas.push(...data.getValoresFiltrosConsultas.monedas)
    //   this.listaTiposDespacho = data.getValoresFiltrosConsultas.tipos_despacho
    //   this.listaTiposDocumentos.push(...data.getValoresFiltrosConsultas.tipos_documentos);
    //   this.cargarOcs()
    // },

    async getProyectosUsuarioAprobar() {
      const {data: {getProyectosUsuarioAprobar:{proyectos_aprobador}}} = await getProyectosUsuarioAprobador(this.$store.state.app.datosUsuario.user_id)
      console.log('proyectos_aprobador: ', proyectos_aprobador);
      this.listadoProyectos.push(...proyectos_aprobador)
    },
    async getProyectosUsuarioConsultas() {
      const {data: {getProyectosUsuarioConsulta:{proyectos_consultar}}} = await getProyectosUsuarioConsultar(this.$store.state.app.datosUsuario.user_id)
      console.log('proyectos_consultar: ', proyectos_consultar);
      this.listadoProyectos.push(...proyectos_consultar)
    },
    async cargarOcs() {
      this.loadingTabla = true

   

      try {
        this.valoresFiltros._listaProyectos = []
        this.valoresFiltros._listaProveedores = []
        this.valoresFiltros._listaCompradores = []

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
        // const {data:{getOcs: {ocs}}} = await getOcConsultas(datos)
        console.log('this.$store.state.app.datosUsuario.user_id: ', this.$store.state.app.datosUsuario.user_id);
        const data_ = await getOcsUsuario(this.$store.state.app.datosUsuario.user_id)
        console.log('new_ocs_ ', data_.data.kangusoft_view_permisos_usuario_mod);
        const arregloNuevo = [...data_.data.kangusoft_view_permisos_usuario_mod]
        const nuevaOc = []

        for(const linea of arregloNuevo) {
          console.log('linea arreglo nuevo: ', linea);
          for(const ocs_lineas of linea.view_permisos_usuario_mod_oc){
            console.log('ocs_lineas: ', ocs_lineas);
            let nombre_material = ''
            for (const ocs_lineas_mat of ocs_lineas.oc_dets){
              console.log('ocs_lineas_mat: ', ocs_lineas_mat);
              nombre_material+=` ${ocs_lineas_mat.mat.nombre}`
            }
            ocs_lineas.materiales = nombre_material
            nuevaOc.push(ocs_lineas)
          }
        }
        // for(const linea of data_.data.kangusoft_view_permisos_usuario_mod){
        //   console.log('linea: ', linea.view_permisos_usuario_mod_oc);
        //   // for(const linea_hijo of linea.view_permisos_usuario_mod_oc){
        //   //   console.log('oc nuevo objeto: ', linea_hijo);
        //     let nombre_material = ''
        //     for(const lineaDet of linea.view_permisos_usuario_mod_oc.oc_dets){
        //       console.log('materiales: ', lineaDet);
        //       nombre_material+=` ${lineaDet.mat.nombre}`
        //     }
        //     linea.view_permisos_usuario_mod_oc.materiales = nombre_material
        //   // } 
        //   nuevaOc.push(linea.view_permisos_usuario_mod_oc)
        // }
        console.log('flat: ', arregloNuevo.flat(4));
        // console.log('ocs: ', ocs); 
        console.log('nuevo arregloNuevo: ', arregloNuevo); 
        console.log('nueaOc: ', nuevaOc);



        // this.listaOcs = ocs
        //this.ocs= JSON.parse(JSON.stringify(ocs))
        this.ocs= JSON.parse(JSON.stringify(nuevaOc))


        let monedas = [... new Set(nuevaOc.map(x=> ({nombre: x.mon.mon_nombre, id: x.mon_fk})))];
        let formasPago = [... new Set(nuevaOc.map(x=> ({nombre: x.for_pag.fp_nombre, id: x.for_pag_fk})))];
        let tiposDespacho = [... new Set(nuevaOc.map(x=> ({nombre: x.des_tip.desp_nombre, id: x.des_tip_fk})))];
        let tiposDocumento = [... new Set(nuevaOc.map(x=> ({nombre: x.doc_tip.dt_nombre, id: x.doc_tip_fk})))];
        let estadosDocumento = [... new Set(nuevaOc.map(x=> ({nombre: x.est_doc.est_nombre, id: x.est_doc_fk})))];
        let estadosLineas = [... new Set(nuevaOc.map(x=> ({nombre: x.est_lin.el_nombre, id: x.est_lin_fk})))];
        let proyectos = [... new Set(nuevaOc.map(x=> ({nombre: x.pro.pro_nombre, id: x.pro_fk})))];
        let proveedores = [... new Set(nuevaOc.map(x=> ({nombre: x.ent.razon_social, id: x.ent_fk})))];
        let compradores = [... new Set(nuevaOc.map(x=> ({nombre: `${x.usu.usu_nombre} ${x.usu.usu_apellidos}`, id: x.usu_fk})))];
        
        this.valoresFiltros._listaMonedas = [...new Set(monedas.map(JSON.stringify))].map(JSON.parse);
        this.valoresFiltros._listaFormasPago = [...new Set(formasPago.map(JSON.stringify))].map(JSON.parse); 
        this.valoresFiltros._listaDespachos = [...new Set(tiposDespacho.map(JSON.stringify))].map(JSON.parse);
        this.valoresFiltros._listaTiposDocumento = [...new Set(tiposDocumento.map(JSON.stringify))].map(JSON.parse);
        this.valoresFiltros._listaEstados = [...new Set(estadosDocumento.map(JSON.stringify))].map(JSON.parse);
        this.valoresFiltros._listaEstadoLineas = [...new Set(estadosLineas.map(JSON.stringify))].map(JSON.parse);
        this.valoresFiltros._listaProyectos = [...new Set(proyectos.map(JSON.stringify))].map(JSON.parse);
        this.valoresFiltros._listaProveedores = [...new Set(proveedores.map(JSON.stringify))].map(JSON.parse);
        this.valoresFiltros._listaCompradores = [...new Set(compradores.map(JSON.stringify))].map(JSON.parse);



        console.log('_listaMonedas: ', this.valoresFiltros._listaMonedas);
        console.log('_listaFormasPago: ', this.valoresFiltros._listaFormasPago);
        console.log('_listaDespachos: ', this.valoresFiltros._listaDespachos);
        console.log('_listaTiposDocumento: ', this.valoresFiltros._listaTiposDocumento);
        console.log('_listaEstados: ', this.valoresFiltros._listaEstados);
        console.log('_listaEstadoLineas: ', this.valoresFiltros._listaEstadoLineas);
        console.log('_listaProyectos: ', this.valoresFiltros._listaProyectos);
        console.log('_listaProveedores: ', this.valoresFiltros._listaProveedores);
        console.log('_listaCompradores: ', this.valoresFiltros._listaCompradores);

      } catch (error) {
        console.log('error: ', error);
      }
      this.loadingTabla = false
      
    },
   async cargarDataExcelDetalle() {
    const detalles = []
  //   "Nombre Centro Gestion": "oc.pro.nombre",
  //   "Identificador OC": "oc.identificacion",
  //   "Nombre OC": "oc.nombre",
  //   "Nombre Proveedor": "razon_social",
  //   "Rut Proveedor": ".rut",
  //   "Usuario Comprador": {
  //     field: "oc.usu",
  //     callback: value => {
  //         return `${value.nombre} ${value.apellidos}`;
  //     }
  // },
  //   "Codigo": "mat.id",
  //   "Material": "mat.nombre",
  //   "Cantdad": "cantidad",
  //   "Precio": "precio_unitario",
  //   "Total": "total",
  //   "Impuestos":"oc.impuestos",
  //   "Moneda": "oc.mon.nombre",
  //   "Monto Oc": "oc.neto",
  //   "Estado de Oc": "oc.est_doc.nombre", 
    for(let detalle of this.ocs){
      console.log('detalle: ', detalle);
      const pro_nombre = detalle.pro_nombre
      const identificacion = detalle.identificacion
      const oc_nombre = detalle.oc_nombre
      const razon_social = detalle.razon_social
      const rut = detalle.rut
      const impuestos = detalle.impuestos
      const mon_nombre = detalle.mon_nombre
      const comprador = `${detalle.usu_nombre} ${detalle.usu_apellidos}`
      const neto = detalle.neto
      const estado = detalle.est_nombre
      for(let lineaDetalle of detalle.lineas){
        console.log('lineaDetalle: ', lineaDetalle);
        const obj = {
          pro_nombre,
          identificacion,
          oc_nombre,
          razon_social,
          rut,
          comprador,
          // codigo: lineaDetalle.codigo,
          material: lineaDetalle.nombre,
          cantidad: lineaDetalle.cant_ajustada,
          precio: lineaDetalle.precio_unitario,
          total: (Number(lineaDetalle.cant_ajustada)*Number(lineaDetalle.precio_unitario)),
          mat_fk: lineaDetalle.mat_fk,
          impuestos: impuestos,
          mon_nombre,
          neto,
          estado
        }
        detalles.push(obj)
        // console.log('obj_ ', obj);
      }
    }
  //   console.log("Cargando Datos")
  //   const { data } = await getDetalleOcExcel()
  //  let datosOcDetalle = data.kangusoft_oc_det
  //     for(let detalle of datosOcDetalle){
  //       console.log("OC", detalle)
  //       if(detalle.oc.neto == null){
  //         detalle.oc.neto = 0
  //       } else if(detalle.oc.neto != null){
  //         detalle.oc.neto  = new Intl.NumberFormat('es-CL').format( detalle.oc.neto )
  //       }
  //       if( detalle.precio_unitario == null){
  //         console.log("SI!")
  //       } else if(detalle.precio_unitario  != null){
  //         detalle.precio_unitario   = new Intl.NumberFormat('es-CL').format(detalle.precio_unitario  )
  //       }
  //       if( detalle.total == null){
  //         console.log("SI2!")
  //       } else if(detalle.total != null){
  //         detalle.total  = new Intl.NumberFormat('es-CL').format( detalle.total )
  //       }
  //       if( detalle.cantidad == null){
  //         console.log("SI3!")
  //       } else if(detalle.cantidad != null){
  //         detalle.cantidad  = new Intl.NumberFormat('es-CL').format( detalle.cantidad )
  //       }
  //       if(detalle.oc.identificacion == "" || detalle.oc.identificacion == null ){
  //         detalle.oc.identificacion = "Sin Identificador"
  //       }
  //       if(detalle.oc.impuestos == null){
  //         detalle.oc.impuestos = 0 
  //       }else if(detalle.oc.impuestos != null){
  //         detalle.oc.impuestos = new Intl.NumberFormat('es-CL').format( detalle.oc.impuestos )
  //       }
  //     }
  //     return datosOcDetalle;
      return detalles;
  },
    
    cargarDataExcelCabecera() {
      //alert('Se genero el archivo cabeceras_oc.xls')
      console.log("METODO EXCEL:", this.ocs);
      const ocExcel = [...this.cpxDatosTabla]
      for(let oc of ocExcel){
   
        if(oc.neto != null){
          console.log("FORMATO:", new Intl.NumberFormat('es-CL').format(oc.neto))
         oc.neto = new Intl.NumberFormat('es-CL').format(oc.neto)
        }else if( oc.neto == null){
          oc.neto = 0
        }
       
      }
      return ocExcel;
  },
  mostrarFiltros(filtros){
    console.log('filtros: ', filtros);
    if(Object.keys(filtros).length === 0){
      this.mostrarBudgeFiltros = false
      this.filtros.estados = []
      this.filtros.monedas = [],
      this.filtros.despachos = [],
      this.filtros.formasPago = [],
      this.filtros.estadoLineas = [],
      this.filtros.tiposDocumento = []
    }else{
      this.mostrarBudgeFiltros = true
      this.filtros.estados = [...filtros.estados]
      this.filtros.monedas = [...filtros.monedas],
      this.filtros.despachos = [...filtros.despachos],
      this.filtros.formasPago = [...filtros.formasPago],
      this.filtros.estadoLineas = [...filtros.estadoLineas],
      this.filtros.tiposDocumento = [...filtros.tiposDocumento]
    }
    
    this.mostrarModalFiltros = false
  },
    abrirDetalle(item){
      console.log('object: ', item);
      const path = this.origen === 1 ? '/adquisiciones/oc/aprobar/detalle/' : '/adquisiciones/oc/consultar/detalle/'
      this.$router.push({
            path,
            query: { id: Number(item.id),}
        });
     }

  }
}