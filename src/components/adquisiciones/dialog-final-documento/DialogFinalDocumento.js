/* eslint-disable @typescript-eslint/no-this-alias */
import jsPDFInvoiceTemplate, { OutputType } from 'jspdf-invoice-template'
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
    vendedor: '' 
  },
  data() {
    return {
      enviarCorreo: true
    }
  },
  methods: {
    async cerrar() {
      const doc = new jsPDF()

      doc.text(20, 20, 'Hello world!')
      doc.text(20, 30, 'This is client-side Javascript to generate a PDF.')

      // Add new page
      doc.addPage()
      doc.text(20, 20, 'Visit CodexWorld.com')

      // Save the PDF
      doc.save('document.pdf')

      const blob = doc.output('blob')
      // const du = doc.output('datauri')
      const du = doc.output('datauristring')
      
      // const resp = await this.axios.post('http://localhost:3000/enviarCorreo', { pdf:du })   
      // const data = new FormData()
    
      // data.append('name', 'pdf')
      // data.append('file', blob)
      
      // const config = {
      //   header : {
      //     'Content-Type' : 'multipart/form-data'
      //   }
      // }
    
      // this.axios.post('http://localhost:3000/enviarCorreo', data, config).then((response) => {
      //   console.log('response', response)
      // }).catch((error) => {
      //   console.log('error', error)
      // })

      const reader = new FileReader()

      reader.readAsDataURL(blob) 
      const _this = this

      reader.onloadend = async function() {
        const base64data = reader.result

        _this.enviar(base64data)
        console.log(base64data)
        
      }

      // const resp = await this.axios.post('http://localhost:3000/enviarCorreo', blob, {
      //   headers: { 'content-type': blob.type }
      // })   

      // console.log('blob: ', blob)
      // console.log('du: ', du)
      // console.log('resp: ', resp)
      // this.cerrarDialog()
      // this.$router.push('/adquisiciones/oc/consultar/')
    },
    async enviar(base) {
      console.log('base: ', base)
      console.log('cabecera: ', this.vendedor.nombre)
      console.log('$store.state.app.datosEmpresa: ', this.$store.state.app.datosEmpresa)
      const resp = await this.axios.post('http://localhost:3000/enviarCorreo', { pdf:base, destinatario:'eloaiza@dlb.cl', nombre: this.vendedor.nombre, identificacion: this.identificacion, empresa:this.$store.state.app.datosEmpresa.nombre })
   
      console.log(resp)
    }
  },
  computed:{
    cpxTextoEnviarCorreo() {
      return `Enviar correo a ${this.correo}`
    }
  }
}