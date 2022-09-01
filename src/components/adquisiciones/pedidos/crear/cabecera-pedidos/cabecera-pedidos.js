/* eslint-disable */
import { getProyectosPorUsuario } from '../../../../../graphql/general'
import moment from 'moment'
export default {
    components: {

      },
      props: {
        nombre: {
          type:String
        },
        vista: {
          type:String
        },
        cabecera: {
          type:Object
        },
        usu_id: {
          type:Number
        },
        _materiales: {
          type:Array
        },
        _devuelveProFk:{
          type:Function
        },
        _agregarMaterial: { type: Function },
        _eliminarMat:{ type: Function}
        },
    mounted() {
      if(this.vista == 'crear'){
        console.log("ID USU", this.usu_id)
        this.cargarProyectosPorUsuarios()
      }
    
    },
    data() {
      return {
       respEdicion: '',
       dialogCambio:false,
       logo: "https://kangufiles.nyc3.digitaloceanspaces.com/kangu/logo_dlb.png",
       listaProyectos:[],
       existeAprobador:false,
       aprobadorPedido:[],
       proyectoPedido:0,
       nombrePedido:'',
       respaldoProyecto:0
      };
    },
    methods: {
      moment() {
        return moment();
      },
      cancelarCambio(){
      console.log("respaldo Pedido", this.respaldoProyecto)
      this.proyectoPedido =  this.respaldoProyecto 
      this.dialogCambio = false
      },
      aprobarCambio(){
        this.dialogCambio = false
        let cambio = true
        this._eliminarMat(cambio)
        console.log('pro:', this.proyectoPedido)
      },
  
      cargarPartidas(){
        if(this.proyectoPedido != '' && this._materiales.length == 0 ){
          this.respaldoProyecto = this.proyectoPedido
        }
        if(this.proyectoPedido != '' && this._materiales.length > 0 ){
          this.dialogCambio = true
        }
        this._devuelveProFk(this.proyectoPedido)
      },

      async cargarProyectosPorUsuarios() {

        const { data:{ kangusoft_apr } } = await getProyectosPorUsuario(Number(this.usu_id), 1)
        for (const pro of kangusoft_apr) {

          this.listaProyectos.push({ id:pro.pro.id, nombre:pro.pro.nombre, codigo:pro.pro.codigo })
        }
    
      },
      async cargarAprobadorPedido() {
       
        // this.dialogDelete = false
        let mod_fk = 1
      
        const { data:{ kangusoft_apr } } = await getAprobadorPedido(mod_fk,this.proyectoPedido)
        if(kangusoft_apr.length == 0){
          this.existeAprobador = false
        }else{
          for (const apro of kangusoft_apr) {
            this.existeAprobador = true
            this.aprobadorPedido.push({ id:apro.id, nombre:apro.nombre, apellidos:apro.apellidos })
          }
        }
       console.log("exite aprobador?:",this.existeAprobador)
      },
      // habilitarEdicion(){
      //  this.respEdicion = true
      //  this.$emit('modal', this.respEdicion);
      // }
    }
}