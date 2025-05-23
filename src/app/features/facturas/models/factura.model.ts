

/**
 * Modelo de los detalles de la factura
 */
export interface DetalleFactura {
    idProducto: number;
    nombreProducto: string;
    cantidad: number;
    precioUnitario: number;
    totalProducto: number;
    imagenProducto: string;
}

/**
 * Modelo de la factura
 */
export interface Factura {
    idCliente: number;
    numeroFactura: number;
    fechaEmisionFactura: Date;
    detalles: DetalleFactura[];
    subTotalFacturas: number;
    totalImpuestos: number;
    totalFactura: number;
}
