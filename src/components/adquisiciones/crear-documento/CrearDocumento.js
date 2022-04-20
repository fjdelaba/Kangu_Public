export default {
  data() {
    return {
      e1: 1,
      rules: [
        (value) => !!value || 'Required.',
        (value) => (value && value.length >= 3) || 'Min 3 characters'
      ],
      valid: false,
      firstname: '',
      lastname: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      centroGestion:'',
      nombreOC: '',
      moneda: '',
      tipoDocumento: '',
      proveedor: '',
      vendedor: '',
      pago:'',
      despacho: ''
    }
  }
}
