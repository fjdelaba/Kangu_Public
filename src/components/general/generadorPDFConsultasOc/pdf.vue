<!-- Only include when rendering is required -->

<!-- Include pdfjs version 2.3.200 for Internet Explorer compatibility, no worker required -->
<!-- <script src="https://unpkg.com/pdfjs-dist@2.3.200/build/pdf.min.js"></script> -->
<template>
  <div id="app" class="a">
    <button @click="createInvoice">Create Invoice</button>
    <button @click="downloadInvoice">Download Invoice</button>
    <button @click="renderInvoice">Render Invoice</button>
    <br />
    <br />
    <p>
      Invoice Base64 (click create invoice):
      <small>{{ invoiceBase64 }}</small>
    </p>
    <div id="pdf"></div>
  </div>
</template>
<style  src="./pdf.css"></style>
<script src="./pdf.js"></script>
