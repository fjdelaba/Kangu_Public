/* eslint-disable */


export default {
    components: {
      },
    mounted() {
    },
    data() {
      return {
        cantidad:"",
        headers: [
            {
              text: "Material",
              align: "start",
              sortable: false,
              value: "mat",
              width: "400px",
            },
            // { text: 'C.C', value: 'oc_det_pars', sortable: false, width: '200px' },
            {
              text: "Cant.",
              value: "cantidad",
              width: "100px",
              sortable: false,
              align: "center",
            },
           
             { text: 'Acciones', value: 'actions',width: "100px",
             sortable: false,
             align: "center", }
          ],
          materiales:[{
            mat:'Foco Panel Slim Cuadrado 12w, Smd 2835 170*170*12mm, 3000k, 900lm'
          }]
      };
    },
    methods: {}
}