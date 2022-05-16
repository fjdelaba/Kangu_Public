export default {
  name: 'ModalContacto',
  props: {
    cerrarDialogContacto_: { type: Function }
  },
  data() {
    return {
      ent_con:{  
        nombre: '',
        email:'',
        usu_mov_fk: '',
        fec_creacion: ''
      },
      rules:{
        ent_con:{
          nombre: [
            (v) => !!v || 'Debes ingresar un nombre para este contacto'
          ],
          email:[
            (v) => !!v || 'Ingresa un una direccion de correo'
          ]
        }
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
    cerrarDialogContacto() {
      this.cerrarDialogContacto()
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