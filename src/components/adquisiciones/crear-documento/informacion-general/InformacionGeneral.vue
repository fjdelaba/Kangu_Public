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
            v-model="proyecto"
            :rules="proyectoRules"
            outlined
            label="Proyectos"
            :items="listaProyectos"
            item-text="nombre"
            item-value="id"
            hint="Selecciona el proyecto al que asignaras esta OC"
            dense
          ></v-combobox>
        </v-col>
        <v-col
          cols="12"
          md="4"
          class="pb-0"
        >
          <v-text-field
            v-model="nombre"
            label="Nombre de OC"
            value=""
            :rules="nombreOCRules"
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
            v-model="moneda"
            :rules="monedaRules"
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
            v-model="tipoDocumento"
            :rules="tipoDocumentoRules"
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
          <v-combobox
            v-model="select"
            :items="items"
            label="Combobox"
            multiple
            outlined
            dense
          ></v-combobox>
        </v-col>
      </v-row>
      <p class="ma-0">Proveedor</p>
      <v-divider  
        :key="index"
      ></v-divider>
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
            v-model="proveedor"
            :items="listaProveedores"
            :loading="isLoading"
            :search-input.sync="search"
            item-text="razon_social"
            item-value="id"
            label="Proveedor"
            hide-no-data
            hint="Puedes buscar por nombre o por rut"
            return-object
            outlined
            dense
            @input="cargarContactos()"
          ></v-autocomplete>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-combobox
            v-model="contacto"
            :rules="vendedorRules"
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
      <v-divider
        :key="index"
      ></v-divider>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-combobox
            v-model="formaPago"
            :rules="pagoRules"
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
            v-model="tipoDespacho"
            :rules="despachoRules"
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
      <!-- </v-container> -->
    </v-form>
  </div>
</template>

<script src="./InformacionGeneral.js"></script>
<style scoped src="./InformacionGeneral.css"></style>