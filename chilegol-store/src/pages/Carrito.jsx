// Carrito de compras: lista de productos, cantidades, subtotales y total.

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CabeceraPagina from '../components/CabeceraPagina';
import { useCart } from '../context/CartContext';
import { formatearPrecio } from '../utils/formato';

function Carrito() {
  const { items, aumentar, disminuir, eliminar, vaciar, total, totalSinDescuento, cantidadTotal } = useCart();
  const navigate = useNavigate();
  const [confirmarVaciar, setConfirmarVaciar] = useState(false);

  if (items.length === 0) {
    return (
      <>
        <CabeceraPagina titulo="Carrito" />
        <section className="seccion">
          <div className="container">
            <div className="panel text-center py-5">
              <i className="bi bi-bag fs-1 texto-secundario" aria-hidden="true" />
              <h2 className="mt-3">Tu carrito está vacío</h2>
              <p className="texto-secundario">Agrega camisetas desde el catálogo y aparecerán aquí.</p>
              <Link to="/productos" className="btn btn-primary">Ver camisetas</Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  const descuento = totalSinDescuento - total;

  return (
    <>
      <CabeceraPagina
        titulo="Carrito"
        descripcion={cantidadTotal === 1 ? '1 camiseta en tu carrito' : `${cantidadTotal} camisetas en tu carrito`}
      />

      <section className="seccion">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-lg-8">
              <div className="d-flex flex-column gap-3">
                {items.map((item) => (
                  <CartItem
                    key={item.clave}
                    item={item}
                    onAumentar={aumentar}
                    onDisminuir={disminuir}
                    onEliminar={eliminar}
                  />
                ))}
              </div>

              <div className="mt-3">
                {confirmarVaciar ? (
                  <div className="d-flex flex-wrap align-items-center gap-2">
                    <span>¿Quitar todas las camisetas del carrito?</span>
                    <button type="button" className="btn btn-sm btn-danger" onClick={() => { vaciar(); setConfirmarVaciar(false); }}>
                      Sí, vaciar carrito
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setConfirmarVaciar(false)}>
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button type="button" className="btn btn-sm btn-link text-danger px-0" onClick={() => setConfirmarVaciar(true)}>
                    Vaciar carrito
                  </button>
                )}
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="panel position-sticky" style={{ top: '5.5rem' }}>
                <h2 className="h3">Resumen</h2>
                <dl className="mb-0">
                  <div className="d-flex justify-content-between py-1">
                    <dt className="fw-normal">Productos ({cantidadTotal})</dt>
                    <dd className="mb-0">{formatearPrecio(totalSinDescuento)}</dd>
                  </div>
                  {descuento > 0 && (
                    <div className="d-flex justify-content-between py-1 text-success">
                      <dt className="fw-normal">Descuentos por oferta</dt>
                      <dd className="mb-0">-{formatearPrecio(descuento)}</dd>
                    </div>
                  )}
                  <div className="d-flex justify-content-between py-1">
                    <dt className="fw-normal">Envío</dt>
                    <dd className="mb-0">Gratis</dd>
                  </div>
                  <div className="d-flex justify-content-between align-items-baseline border-top mt-2 pt-2">
                    <dt>Total</dt>
                    <dd className="mb-0 resumen-total" data-testid="total-carrito">{formatearPrecio(total)}</dd>
                  </div>
                </dl>
                <button type="button" className="btn btn-primary btn-lg w-100 mt-3" onClick={() => navigate('/checkout')}>
                  Ir a pagar
                </button>
                <Link to="/productos" className="btn btn-outline-dark w-100 mt-2">
                  Seguir comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Carrito;
