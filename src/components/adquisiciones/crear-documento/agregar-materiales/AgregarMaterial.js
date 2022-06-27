import { getPartidasPorPoroyecto } from '../../../../graphql/general'
import ModalAgregarMaterial from '../../modal-agregar-material/ModalAgregarMaterial.vue'
import { postDetalleOC } from '../../../../graphql/adquisiciones'

export default {
  components:{
    ModalAgregarMaterial
  },
  props: {
    oc_id: 0
  },
  data: () => ({
    dialogMaterial: false,
    dialogDeleteMaterial: false,
    headers: [
      {
        text: 'Material',
        align: 'start',
        sortable: false,
        value: 'nombre',
        width: '400px'
      },
      { text: 'C.C', value: 'par_fk', sortable: false, width: '200px' },
      { text: 'Cant.', value: 'cantidad', width: '100px', sortable: false, align: 'center' },
      { text: 'P. Unitario', value: 'precio_unitario', width: '100px', sortable: false, align: 'center' },
      { text: 'Subtotal', value: 'total', width: '100px', sortable: false, align: 'center' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    materiales:[],
    listaPartidas: [],
    materialEdicion: {},
    mostartAlertMaterial: false,
    textoMaterial: [],
    totalesItems: [
      {
        item: 'Neto',
        valor: 159
      },
      {
        item: 'Impuesto',
        valor: 237
      },
      {
        item: 'Total',
        valor: 262
      }
    ],
    totalesHeaders: [
      {
        text: 'Dessert (100g serving)',
        align: 'start',
        value: 'item',
        width: '20%'
      },
      { text: 'Calories', value: 'valor', width: '20%' }
    ],
    files: [],
    respFiles: [],
    dialogValidacion: false,
    comentarioDocumento: ''
  }),
  methods: {
    validarAgregarMaterial() {
      let materialEdicion = false

      for (const mat of this.materiales) {
        console.log('mat: ', mat)
        if (mat.editable === true) {
          materialEdicion = true
          break
        }
      }
      console.log('materialEdicion: ', materialEdicion)

      this.materiales.length > 0 && materialEdicion === false ? this.dialogValidacion = false : this.dialogValidacion = true

      return !this.dialogValidacion
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
    revisarImagen() {
      console.log(this.files)
    },
    async getPartidas() {
      const  { data }   = await getPartidasPorPoroyecto(1)

      this.listaPartidas = data.getPartidas
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
    async getMateriales() {
    },
    abrirDialogMaterialMasivo() {

    },
    abrirDialogMaterial(materialEdicion) {
      this.dialogMaterial = true
      console.log('materialEdicion: ', materialEdicion)
      this.materialEdicion = materialEdicion
      // if (materialEdicion) {
      //   this.materialEdicion = materialEdicion
      // }
      
      // setTimeout(() => {
      //   this.dialogMaterial = false
      // }, 6000)
    },
    async cerrarDialogMaterial(materiales, array, edicion) {
      if (materiales.length === 0) {
        this.dialogMaterial = false

        return
      }
      if (edicion) {
        console.log('edicion de material: ', materiales)
        // eslint-disable-next-line eqeqeq
        // this.materiales.map((u) => {
        //   u.mat_fk != materiales.mat_fk ? u : materiales
        // })
        for (const mat of this.materiales) {
          console.log('mat: ', mat)
          // eslint-disable-next-line eqeqeq
          if (materiales.mat_fk == mat.mat_fk) {
            console.log('iguales')
            mat.cantidad = materiales.cantidad
            mat.precio_unitario = materiales.precio_unitario
            mat.total = Number(mat.cantidad * mat.precio_unitario)
            mat.observacion = materiales.observacion
            mat.partidas = JSON.parse(JSON.stringify( materiales.partidas))
          }
        }
      } else {
        console.log('ELSE: ', this.materiales)
        if (array) {
          // console.log('materiales:', materiales)
          // this.materiales = materiales
          for (const mat in this.materiales) {
            console.log('for mat: ', mat)
            for (const _mat in materiales) {
              console.log('for mat_: ', _mat)
              if (this.materiales[mat].mat_fk === materiales[_mat].mat_fk) {
                //delete materiales[_mat]
                this.textoMaterial.push(materiales[_mat].nombre)
                materiales.splice(_mat,1)
              }
            }
          }
          this.materiales.push(...materiales)
          if (this.textoMaterial.length > 0) {
            this.mostartAlertMaterial = true
            this.ocultarAlertMateriales()
          }

        } else {
          console.log('ELSE ELSE this.materiales: ', this.materiales)
          console.log('ELSE ELSE materiales: ', materiales)
          console.log('ELSE materiales par_fk.id: ', materiales.partidas[0].par_fk.id)
          console.log('ELSE materiales cantidad: ', materiales.partidas[0].cantidad)
          let existeMaterial = false

          for (const mat of this.materiales) {
            // eslint-disable-next-line eqeqeq
            if (mat.mat_fk == materiales.mat_fk) {
              console.log('giaules')
              existeMaterial = true
            }
          }
          if (!existeMaterial) {
            try {
              let total_cantidad = 0
              const detalle_partida = []
  
              for (const detPar of materiales.partidas) {
                console.log('detPar: ', detPar)
                total_cantidad += detPar.cantidad
                const obj = {
                  par_fk : Number(detPar.par_fk.id),
                  cantidad : Number(detPar.cantidad)
                }
  
                detalle_partida.push(obj)
              }
  
              const detalle = {
                oc_fk: this.oc_id,
                mat_fk: Number(materiales.mat_fk),
                cantidad: Number(total_cantidad),
                precio_unitario: Number(materiales.precio_unitario),
                total: Number(total_cantidad) * Number(materiales.precio_unitario),
                usu_fk:1
              }
  
              console.log('detalle: ', detalle)
              console.log('detalle detalle_partida: ', detalle_partida)
  
              const returnPostDetalle = await postDetalleOC(detalle, detalle_partida)
  
              console.log('returnPostDetalle: ', returnPostDetalle)
              this.materiales.push(materiales)
                
            } catch (error) {
              console.log(error)              
            }
          } else {
            this.textoMaterial.push(materiales.nombre)
            this.mostartAlertMaterial = true
            this.ocultarAlertMateriales()
          }
        }
      }
      this.dialogMaterial = false
    },
    calcularTotalMaterial(item) {
      let totalCantidad = 0

      for (const par of item.partidas) {
        totalCantidad += Number(par.cantidad)
      }
      console.log('totalCantidad: ', totalCantidad)
      // item.total = item.cantidad * item.precio_unitario
      item.cantidad = totalCantidad
      item.total = totalCantidad * item.precio_unitario
    },
    grabarMateriales() {
      for (const mat of this.materiales) {
        console.log('mat: ', mat)
        // eslint-disable-next-line eqeqeq
        if (mat.total != 0 && mat.partidas.length > 0) {
          mat.editable = false
        }
        
      }
    },
    editarMateriales() {
      for (const mat of this.materiales) {
        mat.editable = true
      }
    },
    eliminarMaterial(item) {
      for (const mat in this.materiales) {
        // if(mat.mat_fk == item.mat_fk){
        //   delete mat
        // }
        // eslint-disable-next-line eqeqeq
        if (this.materiales[mat].mat_fk == item.mat_fk) {
          console.log('this.materiales[mat]: ', this.materiales[mat])
          this.materiales.splice(mat,1)
        }
      }
    },
    guardarMaterial(item) {
      for (const mat in this.materiales) {
        // eslint-disable-next-line eqeqeq
        if (this.materiales[mat].mat_fk == item.mat_fk) {
          let partidaOk = true
          const _cantidad = Number(item.partidas[0].cantidad)
          const _precio_unitario = Number(item.precio_unitario)

          // eslint-disable-next-line eqeqeq
          console.log('1: ', item.partidas.length === 1)
          console.log('2: ', _cantidad > 0)
          console.log('3 == ', _precio_unitario > 0)
          // eslint-disable-next-line eqeqeq
          console.log('4: ', item.partidas[0].par_fk == '' )
          // eslint-disable-next-line eqeqeq
          console.log('val: ', item.partidas.length === 1 && _cantidad > 0 && _precio_unitario > 0 && item.partidas[0].par_fk == '')
          // eslint-disable-next-line eqeqeq
          if (item.partidas.length === 1 && _cantidad > 0 && _precio_unitario > 0 && item.partidas[0].par_fk == '') {
            console.log('item.partidas: ', item.partidas)
            partidaOk = false
          }

          // eslint-disable-next-line no-constant-condition
          if (_cantidad > 0 && item.precio_unitario > 0 && partidaOk) {
            this.materiales[mat].editable = false
          } else {
            this.$notify({
              group: 'foo',
              title: 'Guardar cambios',
              text: 'Debes ingresar la partida, cantidad y precio para guardar esta linea',
              type: 'warn'
            })
          }
          
        }
      }
    },
    ocultarAlertMateriales() {
      setTimeout(() => {
        this.mostartAlertMaterial = false
      }, 6000)
    }
  },
  async mounted() {
    this.getPartidas()
    console.log('mounted Agregar Material')
  },
  computed: {
    cpxTotalesItems() {
      let neto = 0
      let iva = 0
      const retencion = 0
      let total = 0
      const descuento = 0

      for (const linea of this.materiales) {
        console.log('linea: ', linea)
        neto += Number(linea.total)
      }
      iva = neto * 0.19
      total = iva + neto

      console.log(neto, iva, total)

      return [
        { item: 'Neto', valor: neto },
        { item: 'IVA', valor: iva },
        { item: 'Total', valor: total }
      ]
    }
  }
}