/* eslint-disable */
import html2pdf from 'html2pdf.js'

export{}

export default {

  components: {

  },
  props: {
   
  },
  props: {
    materiales: [],
    cabecera: {},
    observacion: "",

    tipo_documento: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      datosEmpresa:'',
      logo:'',
      materialesPDF:[]
    };
  },
  methods: {

    exportToPDF() {
    
        html2pdf(this.$refs.download, {
          margin: 0.3,
          filename: 'filename.pdf',
          image: { 
            type: 'jpeg', 
            quality: 0.98 
          },
          html2canvas: { 
            scale: 3
          },
          jsPDF: { 
            unit: 'in', 
            format: 'a3', 
            orientation: 'portrait' 
          }
        })
        
      },
   
  },
  mounted() {
    if (this.$auth.isLoading == false) {
      this.datosEmpresa = this.$store.state.app.datosEmpresa;
      this.datosUsuario = this.$store.state.app.datosUsuario;
      this.logo =   this.datosEmpresa.logo
    }
    console.log("EMPRESA:", this.datosEmpresa, "USUARIO:", this.datosUsuario);
  
    for(let mat of this.materiales){
      console.log("aa",mat)
      this.materialesPDF.push(mat)
    }
    if(this.materialesPDF.length > 0){
      let tablaMateriales = document.getElementById('materialesPDF')
      let cuerpoTabla = document.createElement('tbody')
  
      this.materialesPDF.forEach(p => {
          let fila = document.createElement('tr')
          let td =  document.createElement('td')
          td.innerText = p.mat.nombre
          fila.appendChild(td)

          td =  document.createElement('td')
          td.innerText = p.mat.mat_uni.nombre
          fila.appendChild(td)

          td =  document.createElement('td')
          td.innerText = p.cantidad
          fila.appendChild(td)

          td =  document.createElement('td')
          td.innerText = p.precio_unitario
          fila.appendChild(td)

          td =  document.createElement('td')
          td.innerText = p.total
          fila.appendChild(td)
          cuerpoTabla.appendChild(fila)
          
      });
      tablaMateriales.appendChild(cuerpoTabla)
     
    }
   
  },
  watch: {
    "$auth.isLoading"(newCount, oldCount) {
      console.log(
        `Listado - We have ${newCount} fruits now, yay!. ${oldCount}`
      );
      if (newCount === false) {
        this.datosEmpresa = this.$store.state.app.datosEmpresa;
        this.datosUsuario = this.$store.state.app.datosUsuario;
        console.log(
          "EMPRESA:",
          this.datosEmpresa,
          "USUARIO:",
          this.datosUsuario
        );
      }
    },
   
  },
  computed: {
    cpxFecha() {
      return this.$moment(new Date()).format("DD/MM/yy");
    },
  },
};
