// Tarjeta de producto.
// Recibe por props:
//   - producto: el objeto con nombre, precio, imagen, etc.
//   - onAgregar: la función que se ejecuta al presionar "Agregar al carrito"

import { Link } from 'react-router-dom';
import PrecioProducto from './PrecioProducto';
import { porcentajeDescuento } from '../utils/precios';
import { esFoto } from '../utils/imagenes';

function ProductCard({ producto, onAgregar }) {
  const descuento = porcentajeDescuento(producto);
  const agotado = producto.stock <= 0;
  const ultimasUnidades = producto.stock > 0 && producto.stock <= 5;
  const enlace = `/productos/${producto.id}`;

  return (
    <article className="producto-card d-flex flex-column" aria-label={producto.nombre}>
      <Link
        to={enlace}
        className={`producto-card__imagen ${esFoto(producto.imagen) ? 'producto-card__imagen--foto' : ''}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img src={producto.imagen} alt="" loading="lazy" />
        {descuento > 0 && <span className="producto-card__descuento">-{descuento}%</span>}
      </Link>

      <div className="p-3 d-flex flex-column flex-grow-1">
        <span className="producto-card__categoria">{producto.categoria}</span>
        <Link to={enlace} className="producto-card__nombre mb-2">
          {producto.nombre}
        </Link>

        <PrecioProducto producto={producto} />

        {ultimasUnidades && <span className="stock-bajo mt-1">Quedan {producto.stock} unidades</span>}

        <div className="mt-auto pt-3">
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={() => onAgregar(producto)}
            disabled={agotado}
          >
            {agotado ? 'Agotado' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
