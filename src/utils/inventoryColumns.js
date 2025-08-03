export const inventoryColumns = {
  productos: [
    { label: "No. Lote", field: "idproductBatch" },
    { label: "Producto", field: "nombreProducto" },
    { label: "Fecha de Expiracion", field: "fechaExpiracion" },
    { label: "Cantidad", field: "CantidadRestante" },
    { label: "Precio por libra", field: "precioProducto" },
    { label: "Punto de Reorden", field: "PuntodeReorden" },
  ],
  lotes: [
    { label: "No. de lote", field: "id" },
    { label: "Cantidad Inicial", field: "Cantidad" },
    { label: "Cerdos Actual", field: "CantidadRestante" },
    { label: "Fecha de Nacimiento", field: "fechadeNacimiento" },
    { label: "Fecha de Ingreso", field: "fecha" },
    { label: "Etapa", field: "etapa" },
  ],
  insumos: [
    { label: "ID Lote", field: "id" },
    { label: "Insumo", field: "insumo" },
    { label: "Tipo de Insumo", field: "tipo" },
    { label: "Cantidad", field: "cantidad" },
    { label: "Fecha de Vencimiento", field: "fecha" },
  ],
};
