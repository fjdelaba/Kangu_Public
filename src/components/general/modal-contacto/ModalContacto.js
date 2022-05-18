/* eslint-disable no-unreachable */
import { updateContactos, insertContactos } from '../../../graphql/general'

export default {
  name: 'ModalContacto',
  props: {
    cerrarDialogContacto_: { type: Function },
    datosContacto: [],
    crear: Boolean,
    idProveedor: 0
  },
  data() {
    return {
      ent_con:{  
        nombre: '',
        email:'',
        usu_mov_fk: ''
      },
      rules:{
        ent_con:{
          nombre: [
            (v) => !!v || 'Debes ingresar un nombre para este contacto'
          ],
          email:[
            (v) => !!v || 'Ingresa un una direccion de correo',
            (v) => /.+@.+\..+/.test(v) || 'Ingresa un email correcto'
          ]
        }
      },
      usu_id:'',
      valid: true,
      snackbar: false,
      timeout: 2000
    }
  },
  mounted(
  ) {
    console.log('MOUNTED CONTACTO')
    this.usu_id = this.$auth.user['https://kangusoft.cl/jwt/hasura'] && this.$auth.user['https://kangusoft.cl/jwt/hasura'].user_id
    this.rellenarInputs()
  },
  methods: {
    cerrarDialogContacto(recargar = false) {
      this.cerrarDialogContacto_(recargar)
    }, 
    async grabar() {
      if (!this.$refs.formContacto.validate()) {
        return
      }
      if (this.crear) {
        await this.grabarNuevoContacto()
      } else {
        await this.grabarEdicionContacto()
      }
      this.cerrarDialogContacto(true)
    }, 

    async grabarEdicionContacto() {
      // this.snackbar = true
      this.ent_con.usu_mov_fk = this.usu_id
      const { data } = await updateContactos(this.datosContacto.id, this.ent_con)
      
      console.log( data )
    }, 
    async grabarNuevoContacto() {
      // this.snackbar = true
      this.ent_con.usu_fk = this.usu_id
      this.ent_con.ent_fk = this.idProveedor
      if ('usu_mov_fk' in this.ent_con) {
        delete this.ent_con.usu_mov_fk
        console.log('IF')
      }
      console.log(this.ent_con)
      const { data } = await insertContactos(this.ent_con)
    }, 
    rellenarInputs() {
      if (!this.crear) {
        this.ent_con.nombre = this.datosContacto.nombre
        this.ent_con.email = this.datosContacto.email
      } else {
        this.ent_con.nombre = ''
        this.ent_con.email = ''
      }

    }
  },
  computed: {
    cpxTitulo() {
      return this.crear ? 'Crear Contacto' : 'Editar Contacto'
    },
    cpxTextoBoton() {
      return this.crear ? 'Crear Contacto' : 'Grabar Cambios'
    }
  },
  watch: {
    crear(val) {
      if (val) {
        this.datosContacto = []
      }
    }
  }
}   