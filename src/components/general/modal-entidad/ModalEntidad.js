/* eslint-disable */
import { insertEntModal }  from '../../../graphql/general'
import { validaRut } from "../../../utils/index"
export default {
  name: 'ModalEntidad',
  props: {
    cerrarDialog: { type: Function }
  },
  data() {
    return {
      ent:{  
        razon_social: '',
        email_dte:'Sin Direccion',
        rut: '',
        usu_fk:'',
        // emp_fk:1, // cambiar por valor real
        emp_fk: this.$store.state.app.datosEmpresa.id, // cambiar por valor real
        email_contacto:'',
        giro:''
      },
      rules:{
        ent:{
          razon_social: [
            (v) => !!v || 'Debes ingresar un nombre para este proveedor'
          ],
          giro:[
            (v) => !!v || 'Debes el giro del proveedor'
          ],
          rut: [(v) => !!v || 'El RUT es fundamental, por favor ingresalo',
          (v) => validaRut(v) || "Rut NO valido"],
          email_dte:[(v) => !!v || 'A que correo llegarán los documentos',(v) => /.+@.+\..+/.test(v) || 'Ingresa un email correcto'],
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
    // this.usu_id = this.$auth.user['https://kangusoft.cl/jwt/hasura'] && this.$auth.user['https://kangusoft.cl/jwt/hasura'].user_id
    this.usu_id = this.$store.state.app.datosUsuario.user_id
  },
  methods: {
    validarFomatoRut() {
      console.log(validaRut(this.ent.rut));
    },
    cerrarDialogEntidad() {
      this.cerrarDialog()
    }, 
    async grabarEntidad() {
      if (!this.$refs.formCrearEntidad.validate()) {
        return
      }
      // this.ent.usu_fk = this.usu_id
      this.ent.usu_fk = this.$store.state.app.datosUsuario.user_id
      // this.ent_con.usu_fk = this.usu_id
      this.ent_con.usu_fk = this.$store.state.app.datosUsuario.user_id
      console.log('this.ent: ', this.ent)
      console.log('this.ent_con: ', this.ent_con)
      const { data } = await insertEntModal(this.ent, this.ent_con)

      console.log(data)
      this.cerrarDialogEntidad()
    }
  }
}   