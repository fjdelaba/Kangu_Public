/* eslint-disable */
import NombreMaterial from '../../../../components/general/nombre-obs-tabla/NombreObsTabla.vue'
export default {
    components: {
        NombreMaterial
    },
    mounted() {
    },
    data() {
        return {
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
                { text: 'Monto Total', value: 'monto' },
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
        };
    },
    methods: {
        abrirDetalle(item){
            this.$router.push({
                path: "crear",
                query: { id: Number(item.oc),}
            });
        }
    }
}