/* eslint-disable */
import  {QUERY_FORMA_PAGO,GETBOTONES,GETCGESTADO,GETCELULAS,GETMONEDA,GETDESPACHO,getFormaPago}  from "../../../../components/graphql/querys/configuracion.js"
import gql from "graphql-tag";
const UPDATE_MONEDA = gql`
 mutation update_moneda($id_moneda: bigint!, $activo: Boolean!) {
  update_kangusoft_mon(where: {id: {_eq: $id_moneda}}, _set: {activo: $activo}) {
    affected_rows
    returning {
      activo
    }
  }
}`;
const UPDATE_CGESTADO = gql`
mutation update_cgestado($id_cgestado: bigint!, $activo: Boolean!) {
  update_kangusoft_pro_est(where: {id: {_eq: $id_cgestado}}, _set: {activo: $activo}) {
    affected_rows
    returning {
      id
      activo
    }
  }
}`
const UPDATE_TDESPACHO = gql`
mutation update_tdespacho($id_tdespacho: bigint!, $nombre: String!, $activo: Boolean!){
  update_kangusoft_des_tip(where: {id: {_eq: $id_tdespacho}}, _set: {nombre: $nombre, activo: $activo}) {
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
  update_kangusoft_for_pag(where: {id: {_eq: $id_fpago}}, _set: {nombre: $nombre, activo: $activo}) {
    affected_rows
    returning {
      id
      nombre
      activo
    }
  }
}`
const UPDATE_CGUNIDAD = gql`
mutation update_cgunidad($id_cgunidad: bigint!, $nombre: String!, $activo: Boolean!){
  update_kangusoft_pro_uni(where: {id: {_eq: $id_cgunidad}}, _set: {activo: $activo, nombre: $nombre}) {
    affected_rows
    returning {
      id
      nombre
      activo
    }
  }
}`
//TODO INSERTS
const INSERT_FPAGO = gql`
mutation insert_fpago($id_emp: bigint!, $nombre: String!, $activo: Boolean!) {
  insert_kangusoft_for_pag(objects: {nombre:  $nombre, emp_fk: $id_emp, activo: $activo}){
    affected_rows
    returning {
      id
      nombre
      activo
    }
  }
}
`
const INSERT_TDESPACHO = gql`
mutation insert_tdespacho($id_emp: bigint!, $nombre: String!, $activo: Boolean!) {
  insert_kangusoft_des_tip(objects: {nombre: $nombre, emp_fk: $id_emp, activo: $activo}){
    affected_rows
    returning {
      id
      nombre
      activo
    }
  }
}
`
const INSERT_CGUNIDAD = gql`
mutation insert_cgunidad($id_emp: bigint!, $nombre: String!, $activo: Boolean!,$activa: bpchar!,$usu_creacion_fk: bigint!,$fec_creacion: timestamp!) {
  insert_kangusoft_pro_uni(objects: {activo: $activo, emp_fk: $id_emp, nombre: $nombre, activa:$activa, usu_creacion_fk: $usu_creacion_fk, fec_creacion:$fec_creacion}){
    affected_rows
    returning {
      id
      nombre
      activo
    }
  }
}
`
//TODO DELETE
const DELETE_CGUNIDAD = gql`
mutation delete_cgunidad($id_cgunidad: bigint!) {
  delete_kangusoft_pro_uni(where: {id: {_eq: $id_cgunidad}}) {
    affected_rows
    returning {
      id
    }
  }
}
`
const DELETE_TDESPACHO = gql`
mutation delete_tdespacho($id_tdespacho: bigint!) {
  delete_kangusoft_des_tip(where: {id: {_eq: $id_tdespacho}}) {
    affected_rows
    returning {
      id
    }
  }
}
`
const DELETE_FPAGO = gql`
mutation delete_cgunidad($id_fpago: bigint!) {
  delete_kangusoft_for_pag(where: {id: {_eq: $id_fpago}}) {
    affected_rows
    returning {
      id
    }
  }
}
`

