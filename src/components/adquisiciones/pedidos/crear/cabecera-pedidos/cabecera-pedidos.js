/* eslint-disable */
import { getProyectosPorUsuario } from '../../../../../graphql/general'
export default {
    components: {

      },
      props: {
        nombre: {
          type:String
        },
        usu_id: {
          type:Number
        },
        _devuelveProFk:{
          type:Function
        },
        _agregarMaterial: { type: Function },
        },
    mounted() {
      console.log("ID USU", this.usu_id)
      this.cargarProyectosPorUsuarios()
    },
    data() {
      return {
       respEdicion: '',
       listaProyectos:[],
       existeAprobador:false,
       aprobadorPedido:[],
       proyectoPedido:0,
       nombrePedido:''
      };
    },
    methods: {
      agregarMaterial() {
        
        // eslint-disable-next-line prefer-destructuring
        const obj = {
          mat_fk: 22,
          cantidad: 0,
          precio_unitario: 0,
          total: 0,
          observacion: '',
          mat_nombre: 'a',
          mat_unidad: 'v',
          // par_fk: par.id,
          // par_nombre: par.name,
          edicion: true
        }
        console.log(obj)
        this._agregarMaterial(obj)
      },
      cargarPartidas(){
        
        this._devuelveProFk(this.proyectoPedido)
        console.log('pro:', this.proyectoPedido)
      },

      async cargarProyectosPorUsuarios() {

        const { data:{ kangusoft_apr } } = await getProyectosPorUsuario(Number(this.usu_id))
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