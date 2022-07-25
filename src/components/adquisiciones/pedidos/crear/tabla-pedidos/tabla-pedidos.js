/* eslint-disable */
import AgregarMaterial from "../../../modal-agregar-material/ModalAgregarMaterial.vue"
import { getPartidasPorPoroyecto } from '../../../../../graphql/general'

export default {
    components: {
      AgregarMaterial
      },
    mounted() {

    },
    props: {
      pro_fk: Number,
      },
    data() {
      return {
        id_pro:'',
        agregar:false,
        cantidad:"",
        headers: [
            {
              text: "Material",
              align: "start",
              sortable: false,
              value: "mat",
              width: "400px",
            },
            // { text: 'C.C', value: 'oc_det_pars', sortable: false, width: '200px' },
            {
              text: "Cant.",
              value: "cantidad",
              width: "100px",
              sortable: false,
              align: "center",
            },
           
             { text: 'Acciones', value: 'actions',width: "100px",
             sortable: false,
             align: "center", }
          ],
          materiales:[{
            mat:'Foco Panel Slim Cuadrado 12w, Smd 2835 170*170*12mm, 3000k, 900lm'
          }],
          moneda:{},
          listaPartidas: [],

      };
    },
    methods: {
      agregarMat(){
       this.agregar = true
       this.getPartidas()
      },
      abrirMaterial(param){
        console.log("HOLA")
        console.log("Para",param)
       if(param.length == 0){
        this.agregar = false
       } else {
        console.log("sumar un material")
        this.materiales.push({mat:param.nombre,cantidad:param.cantidad})
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