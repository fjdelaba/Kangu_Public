import { v4 as uuidv4 } from 'uuid'
import DrawerPartida from './drawer-partidas/DrawerPartida.vue'
import { getMateriales } from '../../../graphql/adquisiciones'

export default {
  name: 'DrawerSeleccionMaterialPartida',
  props: {
    _agregarMaterial: { type: Function },
    _pro_fk:{ type: Number },
    _mostrar_drawer_partida:{
      Type: Boolean,
      default: false
    }
  },
  components: {
    DrawerPartida
  },
  data() {
    return {
      busquedaMaterial: null,
      listaMateriales: [],
      open: [1, 2],
      panel:[0],
      partida:{},
      disabledPanelMaterial: true,
      textoPanelPartida:'',
      listaPartidas: [],
      items: [
        {
          'children': [
            {
              'id': 22,
              'name': 'Mo Directa',
              'par_id': 14,
              '__depth': 1
            },
            {
              'id': 23,
              'name': 'Mo Indirecta',
              'par_id': 14,
              '__depth': 1
            }
          ],
          'id': 14,
          'name': 'MANO OBRA',
          'par_id': 0,
          '__depth': 0
        },
        {
          'children': [
            {
              'id': 25,
              'name': 'Obras Previas',
              'par_id': 15,
              '__depth': 1
            },
            {
              'id': 26,
              'name': 'Impermeabilización, sellos',
              'par_id': 15,
              '__depth': 1
            },
            {
              'id': 27,
              'name': 'EEMM, PINTURA INTM',
              'par_id': 15,
              '__depth': 1
            },
            {
              'id': 28,
              'name': 'Cubierta, Hojalatería',
              'par_id': 15,
              '__depth': 1
            },
            {
              'id': 29,
              'name': 'Demoliciones, Retiros',
              'par_id': 15,
              '__depth': 1
            },
            {
              'id': 30,
              'name': 'Revoques, Pinturas',
              'par_id': 15,
              '__depth': 1
            },
            {
              'id': 31,
              'name': 'Pavimentos,  pintura pavimento',
              'par_id': 15,
              '__depth': 1
            },
            {
              'id': 32,
              'name': 'Tabiques, Cielos',
              'par_id': 15,
              '__depth': 1
            },
            {
              'id': 33,
              'name': 'Puertas, portones',
              'par_id': 15,
              '__depth': 1
            },
            {
              'id': 34,
              'name': 'Cristales',
              'par_id': 15,
              '__depth': 1
            },
            {
              'id': 35,
              'name': 'Rejas',
              'par_id': 15,
              '__depth': 1
            },
            {
              'id': 36,
              'name': 'Accesorios Baños',
              'par_id': 15,
              '__depth': 1
            },
            {
              'id': 37,
              'name': 'Cortinas metalicas antifuego',
              'par_id': 15,
              '__depth': 1
            },
            {
              'id': 38,
              'name': 'Defensas bajas',
              'par_id': 15,
              '__depth': 1
            },
            {
              'id': 39,
              'name': 'Seguridad y Prevención',
              'par_id': 15,
              '__depth': 1
            },
            {
              'id': 40,
              'name': 'Instalaciones',
              'par_id': 15,
              '__depth': 1
            },
            {
              'id': 41,
              'name': 'Otros',
              'par_id': 15,
              '__depth': 1
            }
          ],
          'id': 15,
          'name': 'MATERIALES',
          'par_id': 0,
          '__depth': 0
        },
        {
          'children': [
            {
              'id': 42,
              'name': 'Obras Previas',
              'par_id': 16,
              '__depth': 1
            },
            {
              'id': 43,
              'name': 'Impermeabilización, sellos',
              'par_id': 16,
              '__depth': 1
            },
            {
              'id': 44,
              'name': 'EEMM, PINTURA INTM',
              'par_id': 16,
              '__depth': 1
            },
            {
              'id': 45,
              'name': 'Cubierta, Hojalatería',
              'par_id': 16,
              '__depth': 1
            },
            {
              'id': 46,
              'name': 'Demoliciones, Retiros',
              'par_id': 16,
              '__depth': 1
            },
            {
              'id': 47,
              'name': 'Revoques, Pinturas',
              'par_id': 16,
              '__depth': 1
            },
            {
              'id': 48,
              'name': 'Pavimentos,  pintura pavimento',
              'par_id': 16,
              '__depth': 1
            },
            {
              'id': 49,
              'name': 'Tabiques, Cielos',
              'par_id': 16,
              '__depth': 1
            },
            {
              'id': 50,
              'name': 'Puertas, portones',
              'par_id': 16,
              '__depth': 1
            },
            {
              'id': 51,
              'name': 'Cristales',
              'par_id': 16,
              '__depth': 1
            },
            {
              'id': 52,
              'name': 'Rejas',
              'par_id': 16,
              '__depth': 1
            },
            {
              'id': 53,
              'name': 'Accesorios Baños',
              'par_id': 16,
              '__depth': 1
            },
            {
              'id': 54,
              'name': 'Cortinas metalicas antifuego',
              'par_id': 16,
              '__depth': 1
            },
            {
              'id': 55,
              'name': 'Defensas bajas',
              'par_id': 16,
              '__depth': 1
            },
            {
              'id': 56,
              'name': 'Seguridad y Prevención',
              'par_id': 16,
              '__depth': 1
            },
            {
              'children': [
                {
                  'id': 59,
                  'name': 'Sanitario',
                  'par_id': 57,
                  '__depth': 2
                },
                {
                  'id': 60,
                  'name': 'PCI',
                  'par_id': 57,
                  '__depth': 2
                },
                {
                  'id': 61,
                  'name': 'Eléctricas',
                  'par_id': 57,
                  '__depth': 2
                },
                {
                  'id': 62,
                  'name': 'Climatización',
                  'par_id': 57,
                  '__depth': 2
                },
                {
                  'id': 63,
                  'name': 'Aire Comprimido',
                  'par_id': 57,
                  '__depth': 2
                },
                {
                  'id': 64,
                  'name': 'CCDD',
                  'par_id': 57,
                  '__depth': 2
                },
                {
                  'id': 65,
                  'name': 'CCTV, SEGURIDAD',
                  'par_id': 57,
                  '__depth': 2
                },
                {
                  'id': 66,
                  'name': 'Otras instalaciones',
                  'par_id': 57,
                  '__depth': 2
                }
              ],
              'id': 57,
              'name': 'Instalaciones',
              'par_id': 16,
              '__depth': 1
            },
            {
              'id': 58,
              'name': 'Otros Subcontratos',
              'par_id': 16,
              '__depth': 1
            }
          ],
          'id': 16,
          'name': 'SUBCONTRATOS',
          'par_id': 0,
          '__depth': 0
        },
        {
          'children': [
            {
              'id': 67,
              'name': 'Traslados',
              'par_id': 17,
              '__depth': 1
            },
            {
              'id': 68,
              'name': 'Maquinaria',
              'par_id': 17,
              '__depth': 1
            },
            {
              'id': 69,
              'name': 'Arriendos',
              'par_id': 17,
              '__depth': 1
            },
            {
              'id': 70,
              'name': 'Retiro escombros',
              'par_id': 17,
              '__depth': 1
            }
          ],
          'id': 17,
          'name': 'TRASLADOS Y ARRIENDOS',
          'par_id': 0,
          '__depth': 0
        },
        {
          'children': [
            {
              'id': 71,
              'name': 'Boletas, Seguros',
              'par_id': 18,
              '__depth': 1
            },
            {
              'id': 72,
              'name': 'Otros GG',
              'par_id': 18,
              '__depth': 1
            }
          ],
          'id': 18,
          'name': 'VARIOS',
          'par_id': 0,
          '__depth': 0
        }
      ]
    }
  },
  mounted() {
    console.log('cargar partidas !!!!!: ',this._mostrar_drawer_partida)
  },
  computed: {
    cpxRefDrawerPartida() {
      return this.$refs.refdrawerpartida.selPartida
    },
    cpxSelPartida() {
      return this.$refs.refdrawerpartida.selPartida.length
      // return this.$refs.refdrawerpartida && this.$refs.refdrawerpartida.selPartida
    },
    cpxTextoPanelPartida() {
      return this.disabledPanelMaterial ? 'Seleccion de Partida' : `Partida Seleccionada: ${this.$refs.refdrawerpartida.selPartida[0].name}`
    }
  },
  methods: {
    selectActivePage(node) {
      for (const child of node) {
        console.log('child: ', child)
        // child.folded = false
        // child.disabled = false
        if (child.children && Array.isArray(child.children) && child.children.length > 0) {
          if (child.children.length > 0) {
            child.locked = true
          }
          console.log('anidated child: ', child.children)
          this.selectActivePage(child.children)
        }

      }
    },
    async cargarPartidas(pro_fk) {
      try {
        console.log('adasd')
        // const { data } = await this.axios.get('https://mindicador.cl/api')    
        const datos = {
          pro_fk
        }

        this.listaPartidas = []
        console.log('pro_fk: ', pro_fk)
        console.log('datos: ', datos)
        const { data: { partidas } } = await this.axios.post('https://actions-kangu-hasura.herokuapp.com/getPartidas', datos)   

        console.log('resp: ', partidas)
        this.listaPartidas = [...partidas]
        console.log('this.listaPartidas Parent: ', this.listaPartidas)
        this.selectActivePage(this.listaPartidas)
      } catch (e) {
        console.log(e)
      } 
    },
    seleccionPartidaDrawer(param) {
      console.log('param: ', param)
      this.disabledPanelMaterial = false
      this.panel = [1]
      
      // this.$refs['textFieldMaterial'].$refs.textarea.focus()
      console.log('this.$refs.refdrawerpartida.selPartida: ', this.$refs.refdrawerpartida.selPartida)
      console.log('this.$refs: ', this.$refs.textFieldMaterial)
    },
    async buscarMaterial() {
      if (this.busquedaMaterial !== null && this.busquedaMaterial.length > 2 ) {    
        const datos = { emp_fk: this.$store.state.app.datosEmpresa.id, material:this.busquedaMaterial }
        const { data:{ getMateriales:{ materiales } } } = await getMateriales(datos)

        console.log('materiales: ', materiales)
        this.listaMateriales = [...materiales]
      }
    },
    limpiarMaterial() {
      this.listaMateriales = []
    },
    limpiarPartida() {
      this.listaPartidas = []
    },
    agregarMaterial(item) {
      console.log('item: ', item)
      console.log('this.$refs: ', this.$refs.refdrawerpartida.selPartida)

      // eslint-disable-next-line prefer-destructuring
      const par = this.$refs.refdrawerpartida.selPartida
      const obj = {
        mat_fk: Number(item.id),
        cantidad: 0,
        precio_unitario: 0,
        total: 0,
        observacion: '',
        mat_nombre: item.name,
        mat_unidad: item.mu_nombre,
        // par_fk: par.id,
        // par_nombre: par.name,
        edicion: true,
        partidas: par,
        uid:uuidv4()
      }

      this._agregarMaterial(obj)
    }
  }
}