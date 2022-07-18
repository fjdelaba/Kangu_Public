/* eslint-disable */
import { getProveedor } from './../../../../graphql/configuracion'
import ModalEntidad from "../../../general/modal-entidad/ModalEntidad.vue";
export default {
    components: {
        ModalEntidad
    },
    mounted() {
        this.cargarProveedores()
    },
    data() {
        return {
            datosEmpresa: "",
            proveedores:[],
            proveedorSeleccionado:"",
            headers: [
                { text: "Razon Social", align: "left", value: "razon_social" },
                { text: "Rut", align: "left", value: "rut" },
                { text: "Fecha Creacion", align: "left", value: "fec_creacion" },
                { text: "activo", value: "activo" },
                { text: "", sortable: false, align: "right", value: "action" },
            ],
            consulta: true,
            skeleton:true,
            breadcrumbs: [
                {
                  text: 'Proveedores',
                },
                {
                  text: 'Listado'
                }
              ],
              abrirDialog:false,
              copyProveedores:[],
              searchQuery:""
        };
    },
    methods: {
      searchUser() {},
        async cargarProveedores() {
            this.datosEmpresa = this.$store.state.app.datosEmpresa
            const {data: { kangusoft_ent } } = await getProveedor(this.datosEmpresa.id);
            console.log("Proveedores:",kangusoft_ent)
            for(let prov of kangusoft_ent){
                this.proveedores.push(prov)
                this.copyProveedores.push(prov)
            }
            this.skeleton = false
        },
        cargarDetalle(id){
            this.$router.push({
                path: "proveedores/detalle",
                query: { id: Number(id),}
            });
        }
    }
}