import { updateComentarioFlujoAprobacion } from '../../../graphql/aprobaciones'

export default {
  name: 'ModalFinalAprobacion',
  props: {
    _redirigir:{ type: Function },
    mod_fk:{
      type: Number,
      default: 0
    },
    id_doc: {
      type: Number,
      default: 0
    },
    id_apro: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      comentario: 'Sin comentario'
    }
  },
  methods: {
    async redirigir() {
      try {
        const obj = {
          id_apro: this.id_apro,
          comentario: this.comentario
        }

        console.log('paso: ', obj)
        const { data } = await updateComentarioFlujoAprobacion(obj)
  
        console.log('data: ', data) 
      } catch (error) {
        console.log('error: ', error)
      }

      this._redirigir()
    }
  }
}