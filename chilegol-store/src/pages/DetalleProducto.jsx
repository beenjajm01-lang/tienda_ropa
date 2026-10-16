// Detalle de una camiseta: foto grande, descripción, precio, selector de talla y cantidad.
// El id viene en la URL: /productos/3 -> useParams() devuelve { id: '3' }

import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PrecioProducto from '../components/PrecioProducto';
import ProductList from '../components/ProductList';
import { useTienda } from '../context/TiendaContext';
import { useCart, useAgregarRapido } from '../context/CartContext';
import { formatearPrecio } from '../utils/formato';
import { tallaPorDefecto } from '../utils/precios';
import { esFoto } from '../utils/imagenes';

function FichaProducto({ producto }) {
  const { agregar } = useCart();
  const [talla, setTalla] = useState(tallaPorDefecto(producto));
  const [cantidad, setCantidad] = useState(1);

  const agotado = producto.stock <= 0;
  const ahorro = producto.enOferta && producto.precioOferta ? producto.precio - producto.precioOferta : 0;

  return (
    <div className="row g-4 g-lg-5">
      <div className="col-12 col-md-6">
        <div className={`detalle-imagen ${esFoto(producto.imagen) ? 'detalle-imagen--foto' : ''}`}>
          <img src={producto.imagen} alt={producto.nombre} />
        </div>
      </div>

      <div className="col-12 col-md-6">
        <p className="texto-secundario mb-2">{producto.categoria}</p>
        <h1 className="mb-3">{producto.nombre}</h1>
        <PrecioProducto producto={producto} grande />
        {ahorro > 0 && <p className="text-success fw-semibold mt-2 mb-0">Ahorras {formatearPrecio(ahorro)}</p>}

        <p className="mt-3">{producto.descripcion}</p>

        <fieldset className="mb-3" disabled={agotado}>
          <legend className="form-label fs-6 fw-semibold">Talla</legend>
          <div className="selector-talla d-flex flex-wrap gap-2">
            {producto.tallas.map((t) => (
              <div key={t}>
                <input
                  type="radio"
                  className="btn-check"
                  name="talla"
                  id={`talla-${t}`}
                  value={t}
                  checked={talla === t}
                  onChange={() => setTalla(t)}
                />
                <label className="btn btn-outline-secondary" htmlFor={`talla-${t}`}>{t}</label>
              </div>
            ))}
          </div>
          <Link to="/blogs/1" className="small d-inline-block mt-2">¿Qué talla me queda?</Link>
        </fieldset>

        <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
          <div className="cantidad bg-white">
            <button
              type="button"
              className="btn"
              onClick={() => setCantidad(cantidad - 1)}
              disabled={agotado || cantidad <= 1}
              aria-label="Disminuir cantidad"
            >
              <i className="bi bi-dash-lg" aria-hidden="true" />
            </button>
            <span className="cantidad__valor" aria-live="polite">{cantidad}</span>
            <button
              type="button"
              className="btn"
              onClick={() => setCantidad(cantidad + 1)}
              disabled={agotado || cantidad >= producto.stock}
              aria-label="Aumentar cantidad"
            >
              <i className="bi bi-plus-lg" aria-hidden="true" />
            </button>
          </div>
          <span className={producto.stock <= 5 ? 'stock-bajo' : 'texto-secundario small'}>
            {agotado ? 'Agotado' : producto.stock <= 5 ? `Quedan ${producto.stock} unidades` : `${producto.stock} disponibles`}
          </span>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-lg w-100"
          disabled={agotado}
          onClick={() => agregar(producto, talla, cantidad)}
        >
          {agotado ? 'Agotado' : 'Agregar al carrito'}
        </button>

        <ul className="list-unstyled small texto-secundario mt-4 mb-0">
          <li><i className="bi bi-truck me-2" aria-hidden="true" />Envío gratis, llega en 2 a 5 días hábiles</li>
          <li><i className="bi bi-arrow-left-right me-2" aria-hidden="true" />Cambio de talla hasta 30 días después de la compra</li>
        </ul>
      </div>
    </div>
  );
}

function DetalleProducto() {
  const { id } = useParams();
  const { productos, obtenerProducto } = useTienda();
  const agregarRapido = useAgregarRapido();
  const producto = obtenerProducto(id);

  if (!producto) {
    return (
      <main className="container py-5">
        <div className="panel text-center py-5">
          <h1 className="h2">No encontramos esa camiseta</h1>
          <p className="texto-secundario">Puede que ya no esté a la venta.</p>
          <Link to="/productos" className="btn btn-dark">Ver todas las camisetas</Link>
        </div>
      </main>
    );
  }

  const relacionados = productos
    .filter((p) => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 4);

  return (
    <section className="seccion">
      <div className="container">
        <nav aria-label="Ruta de navegación">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
            <li className="breadcrumb-item"><Link to="/productos">Productos</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
          </ol>
        </nav>

        {/* key={producto.id}: si cambio de producto, la talla y la cantidad vuelven a empezar */}
        <FichaProducto key={producto.id} producto={producto} />

        {relacionados.length > 0 && (
          <div className="mt-5">
            <h2 className="mb-4">Más de {producto.categoria}</h2>
            <ProductList productos={relacionados} onAgregar={agregarRapido} />
          </div>
        )}
      </div>
    </section>
  );
}

export default DetalleProducto;
