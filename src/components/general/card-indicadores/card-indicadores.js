/* eslint-disable */
import moment from 'moment'
export default {
  components: {

  },
  props: {
   
    label: {
      type: String,
      default: ''
    },
  },
  mounted(){
    this.cargarIndicadores(1)
  },
  data() {
    return {
      daysOfWeek: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      uf:0,
      ufAyer:0,
      usd:0,
      euro:0,
      utm:0,
      mostrarFlecha: true
    }
  },
  methods:{
    async cargarDatosAyer(){
      let ayer = this.$moment().subtract(1, "days").format("DD-MM-YYYY")
      console.log("ayer", ayer) 
      console.log('moment',this.$moment(ayer).format("DD-MM-YYYY") )
      console.log('moment1',this.$moment(ayer).format("MM") )
      console.log('moment2',this.$moment(ayer).format("YYYY") )
      let datos = {
        uf:0,
        dolar:0,
        utm:0,
        euro:0
      }
      return datos
      while (datos.uf === 0) {
        try {          
          const valorUf = await this.axios.get(`https://api.sbif.cl/api-sbifv3/recursos_api/uf/${year}/${month}/dias/${day}?apikey=dac4ee95bba84c11bef280fb75beb5aefc8397a3&formato=json`)  
          
          this.uf = valorUf.data.UFs[0].Valor
        } catch (error) {
          this.uf = 0
        }
      }
      return datos
    },
    async cargarIndicadores(tiempo){ //1 = carga inicial 2 carga date piker
      let datosAyer = await this.cargarDatosAyer()
      
      if(tiempo == 1 || this.$moment(new Date()).format("DD-MM-YYYY") == this.$moment(this.date).format("DD-MM-YYYY")){
        this.mostrarFlecha = true 
      } else {
        this.mostrarFlecha = false
      }
      console.log("fecha", this.date)
      
      let urlUf = ''
      let urlDolar = ''
      let urlEuro = ''
      let urlUtm = ''
    
    //  if(day == dia){
    //    console.log('son iguales')
    //  }else if (day != dia){
    //   console.log('distinto')
    //  }
      if(tiempo == 1){
      
       
        urlUf = 'https://api.sbif.cl/api-sbifv3/recursos_api/uf?apikey=dac4ee95bba84c11bef280fb75beb5aefc8397a3&formato=json'
        urlDolar = 'https://api.sbif.cl/api-sbifv3/recursos_api/dolar?apikey=dac4ee95bba84c11bef280fb75beb5aefc8397a3&formato=json'
        urlEuro = 'https://api.sbif.cl/api-sbifv3/recursos_api/euro?apikey=dac4ee95bba84c11bef280fb75beb5aefc8397a3&formato=json'
        urlUtm = 'https://api.sbif.cl/api-sbifv3/recursos_api/utm?apikey=dac4ee95bba84c11bef280fb75beb5aefc8397a3&formato=json'
     
     
     
      } else if (tiempo == 2){
        let day = moment(this.date).format("D")
        let month = moment(this.date).format("M")
        let year = moment(this.date).format("YYYY")
        urlUf = `https://api.sbif.cl/api-sbifv3/recursos_api/uf/${year}/${month}/dias/${day}?apikey=dac4ee95bba84c11bef280fb75beb5aefc8397a3&formato=json`
        urlDolar = `https://api.sbif.cl/api-sbifv3/recursos_api/dolar/${year}/${month}/dias/${day}?apikey=dac4ee95bba84c11bef280fb75beb5aefc8397a3&formato=json`
        urlEuro = `https://api.sbif.cl/api-sbifv3/recursos_api/euro/${year}/${month}/dias/${day}?apikey=dac4ee95bba84c11bef280fb75beb5aefc8397a3&formato=json`
        urlUtm =`https://api.sbif.cl/api-sbifv3/recursos_api/utm/${year}/${month}?apikey=dac4ee95bba84c11bef280fb75beb5aefc8397a3&formato=json`
        console.log("tiempo2", day,month,year)
        
      }
      console.log('uf',urlUf)
      console.log('dolar',urlDolar)
      console.log('euro',urlEuro)
      console.log('utm',urlUtm)
      try {
        const valorUf = await this.axios.get(urlUf)  
        this.uf = valorUf.data.UFs[0].Valor
      } catch (error) {
        this.uf = 0
      }
      try {
        const valorDolar = await this.axios.get(urlDolar) 
        this.usd = valorDolar.data.Dolares[0].Valor   
      } catch (error) {
        this.usd = 0
      }
      try {
        const valorEuro = await this.axios.get(urlEuro)    
        this.euro = valorEuro.data.Euros[0].Valor
      } catch (error) {
        this.euro = 0
      }
      try {
        const valorUtm = await this.axios.get(urlUtm)    
        this.utm = valorUtm.data.UTMs[0].Valor
      } catch (error) {
        this.utm = 0
      }
  
    },
    getFechaFormat(fecha){
      return moment(fecha).format("DD/MM/YYYY")
    },
    getDay(date) {
      console.log("date:", date);
      let i = new Date(date).getDay(date);
      return this.daysOfWeek[i];
    },
  },
  computed: {
    
   
  }
}