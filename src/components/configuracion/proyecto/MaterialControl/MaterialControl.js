/* eslint-disable */
import { getMateriales,getMonedas } from '../../../../graphql/general.js'
import {postProyectoMaterial,getMaterialesProyecto} from '../../../../graphql/configuracion.js'
export default {
  
  data() {
    return {
      select: ['Vuetify', 'Programming'],
      items: [
        'Programming',
        'Design',
        'Vue',
        'Vuetify'
      ],rules:{
     
        material:{
          nombre: [
            (v) => !!v || 'Debes buscar un material'
          ]
        }
      },
      headers1: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'Unidad Formato', value: 'formato' },
        { text: 'Valor Unitario', value: 'unitario' },
        { text: 'Valor Total', value: 'total' },
        { text: '% del Presupuesto', value: 'porcentaje' }
      ],
      headers2: [
        { text: 'Nombre', value: 'mat.nombre' },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'Unidad Formato', value: 'mat.mat_uni.nombre' },
        { text: 'Valor Unitario', value: 'valor_unitario' },
        { text: 'Valor Total', value: 'total' },
      ],
      listaMaterial: [],
      listaMonedas:[],
      isLoading: false,
      monedaSeleccionada:'',
      mostrarNoData: false,
      search: null,
      cargaMasiva: false,
      material:'',
      desserts: [],
      editedIndex: -1,
      materialSeleccionado: {
        nombre: '',
        cantidad: '',
        formato: '',
        unitario: '',
        total:'',
        porcentaje:'',
        id:''
      },
      proyectoSeleccionado:'',
      materialesProyecto:[]
    }
  },
  props: {
    id: Number,
    detalle:Boolean,
    idproyecto: Number
  },
  mounted() {
    setTimeout(() => {
      console.log("this.idproyecto",this.idproyecto)
      if(this.detalle == true){
        this.proyectoSeleccionado =this.idproyecto
        this.cargarMaterialesProyecto()
      }
    }, 2000);
    this.cargarMonedas()
    
    setTimeout(() => {
      console.log('props:', this.idproyecto)
    }, 2000)
  },
  methods: {
    async cargarMonedas() {
      const { data } = await getMonedas()
      
      this.listaMonedas = data.kangusoft_mon
    },
    async cargarMaterialesProyecto(){
      const { data : {kangusoft_pro_mat}} = await getMaterialesProyecto(this.proyectoSeleccionado)
      console.log("aaa", kangusoft_pro_mat)
      this.materialesProyecto = kangusoft_pro_mat
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
      this.isLoading = false
    },
    async buscarMaterial() {
      const { data } = await getMateriales(`%${this.search}%`)

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
    limpiarMateriales() {
     this. materialSeleccionado = {
      nombre: '',
      cantidad: '',
      formato: '',
      unitario: '',
      total:'',
      porcentaje:'',
      moneda:'',
      id: ''
    }
    this.monedaSeleccionada =""
    },
    guardarNuevoItem () {
      this.materialSeleccionado.id =  this.listaMaterial[0].id
      this.materialSeleccionado.nombre = this.material.nombre
      this.materialSeleccionado.formato = this.material.mat_uni.nombre
      this.materialSeleccionado.moneda = this.monedaSeleccionada
      this.materialSeleccionado.total = this.materialSeleccionado.unitario * this.materialSeleccionado.cantidad
      this.materialSeleccionado.porcentaje = '%' + this.materialSeleccionado.total / 1000000 * 100
      this.desserts.push(this.materialSeleccionado)
      this.limpiarMateriales()
      console.log('mats:',this.materialSeleccionado)
    },
   async guardarMateriales(){
      
    
      for (let a of this.desserts) {
      let cantidad = a.cantidad
      let mat_fk = a.id
      let mon_fk = a.moneda
      let pro_fk = 30
      let total = a.total
      let valor_unitario = a.unitario
      console.log(cantidad, mat_fk, mon_fk, pro_fk, total, valor_unitario)
      const { data } = await postProyectoMaterial(cantidad, mat_fk, mon_fk, pro_fk, total, valor_unitario)

      console.log(data)
      }
    
    
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
  }
}