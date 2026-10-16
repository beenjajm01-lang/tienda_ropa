// Cálculos de precios del carrito y de los productos.

// Si el producto está en oferta, se cobra el precio de oferta
export function precioFinal(producto) {
  if (producto.enOferta && producto.precioOferta) {
    return producto.precioOferta;
  }
  return producto.precio;
}

// Porcentaje de descuento redondeado. Ej: 49990 -> 39990 = 20%
export function porcentajeDescuento(producto) {
  if (!producto.enOferta || !producto.precioOferta) return 0;
  return Math.round((1 - producto.precioOferta / producto.precio) * 100);
}

// Subtotal de un artículo del carrito: precio x cantidad
export function calcularSubtotal(item) {
  return precioFinal(item) * item.cantidad;
}

// Total de la compra: suma de todos los subtotales (ya con descuentos)
export function calcularTotal(items) {
  return items.reduce((suma, item) => suma + calcularSubtotal(item), 0);
}

// Total sin descuentos (para mostrar cuánto se ahorra)
export function calcularTotalSinDescuento(items) {
  return items.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
}

// Cuántas camisetas hay en el carrito
export function contarUnidades(items) {
  return items.reduce((suma, item) => suma + item.cantidad, 0);
}

// En Chile los precios incluyen IVA (19%). Para la boleta se separa el neto y el IVA
export function desglosarIva(total) {
  const neto = Math.round(total / 1.19);
  return { neto, iva: total - neto };
}

// Talla que se agrega cuando se compra desde la tarjeta (sin elegir talla)
export function tallaPorDefecto(producto) {
  const tallas = producto.tallas ?? [];
  if (tallas.includes('M')) return 'M';
  return tallas[0] ?? 'Única';
}
