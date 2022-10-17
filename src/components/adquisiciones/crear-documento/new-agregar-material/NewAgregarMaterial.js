import TablaAgregarMaterial from './tabla-agregar-material/TablaAgregarMaterial.vue'
import DrawerSeleccionMaterialPartida from '../../drawer-seleccion-material-partida/DrawerSeleccionMaterialPartida.vue'
import CuadroResumen from '../../../general/cuadro-resumen/CuadroResumen.vue'
import NewCuadroResumen from '../../../general/new-cuadro-resumen/NewCuadroResumen.vue'
import CrearMaterial from '../../../general/crear-material/crear-material.vue'

export default {
  name: 'NewAgregarMaterial',
  components: {
    TablaAgregarMaterial,
    DrawerSeleccionMaterialPartida,
    CuadroResumen,
    NewCuadroResumen,
    CrearMaterial
  },
  props:{
    tipo_documento:{
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      drawerMaterial: null,
      lista:[],
      cabecera:[],
      comentarioDocumento: '',
      files: [],
      respFiles: [],
      nombreArchivos: [],
      mostrarDetallePartida: false,
      mostrarDialogMateriales: false
    }
  },
  methods: {
    mostrarDialog() {
      this.mostrarDialogMateriales = true
    },
    cerrarDialog() {
      this.mostrarDialogMateriales = false
    },
    validarAgregarMaterial() {
      let materialEdicion = false

      for (const mat of this.lista) {
        console.log('mat: ', mat)
        if (mat.total === 0 || mat.cantidad === 0 || mat.precio_unitario === 0) {
          materialEdicion = true
          break
        }
      }

      // this.lista_detalle.length > 0 && materialEdicion === false ? this.dialogValidacion = false : this.dialogValidacion = true
      // this.$toast.error('Revisa los valores en la tabla', {
      //   tposition: 'top-right',
      //   timeout: 5000,
      //   pauseOnHover: true
      // })

      return !materialEdicion
    },
    changeDrawerMaterial() {
      this.drawerMaterial = !this.drawerMaterial
      this.mostrarDetallePartida = true
    },
    agregarMaterial(item) {
      console.log('item en pagina base: ', item)
      this.lista.push(item)
    },
    chang() {
      if (this.files.length >= 5) {
        this.$notify({
          group: 'foo',
          title: 'Puedes agregar un maximo de 5 archivos',
          text: 'Adjuntar archivos'
        })

        return
      }

      console.log('Change files: ',this.files)
      if (this.respFiles.length < 1) {
        console.log('IF')
        this.respFiles = [...this.files]
      } else {
        console.log('ELSE')
        for (const f in this.files) {
          let agregarAdjunto = true

          for (const fr in this.respFiles) {
            console.log('f: ', this.respFiles[fr].name)
            if (this.respFiles[fr].name === this.files[f].name) {
              agregarAdjunto = false
            }
          }
          if (agregarAdjunto) {
            console.log('concat: ', this.files[f])
            this.respFiles.push(this.files[f])
            // this.files = [...this.respFiles,  ...this.files[f]]
          }
          console.log('agregarAdjunto: ', agregarAdjunto)
        }
        this.files = [...this.respFiles]

      }
      console.log('respFiles: ', this.respFiles)
      console.log('files: ', this.files)

      return
      // eslint-disable-next-line no-unreachable
      if (this.respFiles.length < 2) {
        this.files = [
          ...this.respFiles,
          ...this.files
        ]
      } else {
        this.files = [
          ...this.respFiles
        ]
        this.$notify({
          group: 'foo',
          title: 'Puedes agregar un maximo de 2 archivos',
          text: 'Adjuntar archivos'
        })
      }
    },
    clic() {
      console.log('Clic files: ', this.files)    
    },
    eliminarAdjunto(item) {
      console.log('item: ', item)
      for (const f in this.files) {
        if (this.files[f].name === item.name) {
          console.log('giaules')
          this.files.splice(f, 1)
        }
      }
      this.respFiles = [...this.files]
    }
  }
}