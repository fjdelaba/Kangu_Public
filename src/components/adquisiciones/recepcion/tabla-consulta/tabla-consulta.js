/* eslint-disable */

import moment from 'moment'
import {getRecepcionListado} from '../../../../graphql/adquisiciones'
import {creaPdfFactura} from '../../../../utils/pdf-factura-template'


export default {
  components: {
  
  },
  props: {
  
  },
  mounted() {
    console.log('LLamar getRecepciones');
    this.getListadoRecepcion()
    this.datosEmpresa = this.$store.state.app.datosEmpresa;
    console.log('thisdatos empresa',this.$store.state.app.datosEmpresa)
  },
  watch: {
    '$auth.isLoading' (newCount, oldCount) {
      console.log(`tabla consultas - We have ${newCount} fruits now, yay!. ${oldCount}`)
      if(newCount == false){
      
      }
    }
  },
  data() {
    return {
      datosEmpresa:'',
      loadingTabla:false,
      dates: [ this.$moment(new Date()).subtract(30, "days").format('yy-MM-DD').toString(), this.$moment(new Date()).add(1, 'days').format('yy-MM-DD').toString()],
      headers: [
        {
          text: 'Proyecto',
          value: 'oc.pro.nombre',
        },
        { text: 'ID OC', value: 'oc.identificacion' },
        { text: 'ID RECEPCIÓN', value: 'identificacion' },
        { text: 'Proveedor', value: 'oc.ent.razon_social' },
        { text: 'Creado', value: 'fec_recepcion' },
        { text: 'Monto', value: 'monto' },
        { text: 'Acción', value: 'action' },
      ],
      desserts:[],
      filtros:{
        proyectos: [], 
        proveedor: [],// Este filtro no viene desde el modal
      },
      valoresFiltros: {
        _listaProyectos: [],
        _listaProveedor: [], // Este filtro no viene desde el modal
      },
    }
  },
  computed: {
    cpxDatosTabla() {
      return this.desserts.filter(oc => {
        let agregar = true;
        console.log('OC: ', oc);
        if (this.filtros.proyectos.length > 0) {
          agregar = agregar && this.filtros.proyectos.includes(oc.oc.pro.id)
        }
        if (this.filtros.proveedor.length > 0) {
          agregar = agregar && this.filtros.proveedor.includes(oc.oc.ent.id)
        }
        return agregar
      });
    },
    dateRangeText () {
      const datePivot = []
      console.log('this.dates_ ', this.dates);
      for(let fecha of this.dates){
        datePivot.push(this.$moment(fecha).format('DD/MM/yy').toString())
      }
      datePivot.join(' ~ ')
      console.log('datePivot: ', datePivot);
      return datePivot.join(' ~ ')
    },
   
  },
  methods: {
    getFechaFormat(fecha){
      return moment(fecha).format("DD/MM/YYYY")
    },
    async getListadoRecepcion(){
      this.loadingTabla = true
        const {data: { kangusoft_rec_cab } } = await getRecepcionListado();
        console.log('kangusoft_rec_cab',kangusoft_rec_cab)
        for(let item of kangusoft_rec_cab){
          console.log('item: ', item);
            if(item.oc == null || item.oc.oc__view_monto_recepciones_obra == null ){
                item.monto = 0
            }else{
                item.monto = item.oc.oc__view_monto_recepciones_obra.monto_recibido
            }
            
            this.desserts.push(item)
        }
        let proyectos = [... new Set(this.desserts.map(x=> ({nombre: x.oc.pro.nombre, id: x.oc.pro.id})))];
        this.valoresFiltros._listaProyectos = [...new Set(proyectos.map(JSON.stringify))].map(JSON.parse);
        let proveedor = [... new Set(this.desserts.map(x=> ({nombre: x.oc.ent.razon_social, id: x.oc.ent.id})))];
        this.valoresFiltros._listaProveedor = [...new Set(proveedor.map(JSON.stringify))].map(JSON.parse);
        this.loadingTabla = false
        console.log(' this.desserts',this.desserts)
      },
    moment() {
      return moment();
    },
   async descargarDte(item) {
      await creaPdfFactura(item.dte_cab_fk, this.datosEmpresa,1,item.identificacion);
    },
    abrirDetalle(item){
      console.log('object: ', item);
      const path = '/adquisiciones/recepcion/consultar/detalle' 
      this.$router.push({
            path,
            query: { id: Number(item.id),}
        });
     }

  }
}