import NombreObsTabla from '../../../../general/nombre-obs-tabla/NombreObsTabla.vue'
import DrawerPartida from '../../../drawer-seleccion-material-partida/drawer-partidas/DrawerPartida.vue'
const numeral = require('numeral')

export default {
  name: 'TablaAgregarMaterial',
  props:{
    _lista: {
      Type: Array,
      default: () => [] 
    }
  },
  components:{
    NombreObsTabla,
    DrawerPartida
  },
  data() {
    return {
      cabecera:[],
      editarPartida: false,
      nuevaPartida: [],
      uidEdicion : ''
    }
  },
  created() {
  },
  mounted() {
    // this.cargarProps()
    this.cabecera =  [
      {
        text: 'Material',
        align: 'start',
        sortable: false,
        value: 'mat_nombre',
        width: '400px'
      },
      { text: 'C.C', value: 'partidas', sortable: false, width: '200px' },
      { text: 'Cant.', value: 'cantidad', width: '100px', sortable: false, align: 'center' },
      { text: 'P. Unitario', value: 'precio_unitario', width: '100px', sortable: false, align: 'center' },
      { text: 'Subtotal', value: 'total', width: '100px', sortable: false, align: 'center' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ]
  },
  methods: {
    calcularTotalMaterial(item) {
      console.log('item_ ', item)
      item.total = Number(item.cantidad) * Number(item.precio_unitario)
    },
    eliminarMaterial(item) {
      for (const mat in this._lista) {
        console.log('mat: ', mat)
        if (this._lista[mat].uid === item.uid) {
          this._lista.splice(mat, 1)
        }
      }
    },
    edicionPartida(item) {
      this.editarPartida = true
      this.uidEdicion = item.uid
    },
    edicionSeleccionPartida(item) {
      console.log('item edicionSeleccionPartida: ', item)
      this.nuevaPartida = []
      this.nuevaPartida.push(...item)
    },
    grabarNuevaPartida() {
      console.log('nueva partida: ', this.nuevaPartida)
      const partidas = []

      for (const mat of this._lista) {
        if (mat.uid === this.uidEdicion) {
          mat.partidas = []
          mat.partidas.push(...this.nuevaPartida)
          let cantidad = 0

          for (const part of this.nuevaPartida) {
            cantidad += Number(part.cantidad)
          }
          mat.cantidad = cantidad
          mat.total = Number(mat.cantidad) * Number(mat.precio_unitario)
          // const obj = {
          //   cantidad: mat.partidas[0].cantidad,
          //   id: this.nuevaPartida.id,
          //   name: this.nuevaPartida.name,
          //   par_id: this.nuevaPartida.par_id
          // }
        }
      }

      this.editarPartida = false
    },
    cancelarNuevaPartida() {
      this.nuevaPartida = []
      this.editarPartida = false
    },
    asignarCantidad(item) {
      console.log(' asignarCantidad item: ', item.cantidad)
      for (const mat of this._lista) {
        if (mat.uid === item.uid) {
          console.log('mat asignarCantidad: ', mat)
          console.log('asignarCantidad iguales: ')
          mat.partidas[0].cantidad = item.cantidad
        }
      }
      this.calcularTotalMaterial(item)
    }
  }
}