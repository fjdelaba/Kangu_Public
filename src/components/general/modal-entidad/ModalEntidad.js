export default {
  name: 'ModalEntidad',
  props: {
    cerrarDialog: { type: Function }
  },
  data() {
    return {
      ent:{  
        razon_social: '',
        giro:'',
        rut: '',
        email_dte:'',
        usu_fk:''
      },
      rules:{
        ent:{
          razon_social: [
            (v) => !!v || 'Debes ingresar un nombre para este proveedor'
          ],
          giro:[
            (v) => !!v || 'Debes el giro del proveedor'
          ],
          rut: [(v) => !!v || 'El RUT es fundamental, por favor ingresalo'],
          email_dte:[(v) => !!v || 'A que correo llegarán los documentos'],
          usu_fk:''
        },
        ent_con:{
          nombre: [
            (v) => !!v || 'Indicanos un nombre para este contacto'
          ],
          email: [
            (v) => !!v || 'Ingresa el email para este contacto'
          ]
        }
      },
      ent_con:{
        nombre: '',
        email: '',
        usu_fk: ''
      },
      usu_id:'',
      valid: true
    }
  },
  mounted(
  ) {
    this.usu_id = this.$auth.user['https://kangusoft.cl/jwt/hasura'] && this.$auth.user['https://kangusoft.cl/jwt/hasura'].user_id
  },
  methods: {
    cerrarDialogEntidad() {
      this.cerrarDialog()
    }, 
    grabarEntidad() {
      if (!this.$refs.formCrearEntidad.validate()) {
        return
      }
      this.ent.usu_fk = this.usu_id
      this.ent_con.usu_fk = this.usu_id
      console.log('this.ent: ', this.ent)
      console.log('this.ent_con: ', this.ent_con)
      this.cerrarDialogEntidad()
    }
  }
}   