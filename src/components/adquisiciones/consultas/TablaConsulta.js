/* eslint-disable */
import gql from 'graphql-tag'
const QUERY_GET_OC = gql`
 query {
  kangusoft_oc {
    id
    identificacion
    nombre
    neto
    fec_creacion
    cg_fk
  }
}

`
export default {
    components: {
      },
    mounted() {
      this.cargarOc()
    },
    data() {
      return {
        headers: [
        
            { text: "Centro de Gestión", value: "id", idx: 1 },
            { text: "ID OC", value: "identificacion", idx: 2  },
            { text: "Nombre OC", value: "nombre", idx: 3  },
            { text: "Proveedor", value: "", sortable: false, idx: 4 },
            { text: "Fecha Aprobación", value: "fec_creacion", sortable: false, idx: 4 },
            { text: "Comprador", value: "", sortable: false, idx: 4 },
            { text: "Monto", value: "neto", sortable: false, idx: 4 },
            { text: "Acción", value: "actions", sortable: false, idx: 4 }

          ],
          ocs:[]
          
      };
    },
    methods: {
     async cargarOc(){
        console.log("Cargando Datos")
        const { data }  = await this.$apollo.query({
          query: QUERY_GET_OC
        })
        console.log("DATA", data)
        this.ocs = data.kangusoft_oc
      }

    }
}