// Reportes con gráficos de barras simples (hechos con divs y Bootstrap, sin librerías).

import { useTienda } from '../../context/TiendaContext';
import { formatearPrecio, nombreMes } from '../../utils/formato';

// Barra horizontal: el ancho es el porcentaje respecto del valor más alto
function FilaBarra({ etiqueta, valor, maximo, texto, roja = false }) {
  const porcentaje = maximo > 0 ? Math.round((valor / maximo) * 100) : 0;
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between small mb-1 gap-2">
        <span>{etiqueta}</span>
        <span className="fw-semibold text-nowrap">{texto}</span>
      </div>
      <div className={`barra-reporte ${roja ? 'barra-reporte--roja' : ''}`} aria-hidden="true">
        <span style={{ width: `${porcentaje}%` }} />
      </div>
    </div>
  );
}

function AdminReportes() {
  const { ordenes } = useTienda();
  const validas = ordenes.filter((o) => o.estado !== 'Anulada');

  // Ventas por mes: { '2026-09': { total, cantidad } }
  const porMes = {};
  validas.forEach((o) => {
    const fecha = new Date(o.fecha);
    const mes = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
    porMes[mes] = porMes[mes] ?? { total: 0, cantidad: 0 };
    porMes[mes].total += o.total;
    porMes[mes].cantidad += 1;
  });
  const meses = Object.keys(porMes).sort();
  const maxMes = Math.max(0, ...meses.map((m) => porMes[m].total));

  // Productos más vendidos (por unidades)
  const porProducto = {};
  const porCategoria = {};
  validas.forEach((o) => {
    o.items.forEach((item) => {
      porProducto[item.productoId] = porProducto[item.productoId] ?? { nombre: item.nombre, unidades: 0, monto: 0 };
      porProducto[item.productoId].unidades += item.cantidad;
      porProducto[item.productoId].monto += item.cantidad * item.precioUnitario;

      porCategoria[item.categoria] = (porCategoria[item.categoria] ?? 0) + item.cantidad * item.precioUnitario;
    });
  });
  const ranking = Object.values(porProducto).sort((a, b) => b.unidades - a.unidades || b.monto - a.monto).slice(0, 5);
  const maxUnidades = Math.max(0, ...ranking.map((p) => p.unidades));
  const categorias = Object.entries(porCategoria).sort((a, b) => b[1] - a[1]);
  const maxCategoria = Math.max(0, ...categorias.map(([, monto]) => monto));

  const totalVentas = validas.reduce((s, o) => s + o.total, 0);
  const ticketPromedio = validas.length > 0 ? Math.round(totalVentas / validas.length) : 0;
  const unidades = Object.values(porProducto).reduce((s, p) => s + p.unidades, 0);

  return (
    <>
      <h1 className="mb-1">Reportes</h1>
      <p className="texto-secundario mb-4">Calculados con las órdenes no anuladas.</p>

      <div className="row row-cols-1 row-cols-sm-3 g-3 mb-4">
        <div className="col"><div className="stat-card"><div className="stat-card__valor">{formatearPrecio(totalVentas)}</div><div className="stat-card__nombre">Ventas totales</div></div></div>
        <div className="col"><div className="stat-card"><div className="stat-card__valor">{formatearPrecio(ticketPromedio)}</div><div className="stat-card__nombre">Ticket promedio por orden</div></div></div>
        <div className="col"><div className="stat-card"><div className="stat-card__valor">{unidades}</div><div className="stat-card__nombre">Camisetas vendidas</div></div></div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-6">
          <div className="panel h-100">
            <h2 className="h3 mb-3">Ventas por mes</h2>
            {meses.length === 0 && <p className="texto-secundario">Todavía no hay ventas.</p>}
            {meses.map((m) => (
              <FilaBarra
                key={m}
                etiqueta={`${nombreMes(m)} (${porMes[m].cantidad} órdenes)`}
                valor={porMes[m].total}
                maximo={maxMes}
                texto={formatearPrecio(porMes[m].total)}
              />
            ))}
          </div>
        </div>
        <div className="col-12 col-xl-6">
          <div className="panel h-100">
            <h2 className="h3 mb-3">Productos más vendidos</h2>
            {ranking.map((p, i) => (
              <FilaBarra
                key={p.nombre}
                etiqueta={`${i + 1}. ${p.nombre}`}
                valor={p.unidades}
                maximo={maxUnidades}
                texto={`${p.unidades} u.`}
                roja
              />
            ))}
          </div>
        </div>
        <div className="col-12">
          <div className="panel">
            <h2 className="h3 mb-3">Ventas por categoría</h2>
            {categorias.map(([nombre, monto]) => (
              <FilaBarra key={nombre} etiqueta={nombre} valor={monto} maximo={maxCategoria} texto={formatearPrecio(monto)} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminReportes;
