/* eslint-disable */
import gql from "graphql-tag";
const UPDATE_MONEDA = gql`
 mutation update_moneda($id_moneda: bigint!, $nombre: String!, $activo: Boolean!) {
  update_kangusoft_moneda(where: {id: {_eq: $id_moneda}}, _set: {nombre: $nombre, activo: $activo}) {
    affected_rows
    returning {
      nombre
      activo
    }
  }
}`;

const UPDATE_TDESPACHO = gql `
mutation update_tdespacho($id_tdespacho: bigint!, $nombre: String!, $activo: Boolean!){
  update_kangusoft_desp_tipo(where: {id: {_eq: $id_tdespacho}}, _set: {nombre: $nombre, activo: $activo}) {
    affected_rows
    returning {
      id
      nombre
      activo
    }
  }
}`
const UPDATE_FPAGO = gql `
mutation update_fpago($id_fpago: bigint!, $nombre: String!, $activo: Boolean!){
  update_kangusoft_forma_pago(where: {id: {_eq: $id_fpago}}, _set: {nombre: $nombre, activo: $activo}) {
    affected_rows
    returning {
      id
      nombre
      activo
    }
  }
}`

export default {
  created() {
    console.log("CREATED");
  },
  mounted() {
    console.log(this.idMantenedor)
  },
  props: {
    mantenedores: Array,
    lista: Array,
    idMantenedor: Number,
  },
  data() {
    return {

      nombreMantenedor: "",
      search: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Nombre", value: "nombre" },
        { text: "Activo", value: "activo" },
        { text: "Accion", value: "actions", sortable: false },
      ],
      checkbox1: true,
      dialog: false,
      dialogDelete: false,

      editedIndex: -1,
      editedItem: {
        nombre: "",
      },
      aux:"",

    };
  },
  computed: {
    tituloMantenedor() {
      this.nombreMantenedor =
        this.$parent.$refs.botonMantenedor.mantenedorSelec.nombre;
      return this.nombreMantenedor;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() { },

  methods: {
    editItem(item) {
      this.editedIndex = this.lista.indexOf(item);
      this.editedItem = Object.assign({}, item);
      // this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if(this.idMantenedor == 1){
        console.log("FORMA DE PAGO")
       const { data }  = await this.$apollo.mutate({
         mutation: UPDATE_FPAGO,
         variables:{
           'id_fpago':this.editedItem.id,
           'nombre':  this.editedItem.nombre,
           'activo':  this.editedItem.activo
         },
         update: (data) => {console.log("aa",data)} 
       })
       this.aux = data
       console.log("data", data)
       
        this.$set(this.lista[this.editedIndex], 'nombre', data.update_kangusoft_forma_pago.returning[0].nombre);
        this.$set(this.lista[this.editedIndex], 'activo', data.update_kangusoft_forma_pago.returning[0].activo);
        this.close();
      }else{
       console.log("no entre")
      }
      if(this.idMantenedor == 2){
        console.log("TIPO DE DESPACHO")
       const { data }  = await this.$apollo.mutate({
         mutation: UPDATE_TDESPACHO,
         variables:{
           'id_tdespacho': this.editedItem.id,
           'nombre':  this.editedItem.nombre,
           'activo':  this.editedItem.activo
         },
         update: (data) => {console.log("aa",data)} 
       })
       this.aux = data
       console.log("data", data)
       
        this.$set(this.lista[this.editedIndex], 'nombre', data.update_kangusoft_desp_tipo.returning[0].nombre);
        this.$set(this.lista[this.editedIndex], 'activo', data.update_kangusoft_desp_tipo.returning[0].activo);
      }else{
       console.log("no entre")
      }
     if(this.idMantenedor == 3){
       console.log("MONEDA")
      const { data }  = await this.$apollo.mutate({
        mutation: UPDATE_MONEDA,
        variables:{
          'id_moneda':this.editedItem.id,
          'nombre':  this.editedItem.nombre,
          'activo':  this.editedItem.activo
        },
        update: (data) => {console.log("aa",data)} 
      })
      this.aux = data
      console.log("data", data)
      
       this.$set(this.lista[this.editedIndex], 'nombre', data.update_kangusoft_moneda.returning[0].nombre);
       this.$set(this.lista[this.editedIndex], 'activo', data.update_kangusoft_moneda.returning[0].activo);
     }else{
      console.log("no entre")
     }
     if(this.idMantenedor == 4){
      console.log("ESTADO PROYECTO")
     const { data }  = await this.$apollo.mutate({
       mutation: UPDATE_MONEDA,
       variables:{
         'id_moneda': 4,
         'nombre':  this.editedItem.nombre,
         'activo':  this.editedItem.activo
       },
       update: (data) => {console.log("aa",data)} 
     })
     this.aux = data
     console.log("data", data)
     
      this.$set(this.lista[this.editedIndex], 'nombre', data.update_kangusoft_moneda.returning[0].nombre);
      this.$set(this.lista[this.editedIndex], 'activo', data.update_kangusoft_moneda.returning[0].activo);
    }else{
     console.log("no entre")
    }
     
      this.close();
    },
  },
};
