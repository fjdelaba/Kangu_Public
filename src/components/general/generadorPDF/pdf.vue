<template>

  <html>

    <head>
      <!-- Meta Tags -->
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="author" content="ThemeMarch">
      <!-- Site Title -->
    
    </head>
  
    <body>
      
      <div ref="download" class="cs-container">
        <div class="cs-invoice cs-style1">
          <div class="cs-invoice_in cs-mb15">
            <div class="cs-invoice_left">
              <h9 class="letraCabecera">Razon Social: DLB_PRUEBA</h9><br>
              <h9 class="letraCabecera">R.U.T: 19996791-6</h9><br>
              <h9 class="letraCabecera">Direccion: AV LAS TORRES</h9>
            </div>
            <div class="cs-invoice_head cs-type1 cs-mb15">
              <div class="cs-invoice_left">
                <p class="cs-invoice_date cs-primary_color cs-m0"><b class="cs-primary_color"></b></p>
                <h9 class="letraCabecera"><b class="cs-primary_color"> Orden de Compra: </b> {{ cabecera.identificacion }}</h9>
                <p class="letraCabecera"><b class="cs-primary_color">Fecha: </b>{{ cpxFecha }}</p>
              </div>
              <div class="cs-invoice_right cs-text_right">
                <div class="cs-logo cs-mb5"><img class="mediana" :src="logo" alt="Logo"></div>
              </div>
            </div>
            <div class="cs-invoice_head cs-mb10">
              <div class="cs-invoice_left cs-text_left">
                <b class="cs-primary_color">Proveedor:</b>
                <p class="letraCabecera">
                  Razon Social: {{ cabecera.proveedor && cabecera.proveedor.razon_social }}<br>
                  R.U.T: {{ cabecera.proveedor && cabecera.proveedor.rut }}<br>
                  Dirección: {{ cabecera.proyecto.direccion }}<br>
                  Contacto: {{ cabecera.contacto.email }} - {{ cabecera.contacto.nombre }}<br>
                  
                </p>
              </div>
              <div class="cs-invoice_rigth cs-text_rigth">
                <b class="cs-primary_color">Informacion de OC :</b>
                <p class="letraCabecera">
                  Nombre: {{ cabecera && cabecera.nombre }}<br>
                  Proyecto: {{ `${cabecera.proyecto.nombre} - ${cabecera.proyecto.codigo}` }}<br>
                  Condición:  {{ cabecera.formaPago.nombre }} - {{ cabecera.moneda.nombre }} <br>
                  Contacto: demo@email.com<br>
                  Despacho: {{ cabecera.tipoDespacho.nombre }}<br>
                  
                </p>
              </div>
            </div>
            <div class="cs-table cs-style1">
              <div class="cs-round_border">
                <div class="cs-table_responsive">
                  <table id="materialesPDF">
                    <thead>
                      <tr>
                        <th class="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">Material - Formato</th>
                        <th class="cs-width_2 cs-semi_bold cs-primary_color cs-focus_bg">Cantidad</th>
                        <th class="cs-width_1 cs-semi_bold cs-primary_color cs-focus_bg">Precio</th>
                        <th class="cs-width_2 cs-semi_bold cs-primary_color cs-focus_bg ">SubTotal</th>
                      </tr>
                    </thead>
                  </table>
                </div>
               
              </div>
              <div class="cs-round_border2">
                <div class="cs-table_responsive">
                  <div class="cs-invoice_footer cs-border_top">
                    <div class="cs-left_footer cs-mobile_hide">
                      <p class="cs-mb0"><b class="cs-primary_color">Información Adicional:</b></p>
                      <p class="cs-m0"> {{ observacion }}</p>
                    </div>
                    <div class="cs-right_footer">
                      <table id="totalesPDF">
                        <tbody>
                          <tr>
                            <th >Neto</th>
                            <th >{{ neto | currency }}</th>
                            <th >{{ cabecera.moneda.nombre }}</th>
                        
                          </tr>
                          <tr>
                            <th>IVA</th>
                            <th >{{ impuesto.valor | currency }}</th>
                            <th >{{ cabecera.moneda.nombre }}</th>
                        
                          </tr>
                          <tr>
                    
                            <th >Total</th>
                            <th>{{ total | currency }}</th>
                            <th >{{ cabecera.moneda.nombre }}</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cs-invoice_btns cs-hide_print">
                <div class="cs-note_right">
                  <p class="firma"><b class="cs-primary_color cs-bold"><br> Firma</b></p>
                </div>
              </div><!-- .cs-note -->
            </div>
           
          </div>
        <!-- <div class="cs-invoice_btns cs-hide_print">
        <a href="javascript:window.print()" class="cs-invoice_btn cs-color1">
          <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path
            d="M384 368h24a40.12 40.12 0 0040-40V168a40.12 40.12 0 00-40-40H104a40.12 40.12 0 00-40 40v160a40.12 40.12 0 0040 40h24"
            fill="none"
            stroke="currentColor"
            stroke-linejoin="round"
            stroke-width="32"
          /><rect
            x="128"
            y="240"
            width="256"
            height="208"
            rx="24.32"
            ry="24.32"
            fill="none"
            stroke="currentColor"
            stroke-linejoin="round"
            stroke-width="32"
          /><path
            d="M384 128v-24a40.12 40.12 0 00-40-40H168a40.12 40.12 0 00-40 40v24"
            fill="none"
            stroke="currentColor"
            stroke-linejoin="round"
            stroke-width="32"
          /><circle cx="392" cy="184" r="24"/></svg>
          <span>Print</span>
        </a>
        <button ref="download_btn" class="cs-invoice_btn cs-color2">
          <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Download</title><path
            d="M336 176h40a40 40 0 0140 40v208a40 40 0 01-40 40H136a40 40 0 01-40-40V216a40 40 0 0140-40h40"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
          /><path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M176 272l80 80 80-80M256 48v288"
          /></svg>
          <span>Download</span>
        </button>
      </div> -->
        </div></div></body>
  </html>
</template>
<style  src="./pdf.css"></style>
<script src="./pdf.js"></script>