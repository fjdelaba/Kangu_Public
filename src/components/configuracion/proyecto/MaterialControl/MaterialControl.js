/* eslint-disable */
import { getMateriales, getMonedas } from "../../../../graphql/general.js";
import {
  postProyectoMaterial,
  getMaterialesProyecto,
} from "../../../../graphql/configuracion.js";
import { isArguments, trimEnd } from "lodash";
export default {
  data() {
    return {
      select: ["Vuetify", "Programming"],
      items: ["Programming", "Design", "Vue", "Vuetify"],
      valid: true,
      rules: {
        material: {
          nombre: [(v) => !!v || "Debes buscar un Material"],
          cantidad: [(v) => !!v || "Debes agregar su Cantidad "],
          unitario: [(v) => !!v || "Debes agregar su Valor"],
          moneda: [(v) => !!v || "Debes agregar su Moneda"],
        },
      },
      loading4: false,
      headers1: [
        { text: "Nombre", value: "mat.nombre" },
        { text: "Unidad Formato", value: "mat.mat_uni.nombre" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Valor Unitario", value: "valor_unitario" },
        { text: "Valor Total", value: "total" },
        { text: "% del Presupuesto", value: "porcentaje" },
      ],
      listaMaterial: [],
      listaMonedas: [],
      isLoading: false,
      monedaSeleccionada: "",
      mostrarNoData: false,
      search: null,
      cargaMasiva: false,
      material: "",
      desserts: [],
      editedIndex: -1,
      materialSeleccionado: {
        mat: {
          mat_uni: {
            nombre: "",
          },
          nombre: "",
        },

        cantidad: "",
        formato: "",
        valor_unitario: "",
        total: "",
        porcentaje: "",
        id: "",
      },
      proyectoSeleccionado: "",
      materialesProyecto: "",
      editarLinea: false,
      idLinea: "",
      alert: false,
    };
  },
  props: {
    id: Number,
    detalle: Boolean,
    idproyecto: Number,
    presupuesto: Number,
  },
  mounted() {
    setTimeout(() => {
      console.log("this.idproyectoSeleccionado", this.idproyecto);
      if (this.detalle == true) {
        this.proyectoSeleccionado = this.idproyecto;
        this.cargarMaterialesProyecto();
      }
    }, 1);
    this.cargarMonedas();

    setTimeout(() => {
      console.log("presupuesto:", this.presupuesto);
    }, 1);
  },
  computed: {
    mergedHeaders() {
      if (this.detalle == true) {
        console.log("normal");
        return [...this.headers1];
      }
      if (this.detalle == false) {
        console.log("agregar actions");
        return [...this.headers1, { text: "Accion", value: "actions" }];
      }
      return this.headers1;
    },

    cpxMostrarAlert() {
      let total = 0;
      for (let mat of this.desserts) {
        total = total + mat.total;
      }
      return total > this.presupuesto;
    },
  },
  methods: {
    editarInformacion() {
      this.detalle = false;
      this.guardarEdicion = true;
      console.log("detalle", this.detalle);
    },
    async cargarMonedas() {
      const { data } = await getMonedas();

      this.listaMonedas = data.kangusoft_mon;
    },
    guardarDetalle() {
      this.detalle = true;
      this.guardarEdicion = false;
    },
    async cargarMaterialesProyecto() {
      let total = 0;
      const {
        data: { kangusoft_pro_mat },
      } = await getMaterialesProyecto(this.proyectoSeleccionado);
      console.log("aaa", kangusoft_pro_mat);
      for (let mat of kangusoft_pro_mat) {
        console.log("mat", mat);
        if (this.detalle == true) {
          total = total + mat.total;
          console.log("mat", mat);
          mat.porcentaje = "%" + "" + (100 * mat.total) / this.presupuesto;
          this.desserts.push(mat);
          console.log("desserts", total);
        }
      }
      if (total > this.presupuesto) {
        this.alert = true;
      }
    },
    deleteItem2(item) {
      this.editarLinea = true;
      this.idLinea = item.id;
      console.log("item", item);
    },
    deleteItem3(item) {
      this.desserts.splice(item, 1);
      this.editarLinea = false;
      console.log("item", item);
    },

    cargarMateriales() {
      console.log("PASO POR ACÁ !!!!");
      this.mostrarNoData = false;
      // cancel pending call
      clearTimeout(this._timerId);

      // delay new call 500ms
      this._timerId = setTimeout(() => {
        this.buscarMaterial();
      }, 1000);
      this.isLoading = false;
    },
    async buscarMaterial() {
      const { data } = await getMateriales(`%${this.search}%`);

      this.listaMaterial = data.kangusoft_mat;

      if (this.listaMaterial.length === 0) {
        this.mostrarNoData = true;
      }
      console.log("this.listaMaterial: ", this.listaMaterial);
    },
    deleteItem1(item) {
      this.editarLinea = false;
      item.total = item.valor_unitario * item.cantidad;
      item.porcentaje = "%" + (100 * item.total) / this.presupuesto;
    },

    limpiarAutocompleate() {
      setTimeout(() => {
        console.log("PASO POR AQUÍ !!!!");
        this.mostrarNoData = false;
        this.search = "";
      }, 500);
    },
    limpiarMateriales() {
      this.materialSeleccionado = {
        mat: {
          mat_uni: {
            nombre: "",
          },
          nombre: "",
        },
        cantidad: "",
        formato: "",
        valor_unitario: "",
        total: "",
        porcentaje: "",
        moneda: "",
        id: "",
      };
      this.monedaSeleccionada = "";
    },
    guardarNuevoItem() {
      let validado;
      let existeMaterial = false;
      console.log("detalle?", this.detalle);
      this.$refs.material.validate();
      console.log("validacion", this.$refs.material.validate());

      if (this.$refs.material.validate() == true) {
        validado = true;
      } else {
        validado = false;
      }
      console.log("validado", validado);
      if (validado == true) {
        let total = 0;
        this.materialSeleccionado.id = this.listaMaterial[0].id;
        this.materialSeleccionado.mat.nombre = this.material.nombre;
        this.materialSeleccionado.mat.mat_uni.nombre =
          this.material.mat_uni.nombre;
        this.materialSeleccionado.moneda = this.monedaSeleccionada;
        this.materialSeleccionado.total =
          this.materialSeleccionado.valor_unitario *
          this.materialSeleccionado.cantidad;
        this.materialSeleccionado.porcentaje =
          "%" + (this.materialSeleccionado.total * 100) / this.presupuesto;
        total = this.materialSeleccionado.total + total;
        if (total > this.presupuesto) {
          this.alert = true;
        }
        if (this.detalle == true) {
          console.log("entro a if detalle");

          console.log("existe material?", existeMaterial);
          for (let mat of this.desserts) {
            console.log("mat", mat);
            if (this.materialSeleccionado.id == mat.mat_fk) {
              console.log("entre if y este es el material:", mat);
              existeMaterial = true;
            }
          }
          if (existeMaterial) {
            this.$notify({
              group: "foo",
              title: "Guardar Nuevo Material",
              text: "No puedes agregar un material que ya esta agregado",
              type: "error",
            });
          } else {
            this.desserts.push(this.materialSeleccionado);
          }
          this.material = "";
          this.limpiarMateriales();
        }
        if (this.detalle == false) {
          existeMaterial = false;
          if (this.desserts.length == 0) {
            this.desserts.push(this.materialSeleccionado);
            console.log("materiales:",this.desserts)
            this.material = "";
            this.limpiarMateriales();
          } else if( this.desserts.length > 0) {
            for (let mat of this.desserts) {
              console.log("mat", mat);
              if (this.materialSeleccionado.id == mat.id) {
                console.log("entre if y este es el material:", mat);
                existeMaterial = true;
              }
            }
            if (existeMaterial) {
              this.$notify({
                group: "foo",
                title: "Guardar Nuevo Material",
                text: "No puedes agregar un material que ya esta agregado",
                type: "error",
              });
            } else {
              this.desserts.push(this.materialSeleccionado);
            }
            this.material = "";
            this.limpiarMateriales();
          }
        }
      }
    },
    async guardarMateriales() {
      this.loading4 = true    
      for (let a of this.desserts) {
 
        console.log("MATERIALES EN ARREGLO", a);
        let cantidad = a.cantidad;
        let mat_fk = a.id;
        let mon_fk = a.moneda;
        let pro_fk = this.id;
        let total = a.total;
        let valor_unitario = a.valor_unitario;
        console.log(cantidad, mat_fk, mon_fk, pro_fk, total, valor_unitario);
        const { data } = await postProyectoMaterial(
          cantidad,
          mat_fk,
          mon_fk,
          pro_fk,
          total,
          valor_unitario
        );
        
        console.log(data);
       
      }
      this.$notify({
        group: "foo",
        title: "Creacion de Proyecto",
        text: "Se a Creado con Exito tu Proyecto",
        type: "success",
      });
      setTimeout(() => {
        this.loading4 = false
      }, 4000)
      
    },
  },
  watch: {
    async search(val) {
      if (this.isLoading) return;
      if (this.isLoading) return;
      this.isLoading = true;
      this.cargarMateriales();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
};
