/* eslint-disable */
import {getTipoDocumento} from '../../../../../graphql/adquisiciones'

export default {
    components: {
       
      },
     
    mounted() {
        this.cargaTipoDocumento()
    },
    data() {
      return {
        seleccionDocumento:'',
        listaDocumentos:[],
        numDocumento:'',
        dialogDelete:true
      };
      
    },
    methods: {
     async cargaTipoDocumento(){
        const {data: { kangusoft_dte_tip } } = await getTipoDocumento();
        for(let dcto of kangusoft_dte_tip){
          if(dcto.id == 33 || dcto.id == 52){
            this.listaDocumentos.push(dcto)
          }
        }
    
      },
    }
}