/* eslint-disable */
// import jsPDFInvoiceTemplate from "jspdf-invoice-template";  //by importing
// import jsPDF from 'jspdf' datos, tablaMateriales, datosEmpresa, resumenTotales, ocCreada, flujo
// import 'jspdf-autotable'
import moment from "moment";
import { getFactura } from '../graphql/adquisiciones'
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import jsonFile from '../assets/images/pdf/imagenes.json';
// import fs from 'fs'

async function creaPdfFactura(id,datosEmpresa, formato,idRec) {
  console.log('factura: ', id);
  console.log('datosEmpresa: ', datosEmpresa);

  const {
    data: { kangusoft_dte_cab },
  } = await getFactura(id);
  console.log(
    "aaa",
    kangusoft_dte_cab,
  );
 let factura = kangusoft_dte_cab[0]
  // formato 1 = 'descargar pdf', 2 = datauriString
  // try {

  let materialesPDF = factura.dte_dets;
  let referenciasFactura = factura.dte_refs
  let empresa = datosEmpresa;
  let numeroFolio = factura.folio
  let cabecera = {};
  let proveedor = {};
  let moneda = {};
  let tipoDocument = "";
  moneda.id= 2;
  let contacto = {};
  let formaPago = {};
  let tipoDespacho = {};
  let proyecto = {};
  let neto = factura.neto;
  let impuesto = {};
  impuesto.valor = factura.iva_monto
  impuesto.nombre = 'IVA (19%)'
  let total = "";
  total = impuesto.valor + neto
  let  fechaEmision = moment(factura.fec_emision).format("DD/MM/YYYY")
  let  fechaVencimiento = moment(factura.fec_ven).format("DD/MM/YYYY")

  let formatoCL
  let formatoCantidad
  let peso
  let emisor = factura.emi_nombre
  let emisorRut = factura.emi_rut
  let emisorDireccion = factura.emi_direccion
  let emisorGiro = factura.emi_giro
  let emisorComuna = factura.emi_comuna
  let emisorFormaPago = ''
  let tipo_documento
  let exento = ''
  let identificacion = idRec
  var img = new Image();
  img.src = require("../components/general/generadorPDF/assets/img/logo_dlb.png");
  var img2 = new Image();
  img2.src = require("../components/general/generadorPDF/assets/img/Firma_de_Harold.jpeg");
  // let cancelada = new Image('../assets/images/pdf/Cancelada.png');
  // img.src = require('../assets/images/pdf/');
  // let imgRechazada = new Image();
  // img2.src = require('../assets/images/pdf/Rechazada.png');
  // let imgEnAprobacion = new Image();
  // img2.src = require('../assets/images/pdf/EnAprobacion.png');
  if(factura.dte_for_pag_fk == 2){
    emisorFormaPago = 'Credito'
  }
  if(factura.dte_des_tip_fk == null){
    tipoDespacho = 'Sin Despacho'
  }
  if(factura.dte_tip_fk == 33){
    tipoDocument = 'FACTURA ELECTRONICA'
  } else if(factura.dte_tip_fk == 52) {
    tipoDocument = 'GUÍA DE DESPACHO'
  }

if(moneda.id == 2){
  let options = { style: "currency", currency: "CLP" };
   formatoCL = new Intl.NumberFormat("es-CL", options);
   formatoCantidad = new Intl.NumberFormat("es-CL");
   peso = 'CLP'
}else if(moneda.id == 3){
  let options = { style: "currency", currency: "USD" };
  formatoCL = new Intl.NumberFormat('en-US', options);
  formatoCantidad = new Intl.NumberFormat("es-CL");
  peso = 'USD'
}else if(moneda.id == 4){
  let options = { style: "currency", currency: "EUR" };
  formatoCL = new Intl.NumberFormat('de-DE', options);
  formatoCantidad = new Intl.NumberFormat("es-CL");
  peso = 'EUR'
}else if(moneda.id == 1){
  let options = { style: 'decimal'};
  formatoCL = new Intl.NumberFormat('es-CL', options);
  formatoCantidad = new Intl.NumberFormat("es-CL");
  peso = 'UF'
}
  // console.log("TIPO DOCUMENT",tipo_documento)
  // if(tipo_documento == 3){//FACTURA
    // for (let valor of materialesPDF) {
    //   console.log("valor", valor);
    //   neto = valor.total + neto;
    // }
    // impuesto.valor = neto * 0.19;
    // impuesto.nombre = "IVA (19%)";
    // total = impuesto.valor + neto;
  // }
  // if(tipo_documento == 4){// Factura Excenta
  //   for (let valor of materialesPDF) {
  //     console.log("valor", valor);
  //     neto = valor.total + neto;
  //   }
  //   impuesto.valor = 0;
  //   impuesto.nombre = "Excenta";
  //   total = impuesto.valor + neto;
  // }
  //  if(tipo_documento  == 7) { // 7 Boleta ELectronica
  //   for (let valor of materialesPDF) {
  //     console.log("valor", valor);
  //     neto = valor.total + neto;
  //   }
  //   // Bruto
  //     const dif = neto * 0.8775
  //     impuesto.valor = dif - neto
  //     total = impuesto.valor + neto
  //   impuesto.nombre = "Retencion 12,25%";
  // }
  if(factura.exento == null){
    exento = 0
  }
  if (proveedor.direccion == null) proveedor.direccion = "Sin Dirección";
  if (identificacion == null || cabecera.est_doc_fk == 1) identificacion = "Sin Identificación";
  if (cabecera.comentario == null) cabecera.comentario = "Sin Comentario";
  if (cabecera.comentarioPDF == null) cabecera.comentarioPDF = "Sin Comentario";
  let props = {
    returnJsPDFDocObject: true,
    fileName: `Factura - ${identificacion}.pdf`,
    orientationLandscape: false,
    compress: true,
    logo: {
      src: img.src,
      width: 53.33, //aspect ratio = width/height
      height: 26.66,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0, //negative or positive num, from the current position
      },
    },
    stamp: {
      inAllPages: true, //by default = false, just in the last page
      // src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
      type: "JPG", //optional, when src= data:uri (nodejs case)
      width: 20, //aspect ratio = width/height
      height: 20,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0, //negative or positive num, from the current position
      },
    },
    business: {
      name: `R.U.T : ${emisorRut}`,
      address: `${tipoDocument}`,
      phone: `Nº ${numeroFolio}`,
    },
    business2: {
      name: "FACTURA",
  },
    contact: {
      address: `Señor (es)    : ${empresa.nombre}`,
      phone: `R.U.T           : ${empresa.rut}`,
      email: `Dirección     : ${empresa.direccion}`,
      otherInfo: `Giro             : ${empresa.giro}`,
      comuna: `Comuna      : ${empresa.com.nombre}`,
      pago: `Ciudad        : ${empresa.com.prov.reg.nombre}`,

    },
    contact2: {
      address: `Fecha de Emision: ${fechaEmision}`,
      phone: `Fecha Vencimiento: ${fechaVencimiento}`,
      email: `Condición de Pago: ${emisorFormaPago}`,
      comuna: `Condición de Despacho: ${tipoDespacho}`,
    },
    invoice: {
      label: `Nº Folio 3090682`,
      num: 19,
      invDate: `Fecha de Emision: 21/07/2022`,
      invGenDate: `Fecha de descarga:`,
      headerBorder: false,
      tableBodyBorder: false,
      header: [
        {
          title: "#",
          style: {
            width: 10,
          },
        },
        {
          title: "Material",
          style: {
            width: 78,
            fontSize: 12,
          },
        },
        { title: "Cantidad" },
        { title: "Precio" },
        { title: "SubTotal" },
      ],
      header2: [
        {
          title: "Nº",
          style: {
            width: 10,
          },
        },
        {
          title: "Tipo Documento",
        },
        { title: "Folio" },
        { title: "Fecha" },
      ],

      table: Array.from(materialesPDF, (item, index) => [
        index + 1,
        item.nombre ,
        formatoCantidad.format(item.cantidad),
        formatoCL.format(item.precio),
        formatoCL.format(item.monto),
      ]),
      table2: Array.from(referenciasFactura, (item, index) => [
        item.nro_linea,
        item.dte_ref_tip_fk,
        item.folio,
        moment(item.fec_ref).format("DD/MM/YYYY")

      ]),
      additionalRows: [
        {
          col1: "Neto:",
          col2: formatoCL.format(neto),
          col3: peso,
          style: {
            fontSize: 10, //optional, default 12
          },
        },
        {
          col1: impuesto.nombre,
          col2: formatoCL.format(Math.abs(impuesto.valor)),
          col3: peso,
          style: {
            fontSize: 10, //optional, default 12
          },
        },
        {
          col1: 'Exento',
          col2: formatoCL.format(Math.abs(exento)),
          col3: peso,
          style: {
            fontSize: 10, //optional, default 12
          },
        },
        {
          col1: "Total:",
          col2: formatoCL.format(total),
          col3: peso,
          style: {
            fontSize: 10, //optional, default 12
          },
        },
      ],
      invDescLabel: "Información Adicional",
      invDesc: '',
      firma: "Santiago Perez",
      logo: {
        src: img2.src,
        width: 53.33, //aspect ratio = width/height
        height: 26.66,
        margin: {
          top: 0, //negative or positive num, from the current position
          left: 0, //negative or positive num, from the current position
        },
      },
    },
    footer: {
      text: ``,
    },
    pageEnable: true,
    pageLabel: "Pagina ",
  };

  var doc = new jsPDF();

  const param = {
    outputType: props.outputType || "save",
    returnJsPDFDocObject: props.returnJsPDFDocObject || false,
    fileName: props.fileName || "",
    orientationLandscape: props.orientationLandscape || false,
    compress: props.compress || false,
    logo: {
      src: props.logo?.src || "",
      type: props.logo?.type || "",
      width: props.logo?.width || "",
      height: props.logo?.height || "",
      margin: {
        top: props.logo?.margin?.top || 0,
        left: props.logo?.margin?.left || 0,
      },
    },
    stamp: {
      inAllPages: props.stamp?.inAllPages || false,
      src: props.stamp?.src || "",
      width: props.stamp?.width || "",
      height: props.stamp?.height || "",
      margin: {
        top: props.stamp?.margin?.top || 0,
        left: props.stamp?.margin?.left || 0,
      },
    },
    business: {
      name: props.business?.name || "",
      address: props.business?.address || "",
      phone: props.business?.phone || "",
      email: props.business?.email || "",
      email_1: props.business?.email_1 || "",
      website: props.business?.website || "",
    },
    business2: {
      name: props.business2?.name || "",
    },
    contact: {
      label: props.contact?.label || "",
      name: props.contact?.name || "",
      address: props.contact?.address || "",
      phone: props.contact?.phone || "",
      email: props.contact?.email || "",
      otherInfo: props.contact?.otherInfo || "",
      pago: props.contact?.pago || "",
      comuna:props.contact?.comuna || "",
      dcto: props.contact?.dcto || "",
    },
    contact2: {
      label: props.contact2?.label || "",
      name: props.contact2?.name || "",
      address: props.contact2?.address || "",
      phone: props.contact2?.phone || "",
      email: props.contact2?.email || "",
      comuna:props.contact2?.comuna || "",
      otherInfo: props.contact2?.otherInfo || "",
      pago: props.contact2?.pago || "",
    },
    invoice: {
      label: props.invoice?.label || "",
      num: props.invoice?.num || "",
      invDate: props.invoice?.invDate || "",
      invGenDate: props.invoice?.invGenDate || "",
      headerBorder: props.invoice?.headerBorder || false,
      tableBodyBorder: props.invoice?.tableBodyBorder || false,
      header: props.invoice?.header || [],
      header2: props.invoice?.header2 || [],
      table: props.invoice?.table || [],
      table2: props.invoice?.table2 || [],
      invDescLabel: props.invoice?.invDescLabel || "",
      invDesc: props.invoice?.invDesc || "",
      firma: props.invoice?.firma || "",
      logo: {
        src: props.invoice.logo?.src || "",
        type: props.invoice.logo?.type || "",
        width: props.invoice.logo?.width || "",
        height: props.invoice.logo?.height || "",
        margin: {
          top: props.invoice.logo?.margin?.top || 0,
          left: props.invoice.logo?.margin?.left || 0,
        },
      },
      additionalRows: props.invoice?.additionalRows?.map((x) => {
        return {
          col1: x?.col1 || "",
          col2: x?.col2 || "",
          col3: x?.col3 || "",
          style: {
            fontSize: x?.style?.fontSize || 12,
          },
        };
      }),
    },
    footer: {
      text: props.footer?.text || "",
    },
    pageEnable: props.pageEnable || false,
    pageLabel: props.pageLabel || "Page",
  };

  const splitTextAndGetHeight = (text, size) => {
    var lines = doc.splitTextToSize(text, size);
    return {
      text: lines,
      height: doc.getTextDimensions(lines).h,
    };
  };
  if (param.invoice.table && param.invoice.table.length) {
    if (param.invoice.table[0].length != param.invoice.header.length)
      throw Error("Length of header and table column must be equal.");
  }

  var docWidth = doc.internal.pageSize.width;
  var docHeight = doc.internal.pageSize.height;

  var colorBlack = "#000000";
  // var colorEmpresa = empresa.color;
  var colorGray = "#4d4e53";
  var colorRojo = "#ff0000"
  //starting at 15mm
  var currentHeight = 15;
  var currentHeight2 = 25;
  var currentHeightEmpresa = 16;
  var currentHeightEmpresa2 = 40;
  //var startPointRectPanel1 = currentHeight + 6;
