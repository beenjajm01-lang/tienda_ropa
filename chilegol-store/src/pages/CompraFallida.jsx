// Pantalla de compra fallida: explica qué salió mal y muestra el pedido que se intentó pagar.

import { Link, useLocation, useNavigate } from 'react-router-dom';
import ResumenPedido from '../components/ResumenPedido';

function CompraFallida() {
  const navigate = useNavigate();
  const { motivo, pedido, datos } = useLocation().state ?? {};

  return (
    <section className="seccion resultado-compra resultado-compra--fallo">
      <div className="container">
        <div className="text-center mb-4">
          <i className="bi bi-x-circle-fill resultado-compra__icono" aria-hidden="true" />
          <h1 className="mt-3">No se pudo completar la compra</h1>
          <p className="texto-secundario">No se hizo ningún cargo. Tu carrito sigue guardado.</p>
        </div>

        <div className="row justify-content-center g-4">
          <div className="col-12 col-lg-8">
            <div className="alert alert-danger" role="alert">
              <strong>Qué pasó: </strong>
              {motivo ?? 'No recibimos respuesta del pago. Inténtalo otra vez.'}
            </div>

            {pedido && (
              <ResumenPedido items={pedido.items} total={pedido.total} titulo="Pedido que intentaste pagar" />
            )}

            <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/checkout', { state: { datos } })}
              >
                Intentar de nuevo
              </button>
              <Link to="/carrito" className="btn btn-outline-dark btn-lg">Revisar carrito</Link>
              <Link to="/" className="btn btn-link btn-lg">Volver a la tienda</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompraFallida;
