// Órdenes / boletas: lista de compras, cambio de estado y detalle de cada boleta.

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Boleta from './Boleta';
import { useTienda } from '../../context/TiendaContext';
import { formatearPrecio, formatearFecha } from '../../utils/formato';
import { ESTADOS_ORDEN } from '../../utils/constantes';

function AdminOrdenes() {
  const { ordenes, cambiarEstadoOrden } = useTienda();
  const [parametros, setParametros] = useSearchParams();
  const [filtroEstado, setFiltroEstado] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const numeroSeleccionado = parametros.get('ver');
  const seleccionada = ordenes.find((o) => o.numero === numeroSeleccionado);

  const texto = busqueda.trim().toLowerCase();
  const lista = ordenes.filter((o) => {
    const coincideEstado = !filtroEstado || o.estado === filtroEstado;
    const nombre = `${o.numero} ${o.cliente.nombre} ${o.cliente.apellidos} ${o.cliente.email}`.toLowerCase();
    return coincideEstado && (!texto || nombre.includes(texto));
  });

  function ver(numero) {
    setParametros(numero ? { ver: numero } : {}, { replace: true });
  }

  return (
    <>
      <h1 className="mb-1">Órdenes y boletas</h1>
      <p className="texto-secundario mb-4">{ordenes.length} compras registradas</p>

      <div className="row g-4">
        {/* En pantallas chicas la boleta aparece arriba de la tabla; en pantallas muy grandes, a la derecha */}
        {seleccionada && (
          <div className="col-12 col-xxl-5 order-xxl-last">
            <Boleta orden={seleccionada} onCerrar={() => ver(null)} />
          </div>
        )}
        <div className={seleccionada ? 'col-12 col-xxl-7' : 'col-12'}>
          <div className="panel p-0">
            <div className="p-3 border-bottom row g-2">
              <div className="col-12 col-sm-7">
                <label htmlFor="ordenes-buscar" className="visually-hidden">Buscar orden</label>
                <input
                  id="ordenes-buscar"
                  type="search"
                  className="form-control"
                  placeholder="Buscar por número, cliente o correo"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
              <div className="col-12 col-sm-5">
                <label htmlFor="ordenes-estado" className="visually-hidden">Filtrar por estado</label>
                <select id="ordenes-estado" className="form-select" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                  <option value="">Todos los estados</option>
                  {ESTADOS_ORDEN.map((e) => <option key={e}>{e}</option>)}
                </select>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table tabla-admin align-middle">
                <thead>
                  <tr><th>Orden</th><th>Fecha</th><th>Cliente</th><th className="text-end">Total</th><th>Estado</th><th /></tr>
                </thead>
                <tbody>
                  {lista.map((o) => (
                    <tr key={o.id} className={o.numero === numeroSeleccionado ? 'table-active' : ''}>
                      <td className="fw-semibold">{o.numero}</td>
                      <td className="text-nowrap">{formatearFecha(o.fecha)}</td>
                      <td>
                        {o.cliente.nombre} {o.cliente.apellidos}
                        <div className="small texto-secundario">{o.direccion.comuna}{o.usuarioId ? '' : ', invitado'}</div>
                      </td>
                      <td className="text-end text-nowrap">{formatearPrecio(o.total)}</td>
                      <td>
                        <label className="visually-hidden" htmlFor={`estado-${o.id}`}>Estado de {o.numero}</label>
                        <select
                          id={`estado-${o.id}`}
                          className="form-select form-select-sm"
                          style={{ minWidth: 120 }}
                          value={o.estado}
                          onChange={(e) => cambiarEstadoOrden(o.id, e.target.value)}
                        >
                          {ESTADOS_ORDEN.map((e) => <option key={e}>{e}</option>)}
                        </select>
                      </td>
                      <td className="text-end">
                        <button type="button" className="btn btn-sm btn-outline-dark text-nowrap" onClick={() => ver(o.numero)}>
                          Ver boleta
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {lista.length === 0 && <p className="p-3 mb-0 texto-secundario">No hay órdenes con esos filtros.</p>}
          </div>
        </div>

      </div>
    </>
  );
}

export default AdminOrdenes;
