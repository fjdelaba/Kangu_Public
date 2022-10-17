/* eslint-disable */
import NombreMaterial from '../../../../components/general/nombre-obs-tabla/NombreObsTabla.vue'
import { creaPdfFactura } from '../../../../utils/pdf-factura-template'
import {getOcRecepcion} from '../../../../graphql/adquisiciones'
import moment from 'moment'
export default {
    components: {
        NombreMaterial
    },
    mounted() {
      this.oc = []
      console.log('this.$$auth.isLoading',this.$auth.isLoading,this.$store.state.app.datosEmpresa)
        if (this.$auth.isLoading == false) {
            this.datosEmpresa = this.$store.state.app.datosEmpresa;
            console.log('thisdatos empresa',this.$store.state.app.datosEmpresa)
            this.oc = []
            this.cargarOcs()
          }
 
    },
    // watch: {
    //     "$auth.isLoading"(newCount, oldCount) {
    //       console.log(
    //         `Listado - We have ${newCount} fruits now, yay!. ${oldCount}`
    //       );
    //       if (newCount === false) {
    //         this.cargarOcs()
    //       }
    //     },
       
    //   },
      watch: {

        '$auth.isLoading' (newCount, oldCount) {
          console.log(`tabla consultas - We have ${newCount} fruits now, yay!. ${oldCount}`)
          if (newCount === false) {
            console.log('Cargar notificaciones: ', this.$store.state.app.datosUsuario.user_id)
            this.cargarOcs()
          }
        }
      },
    data() {
        return {
            datosEmpresa:'',   
            loadingTabla: false,         
            nombre:'Pallet',
            unidad:'Unidad',
            obs:'Porfavor Rapido',
            expanded: [],
            singleExpand: false,
            oc:[],
            proyecto: 0,
            documentoEstado: 0,
            formaPago: 0,
            origen:2,
            moneda: 0,
            tipoDespacho: 0,
            tipoDocumento: 0,
            menu:false,
            dates: [ this.$moment(new Date()).subtract(20, "days").format('yy-MM-DD').toString(), this.$moment(new Date()).add(1, 'days').format('yy-MM-DD').toString()],
            searchQuery:'',
            dessertHeaders: [
                { text: '', value: 'data-table-expand' },
                { text: 'ID OC', align: 'start', value: 'identificacion', },
                { text: 'Nombre OC', value: 'oc_nombre' },
                { text: 'Proyecto', value: 'pro.pro_nombre' },
                { text: 'Proveedor', value: 'ent.razon_social' },
                { text: 'Fecha Creación', value: 'fec_creacion'},
                { text: 'Fecha', value: 'fecha'  },
                { text: 'Saldo por Recibir', value: 'neto' },
                { text: 'Acción', value: 'actions' },

            ],
            dessertHeaders2: [
                { text: 'Nombre Material', value: 'nombre' },
                { text: 'Unidad/Formato', value: 'comprador' },
                { text: 'Cantidad Solicitada', value: 'fecha' },
                { text: 'Saldo a Recibir', value: 'monto' },
            ],
            desserts2: [
                {
                    nombre: 'Pintura esmalte sintetico',
                    comprador: 'Tineta',
                    fecha: 26,
                    monto: 65,
                }
            ],
            desserts: [
                {
                    id: 'OC-1051-2',
                    oc:1,
                    nombre: 'Compra arena anden acceso',
                    comprador: 'Bastiancito',
                    fecha: '21/07/2022',
                    monto: '1000000',
                }
            ],
            filtros:{
                proyectos: [], 
                proveedor: [],// Este filtro no viene desde el modal
              },
              valoresFiltros: {
                _listaProyectos: [],
                _listaProveedor: [], // Este filtro no viene desde el modal
              },
          
        };
    },
    computed: {
        cpxDatosTabla() {
          return this.oc.filter(oc => {
            let agregar = true;
            console.log('OC: ', oc);
            if (this.filtros.proyectos.length > 0) {
              agregar = agregar && this.filtros.proyectos.includes(oc.pro.id)
            }
            if (this.filtros.proveedor.length > 0) {
              agregar = agregar && this.filtros.proveedor.includes(oc.ent.id)
            }
            return agregar
          });
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
    },
    methods: {
        getFechaFormat(fecha){
            return moment(fecha).format("DD/MM/YYYY")
          },
        abrirDetalle(item){
            this.$router.push({
                path: "crear",
                query: { id: Number(item.id),}
            });
        },

        async cargarOcs(){
          this.loadingTabla = true
          this.oc = []
            console.log('console.log',this.$store.state.app.datosUsuario.user_id)
            let data = await getOcRecepcion(this.$store.state.app.datosUsuario.user_id)
            console.log('data',data.data.kangusoft_view_permisos_usuario_mod)
            let arregloNuevo = data.data.kangusoft_view_permisos_usuario_mod
            let nuevaOc = []
            for(const linea of arregloNuevo) {
              console.log('linea arreglo nuevo: ', linea);
              for(const ocs_lineas of linea.view_permisos_usuario_mod_oc){
                const fecha = moment( ocs_lineas.fec_creacion ).format("DD/MM/YYYY")
                ocs_lineas.fecha = fecha
                // if(moment(fecha).isValid() == true){
                //   console.log('fecha if',fecha)
                //   ocs_lineas.fec_creacion =  fecha
                // }else if(moment(fecha).isValid() == false){
                //   const newFecha =  new Date(ocs_lineas.fec_creacion)
                //   const year = newFecha.toLocaleString("default", { year: "numeric" });
                //   const month = newFecha.toLocaleString("default", { month: "2-digit" });
                //   const day = newFecha.toLocaleString("default", { day: "2-digit" });
                //   const formattedDate = day + "/" + month + "/" + year;
                //   console.log(formattedDate);  // Prints: 04-05-2022
                //   console.log('fecha else',formattedDate)
                //   ocs_lineas.fec_creacion =  formattedDate
                // }
                console.log(' ocs_lineas.fec_creacion ', ocs_lineas.fec_creacion )
                // 
                console.log('ocs_lineas: ', ocs_lineas);
                let nombre_material = ''
                for (const ocs_lineas_mat of ocs_lineas.oc_dets){
                  console.log('ocs_lineas_mat: ', ocs_lineas_mat);
                  nombre_material+=` ${ocs_lineas_mat.mat.nombre}`
                }
                console.log('ocs_lineas.neto 2: ', ocs_lineas.oc__view_monto_recepciones_obra)
                if(ocs_lineas.oc__view_monto_recepciones_obra != null || ocs_lineas.oc__view_monto_recepciones_obra != undefined){
              
                  console.log(' ocs_lineas.neto',  ocs_lineas.neto)
                }
                ocs_lineas.materiales = nombre_material
                
                nuevaOc.push(ocs_lineas)
                console.log('nuevaOc',nuevaOc)
              }
            }
            this.oc = nuevaOc
            let proyectos = [... new Set(this.oc.map(x=> ({nombre: x.pro.pro_nombre, id: x.pro.id})))];
            this.valoresFiltros._listaProyectos = [...new Set(proyectos.map(JSON.stringify))].map(JSON.parse);
            let proveedor = [... new Set(this.oc.map(x=> ({nombre: x.ent.razon_social, id: x.ent.id})))];
            this.valoresFiltros._listaProveedor = [...new Set(proveedor.map(JSON.stringify))].map(JSON.parse);
            this.loadingTabla = false
        },
    }
}