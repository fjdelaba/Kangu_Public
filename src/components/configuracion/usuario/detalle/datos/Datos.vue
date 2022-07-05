<template>
  <div class="my-2">
    <div>
      <v-card>
        
        <!-- <v-card-title>Información del usuario</v-card-title> -->
        <v-card-text>
          <div class="d-flex flex-column flex-sm-row">
            <div>
              <v-img
                :src="user.avatar"
                aspect-ratio="1"
                class="blue-grey lighten-4 rounded elevation-3"
                max-width="90"
                max-height="90"
              ></v-img>
              <v-file-input
                accept="image/*"
                label="Avatar"
                style="width:120px"
                prepend-icon=""
                dense
              ></v-file-input>
              <v-img
                :src="user.avatar"
                aspect-ratio="1"
                class="blue-grey lighten-4 rounded elevation-3 mt-4"
                max-width="90"
                max-height="90"
                dense
              ></v-img>
              <v-file-input
                accept="image/*"
                label="Firma"
                style="width:120px"
                prepend-icon=""
              ></v-file-input>
            </div>
            <div class="flex-grow-1 pt-2 pa-sm-2">
            
              <v-text-field
                v-model="user.nombre"
                dense
                label="Nombre"
                placeholder="Nombre"
                :readonly="!edicion"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="user.apellidos"
                label="Apellido"
                placeholder="Apellido Paterno"
                :readonly="!edicion"
                dense
                outlined
              ></v-text-field>
              <v-text-field
                v-model="user.rut"
                label="Rut"
                placeholder="12.345.678-9"
                :readonly="!edicion"
                dense
                outlined
              ></v-text-field>
              <v-text-field
                v-model="user.cargo"
                label="Cargo"
                :readonly="!edicion"
                dense
                outlined
              ></v-text-field>
              <v-text-field
                v-model="user.email"
                label="Email"
                :readonly="!edicion"
                dense
                outlined
              ></v-text-field>
              <v-text-field
                v-if="false"
                v-model="user.clave"
                type="password"
                label="Clave"
                readonly
              ></v-text-field>
              <v-text-field
                v-if="false"
                v-model="user.clave2"
                type="password"
                label="Confirmar clave"
                readonly
              ></v-text-field>
            
              <!-- <div class="d-flex flex-column">
                <v-checkbox v-model="user.verified" dense label="Email Verified"></v-checkbox>
                <div>
                  <v-btn 
                    v-if="false"
                  >
                    <v-icon left small>mdi-email</v-icon>Send Verification Email
                  </v-btn>
                </div>
              </div> -->
              <v-row
                align="center"
                justify="space-around"
              >   
                <div v-if="cpxOrigenConfiguracion">
                  <div v-if="edicion" class="mt-2">
                    <v-btn color="primary" small @click="grabarEdicionUsuario()">Guardar</v-btn>
                    <v-btn color="primary" small @click="cancelarEdicionUsuario()">Cancelar</v-btn>
                  </div>
                  <div v-else class="mt-2">
                    <v-btn color="primary" small @click="editarUsuario()">Editar</v-btn>
                  </div>
                  <div v-if="cpxOrigenConfiguracion" class="mt-2">
                    <v-btn
                      :loading="loading4"
                      :disabled="loading4"
                      :color="user.activo ? 'error' : 'success'"
                      small
                      @click="cambiarEstadoUsuario()"
                    > {{ cpxTextoBotonUpdateEstado }}
                      <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>mdi-cached</v-icon>
                        </span>
                      </template></v-btn>
                  </div>
                </div>
              </v-row>             
            </div>
          </div></v-card-text>
      </v-card>

      <v-expansion-panels v-model="panel" multiple class="mt-3">
        <v-expansion-panel v-if="cpxOrigenConfiguracion">
          <v-expansion-panel-header class="title">Permisos</v-expansion-panel-header>
          
          <v-expansion-panel-content>
            <v-row
              v-for="n in 1 "
              :key="n"
              :class="n === 1 ? 'my-1' : ''"
              no-gutters
            >
              <v-col md="4">     
                <v-card
                  :loading="loadingPermisos"
                  :disabled="editarPanelPermisos"
                  class="mx-2"
                  max-width="400"
                  outlined
                  tile
                >
                  <v-card-subtitle class="grey lighten-3">Panel de configuración</v-card-subtitle>
                  <v-container class="grey lighten-4">
  
                    <v-switch
                      v-model="permisoCentroGestion"
                      :label="`Centro de Gestión`"
                      inset
                      dense
                    ></v-switch>
                    <v-switch
                      v-model="permisoMateriales"
                      :label="`Maestro de recursos`"
                      inset
                      dense
                    ></v-switch>
                    <v-switch
                      v-model="permisoEntidadExterna"
                      :label="`Entidad Externa`"
                      inset
                      dense
                    ></v-switch>
                    <v-switch
                      v-model="permisoUsuario"
                      inset
                      dense
                      :label="`Usuarios`"
                    ></v-switch>
                    <v-switch
                      v-model="permisoMantenedores"
                      inset
                      dense
                      :label="`Mantenedores`"
                    ></v-switch>
                  </v-container>
                </v-card>
              </v-col>
              <v-col md="4"> 
                <v-card
                  :loading="loadingPermisos"
                  :disabled="editarPanelPermisos"
                  class="my-0"
                  max-width="250"
                  outlined="tile"
                >
                  <v-card-subtitle class="grey lighten-3" >Adquisiciones</v-card-subtitle>
                  <v-container class="grey lighten-4">
                    <v-switch
                      v-model="permisoPedidos"
                      label="Pedidos"
                      inset
                      dense
                    ></v-switch>
                    <v-switch
                      v-model="permisoCotizacion"
                      label="Cotización "
                      inset
                      dense
                    ></v-switch>
                    <v-switch
                      v-model="permisoOrdenCompra"
                      label="Orden de compras"
                      inset
                      dense
                    ></v-switch>
                    <v-switch
                      v-model="permisoDespacho"
                      label=" Despacho"
                      inset
                      dense
                    ></v-switch>
                    <v-switch
                      v-model="permisoRecepcion"
                      label=" Recepcion"
                      inset
                      dense
                    ></v-switch>
                  
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
            <v-row
              align="center"
              justify="space-around"
            >   
              <v-btn v-if="editarPanelPermisos" color="primary" small @click="editarPermisos()">Editar Permisos</v-btn>
              <v-btn v-if="!editarPanelPermisos" color="primary" small @click="guardarPermisos()">Guardar Permisos</v-btn>
              <v-btn v-if="!editarPanelPermisos" color="primary" small @click="cancelarEdicionPermisos()">Cancelar Edicion</v-btn>
            </v-row>
          </v-expansion-panel-content>
         
        </v-expansion-panel>

        <v-expansion-panel v-model="panel" multiple class="mt-3">
          <v-expansion-panel-header class="title">Proyectos</v-expansion-panel-header>
          <v-expansion-panel-content class="body-2" >
            <!-- <card-proyecto :proyectos="user.cgs"></card-proyecto> -->
            <v-card
              :loading="loading"
              class=" my-2"
              max-width="200"
            >
              <template slot="progress">
                <v-progress-linear
                  color="deep-gray"
                  height="5"
                  indeterminate
                ></v-progress-linear>
              </template>

              <v-img
                height="140"
                src="https://cache.enlaceinmobiliario.cl/Blog/noticianorteparquebrasilantofagasta_5bd7267aaf69c0.png"
              ></v-img>

              <v-card-title>Remodelación
                <br>Parque Arauco</v-card-title> 
              <v-card-text>
                <div>Mejoras de veredas y áreas exteriores</div>
              </v-card-text>

              <v-divider class="mx-2"></v-divider>

              <v-card-subtitle class="font-weight-black"> Roles (Accesos)</v-card-subtitle>

              <v-card-text>
                <v-chip-group
                  v-model="selection"
                  active-class="deep-gray accent-4 white--text"
                  column
                >
                  <center>
                    <v-chip >
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
              
                            color="green darken-1"
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            mdi-cash
                          </v-icon>
                        </template>
                        <span>Comprador</span>
                      </v-tooltip></v-chip>

                    <v-chip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            color="blue darken-4"
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            mdi-check-circle
                          </v-icon>
                        </template>
                        <span>Aprobador</span>
                      </v-tooltip></v-chip>

                    <v-chip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            color="black darken-1"
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            mdi-account
                          </v-icon>
                        </template>
                        <span>Solicitante</span>
                      </v-tooltip></v-chip>
                  </center>

                </v-chip-group>
              </v-card-text>
            </v-card> 
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels></div>
    <v-row justify="center">
      <v-dialog
        v-model="dialogDesactivar"
        persistent
        max-width="500"
      >
        <v-card>
          <v-card-title class="text-h5">
            ¿Deseas deshabilitar este usuario?
          </v-card-title>
          <v-card-text>Esta accion tiene efecto inmediato en la aplicion. Si este usuario esta usando la app, sera redirigido al login.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="dialogDesactivar = false"
            >
              NO
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="deshabilitarUsuario()"
            >
              Si
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>

