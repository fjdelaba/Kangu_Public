<template>
  <v-container>
    <v-card>
      <v-card-title> Informacion General </v-card-title>
      <v-card-text>
        <div class="d-flex flex-column flex-sm-row">
          <div>
            <v-img
              
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
              v-model="usuario.nombre"
              dense
              label="Nombre"
              placeholder="Nombre"
              outlined
              :rules="usuarioRules.nombreRules"
            >
            </v-text-field>
            <v-row> 
            <v-text-field
              label="Rut"
              placeholder="12.345.678-9"
              dense
              outlined
              class="pl-3 pr-2"
              :rules="usuarioRules.rutRules"
            >
            </v-text-field>
            
             <v-text-field     
              v-model="usuario.representante"
              label="Representante"
              dense
              outlined
              class="pl-2 pr-3"
              :rules="usuarioRules.representanteRules"
            ></v-text-field>
            </v-row>

            <v-row>
            <v-text-field
              v-model="usuario.telefono"
              label="Telefono"
              dense
              class="pl-3 pr-2"
              outlined
              :rules="usuarioRules.telefonoRules"
            ></v-text-field>
            <v-text-field
              v-model="usuario.email"
              label="Email"
              dense
              class="pl-2 pr-3"
              outlined
              :rules="usuarioRules.emailRules"
            ></v-text-field>
            </v-row>

            <v-row>
            <v-select
              :items="items"
              :rules="[(v) => !!v || 'La Region es obligatoria']"
              label="Región"
              dense
              class="pl-3 pr-2"
              outlined
            ></v-select>
            
            <v-select
              :items="items2"
              :rules="[(v) => !!v || 'La comuna es obligatoria']"
              label="Comuna"
              required
              dense
              class="pl-2 pr-3"
              outlined
            ></v-select>
            </v-row>
             <v-text-field
              v-model="usuario.direccion"
              label="Dirección"
              placeholder="Dirección"
              dense
              outlined
              :rules="usuarioRules.direccionRules"
            >
            </v-text-field>
            <v-text-field
              v-model="usuario.giro"
              label="Giro"
              dense
              outlined
              :rules="usuarioRules.giroRules"
            ></v-text-field>

            <v-row align="center" justify="space-around">
              <div class="mt-2">
                <v-btn
                  color="primary"
                  small
                  @click="editarUsuario()"
                >Editar</v-btn>
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
             class="text-center">
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
             class="text-center">
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
             class="text-center">
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
import { validaRut } from '../../src/utils/index'
export default {
  data() {
    return {
      usuario: {
        nombre: '',
        rut:'',
        email: '',
        telefono: '',
        direccion: '',
        giro: '',
        repesentante: '',
        logo: '',
        select: null
      },
    
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
      items: ['Región de Arica y Parinacota','Región de Tarapacá','Región de Antofagasta','Región de Atacama','Región de Coquimbo','Región de Valparaíso','Región Metropolitana de Santiago','Región del Libertador General Bernardo OHiggins','Región del Maule','Región del Biobío','Región de La Araucanía','Región de Los Ríos','Región de Los Lagos','Región de Aysén del General Carlos Ibáñez del Campo','Región de Magallanes y de la Antártica Chilena'
      ]
    }

  }
}
</script>
