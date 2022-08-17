/* eslint-disable @typescript-eslint/no-this-alias */
import jsPDFInvoiceTemplate, { OutputType } from 'jspdf-invoice-template'
import { creaPdfOC2 } from '../../../utils/pdf-template-nuevo'
import jsPDF from 'jspdf'

export default {
  name: 'DialogFinalDocumento',
  props: {
    titulo:String,
    texto: String,
    cerrarDialog: { type: Function },
    correo: String,
    aprobada:{
      type: Boolean,
      default: false
    },
    identificacion: '',
    vendedor: '',
    idOc:0
  },
  data() {
    return {
      enviarCorreo: true
    }
  },
  methods: {
    async cerrar() {
      const doc = new jsPDF()
      // const du = doc.output('datauri')
      const du = doc.output('datauristring')

      console.log('this.idOc: ', this.idOc)
      console.log('aprobada: ', this.aprobada)
      if (this.idOc !== 0 && !this.aprobada) {
        const uriOC = await creaPdfOC2(this.idOc,this.$store.state.app.datosEmpresa, 2) 

        console.log('uriOC: ', uriOC)
        const resp = await this.axios.post('https://actions-kangu-hasura.herokuapp.com/enviarCorreo', { pdf:uriOC, destinatario:'eloaiza@dlb.cl', nombre: this.vendedor.nombre, identificacion: this.identificacion, empresa:this.$store.state.app.datosEmpresa.nombre })   
        // const resp = await this.axios.post('http://localhost:3000/enviarCorreo', { pdf:du, destinatario:'eloaiza@dlb.cl', nombre: this.vendedor.nombre, identificacion: this.identificacion, empresa:this.$store.state.app.datosEmpresa.nombre })   
      }

      this.cerrarDialog()
      this.$router.push('/adquisiciones/oc/consultar/')
    },
    async enviar(base) {
      console.log('base: ', base)
      console.log('cabecera: ', this.vendedor.nombre)
      console.log('$store.state.app.datosEmpresa: ', this.$store.state.app.datosEmpresa)
      const resp = await this.axios.post('https://actions-kangu-hasura.herokuapp.com/enviarCorreo', { pdf:base, destinatario:'angelica.cuevasv@gmail.com', nombre: this.vendedor.nombre, identificacion: this.identificacion, empresa:this.$store.state.app.datosEmpresa.nombre })
   
      console.log(resp)
    }
  },
  computed:{
    cpxTextoEnviarCorreo() {
      return `Enviar correo a ${this.correo}`
    }
  }
}