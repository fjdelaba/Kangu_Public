/* eslint-disable */
import {getTipoDocumento,getDteCab} from '../../../../../graphql/adquisiciones'
import moment from 'moment';
export default {
    components: {
       
      },
      props:{
        cabecera:{
          type: Object
        },
      },
    mounted() {
      this.cargaTipoDocumento()
    },
    data() {
      return {
        valid: false,
        valid1: false,
        nameRules: [
          v => !!v || 'El tipo de documento es requerido',
          
        ],
        nameRules1: [
          v => !!v || 'El Nº de Documento es requerido',
          
        ],
        seleccionDocumento:'',
        listaDocumentos:[{id:1,nombre:"Sin Documento"}],
        numDocumento:'',
        dialogDelete:true,
        date:this.$moment(new Date()).format('DD/MM/yy').toString(),
        editando:false,
        respaldo:{
          seleccion:'',
          numero:''
        },
        cabeceraSeleccion:'',
        cabeceraNumero:'',
        dte_cab:''
      };
    },
    methods: {
      getFechaFormat(fecha){
        return moment(fecha).format("DD/MM/YYYY")
      },
      async cargaTipoDocumento(){
        const {data: { kangusoft_dte_tip } } = await getTipoDocumento();
        for(let dcto of kangusoft_dte_tip){
          if(dcto.id == 33 || dcto.id == 52){
            this.listaDocumentos.push(dcto)
          }
        }
      },
      validate() {
        this.$refs.form.validate()
      },
      reset() {
        this.$refs.form1.reset()
      },
     async modalSiguiente(){
      const {data: { kangusoft_dte_cab } } = await getDteCab(this.numDocumento,this.seleccionDocumento);
      console.log('kangusoft_dte_cab',kangusoft_dte_cab)
      let resp = kangusoft_dte_cab
      if(resp.length > 0){
        this.dte_cab = resp[0].id
      }
        if(this.$refs.form.validate()){
          if(this.seleccionDocumento != 1){
              if(this.$refs.form.validate()){
                this.dialogDelete = false
                this.cabeceraSeleccion =  this.seleccionDocumento
                this.cabeceraNumero = this.numDocumento
              }
            
          }else{
            this.dialogDelete = false
            this.cabeceraSeleccion =  this.seleccionDocumento
            this.cabeceraNumero = this.numDocumento
            if(this.dialogDelete == false){
              this.reset()
            }
          }
        
        } 
    
      },
      cambioTipo(){
        this.numDocumento = ""
      },
      modalCancelar(){
        console.log('editando', this.editando)
        if(this.editando == true){
          this.seleccionDocumento = this.respaldo.seleccion
          this.numDocumento =  this.respaldo.numero
          this.dialogDelete = false
      
        }
        else{
          this.$router.push({path:'listado'});
        }
      },
      edicionCabecera(){
        this.dialogDelete = true
        this.respaldo.seleccion = this.seleccionDocumento
        this.respaldo.numero = this.numDocumento
        this.editando = true
      },
      detalleOc(){
        {
          window.open(`/adquisiciones/oc/consultar/detalle/?id=${this.cabecera.id}`);
      }
      }
    }
}