// Resumen del panel: métricas de la tienda y productos en stock crítico.

import { Link, useLocation, useOutletContext } from 'react-router-dom';
import { getProductos, estaEnStockCritico } from '../data/products';
import { getUsuarios } from '../data/users';
import { formatearPrecio } from '../utils/formato';

function Dato({ valor, nombre }) {
  return (
    <div className="dato">
      <span className="dato__valor">{valor}</span>
      <span className="dato__nombre">{nombre}</span>
    </div>
  );
}

export default function AdminDashboard() {
  const { usuario, permisos } = useOutletContext();
  const location = useLocation();

  const productos = getProductos();
  const usuarios = getUsuarios();
  const criticos = productos.filter(estaEnStockCritico).sort((a, b) => a.stock - b.stock);
  const agotados = productos.filter((p) => p.stock === 0).length;
  const unidades = productos.reduce((suma, p) => suma + p.stock, 0);
  const valorInventario = productos.reduce((suma, p) => suma + p.precio * p.stock, 0);
  const puedeEditar = permisos.productos === 'crud';

  return (
    <>
      <div className="trabajo__cabecera">
        <h1>Hola, {usuario.nombre.split(' ')[0]}</h1>
      </div>

      {location.state?.aviso && (
        <p className="aviso aviso--alerta su-20 mb-4" role="status">{location.state.aviso}</p>
      )}

      <section aria-label="Resumen de la tienda" className="tablero">
        <Dato valor={productos.length} nombre="Productos en el catálogo" />
        <Dato valor={unidades} nombre="Unidades en stock" />
        <Dato valor={formatearPrecio(valorInventario)} nombre="Valor del inventario" />
        {permisos.usuarios !== 'ninguno' ? (
          <Dato valor={usuarios.length} nombre="Usuarios registrados" />
        ) : (
          <Dato valor={agotados} nombre="Productos agotados" />
        )}
      </section>

      <section aria-labelledby="titulo-criticos">
        <h2 id="titulo-criticos">Productos en stock crítico</h2>
        <div className="su-20">
          {criticos.length === 0 ? (
            <p className="aviso">Ningún producto está bajo su umbral crítico.</p>
          ) : (
            <ul className="aviso aviso--precaucion criticos">
              {criticos.map((p) => (
                <li key={p.id}>
                  <span>
                    <strong>{p.nombre}</strong>: quedan {p.stock} (umbral: {p.stockCritico})
                  </span>
                  {puedeEditar && <Link to={`/admin/productos?editar=${p.id}`}>Reponer stock</Link>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
