// Resumen de un pedido: productos, cantidades y total.
// Se usa en el checkout, en compra exitosa, en compra fallida y en las boletas del admin.

import { formatearPrecio } from '../utils/formato';
import { precioFinal } from '../utils/precios';
import { esFoto } from '../utils/imagenes';

function ResumenPedido({ items, total, titulo = 'Resumen del pedido' }) {
  return (
    <div className="panel">
      <h2 className="h3 mb-3">{titulo}</h2>
      <ul className="list-unstyled mb-0">
        {items.map((item) => {
          // Las órdenes guardadas traen precioUnitario; el carrito lo calcula
          const unitario = item.precioUnitario ?? precioFinal(item);
          return (
            <li key={item.clave ?? `${item.productoId}-${item.talla}`} className="d-flex gap-3 py-2 border-bottom">
              <img src={item.imagen} alt="" width="52" height="52" className={`cart-item__imagen ${esFoto(item.imagen) ? 'img-foto' : ''}`} style={{ width: 52, height: 52 }} />
              <div className="flex-grow-1">
                <div className="fw-semibold small">{item.nombre}</div>
                <div className="small texto-secundario">
                  Talla {item.talla}, {item.cantidad} x {formatearPrecio(unitario)}
                </div>
              </div>
              <div className="fw-semibold small text-nowrap">{formatearPrecio(unitario * item.cantidad)}</div>
            </li>
          );
        })}
      </ul>
      <div className="d-flex justify-content-between align-items-baseline pt-3">
        <span className="fw-semibold">Total</span>
        <span className="resumen-total" data-testid="resumen-total">
          {formatearPrecio(total)}
        </span>
      </div>
      <p className="small texto-secundario mb-0">Incluye IVA. Envío gratis a todo Chile.</p>
    </div>
  );
}

export default ResumenPedido;
