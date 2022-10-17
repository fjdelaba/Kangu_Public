/* eslint-disable */
import {getRecepcion} from '../../../../../graphql/adquisiciones'
import moment from 'moment';
import NombreMaterial from '../../../../../components/general/nombre-obs-tabla/NombreObsTabla.vue'
export default {
    components: {
      NombreMaterial
      },
    mounted() {
        this.cargarRecepcionSeleccionada(this.$route.query.id)
    },
    data() {
      return {
        recepcion:'',
        skeleton:true,
        dessertHeaders: [
          { text: 'Nombre del Material', value: 'oc_det.mat',width: '10px' },
          { text: 'Solicitado', value: 'oc_det.cant_ajustada',},
          { text: 'Recepcionado', value: 'cantidad',  },
      ],
      detalle:[],
      };
    },
    methods: {
      async cargarRecepcionSeleccionada(id){
            const {data: { kangusoft_rec_cab } } = await getRecepcion(id);
       
            this.recepcion = kangusoft_rec_cab[0]
            this.recepcion.comentario = kangusoft_rec_cab[0].observacion
            console.log('recepcion', this.recepcion)
            this.detalle = kangusoft_rec_cab[0].rec_dets
            this.skeleton = false
        },
        getFechaFormat(fecha){
            return moment(fecha).format("DD/MM/YYYY")
          },
        
    }
}