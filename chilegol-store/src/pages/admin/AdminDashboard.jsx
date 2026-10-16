// Inicio del panel: totales y productos con stock crítico.

import { Link } from 'react-router-dom';
import { useTienda } from '../../context/TiendaContext';
import { useAuth } from '../../context/AuthContext';
import { esFoto } from '../../utils/imagenes';
import { formatearPrecio, formatearFecha } from '../../utils/formato';
import { STOCK_CRITICO } from '../../utils/constantes';

function Estadistica({ valor, nombre, icono }) {
  return (
    <div className="stat-card d-flex justify-content-between align-items-start gap-2">
      <div>
        <div className="stat-card__valor">{valor}</div>
        <div className="stat-card__nombre mt-1">{nombre}</div>
      </div>
      <i className={`bi ${icono} fs-3 text-danger`} aria-hidden="true" />
    </div>
  );
}

function AdminDashboard() {
  const { productos, ordenes } = useTienda();
  const { usuarios, usuario } = useAuth();

  // Las órdenes anuladas no cuentan como venta
  const ordenesValidas = ordenes.filter((o) => o.estado !== 'Anulada');
  const totalVentas = ordenesValidas.reduce((suma, o) => suma + o.total, 0);
  const criticos = productos.filter((p) => p.stock <= STOCK_CRITICO).sort((a, b) => a.stock - b.stock);
  const ultimas = ordenes.slice(0, 5);

  return (
    <>
      <h1 className="mb-1">Dashboard</h1>
      <p className="texto-secundario mb-4">Hola, {usuario?.nombre}. Así va la tienda hoy.</p>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-3 mb-4">
        <div className="col"><Estadistica valor={formatearPrecio(totalVentas)} nombre="Total de ventas" icono="bi-cash-stack" /></div>
        <div className="col"><Estadistica valor={ordenesValidas.length} nombre="Órdenes" icono="bi-receipt" /></div>
        <div className="col"><Estadistica valor={productos.length} nombre="Productos" icono="bi-box-seam" /></div>
        <div className="col"><Estadistica valor={usuarios.length} nombre="Usuarios registrados" icono="bi-people" /></div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-6">
          <div className="panel p-0 h-100">
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <h2 className="h3 mb-0">Stock crítico</h2>
              <span className="badge text-bg-danger">{criticos.length}</span>
            </div>
            {criticos.length === 0 ? (
              <p className="p-3 mb-0 texto-secundario">Todos los productos tienen más de {STOCK_CRITICO} unidades.</p>
            ) : (
              <div className="table-responsive">
                <table className="table tabla-admin align-middle">
                  <thead>
                    <tr><th>Producto</th><th>Stock</th><th><span className="visually-hidden">Acción</span></th></tr>
                  </thead>
                  <tbody>
                    {criticos.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <img src={p.imagen} alt="" className={esFoto(p.imagen) ? 'img-foto' : ''} />
                            <span>{p.nombre}</span>
                          </div>
                        </td>
                        <td><span className={`badge ${p.stock === 0 ? 'text-bg-dark' : 'text-bg-danger'}`}>{p.stock}</span></td>
                        <td className="text-end"><Link to={`/admin/productos?editar=${p.id}`}>Reponer</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="col-12 col-xl-6">
          <div className="panel p-0 h-100">
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <h2 className="h3 mb-0">Últimas órdenes</h2>
              <Link to="/admin/ordenes" className="small">Ver todas</Link>
            </div>
            <div className="table-responsive">
              <table className="table tabla-admin align-middle">
                <thead>
                  <tr><th>Orden</th><th>Cliente</th><th>Fecha</th><th className="text-end">Total</th></tr>
                </thead>
                <tbody>
                  {ultimas.map((o) => (
                    <tr key={o.id}>
                      <td><Link to={`/admin/ordenes?ver=${o.numero}`}>{o.numero}</Link></td>
                      <td>{o.cliente.nombre} {o.cliente.apellidos}</td>
                      <td className="text-nowrap">{formatearFecha(o.fecha)}</td>
                      <td className="text-end">{formatearPrecio(o.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
