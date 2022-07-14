<template>
  <v-container>
    <v-card>
      <v-card-title> Informacion General </v-card-title>
      <v-card-text>
        <div class="d-flex flex-column flex-sm-row">
          <div>
            <v-img
              v-model="empresa.logo"
              aspect-ratio="1"
              class="blue-grey lighten-4 rounded elevation-3 mt-2"
              max-width="115"
              max-height="115"
            ></v-img>
            <v-file-input
              accept="image/*"
              label="Logo"
              style="width:150px"
              prepend-icon=""
              dense
            ></v-file-input>
          </div>
          <div class="flex-grow-1 pt-2 pa-sm-2">
            <v-text-field
              v-model="empresa.nombre"
              :readonly="!edicion"
              dense
              label="Nombre"
              placeholder="Nombre"
              outlined
              :rules="usuarioRules.nombreRules"
            >
            </v-text-field>
            <v-row> 
              <v-text-field
                v-model="empresa.rut"
                :readonly="!edicion"
                label="Rut"
                placeholder="12.345.678-9"
                dense
                outlined
                class="pl-3 pr-2"
                :rules="usuarioRules.rutRules"
              >
              </v-text-field>
            
              <v-text-field
                v-model="empresa.representante"     
                :readonly="!edicion"
                label="Representante"
                dense
                outlined
                class="pl-2 pr-3"
                :rules="usuarioRules.representanteRules"
              ></v-text-field>
            </v-row>

            <v-row>
              <v-text-field
                v-model="empresa.telefono"
                :readonly="!edicion"
                label="Telefono"
                dense
                class="pl-3 pr-2"
                outlined
                :rules="usuarioRules.telefonoRules"
              ></v-text-field>
              <v-text-field
                v-model="empresa.email"
                :readonly="!edicion"
                label="Email"
                dense
                class="pl-2 pr-3"
                outlined
                :rules="usuarioRules.emailRules"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-autocomplete
                v-model="empresa.region"
                :readonly="!edicion"
                :items="region"
                :rules="[(v) => !!v || 'La Region es obligatoria']"
                label="Región"
                dense
                class="pl-3 pr-2"
                outlined
                item-text="nombre"
                item-value="id"
                @blur="cargarComuna()"
              ></v-autocomplete>

              <v-autocomplete
                v-model="empresa.comuna"
                :readonly="!edicion"
                :items="comuna"
                :rules="[(v) => !!v || 'La comuna es obligatoria']"
                label="Comuna"
                required
                dense
                class="pl-2 pr-3"
                outlined
                item-text="nombre"
                item-value="id"
              ></v-autocomplete>
            </v-row>
            <v-text-field
              v-model="empresa.direccion"
              :readonly="!edicion"
              label="Dirección"
              placeholder="Dirección"
              dense
              outlined
              :rules="usuarioRules.direccionRules"
            >
            </v-text-field>
            <v-text-field
              v-model="empresa.giro"
              :readonly="!edicion"
              label="Giro"
              dense
              outlined
              :rules="usuarioRules.giroRules"
            ></v-text-field>

            <v-row align="center" justify="space-around">
              <div v-if="!edicion" class="mt-2">
                <v-btn
                  color="primary"
                  small
                  @click="edicion = true"
                >Editar</v-btn>
              </div>
              <div v-if="edicion" class="mt-2">
                <v-btn
                  color="primary"
                  small
                  @click="grabarEdicionEmpresa()"
                >Guardar</v-btn>
                <v-btn
                  color="primary"
                  small
                  @click="cancelarEdicionEmpresa()"
                >Cancelar</v-btn>
              </div>
            </v-row>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-card class="mx-auto mt-3" >
      <v-card-title> Planes </v-card-title>
      <v-row
        v-for="n in 1 "
        :key="n"
        :class="n === 1 ? 'my-1' : ''"
        no-gutters
      >
        <v-col md="4">   
          <v-card class="mx-auto mb-3 py-2" max-width="344">
            <v-img
              src="../assets/images/plan1.png"
              max-height="140px"
              contain
            ></v-img>

            <v-card-title> Plan Básico </v-card-title>
            <v-divider class="mx-5"></v-divider>
            <v-card-text>
              <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus hic amet laudantium labore voluptates, laborum, magnam reprehenderit in corrupti, molestias perferendis repellat! Voluptas aliquam rem illo culpa ab? Molestiae, iure.</div>
            </v-card-text>
             
            <v-card-actions>
              <v-btn color="primary" text> Ver Plan </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text class="font-weight-bold">Cantidad de usuarios: <br><br>Cantidad de usuarios concurrentes: <br><br> Modulos: <br> <br> Precios: </v-card-text>
              </div>
            </v-expand-transition>
            <div 
              class="text-right"
            >
              <v-btn
                text
                color="primary"
                @click="reveal = false"
              >
                Seleccionar
              </v-btn>
            </div>
          </v-card>

        </v-col>
        <v-col md="4"> 
          <v-card class="mx-auto mb-3 py-2" max-width="344">
            <v-img
              class=" m-y 2"
              src="../assets/images/plan2.png"
              height="140px"
              contain
            ></v-img>

            <v-card-title> Plan Intermedio </v-card-title>
            <v-divider class="mx-5"></v-divider>
            <v-card-text>
              <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus hic amet laudantium labore voluptates, laborum, magnam reprehenderit in corrupti, molestias perferendis repellat! Voluptas aliquam rem illo culpa ab? Molestiae, iure.</div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" text> Ver Plan </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="show1 = !show1">
                <v-icon>{{
                  show1 ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show1">
                <v-divider></v-divider>

                <v-card-text class="font-weight-bold"> Cantidad de usuarios: <br><br>Cantidad de usuarios concurrentes: <br><br> Modulos: <br> <br> Precios:</v-card-text>
              </div>
            </v-expand-transition>
            <div 
              class="text-center"
            >
              <v-btn
                text
                color="primary"
                @click="reveal = false"
              >
                Seleccionar
              </v-btn>
            </div>
          </v-card>

        </v-col>
        <v-col md="4"> 
          <v-card class="mx-auto mb-3 py-2" max-width="344">
            <v-img
              
              src="../assets/images/plan3.png"
              height="140px"
              contain
              class=" m-y 2"
            ></v-img>

            <v-card-title> Plan Avanzado </v-card-title>
            <v-divider class="mx-5"></v-divider>
            <v-card-text>
              <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus hic amet laudantium labore voluptates, laborum, magnam reprehenderit in corrupti, molestias perferendis repellat! Voluptas aliquam rem illo culpa ab? Molestiae, iure.</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" text> Ver Plan </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="show2 = !show2">
                <v-icon>{{
                  show2 ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show2">
                <v-divider></v-divider>

                <v-card-text class="font-weight-bold">Cantidad de usuarios: <br><br>Cantidad de usuarios concurrentes: <br><br> Modulos: <br> <br> Precios: </v-card-text>
              </div>
            </v-expand-transition>
           
            <div 
              class="text-center"
            >
              <v-btn
                text
                color="primary"
                @click="reveal = false"
              >
                Seleccionar
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
/* eslint-disable */
import { getEmpresa,getComunas,updateEmpresa } from './../graphql/general'
import { getDatosGenerales } from './../graphql/configuracion'
import { validaRut } from '../../src/utils/index'
export default {
  data() {
    return {
      empresa: {
        id:'',
        nombre: '',
        rut:'',
        email: '',
        telefono: '',
        direccion: '',
        giro: '',
        representante: '',
        logo: '',
        region:'',
        comuna:{
          id:'',
          nombre:''
        },
        select: null
      },
      edicion:false,
      datosEmpresa:'',
      datosUsuario:'',
      usuarioRules: {
        nombreRules: [(v) => !!v || 'Nombre obligatorio'],
        giroRules: [(v) => !!v || 'Giro obligatorio'],
        representanteRules: [(v) => !!v || 'Representante obligatorio'],
        cargoRules: [(v) => !!v || 'Cargo obligatorio'],
        emailRules: [
          (v) => !!v || 'E-mail es obligatorio',
          (v) => /.+@.+\..+/.test(v) || 'E-mail debe ser valido'
          // (v) => getValidaRutEmail(v,'')
        ],
        rutRules: [
          (v) => !!v || 'Rut es obligatorio',
          (v) => validaRut(v) || 'Rut NO valido'
          // (v) => getValidaRutEmail('',v)
        ],
        telefonoRules: [(v) => !!v || 'Telefono obligatorio'],
        direccionRules: [(v) => !!v || 'Direccion obligatorio']
      },
      show: true,
      show1: true,
      show2: true,
      region: [],
      comuna: []
    }

  },
  watch: {
    '$auth.isLoading' (newCount, oldCount) {
      console.log(`Listado - We have ${newCount} fruits now, yay!. ${oldCount}`)
      if (newCount === false) {
        this.datosEmpresa = this.$store.state.app.datosEmpresa
        this.datosUsuario = this.$store.state.app.datosUsuario
        console.log('EMPRESA:',this.datosEmpresa,'USUARIO:',this.datosUsuario)
      }
    }
  },
  mounted() {
    console.log('this.$auth.isLoading: ', this.$auth.isLoading)
    if (this.$auth.isLoading === false) {
      this.datosEmpresa = this.$store.state.app.datosEmpresa
      this.datosUsuario = this.$store.state.app.datosUsuario  
      this.cargarEmpresa()
      this.cargarRegion()
  
    }
    console.log('EMPRESA:',this.datosEmpresa,'USUARIO:',this.datosUsuario)
  },
  methods: {
    async cargarEmpresa() {
      const { data: { kangusoft_emp } } = await getEmpresa(this.datosEmpresa.id)
      console.log('DATA EMP:',kangusoft_emp)
      this.empresa.id = kangusoft_emp[0].id
      this.empresa.nombre = kangusoft_emp[0].nombre
      this.empresa.rut =  kangusoft_emp[0].rut
      this.empresa.email = kangusoft_emp[0].email
      if(kangusoft_emp[0].giro == null){
        this.empresa.giro = 'Sin Giro'
      }else{
        this.empresa.giro = kangusoft_emp[0].giro
      }
      this.empresa.representante = kangusoft_emp[0].representante
      this.empresa.telefono = kangusoft_emp[0].telefono
      this.empresa.logo = kangusoft_emp[0].logo
      this.empresa.direccion = kangusoft_emp[0].direccion
      this.empresa.region = kangusoft_emp[0].com.prov.reg
      this.empresa.comuna.id = kangusoft_emp[0].com.id
      this.empresa.comuna.nombre = kangusoft_emp[0].com.nombre
      this.comuna.push({id:this.empresa.comuna.id , nombre: this.empresa.comuna.nombre})
    },
    async cargarRegion(){
      const {
        data: {
          kangusoft_reg,
        },
      } = await getDatosGenerales();
      console.log("REGION:",kangusoft_reg)
      for (let region of kangusoft_reg) {
        this.region.push({ id: region.id, nombre: region.nombre });
      }
       this.region = this.region.sort(function (a, b) {
        if (a.nombre > b.nombre) {
          return 1
        }
        if (a.nombre < b.nombre) {
          return -1
        }
        if (a.nombre == b.nombre) {
          return 0
        }
      })
    },
     cancelarEdicionEmpresa() {
      this.edicion = false
      this.cargarEmpresa()
    },
     async grabarEdicionEmpresa(){
      try {
        console.log("HOLA")
        const resp = await updateEmpresa(this.empresa.id,this.empresa.direccion,this.empresa.email,this.empresa.giro,this.empresa.nombre,this.empresa.representante,this.empresa.rut,this.empresa.telefono,this.empresa.comuna)
        console.log('resp datos contacto: ', resp)
        this.edicion = false
      } catch (error) {
        console.log('error: ', error)
      }
    },
    async cargarComuna(){
      const {
        data: { kangusoft_prov },
      } = await getComunas(this.empresa.region);
      console.log("COMUNAS:",kangusoft_prov)
       for (let prov of kangusoft_prov) {
        for (let com of prov.coms) {
          console.log("coms", com);
          this.comuna.push({ id: com.id, nombre: com.nombre });
        }
       }
       this.comuna = this.comuna.sort(function (a, b) {
        if (a.nombre > b.nombre) {
          return 1
        }
        if (a.nombre < b.nombre) {
          return -1
        }
        if (a.nombre == b.nombre) {
          return 0
        }
      })
    }
  }
}
</script>
