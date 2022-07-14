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
            razonSocial:[{id:0, razon_social: 'Todos los proveedores'}],
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
              copyProveedores:[]
        };
    },
    methods: {
        async cargarProveedores() {
            this.datosEmpresa = this.$store.state.app.datosEmpresa
            const {data: { kangusoft_ent } } = await getProveedor(this.datosEmpresa.id);
            console.log("Proveedores:",kangusoft_ent)
            for(let prov of kangusoft_ent){
                this.proveedores.push(prov)
                this.copyProveedores.push(prov)
                this.razonSocial.push({razon_social:prov.razon_social,id:prov.id})
            }
            this.skeleton = false
        },
        filtroProveedor() {
            if (this.proveedorSeleccionado.id == 0) {
                this.proveedores = this.copyProveedores
              }
            if (this.proveedorSeleccionado.id != "") {
              this.proveedores = this.copyProveedores.filter(item => {
                return (
                  item.razon_social ==
                  this.proveedorSeleccionado.razon_social
                );
              });
            }
          },
        cargarDetalle(id){
            this.$router.push({
                path: "proveedores/detalle",
                query: { id: Number(id),}
            });
        }
    }
}