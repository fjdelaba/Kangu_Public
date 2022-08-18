/* eslint-disable */

import { specifiedScalarTypes } from 'graphql';
import jsPDF from 'jspdf';
import {getDetalleOC} from '../../../graphql/adquisiciones'

export default {

  components: {

  },
  props: {
    materiales:[],
    cabecera:''
  },

  data() {
    return {
      datosEmpresa:'',
      logo:'',
      materialesPDF:[],
      neto:'',
      impuesto:{},
      total:'',
      cabecera:{},
      id:157
    };
  },
  methods: {
    async cargarMaterialesOc(){
        const { data: {kangusoft_oc_det,kangusoft_oc} } = await getDetalleOC(this.id)
        console.log("MATERIALES:",kangusoft_oc_det)
        this.materialesPDF = kangusoft_oc_det
        console.log("OC:", kangusoft_oc[0])
        this.cabecera.nombre = kangusoft_oc[0].nombre
        this.cabecera.impuestos = kangusoft_oc[0].impuestos
        this.cabecera.neto = kangusoft_oc[0].neto
        this.cabecera.tipoDocumento = kangusoft_oc[0].doc_tip.nombre
        this.cabecera.identificacion = kangusoft_oc[0].identificacion
        this.cabecera.comentarioPDF = kangusoft_oc[0].comentario_pdf
        this.cabecera.comentario = kangusoft_oc[0].comentario
        this.cabecera.proveedor.razon_social = kangusoft_oc[0].ent.razon_social
        this.cabecera.proveedor.email = kangusoft_oc[0].ent_con.email
        this.cabecera.proveedor.nombreContacto =  kangusoft_oc[0].ent_con.nombre
        this.cabecera.proveedor.rut = kangusoft_oc[0].ent.rut
        this.cabecera.proveedor.direccion = kangusoft_oc[0].ent.direccion
        this.cabecera.proyecto.nombre = kangusoft_oc[0].pro.nombre
        this.cabecera.proyecto.direccion = kangusoft_oc[0].pro.direccion
        this.cabecera.moneda.nombre = kangusoft_oc[0].mon.nombre
        this.cabecera.moneda.id = kangusoft_oc[0].mon.id
        this.cabecera.contacto.nombre = kangusoft_oc[0].ent_con.nombre
        this.cabecera.contacto.email = kangusoft_oc[0].ent_con.email
        this.cabecera.formaPago.nombre =  kangusoft_oc[0].for_pag.nombre
        this.cabecera.tipoDespacho.nombre = kangusoft_oc[0].des_tip.nombre
        this.cabecera.est_doc_fk = Number(kangusoft_oc[0].est_doc_fk)
        this.cabecera.id = kangusoft_oc[0].id
        this.tipo_documento = kangusoft_oc[0].doc_tip_fk
        console.log("cabecera",this.cabecera)
    },
    exportToPDF() {
      // try {
          var img = new Image();
          img.src = require('./assets/img/logo_dlb.png');
          var img2 = new Image();
          img2.src = require('./assets/img/Firma_de_Harold.jpeg');
      
        let options = { style: 'currency', currency: 'CLP' }
        let formatoCL = new Intl.NumberFormat('es-CL', options)
        let formatoCantidad = new Intl.NumberFormat('es-CL')
        if(this.cabecera.proveedor.direccion == null) this.cabecera.proveedor.direccion = 'Sin Dirección'
        let props = {
          returnJsPDFDocObject: true,
          fileName: `Orden de Compra - ${this.cabecera.identificacion}.pdf`,
          orientationLandscape: false,
          compress: true,
          logo: {
            src: img.src,
            width: 53.33, //aspect ratio = width/height
            height: 26.66,
            margin: {
                top: 0, //negative or positive num, from the current position
                left: 0 //negative or positive num, from the current position
            }
        },
          stamp: {
              inAllPages: true, //by default = false, just in the last page
              // src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
              type: 'JPG', //optional, when src= data:uri (nodejs case)
              width: 20, //aspect ratio = width/height
              height: 20,
              margin: {
                  top: 0, //negative or positive num, from the current position
                  left: 0 //negative or positive num, from the current position
              }
          },
          business: {
              name: "DLB PRUEBA",
              address: "AV LAS TORRES",
              phone: "19996791-7",
              email: 'info@dlb.cl',
              email_1: '+56 2 5555555',
              website: 'Constructora',
          },
          contact: {
              address: `Razon Social: ${this.cabecera.proveedor.razon_social}`,
              phone: `R.U.T: ${this.cabecera.proveedor.rut}`,
              email: `Dirección: ${this.cabecera.proveedor.direccion}`,
              otherInfo: `Contacto: ${this.cabecera.proveedor.email} - ${this.cabecera.proveedor.nombreContacto}`,
              pago:''
          },
          contact2: {
            address: `Nombre Documento: ${this.cabecera.nombre}`,
            phone:`Obra:  ${this.cabecera.proyecto.nombre} -  ${this.cabecera.proyecto.codigo}`,
            email: `Dirección: ${this.cabecera.proyecto.direccion}`,
            otherInfo: `Condición: ${this.cabecera.formaPago.nombre} - ${this.cabecera.moneda.nombre}`,
            pago: `Despacho: ${this.cabecera.tipoDespacho.nombre}`
        },
          invoice: {
              label: "Orden de Compra: OC-fafd1231sdf-28",
              num: 19,
              invDate: `Fecha de Emision: 21/07/2022`,
              invGenDate: `Fecha de descarga: ${this.cpxFecha}`,
              headerBorder: false,
              tableBodyBorder: false,
              header: [
                {
                  title: "#", 
                  style: { 
                    width: 10 
                  } 
                }, 
                { 
                  title: "Material",
                  style: {
                    width: 78,
                    fontSize: 12 
                  } 
                }, 
                { title: "Cantidad"},
                { title: "Precio"},
                { title: "SubTotal",
      }
              ],
              
              table: Array.from(this.materialesPDF, (item, index)=>([
                  index + 1,
                  item.mat.nombre + ' - ' +  item.mat.mat_uni.nombre + ` (Obs: Pintura Codigo #2301)`,
                  formatoCantidad.format(item.cantidad),
                  formatoCL.format(item.precio_unitario),
                  formatoCL.format(item.total)
      
              ])),
              additionalRows: [{
                  col1: 'Neto:',
                  col2: formatoCL.format(this.neto),
                  col3: 'CLP',
                  style: {
                      fontSize: 12 //optional, default 12
                  }
              },
              {
                  col1: this.impuesto.nombre,
                  col2: formatoCL.format(this.impuesto.valor),
                  col3:  'CLP',
                  style: {
                      fontSize: 12 //optional, default 12
                  }
              },
              {
                  col1: 'Total:',
                  col2: formatoCL.format(this.total),
                  col3: 'CLP',
                  style: {
                      fontSize: 12 //optional, default 12
                  }
              }],
              invDescLabel: "Información Adicional",
              invDesc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
              firma:'Felipe Allendes',
              logo: {
                src: img2.src,
                width: 53.33, //aspect ratio = width/height
                height: 26.66,
                margin: {
                    top: 0, //negative or positive num, from the current position
                    left: 0 //negative or positive num, from the current position
                }
            },
            },
          footer: {
              text: "DOCUMENTO GENERADOR POR KANGUSOFT PARA EMPRESA: DLB_PRUEBA",
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
            contact: {
              label: props.contact?.label || "",
              name: props.contact?.name || "",
              address: props.contact?.address || "",
              phone: props.contact?.phone || "",
              email: props.contact?.email || "",
              otherInfo: props.contact?.otherInfo || "",
              pago: props.contact?.pago || "",
            },
            contact2: {
              label: props.contact2?.label || "",
              name: props.contact2?.name || "",
              address: props.contact2?.address || "",
              phone: props.contact2?.phone || "",
              email: props.contact2?.email || "",
              otherInfo: props.contact2?.otherInfo || "",
              pago:props.contact2?.pago || "",
            },
            invoice: {
              label: props.invoice?.label || "",
              num: props.invoice?.num || "",
              invDate: props.invoice?.invDate || "",
              invGenDate: props.invoice?.invGenDate || "",
              headerBorder: props.invoice?.headerBorder || false,
              tableBodyBorder: props.invoice?.tableBodyBorder || false,
              header: props.invoice?.header || [],
              table: props.invoice?.table || [],
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
              additionalRows: props.invoice?.additionalRows?.map(x => {
                return {
                  col1: x?.col1 || "",
                  col2: x?.col2 || "",
                  col3: x?.col3 || "",
                  style: {
                    fontSize: x?.style?.fontSize || 12,
                  }
                }
              })
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
          var colorGray = "#4d4e53";
          //starting at 15mm
          var currentHeight = 15;
          var currentHeightEmpresa = 16;
          //var startPointRectPanel1 = currentHeight + 6;
        
          var pdfConfig = {
            headerTextSize: 20,
            labelTextSize: 12,
            fieldTextSize: 10,
            fieldTextSizeEmpresa: 8,
            lineHeight: 6,
            subLineHeight: 4,
            subLineHeight2: 15,
          };
        
          doc.setFontSize(13);
          doc.setTextColor('#000000');
          doc.text(docWidth - 10, currentHeightEmpresa, param.business.name, "right");
          doc.setFontSize(pdfConfig.fieldTextSizeEmpresa);
        
          if (param.logo.src) {
            var imageHeader = '';
            if (typeof window === "undefined") {
              imageHeader = param.logo.src;
            } else {
              imageHeader = new Image();
              imageHeader.src = param.logo.src;
            }
            //doc.text(htmlDoc.sessionDateText, docWidth - (doc.getTextWidth(htmlDoc.sessionDateText) + 10), currentHeight);
            if (param.logo.type)
              doc.addImage(
                imageHeader,
                param.logo.type,
                10 + param.logo.margin.left,
                currentHeight - 5 + param.logo.margin.top,
                param.logo.width,
                param.logo.height
              );
            else
              doc.addImage(
                imageHeader,
                10 + param.logo.margin.left,
                currentHeight - 5 + param.logo.margin.top,
                param.logo.width,
                param.logo.height
              );
          }
        
          doc.setTextColor(colorGray);
        
          currentHeight += pdfConfig.subLineHeight;
          currentHeight += pdfConfig.subLineHeight;
          doc.text(docWidth - 10, 20, param.business.address, "right");
          currentHeight += pdfConfig.subLineHeight;
          doc.text(docWidth - 10, 24, param.business.phone, "right");
          doc.setFontSize(pdfConfig.fieldTextSizeEmpresa);
          // doc.setTextColor(colorGray);
          currentHeight += pdfConfig.subLineHeight;
          doc.text(docWidth - 10, 28, param.business.email, "right");
        
          currentHeight += pdfConfig.subLineHeight;
          doc.text(docWidth - 10, 32, param.business.email_1, "right");
        
          currentHeight += pdfConfig.subLineHeight;
          doc.text(docWidth - 10, 36, param.business.website, "right");
        
          //line breaker after logo & business info
          if (param.invoice.header.length) {
            currentHeight += pdfConfig.subLineHeight;
            doc.line(10, currentHeight, docWidth - 10, currentHeight);
          }
        
          //Contact part
          doc.setTextColor(colorGray);
          doc.setFontSize(pdfConfig.fieldTextSize);
          currentHeight += pdfConfig.lineHeight;
          if (param.contact.label) {
            doc.text(10, currentHeight, param.contact.label);
            currentHeight += pdfConfig.lineHeight;
          }
        
          doc.setTextColor(colorBlack);
          doc.setFontSize(pdfConfig.headerTextSize - 10);
          if (param.contact.name) doc.text(10, currentHeight, param.contact.name);
        
          if (param.invoice.label && param.invoice.num) {
            doc.text(
              docWidth - 10,
              currentHeight,
              param.invoice.label ,
              "right"
            );
          }
      
          //end contact part
        
      //Contact part
      doc.setTextColor(colorGray);
      doc.setFontSize(pdfConfig.fieldTextSize);
      currentHeight += pdfConfig.lineHeight;
      
      if (param.contact2.name) doc.text(10, currentHeight, param.contact2.name);
      
      
      
      if (param.contact2.name )
        currentHeight += pdfConfig.subLineHeight;
      
      doc.setTextColor(colorGray);
      doc.setFontSize(pdfConfig.fieldTextSize - 2);
      
      if (param.contact2.address ) {
        doc.text(10, currentHeight, param.contact.address);
        doc.text(docWidth - 10, currentHeight, param.contact2.address, "right");
        currentHeight += pdfConfig.subLineHeight;
      }
      
      if (param.contact2.phone ) {
        doc.text(10, currentHeight, param.contact.phone);
        doc.text(docWidth - 10, currentHeight, param.contact2.phone, "right");
        currentHeight += pdfConfig.subLineHeight;
      }
      
      if (param.contact.email) {
        doc.text(10, currentHeight, param.contact.email);
        doc.text(docWidth - 10, currentHeight, param.contact2.email, "right");
        currentHeight += pdfConfig.subLineHeight;
      }
      
      if (param.contact2.otherInfo){
        doc.text(10, currentHeight, param.contact.otherInfo);
        doc.text(docWidth - 10, currentHeight, param.contact2.otherInfo, "right");
        currentHeight += pdfConfig.subLineHeight;
      }
      if (param.contact2.pago){
        doc.text(10, currentHeight, param.contact.pago);
        doc.text(docWidth - 10, currentHeight, param.contact2.pago, "right");
        currentHeight += pdfConfig.subLineHeight;
      }
        
      //end contact part
      
      
      
      
          //TABLE PART
          //var tdWidth = 31.66;
          //10 margin left - 10 margin right
          var tdWidth = (doc.getPageWidth() - 20) / param.invoice.header.length;
        
          //#region TD WIDTH
          if (param.invoice.header.length > 2) { //add style for 2 or more columns
            const customColumnNo = param.invoice.header.map(x => x?.style?.width || 0).filter(x => x > 0);
            let customWidthOfAllColumns = customColumnNo.reduce((a, b) => a + b, 0);
            tdWidth = (doc.getPageWidth() - 20 - customWidthOfAllColumns) / (param.invoice.header.length - customColumnNo.length);
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
                const previousTdWidth = param.invoice.header[i - 1]?.style?.width || tdWidth;
                const widthToUse = currentTdWidth == previousTdWidth ? currentTdWidth : previousTdWidth;
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
                const previousTdWidth = param.invoice.header[i - 1]?.style?.width || tdWidth;
                const widthToUse = currentTdWidth == previousTdWidth ? currentTdWidth : previousTdWidth;
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
            doc.setFontSize(pdfConfig.fieldTextSize);
            //border color
            doc.setDrawColor(colorGray);
            currentHeight += 2;
        
            let startWidth = 0;
            param.invoice.header.forEach(function (row, index) {
              if (index == 0) doc.text(row.title, 11, currentHeight);
              else {
                const currentTdWidth = row?.style?.width || tdWidth;
                const previousTdWidth = param.invoice.header[index - 1]?.style?.width || tdWidth;
                const widthToUse = currentTdWidth == previousTdWidth ? currentTdWidth : previousTdWidth;
                startWidth += widthToUse;
                doc.text(row.title, startWidth + 11, currentHeight);
              }
            });
        
            currentHeight += pdfConfig.subLineHeight - 1;
            doc.setTextColor(colorGray);
          };
          //#endregion
        
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
             
                let item = splitTextAndGetHeight(rr.toString(), widthToUse - 1); //minus 1, to fix the padding issue between borders
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
              let item = splitTextAndGetHeight(rr.toString(), widthToUse - 1); //minus 1, to fix the padding issue between borders
              console.log("texto", rr, "index", index)
              if (index == 0) doc.text(item.text, 11, currentHeight + 4);
              else {
                const currentTdWidth = rr?.style?.width || tdWidth;
                const previousTdWidth = param.invoice.header[index - 1]?.style?.width || tdWidth;
                const widthToUse = currentTdWidth == previousTdWidth ? currentTdWidth : previousTdWidth;
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
              console.log("TAMAÑO MAT", param.invoice.table.length)
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
          }
        
          var checkAndAddPageNotLandscape = function (heightLimit = 173) {
            if (param.orientationLandscape && currentHeight + invDescSize > heightLimit) {
              doc.addPage();
              currentHeight = 10;
            }
          }
          var checkAndAddPage = function () {
            checkAndAddPageNotLandscape();
            checkAndAddPageLandscape();
          }
          //#endregion
        
          //#region Stamp
          var addStamp = () => {
            let _addStampBase = () => {
              var stampImage = '';
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
              if (param.stamp.inAllPages)
                _addStampBase();
              else if (!param.stamp.inAllPages && doc.getCurrentPageInfo().pageNumber == doc.getNumberOfPages())
                _addStampBase();
            }
          }
          //#endregion
        
          checkAndAddPage();
        
          doc.setTextColor(colorBlack);
          doc.setFontSize(pdfConfig.labelTextSize);
          currentHeight += pdfConfig.lineHeight;
        
          //#region additionalRows
          if (param.invoice.additionalRows?.length > 0) {
            let currentHeightTotal = 222
            //#region Line breaker before invoce total
         
            currentHeightTotal += pdfConfig.lineHeight;
            //#endregion
        
            for (let i = 0; i < param.invoice.additionalRows.length; i++) {
              currentHeightTotal += pdfConfig.lineHeight;
              doc.setFontSize(param.invoice.additionalRows[i].style.fontSize);
        
              doc.text(docWidth / 1.5, currentHeightTotal, param.invoice.additionalRows[i].col1, "left");
              doc.text(docWidth - 25, currentHeightTotal, param.invoice.additionalRows[i].col2, "right");
              doc.text(docWidth - 10, currentHeightTotal, param.invoice.additionalRows[i].col3, "right");
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
            let currentHeightTotal = 233
            doc.setFontSize(pdfConfig.labelTextSize);
            doc.setTextColor(colorBlack);
        
            doc.text(param.invoice.invDescLabel, 10, currentHeightTotal);
            doc.addImage(
              param.invoice.logo.src,
              param.logo.type,
              80, 257,
              param.logo.width,
              param.logo.height
            );
            doc.text(param.invoice.firma, 89, 280);
           
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
      
            // const nota = "./assets/img/descarga.png"
            const totalPages = doc.internal.getNumberOfPages();
            console.log("TOTALPAGE", totalPages)
            for (let i = 1; i <= totalPages; i++) {
              console.log("entre")
              doc.setPage(i);
             
              doc.saveGraphicsState();
              doc.setGState(new doc.GState({opacity: 0.2}));
              // doc.text(65, 220, 'hello world', null, 55);
              // doc.addImage(nota, 'PNG', 40, 30, 100, 200);
               doc.restoreGraphicsState();
              doc.setTextColor(150);
              doc.setFontSize(140);
              //doc.text(50, doc.internal.pageSize.height - 30, 'Watermark');
              // doc.text(65, 220, 'hello world', null, 55);
            }
          
          
        
          if (param.outputType === "save") doc.save(param.fileName);
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
              // html2pdf(this.$refs.download, {
              //   margin: [0, 0, 30, 0], //top, left, buttom, right,
              //   filename: `Orden de Compra - ${this.cabecera.identificacion}.pdf`,
              //   image: {type: 'jpeg',quality: 0.98},
              //   html2canvas: {dpi: 192, scale: 2, letterRendering: true},
              //   pageBreak: { mode: 'css', after:'.break-page'},
              //   jsPDF: {orientation: 'p',
              //   unit: 'mm',
              //   format: 'a4',
              //   putOnlyUsedFonts:true,
              //   floatPrecision: 16}
              // })
            
            },
 
  },
  mounted() {
    this.cargarMaterialesOc()
    if (this.$auth.isLoading == false) {
      this.datosEmpresa = this.$store.state.app.datosEmpresa;
      this.datosUsuario = this.$store.state.app.datosUsuario;
      this.logo =   this.datosEmpresa.logo
    }
    console.log("EMPRESA:", this.datosEmpresa, "USUARIO:", this.datosUsuario);
  
    for(let mat of this.materiales){
      console.log("aa",mat)
      this.materialesPDF.push(mat)
    }
    if(this.materialesPDF.length > 0){
      let tablaMateriales = document.getElementById('materialesPDF')
      let cuerpoTabla = document.createElement('tbody')
      let options = { style: 'currency', currency: 'CLP' }
      let formatoCL = new Intl.NumberFormat('es-CL', options)
      let formatoCantidad = new Intl.NumberFormat('es-CL')

      this.materialesPDF.forEach(p => {
          let fila = document.createElement('tr')
          let td =  document.createElement('td')
        
          td.innerText = p.mat.nombre + ' - ' + p.mat.mat_uni.nombre
          td.style.fontSize = '11px'
          fila.appendChild(td)

          td =  document.createElement('td')
          td.innerText = formatoCantidad.format(p.cantidad) 
          td.style.fontSize = '11px'
          console.log("neto:", p.total * this.materialesPDF.length)
          fila.appendChild(td)

          td =  document.createElement('td')
          td.innerText = formatoCL.format(p.precio_unitario )
          td.style.fontSize = '11px'
          fila.appendChild(td)

          td =  document.createElement('td')
          td.innerText = formatoCL.format(p.total)
          td.style.fontSize = '11px'
          fila.appendChild(td)
          cuerpoTabla.appendChild(fila)

          this.neto = p.total * this.materialesPDF.length
          if(this.tipo_documento == 3){
            // factura
            this.impuesto ={valor:  this.neto * 0.19, nombre: 'IVA (19%)'}
          } 
          this.total = this.impuesto.valor + this.neto
         
    
          
      });
      tablaMateriales.appendChild(cuerpoTabla)
      
      

    }
   
  },
  watch: {
    "$auth.isLoading"(newCount, oldCount) {
      console.log(
        `Listado - We have ${newCount} fruits now, yay!. ${oldCount}`
      );
      if (newCount === false) {
        this.datosEmpresa = this.$store.state.app.datosEmpresa;
        this.datosUsuario = this.$store.state.app.datosUsuario;
        console.log(
          "EMPRESA:",
          this.datosEmpresa,
          "USUARIO:",
          this.datosUsuario
        );
      }
    },
   
  },
  
  computed: {
    cpxFecha() {
      return this.$moment(new Date()).format("DD/MM/yy");
    },
  },
};