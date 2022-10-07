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
      console.log('this.$$auth.isLoading',this.$auth.isLoading,this.$store.state.app.datosEmpresa)
        if (this.$auth.isLoading == false) {
            this.datosEmpresa = this.$store.state.app.datosEmpresa;
            console.log('thisdatos empresa',this.$store.state.app.datosEmpresa)
      
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
                { text: 'ID OC', align: 'start', sortable: false, value: 'identificacion', },
                { text: 'Nombre OC', value: 'oc_nombre' },
                { text: 'Proyecto', value: 'pro.pro_nombre' },
                { text: 'Proveedor', value: 'ent.razon_social' },
                { text: 'Fecha Creación', value: 'fecha' },
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
            console.log('console.log',this.$store.state.app.datosUsuario.user_id)
            const data = await getOcRecepcion(this.$store.state.app.datosUsuario.user_id)
            console.log('data',data.data.kangusoft_view_permisos_usuario_mod)
            const arregloNuevo = [...data.data.kangusoft_view_permisos_usuario_mod]
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
            this.oc = nuevaOc
            // for (let oc of data.data.kangusoft_view_permisos_usuario_mod){
            //   console.log('oc',oc)
            //   for(let oc of oc){
            //     if(oc.est_lin_fk != 3 && oc.est_lin_fk != null && oc.identificacion != null ) {
            //       console.log('entre')  
            //       this.oc.push(JSON.parse(JSON.stringify(oc)))  
            //     }
            //   }
            // }
            let proyectos = [... new Set(this.oc.map(x=> ({nombre: x.pro.pro_nombre, id: x.pro.id})))];
            this.valoresFiltros._listaProyectos = [...new Set(proyectos.map(JSON.stringify))].map(JSON.parse);
            let proveedor = [... new Set(this.oc.map(x=> ({nombre: x.ent.razon_social, id: x.ent.id})))];
            this.valoresFiltros._listaProveedor = [...new Set(proveedor.map(JSON.stringify))].map(JSON.parse);
       
        },
       
        async descargarOcPDF() {
            await creaPdfFactura(826, this.datosEmpresa,1);
          },
    }
}