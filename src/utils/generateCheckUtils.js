import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { imageLogo } from "../assets/images/imagenBase64";
//import logo from '../../assets/images/logo.png';

// Registrar las fuentes
pdfMake.vfs = pdfFonts.vfs;

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

//const logoUrl = new URL('../../assets/images/logo.png', import.meta.url).href;


// const toBase64 = async (url) => {
//     const res = await fetch(url);
//     const blob = await res.blob();
//     return new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result); // aquí sale el base64
//         reader.readAsDataURL(blob);
//     });
// };

// const getBase64FromUrl = async (url) => {
//   const response = await fetch(url);
//   const blob = await response.blob();

//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result); // ← data:image/png;base64,...
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });
// };

export const generateInvoicePdf = async (checkSaleData) => {

    //const logoBase64 = await toBase64(logoUrl);
    // const imageBase64 = await getBase64FromUrl("https://i.imgur.com/https://i.postimg.cc/ZRL34zXv/logo.png.png");
    // console.log(imageBase64);

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
            // { text: 'Factura de Venta', style: 'header', alignment: 'center' },,
            { 
                columns : [
                    { image: imageLogo, width: 80, alignment: 'left', marginLeft: 10}, 
                    [
                        { text: 'Granja el Rancherito', style: 'header', alignment: 'right' },
                        { text: 'Sabanagrande, Francisco Morazán', style: 'header', alignment: 'right' },
                        { text: 'Teléfono: 2262-1565, Email:granjaracherito@gmail.com', style: 'header', alignment: 'right' },
                        { text: 'CAI: 35DB45-58RFG5-34DF3R-23KGT5-98UIP4-2A', style: 'header', alignment: 'right' },
                        { text: 'RTN: 2711-5621-12281',style: 'header', alignment: 'right' },
                        { text: `No. Factura: ${checkSaleData.saleCheckCode}`,style: 'header', alignment: 'right' },
                    ]
                ]
            },
            { text: `Cliente: ${checkSaleData.idClient ? checkSaleData.idClient : "Cliente Final"}`, margin: [0, 10, 0, 0] },
            { text: `Fecha: ${new Date(checkSaleData.generationDate).toDateString()}`, margin: [0, 0, 0, 10] },
            // { text: `Rango Inicio: ${checkSaleData.CaiCodeRange.startRange}`, margin: [0, 0, 0, 10] },
            // { text: `Rango Final: ${checkSaleData.CaiCodeRange.endRange}`, margin: [0, 0, 0, 10] },
            { text: `Rango Inicial: ${checkSaleData.CaiCodeRange.startRange}`, margin: [0, 0, 0, 10] },
            { text: `Rango Final: ${checkSaleData.CaiCodeRange.endRange}`, margin: [0, 0, 0, 10] },
            { text: `Cajero: ${checkSaleData.User.Person.firstName}  ${checkSaleData.User.Person.lastName}`, margin: [0, 0, 0, 10] },

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
