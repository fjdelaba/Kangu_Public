/* eslint-disable */
export default {
  mounted() {
   
  },
  props: {
    mantenedores: Array,
    lista: Array,
  },
  data() {
    return {
      nombreMantenedor: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Nombre", value: "nombre" },
        { text: "Activo", value: "activo" },
        { text: "Accion", value: "actions", sortable: false },
      ],
      dialog: false,
      dialogDelete: false,

    
      editedIndex: -1,
      editedItem: {
        nombre: "",
      
      },
    
    };
  },
  computed: {
    tituloMantenedor() {
      this.nombreMantenedor = this.$parent.$refs.botonMantenedor.mantenedorSelec.nombre
      return this.nombreMantenedor;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
  
  },

  methods: {
    editItem(item) {
     
      this.editedIndex = this.lista.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      console.log("item:", item)
      console.log("dialog:", this.dialog)
    },
  
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.lista[this.editedIndex], this.editedItem);
      } else {
        this.lista.push(this.editedItem);
      }
      this.close();
    },
  },
};
