/* eslint-disable */
import  {QUERY_FORMA_PAGO,GETBOTONES,GETCGESTADO,GETCELULAS,GETMONEDA,GETDESPACHO,getFormaPago}  from "../../../../components/graphql/querys/configuracion.js"
import gql from "graphql-tag";
const UPDATE_MONEDA = gql`
 mutation update_mon($id_moneda: bigint!, $activo: Boolean!) {
  update_kangusoft_emp_mon(where: {id: {_eq: $id_moneda}}, _set: {activo: $activo}) {
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
const UPDATE_CATEGORIAOC= gql `
mutation update_categoriaoc($id: bigint!, $nombre: String!, $activo: Boolean!){
  update_kangusoft_fla(where: {id: {_eq: $id}}, _set: {activo: $activo, nombre: $nombre}) {
    affected_rows
    returning {
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
mutation insert_cgunidad($id_emp: bigint!, $nombre: String!, $activo: Boolean!,$usu_creacion_fk: bigint!,$fec_creacion: timestamp!) {
  insert_kangusoft_pro_uni(objects: {activo: $activo, emp_fk: $id_emp, nombre: $nombre, usu_fk: $usu_creacion_fk, fec_creacion:$fec_creacion}){
    affected_rows
    returning {
      id
      nombre
      activo
    }
  }
}
`
const INSERT_CATEGORIAOC= gql`
mutation insert_categoriaOC($usu_fk: bigint!, $nombre: String!, $activo: Boolean!,$emp_fk: bigint!,$fla_mod_fk: bigint!) {
  insert_kangusoft_fla(objects: {usu_fk: $usu_fk, nombre: $nombre, fla_mod_fk: $fla_mod_fk, emp_fk: $emp_fk, activo: $activo}) {
    returning {
      nombre
      id
      fla_mod_fk
      fec_creacion
      usu_fk
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
const DELETE_CATEGORIAOC = gql`
mutation delete_categoriaoc($id: bigint!) {
  delete_kangusoft_fla(where: {id: {_eq: $id}}) {
    returning {
      id
      nombre
      activo
    }
    affected_rows
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
    console.log(this.$auth.isLoading);
    if (this.$auth.isLoading == false) {
      this.datosEmpresa = this.$store.state.app.datosEmpresa;
      this.datosUsuario = this.$store.state.app.datosUsuario
    }
   
  },
  props: {
    mantenedores: Array,
    lista: Array,
    idMantenedor: Number,
  },
  data() {
    return {

      datosUsuario:'',
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
      datosEmpresa:'',
    };
  },
  computed: {
    tituloMantenedor() {
      this.nombreMantenedor =
        this.$parent.$refs.botonMantenedor.mantenedorSelec.nombre;
      return this.nombreMantenedor;
    },
    cpxRetornarCabecera(){
      if(this.idMantenedor == 4 || this.idMantenedor == 5){
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
    if(this.idMantenedor == 2){
      try {
        this.habilitar = true
        console.log("FORMA DE PAGO")
       const { data }  = await this.$apollo.mutate({
         mutation: DELETE_FPAGO,
         variables:{
          'id_fpago': this.editedItem.id,
        },
       })
       this.aux = data
       this.lista.splice(this.editedIndex, 1)
       this.closeDelete()
       this.$toast.success('Se completo con exito esta acción', {
        tposition: 'top-right',
        timeout: 5000,
        pauseOnHover: true
      })
       console.log("data", data)
       
      } catch (error) {
        console.log("Error",error)
        this.$toast.error('No se completo esta acción, Esta Forma de Pago esta siendo Utilizada', {
          tposition: 'top-right',
          timeout: 5000,
          pauseOnHover: true
        })
        this.closeDelete()
      }
    
    }

   
    if(this.idMantenedor == 3){
      try {
        console.log("TIPO DE DESPACHO")
        const { data }  = await this.$apollo.mutate({
          mutation: DELETE_TDESPACHO,
          variables:{
           'id_tdespacho': this.editedItem.id,
         },
        })
        this.aux = data
        this.lista.splice(this.editedIndex, 1)
        this.closeDelete()
        console.log("data", data)
        this.$toast.success('Se completo con exito esta acción', {
          tposition: 'top-right',
          timeout: 5000,
          pauseOnHover: true
        })
      } catch (error) {
        console.log("Error",error)
        this.$toast.error('No se completo esta acción, Este Tipo de Despacho esta siendo Utilizado', {
          tposition: 'top-right',
          timeout: 5000,
          pauseOnHover: true
        })
        this.closeDelete()
      }
     
    }
      if(this.idMantenedor == 6){
        try {
          const { data }  = await this.$apollo.mutate({
            mutation: DELETE_CGUNIDAD,
            variables:{
              'id_cgunidad': this.editedItem.id,
            },
          })
          this.aux = data
          console.log("data", data)
          this.habilitar = false
          this.lista.splice(this.editedIndex, 1)
          this.closeDelete()
          this.$toast.success('Se completo con exito esta acción', {
            tposition: 'top-right',
            timeout: 5000,
            pauseOnHover: true
          })
        } catch (error) {
          console.log("Error",error)
          this.$toast.error('No se completo esta acción, Esta Unidad de Negocio esta siendo Utilizada', {
            tposition: 'top-right',
            timeout: 5000,
            pauseOnHover: true
          })
          this.closeDelete()
        }
       
    }
    if(this.idMantenedor == 7){
      try {
        const { data }  = await this.$apollo.mutate({
          mutation: DELETE_CATEGORIAOC,
          variables:{
            'id': this.editedItem.id,
          },
        })
        this.aux = data
        console.log("data", data)
        this.habilitar = false
        this.lista.splice(this.editedIndex, 1)
        this.closeDelete()
        this.$toast.success('Se completo con exito esta acción', {
          tposition: 'top-right',
          timeout: 5000,
          pauseOnHover: true
        })
      } catch (error) {
        console.log("Error",error)
        this.$toast.error('No se completo esta acción, Esta Categoria esta siendo Utilizada', {
          tposition: 'top-right',
          timeout: 5000,
          pauseOnHover: true
        })
        this.closeDelete()
      }
     
  } 
    if(this.idMantenedor == 8){
      try {
        const { data }  = await this.$apollo.mutate({
          mutation: DELETE_CATEGORIAOC,
          variables:{
            'id': this.editedItem.id,
          },
        })
        this.aux = data
        console.log("data", data)
        this.habilitar = false
        this.lista.splice(this.editedIndex, 1)
        this.closeDelete()
        this.$toast.success('Se completo con exito esta acción', {
          tposition: 'top-right',
          timeout: 5000,
          pauseOnHover: true
        })
      } catch (error) {
        console.log("Error",error)
        this.$toast.error('No se completo esta acción, Esta Categoria esta siendo Utilizada', {
          tposition: 'top-right',
          timeout: 5000,
          pauseOnHover: true
        })
        this.closeDelete()
      }
     
  } 
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
      if(this.idMantenedor == 4){
        try {
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
          this.$toast.success('Se completo con exito esta acción', {
            tposition: 'top-right',
            timeout: 5000,
            pauseOnHover: true
          })
        } catch (error) {
          console.log('error',error)
          this.$toast.error('No se completo esta acción', {
            tposition: 'top-right',
            timeout: 5000,
            pauseOnHover: true
          })
        }
      }else{
       console.log("no entre")
      }
      //
      if(this.idMantenedor == 5){
        try {
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
          this.$toast.success('Se completo con exito esta acción', {
           tposition: 'top-right',
           timeout: 5000,
           pauseOnHover: true
         })
        } catch (error) {
          console.log('error',error) 
          this.$toast.error('No se completo esta acción', {
            tposition: 'top-right',
            timeout: 5000,
            pauseOnHover: true
          })
        }
      
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
      if(this.idMantenedor == 2){
        try {
          console.log("FORMA DE PAGO")
          this.habilitar = true
          console.log("obj MANTENEDOR 2:",this.datosEmpresa.id, this.editedItem.nombre,true)
         const { data }  = await this.$apollo.mutate({
           mutation: INSERT_FPAGO,
           variables:{
             'id_emp':  this.datosEmpresa.id,
             'nombre':  this.editedItem.nombre,
             'activo':  true
           },
         })
         this.aux = data
         console.log("data", data)
          this.close();
          this.lista.push(data.insert_kangusoft_for_pag.returning[0])
          this.habilitar = false
          this.$toast.success('Se agrego con exito una nueva forma de pago', {
            tposition: 'top-right',
            timeout: 5000,
            pauseOnHover: true
          })
        } catch (error) {
        console.log('error',error)
        this.$toast.error('Error al agregar una nueva forma de pago', {
          tposition: 'top-right',
          timeout: 5000,
          pauseOnHover: true
        })
        }
       
      }else{
       console.log("no entre")
      }
     
      if(this.idMantenedor == 3){
        try {
          this.habilitar = true
          console.log("TIPO DE DESPACHO")
          console.log("obj MANTENEDOR 3:",this.datosEmpresa.id, this.editedItem.nombre,true)
         const { data }  = await this.$apollo.mutate({
           mutation: INSERT_TDESPACHO,
           variables:{
            'id_emp':  this.datosEmpresa.id,
            'nombre':  this.editedItem.nombre,
            'activo':  true
           },
         })
         this.aux = data
         console.log("data", data)
         this.close();
         this.lista.push(data.insert_kangusoft_des_tip.returning[0])
          this.habilitar = false
          this.$toast.success('Se agrego con exito un nuevo tipo de despacho', {
            tposition: 'top-right',
            timeout: 5000,
            pauseOnHover: true
          })
        } catch (error) {
          console.log('error',error)
          this.$toast.error('Error al agregar un nuevo tipo de despacho', {
            tposition: 'top-right',
            timeout: 5000,
            pauseOnHover: true
          })
          this.close();
        }
      
      }else{
       console.log("no entre")
      }
      if(this.idMantenedor == 6){
        try {
          this.habilitar = true
          console.log("ESTADO PROYECTO")
         const { data }  = await this.$apollo.mutate({
           mutation: INSERT_CGUNIDAD,
           variables:{
            'id_emp':  this.datosEmpresa.id,
            'nombre':  this.editedItem.nombre,
            'activo': true,
            'usu_creacion_fk': this.datosUsuario.user_id ,
            'fec_creacion': this.fecha
           },
         })
         this.aux = data
         console.log("data", data)
         this.close();
         this.lista.push(data.insert_kangusoft_pro_uni.returning[0])
         this.habilitar = false
         this.$toast.success('Se agrego con exito una nueva unidad de negocio', {
          tposition: 'top-right',
          timeout: 5000,
          pauseOnHover: true
        })
        } catch (error) {
          this.$toast.error('Error al agregar una nueva unidad de negocio', {
            tposition: 'top-right',
            timeout: 5000,
            pauseOnHover: true
          })
          this.close();
        }
       
      }else{
       console.log("no entre")
      }
      if(this.idMantenedor == 7){
        try {
          this.habilitar = true
          console.log("CATEGORIA OC")
         const { data }  = await this.$apollo.mutate({
           mutation: INSERT_CATEGORIAOC,
           variables:{
            'emp_fk':  this.datosEmpresa.id,
            'nombre':  this.editedItem.nombre,
            'activo': true,
            'usu_fk': this.datosUsuario.user_id,
            'fla_mod_fk': 7
           },
         })
         this.aux = data
         console.log("data", data)
         this.close();
         this.lista.push(data.insert_kangusoft_fla.returning[0])
         this.habilitar = false
         this.$toast.success('Se agrego con exito una nueva categoria', {
          tposition: 'top-right',
          timeout: 5000,
          pauseOnHover: true
        })
        } catch (error) {
          console.log('error',error)
          this.$toast.error('Error al agregar una nueva categoria', {
            tposition: 'top-right',
            timeout: 5000,
            pauseOnHover: true
          })
          this.close();
        }
       
      }else{
       console.log("no entre")
      }
      if(this.idMantenedor == 8){
        try {
          this.habilitar = true
          console.log("CATEGORIA OC")
         const { data }  = await this.$apollo.mutate({
           mutation: INSERT_CATEGORIAOC,
           variables:{
            'emp_fk':  this.datosEmpresa.id,
            'nombre':  this.editedItem.nombre,
            'activo': true,
            'usu_fk': this.datosUsuario.user_id,
            'fla_mod_fk': 3
           },
         })
         this.aux = data
         console.log("data", data)
         this.close();
         this.lista.push(data.insert_kangusoft_fla.returning[0])
         this.habilitar = false
         this.$toast.success('Se agrego con exito una nueva categoria', {
          tposition: 'top-right',
          timeout: 5000,
          pauseOnHover: true
        })
        } catch (error) {
          console.log('error',error)
          this.$toast.error('Error al agregar una nueva categoria', {
            tposition: 'top-right',
            timeout: 5000,
            pauseOnHover: true
          })
          this.close();
        }
       
      }else{
       console.log("no entre")
      }
    },


    async save() {


      if(this.idMantenedor == 2){
        try {
          console.log("FORMA DE PAGO")
          console.log("OBJ FORM:",this.editedItem.id,this.editedItem.nombre,this.editedItem.activo)
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
          this.$toast.success('Se edito con exito la forma de pago seleccionada', {
            tposition: 'top-right',
            timeout: 5000,
            pauseOnHover: true
          })
        } catch (error) {
          console.log('error',error)
          this.$toast.error('Error en la edicion de la forma de pago seleccionada', {
            tposition: 'top-right',
            timeout: 5000,
            pauseOnHover: true
          })
          this.close();
        }
       
      }else{
       console.log("no entre")
      }
      if(this.idMantenedor == 3){
        try {
          console.log("TIPO DE DESPACHO")
          console.log("obj MANTENEDOR 3:",this.editedItem.id, this.editedItem.nombre, this.editedItem.activo)
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
          this.$toast.success('Se edito con exito el tipo de despacho seleccionado', {
            tposition: 'top-right',
            timeout: 5000,
            pauseOnHover: true
          })
          this.close();
        } catch (error) {
          console.log('error',error)
          this.$toast.error('Error en la edicion del tipo de despacho seleccionado', {
            tposition: 'top-right',
            timeout: 5000,
            pauseOnHover: true
          })
          this.close();
        }
      
      }else{
       console.log("no entre")
      }
    
     if(this.idMantenedor == 6){
       try {
        console.log("ESTADO PROYECTO")
        const { data }  = await this.$apollo.mutate({
          mutation: UPDATE_CGUNIDAD,
          variables:{
            'id_cgunidad': this.editedItem.id,
            'nombre':  this.editedItem.nombre,
            'activo':  this.editedItem.activo
          },
          update: (data) => {console.log("aa",data)} 
        })
        this.aux = data
        console.log("data", data)
        
         this.$set(this.lista[this.editedIndex], 'nombre', data.update_kangusoft_pro_uni.returning[0].nombre);
         this.$set(this.lista[this.editedIndex], 'activo', data.update_kangusoft_pro_uni.returning[0].activo);
         this.$toast.success('Se edito con exito la unidad de negocio seleccionada', {
          tposition: 'top-right',
          timeout: 5000,
          pauseOnHover: true
        })
        this.close();
       } catch (error) {
         console.log('error')
         this.$toast.error('Error en la edicion de la unidad de negocio seleccionada', {
          tposition: 'top-right',
          timeout: 5000,
          pauseOnHover: true
        })
        this.close();
       }
     
    }else{
     console.log("no entre")
    }
    if(this.idMantenedor == 7){
      try {
       console.log("categoria OC")
       const { data }  = await this.$apollo.mutate({
         mutation: UPDATE_CATEGORIAOC,
         variables:{
           'id': this.editedItem.id,
           'nombre':  this.editedItem.nombre,
           'activo':  this.editedItem.activo
         },
         update: (data) => {console.log("aa",data)} 
       })
       this.aux = data
       console.log("data", data)
       
        this.$set(this.lista[this.editedIndex], 'nombre', data.update_kangusoft_fla.returning[0].nombre);
        this.$set(this.lista[this.editedIndex], 'activo', data.update_kangusoft_fla.returning[0].activo);
        this.$toast.success('Se edito con exito la categoria seleccionada', {
         tposition: 'top-right',
         timeout: 5000,
         pauseOnHover: true
       })
       this.close();
      } catch (error) {
        console.log('error',error)
        this.$toast.error('Error en la edicion de la categoria seleccionada', {
         tposition: 'top-right',
         timeout: 5000,
         pauseOnHover: true
       })
       this.close();
      }
    
   }else{
    console.log("no entre")
   }
    if(this.idMantenedor == 8){
      try {
       console.log("categoria OC")
       const { data }  = await this.$apollo.mutate({
         mutation: UPDATE_CATEGORIAOC,
         variables:{
           'id': this.editedItem.id,
           'nombre':  this.editedItem.nombre,
           'activo':  this.editedItem.activo
         },
         update: (data) => {console.log("aa",data)} 
       })
       this.aux = data
       console.log("data", data)
       
        this.$set(this.lista[this.editedIndex], 'nombre', data.update_kangusoft_fla.returning[0].nombre);
        this.$set(this.lista[this.editedIndex], 'activo', data.update_kangusoft_fla.returning[0].activo);
        this.$toast.success('Se edito con exito la categoria seleccionada', {
         tposition: 'top-right',
         timeout: 5000,
         pauseOnHover: true
       })
       this.close();
      } catch (error) {
        console.log('error',error)
        this.$toast.error('Error en la edicion de la categoria seleccionada', {
         tposition: 'top-right',
         timeout: 5000,
         pauseOnHover: true
       })
       this.close();
      }
    
   }else{
    console.log("no entre")
   }
    
      this.close();
    },
  },
};