//a
  var pdfConfig = {
    headerTextSize: 20,
    labelTextSize: 12,
    fieldTextSize: 7,
    fieldTextSizeEmpresa: 8,
    lineHeight: 6,
    subLineHeight: 4,
    subLineHeight2: 15,
  };

  doc.setFontSize(13);
  // doc.setTextColor(colorEmpresa);
  // console.log("Color", colorEmpresa);
  doc.setDrawColor(0)
  doc.setLineWidth(1)
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(148, 10, 60, 23, 0, 0)
  doc.setTextColor(0);
  doc.text(docWidth - 33, currentHeightEmpresa, param.business.name, "center");
  doc.text(docWidth - 33, 23, param.business.address, "center");
  doc.text(docWidth - 33, 30, param.business.phone, "center");

  doc.setLineWidth(0)
  doc.setTextColor(0);
  doc.setDrawColor(0);


  doc.text(8, 28, `${emisor}`, "left");
  doc.setFontSize(8)
  doc.text(8, 32, `${emisorGiro}`, "left");
  doc.text(8, 36, `${emisorDireccion},${emisorComuna}`, "left");

  doc.setTextColor(colorGray);

  
  currentHeight += pdfConfig.subLineHeight;
  currentHeight += pdfConfig.subLineHeight;
  // doc.text(docWidth - 12, 20, param.business.address, "right");
  // currentHeight += pdfConfig.subLineHeight;
  // doc.text(docWidth - 12, 24, param.business.phone, "right");
  // doc.setFontSize(pdfConfig.fieldTextSizeEmpresa);
  // // doc.setTextColor(colorGray);
  // currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, 28, param.business.email, "right");

  currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, 32, param.business.email_1, "right");

  currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, 36, param.business.website, "right");

  //line breaker after logo & business info
  if (param.invoice.header.length) {
    currentHeight += pdfConfig.subLineHeight;
  }

  //Contact part
  doc.setTextColor(colorGray);
  doc.setFontSize(pdfConfig.fieldTextSize);
  doc.setDrawColor(0)
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(8, 43, 200, 27, 3, 3, 'FD')
  currentHeight += pdfConfig.lineHeight;
  if (param.contact.label) {
    doc.text(10, currentHeight, param.contact.label);
    currentHeight += pdfConfig.lineHeight;
  }

  doc.setTextColor(colorBlack);
  doc.setFontSize(pdfConfig.headerTextSize - 10);
  if (param.contact.name) doc.text(10, currentHeight, param.contact.name);

  if (param.invoice.label && param.invoice.num) {
  
  }

  //end contact part

  //Contact part
  doc.setTextColor(colorGray);
  doc.setFontSize(pdfConfig.fieldTextSize);
  currentHeight += pdfConfig.lineHeight;

  if (param.contact2.name) doc.text(10, currentHeight, param.contact2.name);

  if (param.contact2.name) currentHeight += pdfConfig.subLineHeight;

  doc.setTextColor(colorGray);
  doc.setFontSize(pdfConfig.fieldTextSize );

  if (param.contact.address) {
    doc.text(10, currentHeight, param.contact.address);
    doc.text(120, currentHeight, param.contact2.address, "left");
    currentHeight += pdfConfig.subLineHeight;
  }

  if (param.contact.phone) {
    doc.text(10, currentHeight, param.contact.phone);
    doc.text(120, currentHeight, param.contact2.phone, "left");
    currentHeight += pdfConfig.subLineHeight;
  }

  if (param.contact.email) {
    doc.text(10, currentHeight, param.contact.email);
    doc.text(120, currentHeight, param.contact2.email, "left");
    currentHeight += pdfConfig.subLineHeight;
  }
  if (param.contact.comuna) {
    doc.text(10, currentHeight, param.contact.comuna);
    doc.text(120, currentHeight, param.contact2.comuna, "left");
    currentHeight += pdfConfig.subLineHeight;
  }
  if (param.contact.otherInfo) {
    doc.text(10, currentHeight, param.contact.otherInfo);
    doc.text(120, currentHeight, param.contact2.otherInfo, "left");
    currentHeight += pdfConfig.subLineHeight;
  }
  if (param.contact.pago) {
    doc.text(10, currentHeight, param.contact.pago);
    doc.text(120, currentHeight, param.contact2.pago, "left");
    currentHeight += pdfConfig.subLineHeight;
  }

  // doc.setDrawColor(0)
  // doc.setFillColor(255, 255, 255);
  // doc.roundedRect(8, 72, 200, 10, 3, 3, 'FD')
  //end contact part

  //TABLE PART
  //var tdWidth = 31.66;
  //10 margin left - 10 margin right
  var tdWidth = (doc.getPageWidth() - 20) / param.invoice.header.length;

  //#region TD WIDTH
  if (param.invoice.header.length > 2) {
    //add style for 2 or more columns
    const customColumnNo = param.invoice.header
      .map((x) => x?.style?.width || 0)
      .filter((x) => x > 0);
    let customWidthOfAllColumns = customColumnNo.reduce((a, b) => a + b, 0);
    tdWidth =
      (doc.getPageWidth() - 20 - customWidthOfAllColumns) /
      (param.invoice.header.length - customColumnNo.length);
  }
  //#endregion

  //#region TABLE HEADER BORDER
  var addTableHeaderBorder = () => {
    currentHeight += 2;
    const lineHeight = 7;
    let startWidth = 0;
    for (let i = 0; i < param.invoice.header.length; i++) {
      const currentTdWidth = param.invoice.header[i]?.style?.width || tdWidth;
      if (i === 0) doc.rect(10, currentHeight, currentTdWidth, lineHeight);
      else {
        const previousTdWidth =
          param.invoice.header[i - 1]?.style?.width || tdWidth;
        const widthToUse =
          currentTdWidth == previousTdWidth ? currentTdWidth : previousTdWidth;
        startWidth += widthToUse;
        doc.rect(startWidth + 10, currentHeight, currentTdWidth, lineHeight);
      }
    }
    currentHeight -= 2;
  };
  //#endregion

  //#region TABLE BODY BORDER
  var addTableBodyBorder = (lineHeight) => {
    let startWidth = 0;
    for (let i = 0; i < param.invoice.header.length; i++) {
      const currentTdWidth = param.invoice.header[i]?.style?.width || tdWidth;
      if (i === 0) doc.rect(10, currentHeight, currentTdWidth, lineHeight);
      else {
        const previousTdWidth =
          param.invoice.header[i - 1]?.style?.width || tdWidth;
        const widthToUse =
          currentTdWidth == previousTdWidth ? currentTdWidth : previousTdWidth;
        startWidth += widthToUse;
        doc.rect(startWidth + 10, currentHeight, currentTdWidth, lineHeight);
      }
    }
  };
  //#endregion

  //#region TABLE HEADER
  var addTableHeader = () => {
    if (param.invoice.headerBorder) addTableHeaderBorder();

    currentHeight += pdfConfig.subLineHeight2;
    doc.setTextColor(colorBlack);
    doc.setFontSize(8 - 1);
    //border color
    doc.setDrawColor(colorGray);
    currentHeight += 2;

    let startWidth = 0;
    param.invoice.header.forEach(function (row, index) {
      if (index == 0) doc.text(row.title, 11, currentHeight);
      else {
        const currentTdWidth = row?.style?.width || tdWidth;
        const previousTdWidth =
          param.invoice.header[index - 1]?.style?.width || tdWidth;
        const widthToUse =
          currentTdWidth == previousTdWidth ? currentTdWidth : previousTdWidth;
        startWidth += widthToUse;
        doc.text(row.title, startWidth + 11, currentHeight);
      }
    });

    currentHeight += pdfConfig.subLineHeight - 1;
    doc.setTextColor(colorGray);
  };
  var addTableHeader2 = () => {
    if (param.invoice.headerBorder) addTableHeaderBorder();

    currentHeight2 += pdfConfig.subLineHeight2;
    doc.setTextColor(colorBlack);
    doc.setFontSize(8 - 1);
    //border color
    doc.setDrawColor(colorGray);
    currentHeight2 += 2;

    let startWidth = 0;
    param.invoice.header2.forEach(function (row, index) {
      if (index == 0) doc.text(row.title, 11, currentHeight2 + 32);
      else {
        const currentTdWidth = row?.style?.width || tdWidth;
        const previousTdWidth =
          param.invoice.header2[index - 1]?.style?.width || tdWidth;
        const widthToUse =
          currentTdWidth == previousTdWidth ? currentTdWidth : previousTdWidth;
        startWidth += widthToUse;
        doc.text(row.title, startWidth + 11, currentHeight2 + 32);
      }
    });

    currentHeight2 += pdfConfig.subLineHeight - 1;
    doc.setTextColor(colorGray);
  };
  //#endregio
  doc.setFillColor(255, 255, 255);
  let alto = ''
  if(param.invoice.table2.length == 0) alto = 8
  else if(param.invoice.table2.length == 1){
    alto = 12
  }
  else if(param.invoice.table2.length == 2){
    alto = 14
  }
  else if(param.invoice.table2.length == 3){
    alto = 18
  }
  doc.roundedRect(8, currentHeight2 + 46, 200, alto , 3, 3, 'FD')
  addTableHeader2();
  
  var tableBodyLength = param.invoice.table2.length;
  param.invoice.table2.forEach(function (row, index) {


    //get nax height for the current row
    var getRowsHeight = function () {
      let rowsHeight = [];
      row.forEach(function (rr, index) {
        const widthToUse = param.invoice.header2[index]?.style?.width || tdWidth;
//tamaño padding
        let item = splitTextAndGetHeight(rr.toString(), 50 - 1); //minus 1, to fix the padding issue between borders
        rowsHeight.push(item.height);
      });

      return rowsHeight;
    };

    var maxHeight = Math.max(...getRowsHeight());

    //body borders
    if (param.invoice.tableBodyBorder) addTableBodyBorder(maxHeight + 1);
    let startWidth = 0;
    row.forEach(function (rr, index) {
      const widthToUse = param.invoice.header2[index]?.style?.width || tdWidth;
      let item = splitTextAndGetHeight(rr.toString(), 67 - 1); //minus 1, to fix the padding issue between borders
      console.log("texto", rr, "index", index);
      if (index == 0) doc.text(item.text, 11, currentHeight + 8);
      else {
        const currentTdWidth = rr?.style?.width || tdWidth;
        const previousTdWidth =
          param.invoice.header2[index - 1]?.style?.width || tdWidth;
        const widthToUse =
          currentTdWidth == previousTdWidth ? currentTdWidth : previousTdWidth;
        startWidth += widthToUse;
        doc.text(item.text, 11 + startWidth, currentHeight + 8);
      }
    });

    currentHeight += maxHeight - 4;

    //td border height
    currentHeight += 6;

    //pre-increase currentHeight to check the height based on next row
    if (index + 1 < tableBodyLength) currentHeight += maxHeight;

    if (
      param.orientationLandscape &&
      (currentHeight > 185 ||
        (currentHeight > 178 && doc.getNumberOfPages() > 1))
    ) {
      doc.addPage();
      currentHeight = 10;
      if (index + 1 < tableBodyLength) addTableHeader();
    }

    if (
      !param.orientationLandscape &&
      (currentHeight > 220 ||
        (currentHeight > 220 && doc.getNumberOfPages() > 1))
    ) {
      console.log("TAMAÑO MAT", param.invoice.table2.length);
      doc.addPage();
      currentHeight = 10;
      if (index + 1 < tableBodyLength) addTableHeader();
      //else
      //currentHeight += pdfConfig.subLineHeight + 2 + pdfConfig.subLineHeight - 1; //same as in addtableHeader
    }

    //reset the height that was increased to check the next row
    if (index + 1 < tableBodyLength && currentHeight > 30)
      // check if new page
      currentHeight -= maxHeight;
  });
  addTableHeader();

  //#region TABLE BODY
  
  
  var tableBodyLength = param.invoice.table.length;
  param.invoice.table.forEach(function (row, index) {
    doc.line(10, currentHeight, docWidth - 10, currentHeight);

    //get nax height for the current row
    var getRowsHeight = function () {
      let rowsHeight = [];
      row.forEach(function (rr, index) {
        const widthToUse = param.invoice.header[index]?.style?.width || tdWidth;
//tamaño padding
        let item = splitTextAndGetHeight(rr.toString(), 50 - 1); //minus 1, to fix the padding issue between borders
        rowsHeight.push(item.height);
      });

      return rowsHeight;
    };

    var maxHeight = Math.max(...getRowsHeight());

    //body borders
    if (param.invoice.tableBodyBorder) addTableBodyBorder(maxHeight + 1);
    let startWidth = 0;
    row.forEach(function (rr, index) {
      const widthToUse = param.invoice.header[index]?.style?.width || tdWidth;
      let item = splitTextAndGetHeight(rr.toString(), 67 - 1); //minus 1, to fix the padding issue between borders
      console.log("texto", rr, "index", index);
      if (index == 0) doc.text(item.text, 11, currentHeight + 4);
      else {
        const currentTdWidth = rr?.style?.width || tdWidth;
        const previousTdWidth =
          param.invoice.header[index - 1]?.style?.width || tdWidth;
        const widthToUse =
          currentTdWidth == previousTdWidth ? currentTdWidth : previousTdWidth;
        startWidth += widthToUse;
        doc.text(item.text, 11 + startWidth, currentHeight + 4);
      }
    });

    currentHeight += maxHeight - 4;

    //td border height
    currentHeight += 6;

    //pre-increase currentHeight to check the height based on next row
    if (index + 1 < tableBodyLength) currentHeight += maxHeight;

    if (
      param.orientationLandscape &&
      (currentHeight > 185 ||
        (currentHeight > 178 && doc.getNumberOfPages() > 1))
    ) {
      doc.addPage();
      currentHeight = 10;
      if (index + 1 < tableBodyLength) addTableHeader();
    }

    if (
      !param.orientationLandscape &&
      (currentHeight > 220 ||
        (currentHeight > 220 && doc.getNumberOfPages() > 1))
    ) {
      console.log("TAMAÑO MAT", param.invoice.table.length);
      doc.addPage();
      currentHeight = 10;
      if (index + 1 < tableBodyLength) addTableHeader();
      //else
      //currentHeight += pdfConfig.subLineHeight + 2 + pdfConfig.subLineHeight - 1; //same as in addtableHeader
    }

    //reset the height that was increased to check the next row
    if (index + 1 < tableBodyLength && currentHeight > 30)
      // check if new page
      currentHeight -= maxHeight;
  });
  //doc.line(10, currentHeight, docWidth - 10, currentHeight); //if we want to show the last table line
  //#endregion

  var invDescSize = splitTextAndGetHeight(
    param.invoice.invDesc,
    docWidth / 2
  ).height;

  //#region PAGE BREAKER
  var checkAndAddPageLandscape = function () {
    if (!param.orientationLandscape && currentHeight + invDescSize > 270) {
      doc.addPage();
      currentHeight = 10;
    }
  };

  var checkAndAddPageNotLandscape = function (heightLimit = 173) {
    if (
      param.orientationLandscape &&
      currentHeight + invDescSize > heightLimit
    ) {
      doc.addPage();
      currentHeight = 10;
    }
  };
  var checkAndAddPage = function () {
    checkAndAddPageNotLandscape();
    checkAndAddPageLandscape();
  };
  //#endregion

  //#region Stamp
  var addStamp = () => {
    let _addStampBase = () => {
      var stampImage = "";
      if (typeof window === "undefined") {
        stampImage = param.stamp.src;
      } else {
        stampImage = new Image();
        stampImage.src = param.stamp.src;
      }

      if (param.stamp.type)
        doc.addImage(
          stampImage,
          param.stamp.type,
          10 + param.stamp.margin.left,
          docHeight - 22 + param.stamp.margin.top,
          param.stamp.width,
          param.stamp.height
        );
      else
        doc.addImage(
          stampImage,
          10 + param.stamp.margin.left,
          docHeight - 22 + param.stamp.margin.top,
          param.stamp.width,
          param.stamp.height
        );
    };

    if (param.stamp.src) {
      if (param.stamp.inAllPages) _addStampBase();
      else if (
        !param.stamp.inAllPages &&
        doc.getCurrentPageInfo().pageNumber == doc.getNumberOfPages()
      )
        _addStampBase();
    }
  };
  //#endregion

  checkAndAddPage();

  doc.setTextColor(colorBlack);
  doc.setFontSize(pdfConfig.labelTextSize);
  currentHeight += pdfConfig.lineHeight;

  //#region additionalRows
  if (param.invoice.additionalRows?.length > 0) {
    let currentHeightTotal = 229;
    //#region Line breaker before invoce total

    currentHeightTotal += pdfConfig.lineHeight;
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(138, currentHeightTotal, 65, 28, 3, 3, 'FD')
    //#endregion

    for (let i = 0; i < param.invoice.additionalRows.length; i++) {
      currentHeightTotal += pdfConfig.lineHeight;
      doc.setFontSize(param.invoice.additionalRows[i].style.fontSize);

      doc.text(
        docWidth / 1.5,
        currentHeightTotal,
        param.invoice.additionalRows[i].col1,
        "left"
      );
      doc.text(
        docWidth - 25,
        currentHeightTotal,
        param.invoice.additionalRows[i].col2,
        "right"
      );
      doc.text(
        docWidth - 10,
        currentHeightTotal,
        param.invoice.additionalRows[i].col3,
        "right"
      );
      checkAndAddPage();
    }
  }
  //#endregion

  checkAndAddPage();

  doc.setTextColor(colorBlack);
  currentHeight += pdfConfig.subLineHeight;
  currentHeight += pdfConfig.subLineHeight;
  //   currentHeight += pdfConfig.subLineHeight;
  doc.setFontSize(pdfConfig.labelTextSize);

  //#region Add num of pages at the bottom
  if (doc.getNumberOfPages() > 1) {
    for (let i = 1; i <= doc.getNumberOfPages(); i++) {
      doc.setFontSize(pdfConfig.fieldTextSize - 2);
      doc.setTextColor(colorGray);

      if (param.pageEnable) {
        doc.text(docWidth / 2, docHeight - 10, param.footer.text, "center");
        doc.setPage(i);
        doc.text(
          param.pageLabel + " " + i + " / " + doc.getNumberOfPages(),
          docWidth - 20,
          doc.internal.pageSize.height - 6
        );
      }

      checkAndAddPageNotLandscape(183);
      checkAndAddPageLandscape();
      addStamp();
    }
  }
  //#endregion

  //#region INVOICE DESCRIPTION
  var addInvoiceDesc = () => {
    let currentHeightTotal = 233;
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(8, 235, 120, 23, 3, 3, 'FD')
    doc.setFontSize(pdfConfig.labelTextSize);
    doc.setTextColor(colorBlack);
 
    doc.text(param.invoice.invDescLabel, 10, currentHeightTotal);
   
    if(cabecera.est_doc_fk == 2){
      doc.addImage(
        param.invoice.logo.src,
        param.logo.type,
        80,
        257,
        param.logo.width,
        param.logo.height
      );
      doc.text(param.invoice.firma, 89, 280);
    }
    

    currentHeightTotal += pdfConfig.subLineHeight;
    doc.setTextColor(colorGray);
    doc.setFontSize(pdfConfig.fieldTextSize - 1);

    var lines = doc.splitTextToSize(param.invoice.invDesc, docWidth / 2);
    //text in left half
    doc.text(lines, 10, currentHeightTotal);
    currentHeightTotal +=
      doc.getTextDimensions(lines).h > 5
        ? doc.getTextDimensions(lines).h + 6
        : pdfConfig.lineHeight;

    return currentHeightTotal;
  };
  addInvoiceDesc();
  //#endregion

  addStamp();

  //#region Add num of first page at the bottom
  if (doc.getNumberOfPages() === 1 && param.pageEnable) {
    doc.setFontSize(pdfConfig.fieldTextSize - 2);
    doc.setTextColor(colorGray);
    doc.text(docWidth / 2, docHeight - 10, param.footer.text, "center");
    doc.text(
      param.pageLabel + "1 / 1",
      docWidth - 20,
      doc.internal.pageSize.height - 6
    );
  }
  //#endregion

  let returnObj = {
    pagesNumber: doc.getNumberOfPages(),
  };

  if (param.returnJsPDFDocObject) {
    returnObj = {
      ...returnObj,
      jsPDFDocObject: doc,
    };
  }

  const totalPages = doc.internal.getNumberOfPages();

  // const aprobado = new Image();
  // aprobado.src

  // logFileText('../assets/images/pdf/aprobado.txt')
  console.log('jsonFile: ', jsonFile)
  // const mydata = JSON.parse(jsonFile)
  // console.log("MyData: ", mydata);

  let mw = new Image();
  // mw.src = require('../assets/images/pdf/Aprobado.png');
  // mw.onload = () => {
  //   console.log('paso: ');
  //   doc.saveGraphicsState();
  //   doc.setGState(new doc.GState({ opacity: 0.2 }));
  //   // doc.text(65, 220, 'hello world', null, 55);
  //   // doc.addImage(nota, "PNG", 100, 240, 35, 35);
  //   doc.addImage(nota, "PNG", 105, 250, 35, 35, null, 'NONE', 23);
  //   doc.restoreGraphicsState();
  //   doc.addImage(mw, "PNG", 20, 20, 35, 35, null, 'NONE', 23);
  // }
  console.log('PDF cabecera.est_doc_fk: ', cabecera.est_doc_fk)
  if(cabecera.est_doc_fk == 2){
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.2 }));
    doc.addImage(jsonFile.aprobada, "PNG", 100, 245, 35, 35, null, 'NONE', -15);
    doc.restoreGraphicsState();
  }else{
    let img = ''
    if(cabecera.est_doc_fk == 1){ // En aprobacion
      img = jsonFile.enaprobacion
    }else if(cabecera.est_doc_fk == 3){ // Rechazado
      img = jsonFile.rechazada
    }else if(cabecera.est_doc_fk == 5){ // Cancelado
      img = jsonFile.rechazada
    }

    for (let i = 1; i <= totalPages; i++) {

      doc.setFontSize(20);
      doc.text(33, 280, ``);
      // doc.setPage(i);
  
      // doc.saveGraphicsState();
      // doc.setGState(new doc.GState({ opacity: 0.2 }));
      // doc.addImage(img, "PNG", 80, 150, 50, 20, null, 'NONE', 50);
      // doc.restoreGraphicsState();
    } 
  }
  doc.setFontSize(20);
 

  if (param.outputType === "save"){
    if(formato == 1){
      doc.save(param.fileName);
    }
    else if(formato == 2){
      return doc.output('datauristring')
    }
  } 
  else if (param.outputType === "blob") {
    const blobOutput = doc.output("blob");
    returnObj = {
      ...returnObj,
      blob: blobOutput,
    };
  } else if (param.outputType === "datauristring") {
    returnObj = {
      ...returnObj,
      dataUriString: doc.output("datauristring", {
        filename: param.fileName,
      }),
    };
  } else if (param.outputType === "arraybuffer") {
    returnObj = {
      ...returnObj,
      arrayBuffer: doc.output("arraybuffer"),
    };
  } else
    doc.output(param.outputType, {
      filename: param.fileName,
    });

  // let pdfObject = jsPDFInvoiceTemplate(props);
  // console.log('props',props)
  // console.log('pdfObject',pdfObject)
  // // var pdfCreated = pdfObject

  // // pdfCreated.jsPDFDocObject.addPage();
  // // pdfCreated.jsPDFDocObject.text("Test text", 10, 50);

  // // pdfCreated.jsPDFDocObject.save();
  // } catch (error) {
  //   console.log("error",error)
  // }
  // html2pdf($refs.download, {
  //   margin: [0, 0, 30, 0], //top, left, buttom, right,
  //   filename: `Orden de Compra - ${cabecera.identificacion}.pdf`,
  //   image: {type: 'jpeg',quality: 0.98},
  //   html2canvas: {dpi: 192, scale: 2, letterRendering: true},
  //   pageBreak: { mode: 'css', after:'.break-page'},
  //   jsPDF: {orientation: 'p',
  //   unit: 'mm',
  //   format: 'a4',
  //   putOnlyUsedFonts:true,
  //   floatPrecision: 16}
  // })
}

const logFileText = async file => {
  const response = await fetch(file)
  const text = await response.text()
  console.log(text)
}

export { creaPdfFactura };