export default {
  created() {
    console.log("CREATED");
  },
  mounted() {

    this.fecha = this.$moment(new Date()).format()
    console.log(this.fecha)
  },
  props: {
    mantenedores: Array,
    lista: Array,
    idMantenedor: Number,
  },
  data() {
    return {
      fecha:"",
      aut0:"",
      usuLogin:"",
      nombreMantenedor: "",
      search: "",
      headers: [
        
        { text: "ID", value: "id", idx: 1 },
        { text: "Nombre", value: "nombre", idx: 2  },
        { text: "Activo", value: "activo", idx: 3  },
        { text: "Accion", value: "actions", sortable: false, idx: 4 },
      ],
      checkbox1: true,
      dialog: false,
      dialogDelete: false,

      editedIndex: -1,
      editedItem: {
        nombre: "",
        activo: false
      },
      aux:"",
      habilitar:false,

    };
  },
  computed: {
    tituloMantenedor() {
      this.nombreMantenedor =
        this.$parent.$refs.botonMantenedor.mantenedorSelec.nombre;
      return this.nombreMantenedor;
    },
    cpxRetornarCabecera(){
      if(this.idMantenedor == 3 || this.idMantenedor == 4){
        return this.headers.filter(header => header.idx < 4)
      }else{
        return this.headers.filter(header => header.idx < 5)
      }
    }
  
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
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
   async deleteItemConfirm () {
    if(this.idMantenedor == 1){
      this.habilitar = true
      console.log("FORMA DE PAGO")
     const { data }  = await this.$apollo.mutate({
       mutation: DELETE_FPAGO,
       variables:{
        'id_fpago': this.editedItem.id,
      },
     })
     this.aux = data
     console.log("data", data)
    }

   
    if(this.idMantenedor == 2){
      console.log("TIPO DE DESPACHO")
     const { data }  = await this.$apollo.mutate({
       mutation: DELETE_TDESPACHO,
       variables:{
        'id_tdespacho': this.editedItem.id,
      },
     })
     this.aux = data
     console.log("data", data)
    }
      if(this.idMantenedor == 5){
        console.log("FORMA DE PAGO")
       const { data }  = await this.$apollo.mutate({
         mutation: DELETE_CGUNIDAD,
         variables:{
           'id_cgunidad': this.editedItem.id,
         },
       })
       this.aux = data
       console.log("data", data)
    }
      this.habilitar = false
      this.lista.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    deleteItem (item) {
      this.editedIndex = this.lista.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    editItem(item) {
      this.editedIndex = this.lista.indexOf(item);
      this.editedItem = Object.assign({}, item);
      // this.dialog = true;
    },

    async saveMoneda(objeto){
      console.log("id", objeto)
      let activo = objeto.activo == null || objeto.activo == false || objeto.activo == 'null'? false : true
      console.log("ids", activo)
      if(this.idMantenedor == 3){
        console.log("MONEDA")
       const { data }  = await this.$apollo.mutate({
         mutation: UPDATE_MONEDA,
         variables:{
           'id_moneda': objeto.id,
           'activo':  activo
         },
         update: (data) => {console.log("aa",data)} 
       })
       this.aux = data
       console.log("data", data)
      }else{
       console.log("no entre")
      }
      //
      if(this.idMantenedor == 4){
        console.log("ESTADO PROYECYO")
       const { data }  = await this.$apollo.mutate({
         mutation: UPDATE_CGESTADO,
         variables:{
          'id_cgestado': objeto.id,
          'activo':  activo
          },
         update: (data) => {console.log("aa",data)} 
       })
       this.aux = data
       console.log("data", data)
      }else{
       console.log("no entre")
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async guardarNuevoItem() {
      if(this.idMantenedor == 1){
        console.log("FORMA DE PAGO")
        this.habilitar = true
       const { data }  = await this.$apollo.mutate({
         mutation: INSERT_FPAGO,
         variables:{
           'id_emp':  this.aut0,
           'nombre':  this.editedItem.nombre,
           'activo':  true
         },
       })
       this.aux = data
       console.log("data", data)
        this.close();
        this.lista.push(data.insert_kangusoft_for_pag.returning[0])
        this.habilitar = false
      }else{
       console.log("no entre")
      }
     
      if(this.idMantenedor == 2){
        this.habilitar = true
        console.log("TIPO DE DESPACHO")
       const { data }  = await this.$apollo.mutate({
         mutation: INSERT_TDESPACHO,
         variables:{
          'id_emp':  this.aut0,
          'nombre':  this.editedItem.nombre,
          'activo':  true
         },
       })
       this.aux = data
       console.log("data", data)
       this.close();
       this.lista.push(data.insert_kangusoft_des_tip.returning[0])
        this.habilitar = false
      }else{
       console.log("no entre")
      }
      if(this.idMantenedor == 5){
        this.habilitar = true
        console.log("ESTADO PROYECTO")
       const { data }  = await this.$apollo.mutate({
         mutation: INSERT_CGUNIDAD,
         variables:{
          'id_emp':  this.aut0,
          'nombre':  this.editedItem.nombre,
          'activo': true,
          'activa':   'S',
          'usu_creacion_fk': this.usuLogin,
          'fec_creacion': this.fecha
         },
       })
       this.aux = data
       console.log("data", data)
       this.close();
       this.lista.push(data.insert_kangusoft_pro_uni.returning[0])
       this.habilitar = false
      }else{
       console.log("no entre")
      }
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
       
        this.$set(this.lista[this.editedIndex], 'nombre', data.update_kangusoft_for_pag.returning[0].nombre);
        this.$set(this.lista[this.editedIndex], 'activo', data.update_kangusoft_for_pag.returning[0].activo);
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
       
        this.$set(this.lista[this.editedIndex], 'nombre', data.update_kangusoft_des_tip.returning[0].nombre);
        this.$set(this.lista[this.editedIndex], 'activo', data.update_kangusoft_des_tip.returning[0].activo);
      }else{
       console.log("no entre")
      }
    
     if(this.idMantenedor == 5){
      console.log("ESTADO PROYECTO")
     const { data }  = await this.$apollo.mutate({
       mutation: UPDATE_CGUNIDAD,
       variables:{
         'id_cgunidad': this.editedItem.id,
         'nombre':  this.editedItem.nombre,
         'activo':  true
       },
       update: (data) => {console.log("aa",data)} 
     })
     this.aux = data
     console.log("data", data)
     
      this.$set(this.lista[this.editedIndex], 'nombre', data.update_kangusoft_pro_uni.returning[0].nombre);
      this.$set(this.lista[this.editedIndex], 'activo', data.update_kangusoft_pro_uni.returning[0].activo);
    }else{
     console.log("no entre")
    }
     
      this.close();
    },
  },
};
