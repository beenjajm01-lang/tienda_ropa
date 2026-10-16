// Boleta de una orden, con el desglose de neto e IVA (19%).

import { formatearPrecio, formatearFechaHora } from '../../utils/formato';
import { desglosarIva } from '../../utils/precios';

function Boleta({ orden, onCerrar }) {
  const { neto, iva } = desglosarIva(orden.total);
  const { cliente, direccion } = orden;

  return (
    <div className="panel boleta">
      <div className="d-flex justify-content-between align-items-start gap-2">
        <div>
          <p className="cg-marca mb-0" style={{ color: 'var(--cg-azul)', fontSize: '1.5rem' }}>ChileGol Store</p>
          <p className="small texto-secundario mb-0">Boleta electrónica (simulada)</p>
        </div>
        <div className="text-end">
          <div className="numero-orden" style={{ fontSize: '1.5rem' }}>{orden.numero}</div>
          <div className="small texto-secundario">{formatearFechaHora(orden.fecha)}</div>
        </div>
      </div>

      <hr />
      <div className="row small g-2">
        <div className="col-12 col-sm-6">
          <div className="fw-semibold">Cliente</div>
          <div>{cliente.nombre} {cliente.apellidos}</div>
          <div className="texto-secundario">{cliente.email}</div>
        </div>
        <div className="col-12 col-sm-6">
          <div className="fw-semibold">Despacho</div>
          <div>{direccion.calle}{direccion.departamento ? `, ${direccion.departamento}` : ''}</div>
          <div>{direccion.comuna}, {direccion.region}</div>
          {direccion.indicaciones && <div className="texto-secundario">{direccion.indicaciones}</div>}
        </div>
      </div>

      <table className="table table-sm small mt-3 mb-2">
        <thead>
          <tr><th>Producto</th><th className="text-center">Cant.</th><th className="text-end">Total</th></tr>
        </thead>
        <tbody>
          {orden.items.map((item) => (
            <tr key={`${item.productoId}-${item.talla}`}>
              <td>
                {item.nombre}
                <div className="texto-secundario">Talla {item.talla}, {formatearPrecio(item.precioUnitario)} c/u</div>
              </td>
              <td className="text-center">{item.cantidad}</td>
              <td className="text-end">{formatearPrecio(item.precioUnitario * item.cantidad)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="small mb-0">
        <div className="d-flex justify-content-between"><dt className="fw-normal">Neto</dt><dd className="mb-0">{formatearPrecio(neto)}</dd></div>
        <div className="d-flex justify-content-between"><dt className="fw-normal">IVA (19%)</dt><dd className="mb-0">{formatearPrecio(iva)}</dd></div>
        <div className="d-flex justify-content-between align-items-baseline border-top mt-1 pt-1">
          <dt>Total</dt><dd className="mb-0 resumen-total" style={{ fontSize: '1.6rem' }}>{formatearPrecio(orden.total)}</dd>
        </div>
      </dl>
      <p className="small texto-secundario mt-2 mb-0">Estado: {orden.estado}</p>

      <div className="d-flex gap-2 mt-3 no-imprimir">
        <button type="button" className="btn btn-sm btn-dark" onClick={() => window.print()}>
          <i className="bi bi-printer me-1" aria-hidden="true" />Imprimir
        </button>
        {onCerrar && <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onCerrar}>Cerrar</button>}
      </div>
    </div>
  );
}

export default Boleta;
