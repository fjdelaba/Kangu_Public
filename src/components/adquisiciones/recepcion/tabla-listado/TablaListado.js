/* eslint-disable */
import NombreMaterial from '../../../../components/general/nombre-obs-tabla/NombreObsTabla.vue'
import { creaPdfFactura } from '../../../../utils/pdf-factura-template'

export default {
    components: {
        NombreMaterial
    },
    mounted() {
     
        if (this.$auth.isLoading == false) {
            this.datosEmpresa = this.$store.state.app.datosEmpresa;
          }
    },
    watch: {
        "$auth.isLoading"(newCount, oldCount) {
          console.log(
            `Listado - We have ${newCount} fruits now, yay!. ${oldCount}`
          );
          if (newCount === false) {
            this.datosEmpresa = this.$store.state.app.datosEmpresa;
            console.log(
              "EMPRESA:",
              this.datosEmpresa,
  
            )
          }
        },
       
      },
    data() {
        return {
            datosEmpresa:'',            
            nombre:'Pallet',
            unidad:'Unidad',
            obs:'Porfavor Rapido',
            expanded: [],
            singleExpand: false,
            dessertHeaders: [
                { text: '', value: 'data-table-expand' },
                { text: 'ID OC', align: 'start', sortable: false, value: 'id', },
                { text: 'Nombre OC', value: 'nombre' },
                { text: 'Comprador', value: 'comprador' },
                { text: 'Fecha Creación', value: 'fecha' },
                { text: 'Saldo por Recibir', value: 'monto' },
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
            factura:''
        };
    },
    methods: {
        abrirDetalle(item){
            this.$router.push({
                path: "crear",
                query: { id: Number(item.oc),}
            });
        },
       
        async descargarOcPDF() {
            await creaPdfFactura(826, this.datosEmpresa,1);
          },
    }
}