/* eslint-disable */
import { getMateriales} from './../../../../graphql/configuracion'
export default {
    components: {

    },
    mounted() {
        this.cargarMateriales()
    },
    data() {
        return {
            datosEmpresa: "",
            materiales:[],
            headers: [
                { text: "Nombre", align: "start", value: "nombre", width: "300px",},
                { text: "Unidad/Formato", align: "start", value: "unidad", },
                { text: "activo", value: "activo",width: "100px",},
                { text: "Acción", sortable: false, align: "right", value: "action", width: "200px", },
            ],
            skeleton:true,
            breadcrumbs: [
                {
                  text: 'Materiales',
                  
                },
                {
                  text: 'Listado',
                }
              ],
              copyMateriales:[],
              searchQuery:""
        };
    },
    methods: {
      searchUser() {},
        async cargarMateriales() {
            this.datosEmpresa = this.$store.state.app.datosEmpresa
            const {data: { kangusoft_mat } } = await getMateriales(this.datosEmpresa.id);
            console.log("Proveedores:",kangusoft_mat)
            for(let mat of kangusoft_mat){
                this.materiales.push({nombre:mat.nombre,id:mat.id,unidad:mat.mat_uni.nombre,activo:mat.activo})
                this.copyMateriales.push(mat)
            }
            this.skeleton = false
        },
        // cargarDetalle(id){
        //     this.$router.push({
        //         path: "proveedores/detalle",
        //         query: { id: Number(id),}
        //     });
        // }
    }
}