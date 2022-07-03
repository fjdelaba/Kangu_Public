/* eslint-disable eqeqeq */
import { getPartidasPorPoroyecto,getMateriales } from '../../../graphql/general'
import { v4 as uuidv4 } from 'uuid'
import ModalNuevoMaterial from '../../general/modal-nuevo-material/ModalNuevoMaterial'
export default {
  name: 'ModalAgregarMaterial',
  props: {
    cerrarDialogMaterial_: { type: Function },
    materialEdicion: {},
    listaPartidas: []
  },
  components: {
    ModalNuevoMaterial
  },
  data() {
    return {
      material:{
        nombre: '',
        partida: '',
        cantidad: '',
        precio_unitario: '',
        subtotal: '',
        observacion: '',
        mat_fk: 0,
        partidas:[{ par: [], par_fk:0, cantidad:0, id:uuidv4(), eliminar: false }],
        modalNuevoMaterial: false
      },
      rules:{
        material:{
          nombre: [
            (v) => !!v || 'Debes buscar un material'
          ],
          partida: [
            (v) => !!v || 'Selecciona una partida'
          ],
          cantidad: [
            (v) => !!v || 'Ingresa la cantidad del material'
          ],
          precio_unitario: [
            (v) => !!v || 'Ingresa el precio unitario'
          ]
        }
      },
      // listaPartidas: [],
      listaMaterial: [],
      isLoading: false,
      mostrarNoData: false,
      search: null,
      cargaMasiva: false,

      //Tabla
      dialog: false,
      dialogDelete: false,
      // headers: [
      //   {
      //     text: 'Nombre',
      //     align: 'start',
      //     sortable: false,
      //     value: 'name'
      //   },
      //   { text: 'ID', value: 'protein' },
      //   { text: 'Actions', value: 'actions', sortable: false }
      // ],
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'nombre'
        },
        {
          text: 'Unidad',
          align: 'start',
          sortable: false,
          value: 'mat_uni.nombre'
        },
        { text: 'ID', value: 'id' }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        protein: 0
      },
      defaultItem: {
        name: '',
        protein: 0
      },
      materialesSelected: [],
      textoFiltroMaterial:'',
      partidaGeneral: '',
      prorateos: [
        { par: [], par_fk:0, cantidad:0, id:uuidv4(), eliminar: false }
      ],
      mostrarAlert: false,
      textoAlert: '',

      //VueMoney
      value: '',
      placeholder: ' ',
      readonly: false,
      disabled: false,
      outlined: true,
      valueWhenIsEmpty: '',
      options: {
        prefix: 'R$',
        length: 11,
        precision: 2
      },
      properties: {
        dense: true
      },
      rate: 0,
      errors: {}
    }
  },
  mounted() {
    this.getPartidas()
    if (this.materialEdicion !== undefined) {
      this.cargarDatosEdicion()
    }
    
  },
  methods: {
    validarTablaMaterialMasiva() {

    },
    validarInputMaterial() {

    },
    validarPrecioMaterial() {

    },
    validarPartidaMaterial() {

    },
    seleccionPartida() {
      // console.log('blur')
      for (const par of this.material.partidas) {
        // console.log('par: ', par.par_fk)
        const obj = this.listaPartidas.find((data) => data.id === par.par_fk.id)

        obj.disabled = true
        // console.log('this.listaPartidas: ', this.listaPartidas)
      }
    },
    agregarProrateo() {
      this.material.partidas.push({ par: [], par_fk:0, cantidad:0, id:uuidv4(), eliminar: true })
    },
    eliminarProrateo(prorateo) {
      console.log('prorateo: ', prorateo)
      // eslint-disable-next-line eqeqeq
      for (const pro in this.material.partidas) {
        // if(mat.mat_fk == item.mat_fk){
        //   delete mat
        // }
        // eslint-disable-next-line eqeqeq
        if (this.material.partidas[pro].id == prorateo.id) {
          this.material.partidas.splice(pro,1)
          console.log('iguales: ')
        }
        console.log('pro: ', pro)
      }
      this.calcularTotal()
    },
    agregarMaterial() {
      // console.log('this.cpxModoEdicion: ', this.cpxModoEdicion, ' - cargaMasiva: ', this.cargaMasiva)
      if (this.cpxModoEdicion) {
        const material = {
          mat_fk: this.material.mat_fk,
          cantidad: this.material.cantidad,
          precio_unitario: this.material.precio_unitario,
          // total: Number(this.material.cantidad * this.material.unitario),
          total: this.material.subtotal,
          par_fk: this.material.partida.id,
          observacion: this.material.observacion,
          partidas: JSON.parse(JSON.stringify( this.material.partidas)),
          // editable: false,
          par: this.material.partida
        }

        this.cerrarDialogMaterial_(material, this.cargaMasiva, this.cpxModoEdicion)
      } else {
        if (this.cargaMasiva) {
          if (this.listaMaterial.length < 1) {
            this.mostrarAlert = true
            this.textoAlert = 'Debes seleccionar por lo menos un material'
            setTimeout(() => {
              this.mostrarAlert = false
            }, 6000)

            return
          }
          const materiales = []
          const matPar = [{
            par: '',
            par_fk: this.partidaGeneral,
            cantidad: this.material.cantidad,
            id: uuidv4(),
            eliminar: false
          }]

          if (this.materialesSelected.length > 0) {
            for (const mat of this.materialesSelected) {
    
              // console.log('mat: ', mat)
              // console.log('partidaGeneral: ', this.partidaGeneral)
              const objMat = {
                oc_fk: 1,
                mat_fk: mat.id,
                nombre: mat.nombre,
                unidad: mat.mat_uni.nombre,
                cantidad: 0,
                precio_unitario: 0,
                total: 0,
                par_fk: 0,
                observacion: 'Sin Observacion',
                usu_fk: mat.nombre,
                editable: true,
                id: uuidv4()
              }
    
              // eslint-disable-next-line eqeqeq
              if (this.partidaGeneral != '') {
                // objMat.par_fk = this.partidaGeneral.id,
                objMat.par_fk = matPar,
                objMat.par = this.partidaGeneral
                objMat.partidas = JSON.parse(JSON.stringify( matPar))
              } else {
                objMat.par_fk = ''
                objMat.par = ''
                objMat.partidas = JSON.parse(JSON.stringify( matPar))
              }
              // console.log('partida general: ', this.partidaGeneral)
              materiales.push(objMat)
            }
          }
 
          this.cerrarDialogMaterial_(materiales, this.cargaMasiva, this.cpxModoEdicion)
          // console.log('materiales: ', materiales)
        } else {
          console.log('this.material.partidas.length: ', this.material.partidas.length)
          console.log('this.material.partidas[0].cantidad < 1: ', this.material.partidas[0].cantidad < 1)
          console.log('this.material.partidas[0].par_fk.id == undefined: ', this.material.partidas[0].par_fk.id == undefined)
          console.log('this.material.precio_unitario < 1: ', this.material.precio_unitario < 1)
          console.log('this.material.nombre == : ', this.material.nombre == '')
          if (this.material.partidas[0].par_fk.id == undefined || this.material.partidas[0].cantidad < 1 || this.material.precio_unitario < 1 || this.material.nombre == '') {
            this.mostrarAlert = true
            this.textoAlert = 'Debes ingresar material, cantidad, precio y una partida'
            setTimeout(() => {
              this.mostrarAlert = false
            }, 6000)

            return
          }
          const material = {
            oc_fk: 1,
            mat_fk: this.material.nombre.id,
            nombre: this.material.nombre.nombre,
            unidad: this.material.nombre.mat_uni.nombre,
            cantidad: this.material.cantidad,
            precio_unitario: this.material.precio_unitario,
            // total: Number(this.material.cantidad * this.material.unitario),
            total: this.material.subtotal,
            par_fk: this.material.partida.id,
            observacion: this.material.observacion,
            // usu_fk: 1,
            usu_fk: this.$store.state.app.datosUsuario.user_id,
            editable: false,
            par: this.material.partida,
            partidas: this.material.partidas,
            id: uuidv4()
          }
  
          // console.log('material: ', material)
          this.cerrarDialogMaterial_(material, this.cargaMasiva, this.cpxModoEdicion)
        }
      }   
      let  textoNotificaction = 'Se agrego 1 material' 

      if (this.cargaMasiva) {
        if (this.materialesSelected.length > 1) {
          textoNotificaction = `Se agregaron ${this.materialesSelected.length} materiales`
        } else {
          textoNotificaction = 'Se agrego 1 material'
        }
      } else {
        textoNotificaction = 'Se agrego 1 material'
      }

      this.$notify({
        group: 'foo',
        title: 'Materiales agregados',
        text: textoNotificaction
      })
    },
    calcularTotal() {
      let cantidadTotal = 0

      for (const par of this.material.partidas) {
        cantidadTotal += Number(par.cantidad)
      }
      // this.material.subtotal = Number(this.material.cantidad * this.material.unitario)
      this.material.subtotal = Number(cantidadTotal * this.material.precio_unitario)
      this.material.cantidad = cantidadTotal
    },
    cerrar() {
      this.cerrarDialogMaterial_([])
    },
    async getPartidas() {
      // const  { data }   = await getPartidasPorPoroyecto(1)

      // this.listaPartidas = data.getPartidas
      for (const partida of this.listaPartidas) {
        if (partida.path.indexOf('/') > 0) {
          const pathArray = partida.path.split('/')

          pathArray.shift()
          pathArray.reverse()
          partida.path = pathArray
        } else {
          delete partida.path
        }
      }

    },
    mostrarDialogNuevoMaterial() {
      console.log('mostrar modal')
      this.modalNuevoMaterial = true
    },
    cargarMateriales() {
      console.log('PASO POR ACÁ !!!!')
      this.mostrarNoData = false
      // cancel pending call
      clearTimeout(this._timerId)
    
      // delay new call 500ms
      this._timerId = setTimeout(() => {
        this.buscarMaterial()
      }, 1000)
    },
    async buscarMaterial() {
      const { data } = await getMateriales(`%${ !this.cargaMasiva ? this.search : this.textoFiltroMaterial}%`)

      this.isLoading = false
      this.listaMaterial = data.kangusoft_mat

      if (this.listaMaterial.length === 0) {
        this.mostrarNoData = true
      }
      console.log('this.listaMaterial: ', this.listaMaterial)
    },
    limpiarAutocompleate() {
      setTimeout(() => {
        console.log('PASO POR AQUÍ !!!!')
        this.mostrarNoData = false
        this.search = ''        
      }, 500)

    },

    ////////////////////////////////
    initialize () {
      this.desserts = [
        {
          name: 'Frozen Yogurt',
          protein: 4.0
        },
        {
          name: 'Ice cream sandwich',
          protein: 4.3
        }
      ]
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    cargarDatosEdicion() {
      this.material.nombre = this.materialEdicion.nombre
      this.material.partida = this.materialEdicion.par
      this.material.cantidad = this.materialEdicion.cantidad
      this.material.precio_unitario = this.materialEdicion.precio_unitario
      this.material.subtotal = this.materialEdicion.cantidad
      this.material.observacion = this.materialEdicion.observacion,
      this.material.mat_fk = this.materialEdicion.mat_fk
      this.material.partidas = this.materialEdicion.partidas
    }
  },
  computed: {
    cpxTitulo() {
      if (this.cpxModoEdicion) {
        return 'Edicion de Material'
      } else {
        return !this.cargaMasiva ? 'Cargar Material' : 'Seleccion multiple de material'
      }
      
    },
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    cpxModoEdicion() {
      return this.materialEdicion !== undefined
    }
  },
  watch: {
    async search (val) {
      if (this.isLoading) return
      if (this.isLoading) return
      this.isLoading = true
      this.cargarMateriales()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  created () {
    this.initialize()
  }
}