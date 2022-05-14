<template>
  <div>
    <v-form ref="formPaso1" v-model="valid" lazy-validation>
      <!-- <v-container class="ma-0 pa-0"> -->
      <p class="ma-0">Informacion General</p> 
      <v-divider></v-divider>
      <v-row >
        <v-col 
          cols="12"
          md="4"
          class="pb-0"
        >
          <v-combobox
            v-model="oc_cab.proyecto"
            :rules="rules.oc_cab.proyecto"
            outlined
            label="Proyectos"
            :items="listaProyectos"
            item-text="nombre"
            item-value="id"
            hint="Selecciona el proyecto al que asignaras esta OC"
            dense
          >
            <template v-slot:item="{ item }">
              <v-list-item-content>
                <v-list-item-title v-text="item.nombre"></v-list-item-title>
                <v-list-item-subtitle v-text="`codigo: ${item.codigo}`"></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-combobox>
        </v-col>
        <v-col
          cols="12"
          md="4"
          class="pb-0"
        >
          <v-text-field
            v-model="oc_cab.nombre"
            label="Nombre de OC"
            value=""
            :rules="rules.oc_cab.nombre"
            hint="Ingresa un nombre descriptivo a esta OC"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
          class="pb-0"
        >
          <v-combobox
            v-model="oc_cab.moneda"
            :rules="rules.oc_cab.moneda"
            clearable
            outlined
            label="Moneda"
            :items="listaMonedas"
            item-text="nombre"
            item-value="id"
            hint="¿En que moneda generaras esta OC?"
            dense
          ></v-combobox>
        </v-col>
      </v-row>
      <v-row >
        <v-col 
          cols="12"
          md="6"
          class="pt-0"
        >
          <v-combobox
            v-model="oc_cab.tipoDocumento"
            :rules="rules.oc_cab.tipoDocumento"
            clearable
            outlined
            :items="listaTiposDocumento"
            item-text="nombre"
            item-value="id"
            label="Tipo Documento"
            hint="¿Que documento contable generará esta OC?"
            dense
          ></v-combobox>
        </v-col>

        <v-col
          cols="12"
          md="6"
          class="pt-0"
        >
          <!-- <v-combobox
            v-model="tipoOC"
            :rules="tipoOCRules"
            clearable
            outlined
            :items="listaTipoOC"
            item-text="nombre"
            item-value="id"
            label="Tipo Documento"
            hint="¿Que documento contable generará esta OC?"
            dense
          ></v-combobox> -->
          <!-- <v-combobox
            v-model="select"
            :items="items"
            
            label="Combobox"
            multiple
            outlined
            dense
          ></v-combobox> -->
        </v-col>
      </v-row>
      <p class="ma-0">Proveedor</p>
      <v-divider></v-divider>
      <v-row>
                    
        <v-col
          cols="12"
          md="6"
        >
          <!-- valor: {{ proveedor.id }} -->
          <!-- <v-autocomplete
            v-model="proveedor"
            :rules="proveedorRules"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            hide-no-data
            hide-selected
            item-text="Description"
            item-value="API"
            label="Proveedor"
            return-object
            outlined
            hint="Puedes buscar por nombre o por rut"
            dense
          ></v-autocomplete> -->
          <v-autocomplete
            v-model="oc_cab.proveedor"
            :rules="rules.oc_cab.proveedor"
            :items="listaProveedores"
            :loading="isLoading"
            :search-input.sync="search"
            item-text="razon_social"
            item-value="id"
            label="Proveedor"
            hint="Puedes buscar por nombre o por rut"
            return-object
            :hide-no-data="!mostrarNoData"
            outlined
            dense
            @input="cargarContactos()"
            @focusout="limpiarAutocompleate()"
          >
            <template v-slot:item="{ item }">
              <v-list-item-content>
                <v-list-item-title v-text="`${item.razon_social}`"></v-list-item-title>
                <!-- <v-list-item-subtitle v-text="`codigo: ${item.codigo}`"></v-list-item-subtitle>  -->
              </v-list-item-content>
            </template> 
            <template v-slot:no-data >
              
              <v-btn
                class="ma-2"
                outlined
                color="indigo"
                @click="mostrarDialog()"
              >
                No existe el proveedor, crealo acá
              </v-btn>
                
            </template>
          </v-autocomplete>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-combobox
            v-model="oc_cab.contacto"
            :rules="rules.oc_cab.contacto"
            clearable
            outlined
            :items="listaContactos"
            item-text="nombre"
            item-value="id"
            label="Contacto"
            hint="Indicanos a quien enviarás esta OC"
            dense
          ></v-combobox>
        </v-col>
           
      </v-row>
      <p class="ma-0">Condiciones</p>
      <v-divider></v-divider>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-combobox
            v-model="oc_cab.formaPago"
            :rules="rules.oc_cab.formaPago"
            clearable
            outlined
            :items="listaFormasPago"
            item-text="nombre"
            item-value="id"
            label="Forma de pago"
            hint="Selecciona como pagarás esta OC"
            dense
          ></v-combobox>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-combobox
            v-model="oc_cab.tipoDespacho"
            :rules="rules.oc_cab.tipoDespacho"
            clearable
            outlined
            :items="listaTiposDespacho"
            item-text="nombre"
            item-value="id"
            label="Despacho/Retiro"
            hint="¿Como llegarán los materiales a tu proyecto?"
            dense
          ></v-combobox>
        </v-col>
           
      </v-row>
    </v-form>
    <v-row justify="center">
      <v-dialog
        v-model="mostrarDialogCrearEntidad"
        persistent
        max-width="600px"
      >
        <modal-entidad :cerrarDialog="cerrarDialog"></modal-entidad>
      </v-dialog>
    </v-row>
  </div>
</template>

<script src="./InformacionGeneral.js"></script>
<style scoped src="./InformacionGeneral.css"></style>