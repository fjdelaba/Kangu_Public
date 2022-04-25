<template>
  <div class="my-2">
    <div>

      <v-card v-if="false" class="warning mb-4" light>
        <v-card-title>User Disabled</v-card-title>
        <v-card-subtitle>This user has been disabled! Login accesss has been revoked.</v-card-subtitle>
        <v-card-text>
          <v-btn dark @click="user.disabled = false">
            <v-icon left small>mdi-account-check</v-icon>Enable User
          </v-btn>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title>Información del usuario</v-card-title>
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
              <v-btn class="mt-1" small>Editar Avatar</v-btn>
            </div>
            <div class="flex-grow-1 pt-2 pa-sm-2">
            
              <v-text-field v-model="user.name" label="Nombre" placeholder="Nombre" readonly ></v-text-field>
              <v-text-field v-model="user.lastname" label="Apellido" placeholder="Apellido Paterno" readonly ></v-text-field>
              <v-text-field v-model="user.rut" label="Rut" placeholder="12.345.678-9" readonly></v-text-field>
              <v-text-field v-model="user.role" label="Cargo" readonly></v-text-field>
              <v-text-field v-model="user.email" label="Email" readonly ></v-text-field>
              <v-text-field v-model="user.clave" type="password" label="Clave" readonly ></v-text-field>
              <v-text-field v-model="user.clave2" type="password" label="Confirmar clave" readonly ></v-text-field>
            
              <div class="d-flex flex-column">
                <v-checkbox v-model="user.verified" dense label="Email Verified"></v-checkbox>
                <div>
                  <v-btn 
                    v-if= 'false' >
                    <v-icon  left small>mdi-email</v-icon>Send Verification Email
                  </v-btn>
                </div>
              </div>

              <div class="mt-2">
                <v-btn color="primary" @click>Guardar</v-btn>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-expansion-panels v-model="panel" multiple class="mt-3">
        <v-expansion-panel>
          <v-expansion-panel-header class="title">Permisos</v-expansion-panel-header>
          <v-expansion-panel-content>
      <v-row
        v-for="n in 1 "
        :key="n"
        :class="n === 1 ? 'my-1' : ''"
        no-gutters
        >
       
      <v-col md="2">     
     <v-card
      :loading="loading"
      class=" my-2"
      max-width="230"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
  
      <v-card-title>Panel de configuración</v-card-title>
  
       <v-switch
        v-model="switch1"
        :label="`Centro de Gestión`"
      ></v-switch>
      <v-divider class="mx-4"></v-divider>
  
       <v-switch
        v-model="switch2"
        :label="`Maestro de recursos`"
      ></v-switch>
        <v-divider class="mx-4"></v-divider>
  
     <v-switch
        v-model="switch3"
        :label="`Entidad Externa`"
      ></v-switch>
  
      <v-divider class="mx-4"></v-divider>
  
    <v-switch
        v-model="switch4"
        :label="`Usuarios`"
      ></v-switch>
     
    </v-card>
     </v-col>
    <v-col md="2"> 
     <v-card
      :loading="loading"
      class="my-2"
      max-width="230"
      <div class="card border-primary">
        <img class="card-img-top" src="holder.js/100px180/" alt="">
        <div class="card-body">
          <h4 class="card-title">Title</h4>
          <p class="card-text">Text</p>
        </div>
      </div>
      
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
  
      <v-card-title>Adquisiciones</v-card-title>
     
         <v-switch
        v-model="switch5"
        :label="`Pedidos`"
      ></v-switch>

      <v-divider class="mx-4"></v-divider>
    <v-switch
        v-model="switch6"
        :label="`Orden de compra`"
      ></v-switch>
      <v-divider class="mx-4"></v-divider>
       <v-switch
      v-model="switch7"
      label="Cancelar/Disminuir OC "
      ></v-switch>
    </v-card>
     </v-col>
    </v-row>

            <!--<div class="mb-2">
              <div class="title">Reset User Password</div>
              <div class="subtitle mb-2">Sends a reset password email to the user.</div>
              <v-btn
                class="mb-2"
                @click
              >
                <v-icon left small>mdi-email</v-icon>Send Reset Password Email
              </v-btn>
            </div>

            <v-divider></v-divider>

            <div class="my-2">
              <div class="title">Export Account Data</div>
              <div class="subtitle mb-2">Export all the platform metadata for this user.</div>
              <v-btn class="mb-2">
                <v-icon left small>mdi-clipboard-account</v-icon>Export User Data
              </v-btn>
            </div>

            <v-divider></v-divider>

            <div class="my-2">
              <div class="error--text title">Danger Zone</div>
              <div class="subtitle mb-2">Full administrator with access to this dashboard.</div>

              <div class="my-2">
                <v-btn
                  v-if="user.role === 'ADMIN'"
                  color="primary"
                  @click="user.role = 'USER'"
                >
                  <v-icon left small>mdi-security</v-icon>Remove admin access
                </v-btn>
                <v-btn v-else color="primary" @click="user.role = 'ADMIN'">
                  <v-icon left small>mdi-security</v-icon>Set User as Admin
                </v-btn>
              </div>

              <v-divider></v-divider>

              <div class="subtitle mt-3 mb-2">Prevent the user from signing in on the platform.</div>
              <div class="my-2">
                <v-btn
                  v-if="user.disabled"
                  color="warning"
                  @click="user.disabled = false"
                >
                  <v-icon left small>mdi-account-check</v-icon>Enable User
                </v-btn>
                <v-btn
                  v-else
                  color="warning"
                  @click="disableDialog = true"
                >
                  <v-icon left small>mdi-cancel</v-icon>Disable User
                </v-btn>
              </div>

              <v-divider></v-divider>
              <div
                class="subtitle mt-3 mb-2"
              >To delete the user please transfer ownership or delete user's subscriptions.</div>
              <v-btn color="error" @click="deleteDialog = true">
                <v-icon left small>mdi-delete</v-icon>Delete User
              </v-btn>
            </div>-->
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel v-model="panel"  multiple class="mt-3">
          <v-expansion-panel-header  class="title">Proyectos</v-expansion-panel-header>
          <v-expansion-panel-content  class="body-2" >
          
             <v-card
               :loading="loading"
               class=" my-2"
                max-width="200">
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
                   v-on="on">
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
                   v-on="on">
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
                   v-on="on">
                    mdi-account
                 </v-icon>
            </template>
             <span>Solicitante</span>
            </v-tooltip></v-chip>
        </center>

      </v-chip-group>
    </v-card-text>
  </v-card>
<!--<span class="font-weight-bold">Created</span>
            {{ user.created | formatDate('lll') }}
            <br />
            <span class="font-weight-bold">Last Sign In</span>
            {{ user.lastSignIn | formatDate('lll') }}-->
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- disable  -->
        <v-expansion-panel v-if= 'false' >
          <v-expansion-panel-header class="title" >Raw Data</v-expansion-panel-header>
          <v-expansion-panel-content>
            <pre class="body-2">{{ user }}</pre>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <!-- disable modal -->
    <v-dialog v-model="disableDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Disable User</v-card-title>
        <v-card-text>Are you sure you want to disable this user?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="disableDialog = false">Cancel</v-btn>
          <v-btn color="warning" @click="user.disabled = true; disableDialog = false">Disable</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- delete modal -->
    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Delete User</v-card-title>
        <v-card-text>Are you sure you want to delete this user?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="deleteDialog = false">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      panel: [-1],
      switch1: true,
      switch2: true,
      switch3: true,
      switch4: true,
      switch5: true,
      switch6: true,
      switch7: true,
      deleteDialog: false,
      disableDialog: false
     
    }
  }
}
</script>
