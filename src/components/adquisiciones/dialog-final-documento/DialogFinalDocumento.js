/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-this-alias */
import jsPDFInvoiceTemplate, { OutputType } from 'jspdf-invoice-template'
import { creaPdfOC2 } from '../../../utils/pdf-template-nuevo'
import jsPDF from 'jspdf'

export default {
  name: 'DialogFinalDocumento',
  props: {
    titulo:{ type: String,default:'' },
    texto: { type: String,default:'' },
    cerrarDialog: { type: Function },
    correo: { type: String,default:'' },
    aprobada:{
      type: Boolean,
      default: false
    },
    identificacion: '',
    vendedor: '',
    idOc:0,
    origen:{
      type: Number,
      default: 0 // 1 = OC, 2 = Pedido
    }
  },
  data() {
    return {
      enviarCorreo: true
    }
  },
  methods: {
    async cerrar() {

      if (this.origen === 1) {
        if (this.idOc !== 0 && !this.aprobada && this.enviarCorreo && this.validateEmail(this.correo)) {
          const uriOC = await creaPdfOC2(this.idOc,this.$store.state.app.datosEmpresa, 2) 
  
          console.log('uriOC: ', uriOC)
          const resp = await this.axios.post('https://actions-kangu-hasura.herokuapp.com/enviarCorreo', { pdf:uriOC, destinatario:this.correo, nombre: this.vendedor.nombre, identificacion: this.identificacion, empresa:this.$store.state.app.datosEmpresa.nombre })   
          // const resp = await this.axios.post('http://localhost:3000/enviarCorreo', { pdf:du, destinatario:'eloaiza@dlb.cl', nombre: this.vendedor.nombre, identificacion: this.identificacion, empresa:this.$store.state.app.datosEmpresa.nombre })   
        }
  
        this.cerrarDialog()
        this.$router.push('/adquisiciones/oc/consultar/')
      }

      // const doc = new jsPDF()
      // const du = doc.output('datauristring')
      
    },
    async enviar(base) {
      console.log('base: ', base)
      console.log('cabecera: ', this.vendedor.nombre)
      console.log('$store.state.app.datosEmpresa: ', this.$store.state.app.datosEmpresa)
      const resp = await this.axios.post('https://actions-kangu-hasura.herokuapp.com/enviarCorreo', { pdf:base, destinatario:'angelica.cuevasv@gmail.com', nombre: this.vendedor.nombre, identificacion: this.identificacion, empresa:this.$store.state.app.datosEmpresa.nombre })
   
      console.log(resp)
    },
    validateEmail(email) {
      console.log('email: ', email)
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

      if (reg.test(email) === false) 
      {
        // alert('Invalid Email Address')

        return false
      }

      return true

    }
  },
  computed:{
    cpxTextoEnviarCorreo() {
      return `Enviar correo a ${this.correo}`
    }
  }
}