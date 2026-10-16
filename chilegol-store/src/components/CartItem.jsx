// Un artículo dentro del carrito, con botones para cambiar la cantidad o quitarlo.

import { Link } from 'react-router-dom';
import { formatearPrecio } from '../utils/formato';
import { precioFinal, calcularSubtotal } from '../utils/precios';
import { esFoto } from '../utils/imagenes';

function CartItem({ item, onAumentar, onDisminuir, onEliminar }) {
  const enOferta = item.enOferta && item.precioOferta;

  return (
    <div className="cart-item d-flex gap-3" data-testid={`cart-item-${item.clave}`}>
      <img className={`cart-item__imagen flex-shrink-0 ${esFoto(item.imagen) ? 'img-foto' : ''}`} src={item.imagen} alt="" />

      <div className="flex-grow-1">
        <div className="d-flex justify-content-between gap-2">
          <div>
            <Link to={`/productos/${item.id}`} className="fw-semibold text-decoration-none">
              {item.nombre}
            </Link>
            <div className="small texto-secundario">Talla {item.talla}</div>
            <div className="small">
              {formatearPrecio(precioFinal(item))} c/u
              {enOferta && <del className="precio-anterior ms-2">{formatearPrecio(item.precio)}</del>}
            </div>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-link text-danger align-self-start"
            onClick={() => onEliminar(item.clave)}
            aria-label={`Eliminar ${item.nombre} del carrito`}
          >
            <i className="bi bi-trash3" aria-hidden="true" /> <span className="d-none d-sm-inline">Quitar</span>
          </button>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
          <div className="cantidad">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => onDisminuir(item.clave)}
              disabled={item.cantidad <= 1}
              aria-label={`Disminuir cantidad de ${item.nombre}`}
            >
              <i className="bi bi-dash-lg" aria-hidden="true" />
            </button>
            <span className="cantidad__valor" data-testid={`cantidad-${item.clave}`} aria-live="polite">
              {item.cantidad}
            </span>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => onAumentar(item.clave)}
              disabled={item.cantidad >= item.stock}
              aria-label={`Aumentar cantidad de ${item.nombre}`}
            >
              <i className="bi bi-plus-lg" aria-hidden="true" />
            </button>
          </div>
          <span className="fw-bold">{formatearPrecio(calcularSubtotal(item))}</span>
        </div>
        {item.cantidad >= item.stock && (
          <div className="small texto-secundario mt-1">No hay más stock de esta camiseta.</div>
        )}
      </div>
    </div>
  );
}

export default CartItem;
