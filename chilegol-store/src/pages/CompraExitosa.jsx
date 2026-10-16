// Pantalla de compra exitosa. La orden llega desde el checkout en el "state" de la navegación.

import { Link, useLocation } from 'react-router-dom';
import ResumenPedido from '../components/ResumenPedido';
import { formatearFechaHora } from '../utils/formato';

function CompraExitosa() {
  const orden = useLocation().state?.orden;

  if (!orden) {
    return (
      <main className="container py-5">
        <div className="panel text-center py-5">
          <h1 className="h2">No hay una compra reciente para mostrar</h1>
          <p className="texto-secundario">Cuando pagues un pedido, aquí verás el comprobante.</p>
          <Link to="/" className="btn btn-dark">Volver a la tienda</Link>
        </div>
      </main>
    );
  }

  const { cliente, direccion } = orden;

  return (
    <section className="seccion resultado-compra resultado-compra--exito">
      <div className="container">
        <div className="text-center mb-5">
          <i className="bi bi-check-circle-fill resultado-compra__icono" aria-hidden="true" />
          <h1 className="mt-3">¡Compra realizada con éxito!</h1>
          <p className="texto-secundario mb-1">Número de orden</p>
          <p className="numero-orden mb-1">{orden.numero}</p>
          <p className="texto-secundario">
            {formatearFechaHora(orden.fecha)}. Te enviamos el detalle a {cliente.email}.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <div className="panel mb-4">
              <h2 className="h3">Comprador</h2>
              <p className="mb-0">{cliente.nombre} {cliente.apellidos}</p>
              <p className="mb-0 texto-secundario">{cliente.email}</p>
            </div>
            <div className="panel">
              <h2 className="h3">Dirección de entrega</h2>
              <p className="mb-0">
                {direccion.calle}{direccion.departamento ? `, ${direccion.departamento}` : ''}
              </p>
              <p className="mb-0">{direccion.comuna}, {direccion.region}</p>
              {direccion.indicaciones && <p className="mb-0 texto-secundario">{direccion.indicaciones}</p>}
              <p className="small texto-secundario mt-2 mb-0">Llega en 2 a 5 días hábiles.</p>
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <ResumenPedido items={orden.items} total={orden.total} titulo="Productos comprados" />
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-2 mt-5 no-imprimir">
          <Link to="/" className="btn btn-primary btn-lg">Volver a la tienda</Link>
          <button type="button" className="btn btn-outline-dark btn-lg" onClick={() => window.print()}>
            Imprimir comprobante
          </button>
        </div>
      </div>
    </section>
  );
}

export default CompraExitosa;
