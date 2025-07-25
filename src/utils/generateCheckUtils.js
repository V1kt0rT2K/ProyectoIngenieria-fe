import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Registrar las fuentes
//pdfMake.vfs = pdfFonts.pdfMake.vfs;

// pdfMake.fonts = {
//   Courier: {
//     normal: 'Courier',
//     bold: 'Courier-Bold',
//     italics: 'Courier-Oblique',
//     bolditalics: 'Courier-BoldOblique'
//   },
//   Helvetica: {
//     normal: 'Helvetica',
//     bold: 'Helvetica-Bold',
//     italics: 'Helvetica-Oblique',
//     bolditalics: 'Helvetica-BoldOblique'
//   },
//   Times: {
//     normal: 'Times-Roman',
//     bold: 'Times-Bold',
//     italics: 'Times-Italic',
//     bolditalics: 'Times-BoldItalic'
//   },
//   Symbol: {
//     normal: 'Symbol'
//   },
//   ZapfDingbats: {
//     normal: 'ZapfDingbats'
//   }
// };


export const generateInvoicePdf = (checkSaleData) => {

  const productTableBody = [
    [
      { text: 'Producto', bold: true },
      { text: 'Descripción', bold: true },
      { text: 'Precio Unitario', bold: true },
      { text: 'Cantidad', bold: true },
      { text: 'Total', bold: true }
    ],
    ...checkSaleData.Products.map(item => [
      item.productName,
      item.productDescription,
      `L. ${item.price.toFixed(2)}`,
      item.SalesChecksDetail.quantity,
      `L. ${(item.price * item.SalesChecksDetail.quantity).toFixed(2)}`
    ])
  ];

  const docDefinition = {
    content: [
      { text: 'Factura de Venta', style: 'header', alignment: 'center' },
      { text: `Cliente: ${checkSaleData.idClient}`, margin: [0, 10, 0, 0] },
      { text: `Fecha: ${checkSaleData.generationDate}`, margin: [0, 0, 0, 10] },
      { text: `Rango Inicio: ${checkSaleData.CaiCodeRange.startRange}`, margin: [0, 0, 0, 10] },
      { text: `Rango Final: ${checkSaleData.CaiCodeRange.endRange}`, margin: [0, 0, 0, 10] },
      
      {
        table: {
          widths: ['*', '*', 'auto', 'auto', 'auto'],
          body: productTableBody
        }
      },

      { width: '*', text: '' },
      {
        width: 'auto',
        margin: [390, 20, 0, 0],
        alignment: 'center',
        table: {
          body: [
            ['Subtotal', `L. ${(checkSaleData.subTotal).toFixed(2)}`],
            ['ISV (15%)', `L. ${(checkSaleData.ISV).toFixed(2)}`],
            [{ text: 'Total', bold: true }, { text: `L. ${(checkSaleData.subTotal + checkSaleData.ISV).toFixed(2)}`, bold: true }]
          ]
        }
      },
      { width: '*', text: '' }
    ],
    // styles: {
    //   header: {
    //     fontSize: 18,
    //     bold: true
    //   }
    // },
    // defaultStyle: {
    //     font: 'Helvetica'
    // }
  };

  pdfMake.createPdf(docDefinition).download(`Factura_${checkSaleData.generationDate}.pdf`);
};