// import CardProyecto from '../../../components/configuracion/usuario/card-proyecto/CardProyecto.vue'
import { setTimeout } from 'optimism'
import CardProyecto from '../../../../configuracion/usuario/card-proyecto/CardProyecto.vue'
import { updateEstadoUsuario } from '../../../../../graphql/configuracion'
export default {
  components: {
    
  },
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    origen:{
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      panel: [-1],

      permisoCentroGestion: false,
      permisoMateriales: false,
      permisoEntidadExterna: false,
      permisoUsuario: false,
      permisoMantenedores: false,
      permisoPedidos: false,
      permisoCotizacion: false,
      permisoOrdenCompra: false,
      permisoDespacho: false,
      permisoRecepcion: false,

      deleteDialog: false,
      disableDialog: false,
      edicion: false,
      respaldoUsuario: {},
      dialogDesactivar:false,
      loadingPermisos: false,
      loading4: false,
      loader:null,

      editarPanelPermisos: true
    }
  },
  computed: {
    cpxAsignarPermisos() {
      return this.user
    },
    cpxTextoBotonUpdateEstado() {
      return this.user.activo ? 'Deshabilitar Usuario' : 'Habilitar Usuario'
    },
    cpxOrigenConfiguracion() {
      return this.origen === 1 // origen es configuracion ?
    }
  },
  mounted() {
    setTimeout(() => {
      this.asignarPermisos()  
    }, 1500)
    console.log('Mounted DATOS USUARIO: ', this.user)
    
    // this.asignarPermisos()
  },
  methods: {
    editarPermisos() {
      this.editarPanelPermisos = false
    },
    guardarPermisos() {
      this.editarPanelPermisos = true
    },
    cancelarEdicionPermisos() {
      this.editarPanelPermisos = true
    },
    asignarPermisos() {
      console.log('this user en datps: ', this.user.usu_mods)
      for (const per of this.user.usu_mods) {
        if (per.mod_fk === 1) { // Pedido
          this.permisoPedidos = true
        }
        if (per.mod_fk === 2) { // Cotizacion
          this.permisoCotizacion = true
        }
        if (per.mod_fk === 3) { // Orden de compra
          this.permisoOrdenCompra = true
        }
        if (per.mod_fk === 4) { // Despacho
          this.permisoDespacho = true
        }
        if (per.mod_fk === 5) { // Recepcion
          this.permisoRecepcion = true
        }
        if (per.mod_fk === 6) { // Proveedores
          this.permisoEntidadExterna = true
        }
        if (per.mod_fk === 7) { // Proyectos 
          this.permisoCentroGestion = true
        }
        if (per.mod_fk === 8) { // Materiales
          this.permisoMateriales = true
        }
        if (per.mod_fk === 9) { // Usuarios
          this.permisoUsuario = true
        }
        if (per.mod_fk === 10) { // Mantenedores
          this.permisoMantenedores = true
        }
      }

    },
    cancelarEdicionUsuario() {
      this.user = JSON.parse(JSON.stringify(this.respaldoUsuario))
      this.edicion = false
      
    },
    editarUsuario() {
      this.respaldoUsuario = JSON.parse(JSON.stringify( this.user))
      this.edicion = true
    },
    grabarEdicionUsuario() {
      console.log('grabar: ')
      this.edicion = false
    },
    cambiarEstadoUsuario() {
      if (this.user.activo) {
        this.dialogDesactivar = true
      } else {
        console.log('else')
        this.user.activo = !this.user.activo
      }
    },
    async deshabilitarUsuario() {
      this.loading4 = true
      this.loader = true
      this.dialogDesactivar = false
      console.log(this.user, this.$store.state.app.datosEmpresa.id)
      try {
        const resp = await updateEstadoUsuario(this.user.id, false)

        console.log('resp datos usuario: ', resp)
        this.user.activo = !this.user.activo
        console.log('deshabilitar')
        this.$notify({
          group: 'foo',
          title: 'Edicion de usuario',
          text: 'Los datos fueron actualizados exitosamente',
          type: 'success'
        })
      } catch (error) {
        this.$notify({
          group: 'foo',
          title: 'Edicion de usuario',
          text: 'Error al grabar los datos, comuniquese con soporte',
          type: 'error'
        })
        console.log('error: ', error)
      }
      this.loader = null
      this.loading4 = false
      
    }
  }
}
</script>
<style scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>