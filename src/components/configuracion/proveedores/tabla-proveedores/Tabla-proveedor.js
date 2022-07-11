/* eslint-disable */
import { getProveedor } from './../../../../graphql/configuracion'
export default {
    components: {
    },
    mounted() {
        this.cargarProveedores()
    },
    data() {
        return {
            datosEmpresa: "",
            proveedores:[],
            headers: [
                { text: "Razon Social", align: "left", value: "razon_social" },
                { text: "Rut", align: "left", value: "rut" },
                { text: "Fecha Creacion", align: "left", value: "fec_creacion" },
                { text: "activo", value: "activo" },
                { text: "", sortable: false, align: "right", value: "action" },
            ],
            consulta: true,
            skeleton:true
        };
    },
    methods: {
        async cargarProveedores() {
            this.datosEmpresa = this.$store.state.app.datosEmpresa
            const {data: { kangusoft_ent } } = await getProveedor(this.datosEmpresa.id);
            console.log("Proveedores:",kangusoft_ent)
            for(let prov of kangusoft_ent){
                this.proveedores.push(prov)
            }
            this.skeleton = false
        },
        cargarDetalle(id){
            this.$router.push({
                path: "configuracion/proveedores/detalle",
                query: { id: Number(id),}
            });
        }
    }
}