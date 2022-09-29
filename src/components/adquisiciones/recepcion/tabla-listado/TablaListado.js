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
                { text: 'Proyecto', value: 'pro_nombre' },
                { text: 'Proveedor', value: 'razon_social' },
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
                query: { id: Number(item.oc),}
            });
        },

        async cargarOcs(){
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
            const {data:{getOcs: {ocs}}} = await getOcRecepcion(datos);
            for (let oc of ocs){
              console.log('oc',oc)
                if(oc.est_lin_fk != 3 && oc.est_lin_fk != null && oc.est_lin_fk != 4 &&  oc.identificacion != null ) {
                  console.log('entre')  
                  this.oc.push(JSON.parse(JSON.stringify(oc)))
                   
                }
            }
            let proyectos = [... new Set(this.oc.map(x=> ({nombre: x.pro_nombre, id: x.pro_fk})))];
            this.valoresFiltros._listaProyectos = [...new Set(proyectos.map(JSON.stringify))].map(JSON.parse);
            let proveedor = [... new Set(this.oc.map(x=> ({nombre: x.razon_social, id: x.ent_fk})))];
            this.valoresFiltros._listaProveedor = [...new Set(proveedor.map(JSON.stringify))].map(JSON.parse);
       
        },
       
        async descargarOcPDF() {
            await creaPdfFactura(826, this.datosEmpresa,1);
          },
    }
}