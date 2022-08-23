/* eslint-disable */
import AgregarMaterial from "../../../../adquisiciones/drawer-seleccion-material-partida/DrawerSeleccionMaterialPartida.vue"
import { getPartidasPorPoroyecto } from '../../../../../graphql/general'
import NombreMaterial from '../../../../general/nombre-obs-tabla/NombreObsTabla.vue'

export default {
    components: {
      AgregarMaterial,
      NombreMaterial
      },
    mounted() {

    },
    props: {
      pro_fk: {
        type: Number,
        default:0
      },
      },
    data() {
      return {
        id_pro:'',
        agregar:false,
        cantidad:"",
        detalleMaterial:[],
        headers: [
            {
              text: "Material",
              align: "start",
              sortable: false,
              value: "mat",
              width: "400px",
            },
            {
              text: "Cuenta de Costo",
              align: "start",
              sortable: false,
              value: "cc",
              width: "200px",
            },
            // { text: 'C.C', value: 'oc_det_pars', sortable: false, width: '200px' },
            {
              text: "Cant.",
              value: "cantidad",
              width: "100px",
              sortable: false,
              align: "center",
            },
           
             { text: '', value: 'actions',width: "100px",
             sortable: false,
             align: "center", }
          ],
          materiales:[],
          moneda:{},
          listaPartidas: [],
      };
    },
    computed:{
      cpxHabilitar(){
      if(this.pro_fk == ''){
        return true
      }
      },
     
    },
    methods: {
      agregarMat(){
       this.agregar = true
       console.log("pro_fk",this.pro_fk)
       setTimeout(() => {
        this.$refs.refdrawerseleccionmaterialpartida.cargarPartidas(this.pro_fk)
       }, 500);
      
      
      //  this.getPartidas()
      },
    
      eliminarMaterial(item) {
        for (const mat in this.materiales) {
          if (this.materiales[mat].uid === item.uid) {
           this.materiales.splice(mat, 1)
           }
        }
      },
      abrirMaterial(param){
        console.log("HOLA")
        console.log("Para",param)
       if(param.length == 0){
        this.agregar = false
       } else {
        console.log("sumar un material")
        this.materiales.push({mat_id:param.mat_fk,mat:param.mat_nombre,cantidad:param.cantidad,observacion:param.observacion,unidad:param.mat_unidad,uid:param.uid,partidas:param.partidas})
        console.log("cantidad", this.materiales)
        // this.detalleMaterial.push({mat_fk:param.mat_fk,par_fk:param.partidas[0].par_fk,observacion:param.observacion,usu_fk:param.usu_fk,cantidad:param.cantidad})
        // console.log("detalleMaterial",this.detalleMaterial)
       }
      },
      async getPartidas() {
        console.log("ID", this.pro_fk)
        console.log('INICIO GET PARTIDAS')
        const  { data }   = await getPartidasPorPoroyecto(this.pro_fk)
        
        console.log('data en getPartidas: ', data) 
        this.listaPartidas = data.getPartidas
        for (const partida of this.listaPartidas) {
          if (partida.path.indexOf('/') > 0) {
            const pathArray = partida.path.split('/')
  
            pathArray.shift()
            pathArray.reverse()
            partida.path = pathArray
          } else {
            delete partida.path
          }
        }
  
      },
    }
}