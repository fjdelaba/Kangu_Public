import { getPartidasPorPoroyecto } from '../../../../graphql/general'
import ModalAgregarMaterial from '../../modal-agregar-material/ModalAgregarMaterial.vue'

export default {
  components:{
    ModalAgregarMaterial
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
    materialEdicion: {}
  }),
  methods: {
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
    cerrarDialogMaterial(materiales, array, edicion) {
      if (edicion) {
        console.log('edicion de material: ', materiales)
        // eslint-disable-next-line eqeqeq
        this.materiales.map((u) => u.mat_fk != materiales.mat_fk ? u : materiales)
      } else {
        if (array) {
          console.log('materiales:', materiales)
          // this.materiales = materiales
          this.materiales.push(...materiales)
        } else {
          this.materiales.push(materiales)
        }
      }
      this.dialogMaterial = false
    },
    calcularTotalMaterial(item) {
      item.total = item.cantidad * item.precio_unitario
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
          const _cantidad = Number(item.cantidad)
          const _precio_unitario = Number(item.precio_unitario)

          // eslint-disable-next-line eqeqeq
          console.log('item.partidas.length === 1: ', item.partidas.length === 1)
          console.log('item.cantidad: ', _cantidad > 0 )
          console.log('item.precio_unitario: ', _precio_unitario > 0)
          console.log('item.precio_unitario: ', _precio_unitario > 0)
          console.log('val: ', item.partidas.length === 1 && _cantidad > 0 && _precio_unitario > 0 && item.partidas[0].par_fk !== '')
          // eslint-disable-next-line eqeqeq
          if (item.partidas.length === 1 && _cantidad > 0 && _precio_unitario > 0 && item.partidas[0].par_fk == '') {
            console.log('item.partidas: ', item.partidas)
            partidaOk = false
          }

          // eslint-disable-next-line no-constant-condition
          if (item.cantidad > 0 && item.precio_unitario > 0 && partidaOk) {
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
    }
  },
  async mounted() {
    this.getPartidas()
  }
}