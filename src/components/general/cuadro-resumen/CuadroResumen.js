export default {
  name: 'CuadroResumen',
  data() {
    return {
      totalesHeaders: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          value: 'item',
          width: '20%'
        },
        { text: 'Calories', value: 'valor', width: '20%' }
      ]
    }
  },
  computed: {
    cpxTotalesItems() {
    //   let neto = 0
    //   let iva = 0
    //   const retencion = 0
    //   let total = 0
    //   const descuento = 0
  
      //   for (const linea of this.materiales) {
      //     console.log('linea: ', linea)
      //     neto += Number(linea.total)
      //   }
      //   iva = neto * 0.19
      //   total = iva + neto
  
      //   console.log(neto, iva, total)
  
      return [
        { item: 'Neto', valor: 33 },
        { item: 'IVA', valor: 44 },
        { item: 'Total', valor: 55 }
      ]
    }
  }
}