/* eslint-disable */
import {getDatosMateriales,insertMaterial} from '../../../graphql/general.js'

export default {
    name: 'ModalEntidad',
    props: {
      cerrarDialog: { type: Function },
      material:{
          type: String
      }
    },
    data() {
      return {
       
          nombreMat: '',
        listaFamilia:[],
        selectionFamilia:'',
        selectionUnidad:'',
        listaUnidad:[],
        usu_id:'',
        valid: true,
        rules:{
            mat:{
              fam:[
                (v) => !!v || 'Debes seleccionar una Familia'
              ],
              unidad: [(v) => !!v || 'Debes seleccionar una Unidad'],
            },
          },
      }
    },
    mounted(
    ) {
        this.cargarDatosMat()
        this.nombreMat = this.material
        this.usu_id = this.$store.state.app.datosUsuario.user_id
    },
    methods: {
   
      cerrarDialogMat() {
        this.cerrarDialog()
        this.nombreMat = ''
        this.selectionFamilia = '',
        this.selectionUnidad= ''
      }, 
      async cargarDatosMat() {
      
        const { data } = await getDatosMateriales(this.$store.state.app.datosEmpresa.id)
        for(let fam of data.kangusoft_mat_fam){
            this.listaFamilia.push(fam)
        }
        for(let uni of data.kangusoft_mat_uni){
            this.listaUnidad.push(uni)
        }
        console.log('data',data)

      },
      async grabarMaterial(){
        if (!this.$refs.formMaterial.validate()) {
            return
          }
          let emp_fk = this.$store.state.app.datosEmpresa.id
          let mat_fam_fk = this.selectionFamilia
          let tipo_creacion = 'M'
          let mat_uni_fk = this.selectionUnidad
          let nombre = this.nombreMat
          let usu_fk = this.$store.state.app.datosUsuario.user_id
          
        const { data } = await insertMaterial(emp_fk, mat_fam_fk,mat_uni_fk,tipo_creacion,nombre,usu_fk)
        console.log('resp',data)
        this.$toast.success('Se completo con exito esta acción', {
            tposition: 'top-right',
            timeout: 5000,
            pauseOnHover: true
          })
          this.cerrarDialogMat()
      }
    }
  }   