<template>
  <html class="no-js" lang="en">

    <head>
      <!-- Meta Tags -->
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="author" content="ThemeMarch">
      <!-- Site Title -->
      <link rel="stylesheet" href="assets/css/style.css">
    </head>

    <body>
      <div class="cs-container">
        <div class="cs-invoice cs-style1">
          <div id="download_section" class="cs-invoice_in">
            <div class="cs-invoice_head cs-type1 cs-mb25">
              <div class="cs-invoice_left">
                <p class="cs-invoice_number cs-primary_color cs-mb0 cs-f16"><b class="cs-primary_color">Pedido:</b> PED-M32-01</p>
              </div>
              <div class="cs-invoice_right cs-text_right">
                <div class="cs-logo cs-mb5"><img class="mediana" :src="logo" alt="Logo"></div>
              </div>
            </div>
            
            <ul class="cs-list cs-style2">
              <li>
                <div class="cs-list_left">Nombre Documento: <b class="cs-primary_color cs-semi_bold ">Pedido Yolito</b></div>
                <div class="cs-list_right">Obra: <b class="cs-primary_color cs-semi_bold ">Carretera Austral</b></div>
              </li>
              <li>
                <div class="cs-list_left">Nombre Solicitante: <b class="cs-primary_color cs-semi_bold ">Bastian Medina</b></div>
                <div class="cs-list_right">Fecha Solicitado: <b class="cs-primary_color cs-semi_bold ">25/09/2021</b></div>
              </li>
              <li>
                <div class="cs-list_left">Proyecto: <b class="cs-primary_color cs-semi_bold ">A2</b></div>
              </li>
            </ul>
            <div class="cs-table cs-style2">
              <div class="cs-round_border">
                <div class="cs-table_responsive">
                  <table>
                    <thead>
                      <tr class="cs-focus_bg">
                        <th class="cs-width_5 cs-semi_bold cs-primary_color">Nombre Material</th>
                        <th class=" cs-semi_bold cs-primary_color">Cantidad</th>
                     
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="cs-width_5">Clavo Pallets - KILOGRAMO</td>
                        <td class="cs-width_5">2</td>
                      
                      </tr>
                      <tr>
                        <td class="cs-width_5">Absorbente Acústico de Poliester - UNIDAD</td>
                        <td class="cs-width_5">2</td>
                     
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div class="cs-note">
              <div class="cs-note_left">
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path
                  d="M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z"
                  fill="none"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="32"
                /><path
                  d="M256 56v120a32 32 0 0032 32h120M176 288h160M176 368h160"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                /></svg>
              </div>
              <div class="cs-note_right">
                <p class="cs-mb0"><b class="cs-primary_color cs-bold">Nota:</b></p>
                <p class="cs-m0">Se necesita urgente este pedido necesitamos los materiales</p>
              </div>
            </div><!-- .cs-note -->
          </div>
          <div class="cs-invoice_btns cs-hide_print">
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
            <button id="download_btn" class="cs-invoice_btn cs-color2">
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
          </div>
        </div>
      </div>
    </body>
  </html>
</template>
<style src="./assets/css/style.css"></style>
<script src="./assets/js/jquery.min.js"></script>
  <script src="./assets/js/jspdf.min.js"></script>
  <script src="assets/js/html2canvas.min.js"></script>
  <script src="assets/js/main.js"></script>
<script src="./pdf.js"></script>