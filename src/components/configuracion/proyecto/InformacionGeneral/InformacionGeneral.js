/* eslint-disable */
import {getComunas,getProveedores} from "../../../../graphql/general.js"
import {getDatosGenerales}  from "../../../../graphql/configuracion.js"
import { postProyectoInformacion } from '../../../../graphql/configuracion.js'

export default { 
 
  data() {
    return { 
      idProyecto:'',
      isLoading: false,
      search: null,
      proyectoRules: [
        (v) => !!v || 'Este Campo es Obligatorio'
      ],
      celulasRules: [
        (v) => !!v || 'Selecciona 1 Unidad como minimo'
      ],
      select: ["Vuetify", "Programming"],
      items: ["Programming", "Design", "Vue", "Vuetify"],
      headers: [
        {
          text: "Codigo",
          align: "start",
          sortable: false,
          value: "n",
        },
        { text: "Nombre", value: "name" },
        { text: "Cantidad", value: "fat" },
        { text: "Unidad Formato", value: "u" },
        { text: "Valor Unitario", value: "f" },
        { text: "Valor Total", value: "t" },
        { text: "% del Presupuesto", value: "carbs" },
      ],
      desserts: [
        {
          name: "Casco Rojo",
          n: 4132,
          fat: "145",
          carbs: "55%",
          u: "UNIDAD",
          f: "$890",
          t: "$19202",
        },
      ],
      editedIndex: -1,
      usuario: {
        firma: "",
      },
      
      infoGeneralProyecto: {
        nombre: "",
        codigo: "",
        celulas: "",
        valorC: "",
        presupuestoObra: "",
        estado: "",
        monedaGeneral: "",
        flag: "",
        monedaPersonalizada: "",
        ocInicial: "",
        descripcion: "",
        imagen: "",
      },
      infoDireccionProyecto: {
        region: "",
        comuna: "",
        direccion: "",
      },
      infoMandanteProyecto: {
        mandante: "",
      },
      listaMonedas: [],
      listaCelulas: [],
      listaEstados: [],
      listaFlags: [],
      listaRegion: [],
      listaComunas: [],
      listaUsuarios:[],
      listaMandante:[],
      a: [],
      usuLogin: "",
      fecha: "",
      aut0: "",
      usuarioAdministrador:'',
    };
  },
  mounted() {
    this.cargarInformacionGeneral()
    this.aut0 = 1;
    this.usuLogin = 1;
    this.fecha = this.$moment(new Date()).format();
 
  },
  methods: {
    fetchEntriesDebounced() {
      clearTimeout(this._timerId)
    
      this._timerId = setTimeout(() => {
        this.buscarProveedor()
      }, 1000)
    },
    async buscarProveedor() {
      const { data } = await getProveedores(`%${this.search}%`)

      this.isLoading = false
      this.listaMandante = data.kangusoft_ent
      console.log('search data: ', data)
    },
     
    unirNombreApellido(item){
     return item.nombre +' '+ item.apellidos
    },

    previewFirma() {
      this.url2 = URL.createObjectURL(this.usuario.firma);
    },
    eliminarFirma() {
      this.url2 = null;
    },
    async cargarComunas(){
      const { data : {kangusoft_prov}} = await getComunas(this.infoDireccionProyecto.region)
      for(let prov of kangusoft_prov){
        for(let com of prov.coms){
          console.log("coms",com)
          this.listaComunas.push({id:com.id,nombre:com.nombre})
        }
      }

    },
    async cargarInformacionGeneral() {
      const { data: {kangusoft_emp_mon,kangusoft_fla,kangusoft_pro_est,kangusoft_pro_uni,kangusoft_reg,kangusoft_usu} } = await getDatosGenerales()
      for(let mon of kangusoft_emp_mon){
        this.listaMonedas.push({id:mon.mon.id,nombre:mon.mon.nombre})
      }
      for(let flag of kangusoft_fla){
        this.listaFlags.push({id:flag.id,nombre:flag.nombre})
      }
      for(let estado of kangusoft_pro_est){
        this.listaEstados.push({id:estado.id,nombre:estado.nombre})
      }
      for(let uni of kangusoft_pro_uni ){
         this.listaCelulas.push({id:uni.id,nombre:uni.nombre})
      }
      for(let region of kangusoft_reg){
        this.listaRegion.push({id:region.id,nombre:region.nombre})
      }
      for(let usu of kangusoft_usu){
        this.listaUsuarios.push({id:usu.id,nombre:usu.nombre, apellidos:usu.apellidos})
      }
    }, 

    async guardarInformacion() {
      let finalCelulas =[]
      let finalFlag = []
      let inf = {
          emp_fk: this.aut0,
          nombre: this.infoGeneralProyecto.nombre,
          pro_est_fk: this.infoGeneralProyecto.estado,
          valor_contractual: Number(this.infoGeneralProyecto.valorC),
          com_fk: this.infoDireccionProyecto.comuna,
          direccion: this.infoDireccionProyecto.direccion,
          ent_fk: this.infoMandanteProyecto.mandante.id,
          usu_fk: this.usuLogin,
          inicio_oc: Number(this.infoGeneralProyecto.ocInicial),
          codigo: this.infoGeneralProyecto.codigo,
          mon_fk: this.infoGeneralProyecto.monedaGeneral,
          descripcion: this.infoGeneralProyecto.descripcion,
          presupuesto: Number(this.infoGeneralProyecto.presupuestoObra),
          adm_obra_fk: this.usuarioAdministrador.id
        }
        console.log("inf:",inf)
      for (let b of this.infoGeneralProyecto.celulas) {
        finalCelulas.push({pro_uni_fk:b})}
      for (let a of this.infoGeneralProyecto.flag) {
        finalFlag.push({fla_fk:a});
      }
      console.log("cel",finalCelulas)
      console.log("flag:",finalFlag)
      const { data } = await postProyectoInformacion(inf,finalFlag,finalCelulas)
      console.log(data)
      this.idProyecto = data.insert_pro_informacion.id_proyecto_
      this.$emit("guardarInformacion", this.idProyecto)
      console.log("this id", this.idProyecto)
    },
  },
  watch: {
    async search (val) {
      if (this.isLoading) return
      this.isLoading = true
      this.fetchEntriesDebounced()
    }
  }
};
