export default {
  name: 'DialogFinalDocumento',
  props: {
    titulo:String,
    texto: String,
    cerrarDialog: { type: Function },
    correo: String
  },
  data() {
    return {
      enviarCorreo: true
    }
  },
  methods: {
    cerrar() {
      this.cerrarDialog()
      this.$router.push('/adquisiciones/oc/consultar/')
    }
  },
  computed:{
    cpxTextoEnviarCorreo() {
      return `Enviar correo a ${this.correo}`
    }
  }
}