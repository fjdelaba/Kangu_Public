export default {
  name: 'CuadroResumen',
  props: {
    materiales: {
      Type: Array,
      default: () => ({})
    },
    tipo_documento:{
      type: Number,
      default: 0
    },
    mostrarTiposDocumento:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      totalesHeaders: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          value: 'item',
          width: '100%'
        },
        { text: 'Calories', value: 'valor', width: '100%' }
      ]
    }
  },
  computed: {
    cpxTotalesItems() {
      let neto = 0
      // let iva = 0
      let impuesto = 0
      const retencion = 12.25
      let total = 0
      const descuento = 0
  
      for (const linea of this.materiales) {
        // console.log('linea: ', linea)
        neto += Number(linea.total)
      }
  
      if (this.tipo_documento === 3) { // Factura
        impuesto = neto * 0.19
        total = impuesto + neto
        console.log('FACTURA')
        // console.log(neto, iva, total)
      
        return [
          { item: 'Neto', valor: neto },
          { item: 'IVA (19%)', valor:  Math.abs(impuesto) },
          { item: 'Total', valor: total },
          { item: 'impuesto', valor:  Math.abs(impuesto) }
        ]
      } 
      else if (this.tipo_documento === 4) { // Factura Excenta
        impuesto = 0
        total = impuesto + neto
        console.log('FACTURA Excenta')
        // console.log(neto, iva, total)
      
        return [
          { item: 'Neto', valor: neto },
          { item: 'Excenta', valor:  impuesto },
          { item: 'Total', valor: total },
          { item: 'impuesto', valor: impuesto }
        ]
      }
      else if (this.tipo_documento === 7) { // 7 Boleta ELectronica
        console.log('BOLETA')
        if (this.$store.state.app.tipoBoleta === 1) { // Liquido
          const dif = neto / 0.8775
  
          impuesto = dif - neto
          total = impuesto + neto
        } else if (this.$store.state.app.tipoBoleta === 2) { // Bruto
          const dif = neto * 0.8775
  
          impuesto = dif - neto
          total = impuesto + neto
        }
      
        // console.log(neto, iva, total)
      
        return [
          { item: 'Neto', valor: neto },
          { item: 'Retencion 12,25%', valor: Math.abs(impuesto) },
          { item: 'Total', valor: total },
          { item: 'impuesto', valor:  Math.abs(impuesto) }
        ]
      } else {
        return [
          { item: 'Neto', valor: 1 },
          { item: 'Retencion 12,25%', valor: 1 },
          { item: 'Total', valor: 1 },
          { item: 'impuesto', valor:  1 }
        ]
      }
    },
    cpxTotalesTablaResumen() {
      console.log('this.materiales.length: ', this.materiales )
      if (this.cpxTotalesItems.length === 0)
        return []
  
      const copyCpxTotalesItems = JSON.parse(JSON.stringify(this.cpxTotalesItems))
  
      console.log('copyCpxTotalesItems: ', copyCpxTotalesItems)
      console.log('copyCpxTotalesItems: ', copyCpxTotalesItems)
  
      for (const lineaResumen in copyCpxTotalesItems) {
        console.log('lineaResumen - : ', lineaResumen)
        if (copyCpxTotalesItems[lineaResumen].item === 'impuesto') {
          delete copyCpxTotalesItems[lineaResumen]
        }
      }
      console.log('copyCpxTotalesItems_ ', copyCpxTotalesItems)
        
      return copyCpxTotalesItems
    }
  },
  methods: {
  }
}