/* eslint-disable */

import moment from 'moment'
import {getRecepcionListado} from '../../../../graphql/adquisiciones'


export default {
  components: {
  
  },
  props: {
  
  },
  mounted() {
    this.getListadoRecepcion()
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
      dates: [ this.$moment(new Date()).subtract(30, "days").format('yy-MM-DD').toString(), this.$moment(new Date()).add(1, 'days').format('yy-MM-DD').toString()],
    }
  },
  computed: {
    // cpxDatosTabla() {
    //   return this.ocs.filter(oc => {
    //     let agregar = true;
    //     console.log('OC: ', oc);
    //     if (this.filtros.estados.length > 0) {
    //       console.log("oc.est_doc_fk.est",oc.est_doc_fk)
    //       agregar = agregar && this.filtros.estados.includes(oc.est_doc_fk)
    //     }
    //     if (this.filtros.monedas.length > 0) {
    //       agregar = agregar && this.filtros.monedas.includes(oc.mon_fk)
    //     }
    //     if (this.filtros.despachos.length > 0) {
    //       agregar = agregar && this.filtros.despachos.includes(oc.des_tip_fk)
    //     }
    //     if (this.filtros.formasPago.length > 0) {
    //       agregar = agregar && this.filtros.formasPago.includes(oc.for_pag_fk)
    //     }
    //     if (this.filtros.estadoLineas.length > 0) {
    //       agregar = agregar && this.filtros.estadoLineas.includes(oc.est_lin_fk)
    //     }
    //     if (this.filtros.tiposDocumento.length > 0) {
    //       agregar = agregar && this.filtros.tiposDocumento.includes(oc.doc_tip_fk)
    //     }
    //     if (this.filtros.proyectos.length > 0) {
    //       agregar = agregar && this.filtros.proyectos.includes(oc.pro_fk)
    //     }
    //     if (this.filtros.proveedores.length > 0) {
    //       agregar = agregar && this.filtros.proveedores.includes(oc.ent_fk)
    //     }
    //     if (this.filtros.compradores.length > 0) {
    //       agregar = agregar && this.filtros.compradores.includes(oc.usu_fk)
    //     }
    //     return agregar;
    //   });
    // },
    // cpxMostrarBadge(){
    //   return this.filtros.estados.length > 0 || this.filtros.monedas.length > 0 || this.filtros.despachos.length > 0 || this.filtros.formasPago.length > 0
    //   || this.filtros.estadoLineas.length > 0 || this.filtros.tiposDocumento.length > 0
    // },
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
        const {data: { kangusoft_rec_cab } } = await getRecepcionListado();
        console.log('kangusoft_rec_cab',kangusoft_rec_cab)
      },
    moment() {
      return moment();
    },
    abrirDetalle(item){
      console.log('object: ', item);
      const path = this.origen === 1 ? '/adquisiciones/oc/aprobar/detalle/' : '/adquisiciones/oc/consultar/detalle/'
      this.$router.push({
            path,
            query: { id: Number(item.id),}
        });
     }

  }
}