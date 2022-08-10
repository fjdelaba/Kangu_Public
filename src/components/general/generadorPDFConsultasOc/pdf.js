/* eslint-disable */
import html2pdf from 'html2pdf.js'
import { getPermisos, getUsuarioLogin } from '../../../graphql/configuracion'
export{}

export default {

  components: {

  },
  props: {
   
  },
  props: {
    fechas: '',
    oc:[],
    tipo:[]
  },

  data() {
    return {
      datosEmpresa:'',
      datosUsuario:'',
      usuarioLogeado:'',
      logo:'',
      consultasOC:[],
      estadoOC:'Aprobado'
    };
  },
  methods: {
    verPdf(act){
      this.consultasOC = []
      console.log("ACT",act)
    
      for(let oc of this.oc){
        console.log("aa",oc)
        this.consultasOC.push(oc)
      }
      for(let est of this.tipo){
        console.log("estado",est)
        if(est == '1'){
          this.estadoOC = 'En Aprobacion'
        }
        if(est == '2'){
          this.estadoOC = 'Aprobado'
        }
        if(est == '3'){
          this.estadoOC = 'Rechazado'
        }
      }
     
        let tablaOc = document.getElementById('consultasOC')
        let cuerpoTabla = document.createElement('tbody')
        let options = { style: 'currency', currency: 'CLP' }
        let formatoCL = new Intl.NumberFormat('es-CL', options)
        this.consultasOC.forEach(p => {
            let fila = document.createElement('tr')
            let td =  document.createElement('td')
            td.innerText = p.pro_nombre
            fila.appendChild(td)
  
            td =  document.createElement('td')
            td.innerText = p.identificacion
            fila.appendChild(td)
  
            td =  document.createElement('td')
            td.innerText = p.oc_nombre
            fila.appendChild(td)
  
            td =  document.createElement('td')
            td.innerText = p.razon_social
            fila.appendChild(td)
  
            td =  document.createElement('td')
            td.innerText = p.usu_nombre +' '+ p.usu_apellidos
            fila.appendChild(td)
  
            td =  document.createElement('td')
            td.innerText = formatoCL.format(p.neto)
            fila.appendChild(td)
           
            cuerpoTabla.appendChild(fila)
            
        });
        tablaOc.appendChild(cuerpoTabla)
    },
    async cargarUsuarioLogin() {
      const usuarioLogin = await getUsuarioLogin(this.$store.state.app.datosUsuario.user_id)

      console.log('usuarioLogin: ', usuarioLogin.data.kangusoft_usu[0])
this.usuarioLogeado =  usuarioLogin.data.kangusoft_usu[0]
    }, 
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
    this.cargarUsuarioLogin()
    if (this.$auth.isLoading == false) {
      this.datosEmpresa = this.$store.state.app.datosEmpresa;
      this.datosUsuario = this.$store.state.app.datosUsuario;
      this.logo =   this.datosEmpresa.logo
    }
    console.log("EMPRESA:", this.datosEmpresa, "USUARIO:", this.datosUsuario);
  
    
   
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
