// Muestra el precio de un producto.
// Si está en oferta: precio de oferta en rojo y el precio normal tachado.

import { formatearPrecio } from '../utils/formato';

function PrecioProducto({ producto, grande = false }) {
  const estiloTamano = grande ? { fontSize: '2.6rem' } : undefined;

  if (producto.enOferta && producto.precioOferta) {
    return (
      <div className="d-flex align-items-baseline gap-2 flex-wrap">
        <span className="precio precio--oferta" style={estiloTamano}>
          {formatearPrecio(producto.precioOferta)}
        </span>
        <del className="precio-anterior">
          <span className="visually-hidden">Precio normal </span>
          {formatearPrecio(producto.precio)}
        </del>
      </div>
    );
  }

  return (
    <span className="precio" style={estiloTamano}>
      {formatearPrecio(producto.precio)}
    </span>
  );
}

export default PrecioProducto;
