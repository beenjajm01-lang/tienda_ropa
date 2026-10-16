// CRUD completo de productos: ver, crear, editar y eliminar.

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FormularioProducto from './FormularioProducto';
import { useTienda } from '../../context/TiendaContext';
import { buscarPorNombre } from '../../services/productosService';
import { esFoto } from '../../utils/imagenes';
import { formatearPrecio } from '../../utils/formato';
import { STOCK_CRITICO } from '../../utils/constantes';

function AdminProductos() {
  const { productos, categorias, agregarProducto, editarProducto, borrarProducto } = useTienda();
  const [parametros, setParametros] = useSearchParams();

  // modo: null (solo lista), 'nuevo' o el id del producto que se está editando
  const [modo, setModo] = useState(() => (parametros.get('editar') ? Number(parametros.get('editar')) : null));
  const [busqueda, setBusqueda] = useState('');
  const [porEliminar, setPorEliminar] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const enEdicion = typeof modo === 'number' ? productos.find((p) => p.id === modo) : null;
  const lista = buscarPorNombre(productos, busqueda);

  function cerrarFormulario() {
    setModo(null);
    setParametros({}, { replace: true });
  }

  function guardar(datos) {
    if (enEdicion) {
      editarProducto(enEdicion.id, datos);
      setMensaje(`Guardaste los cambios de "${datos.nombre}".`);
    } else {
      const nuevo = agregarProducto(datos);
      setMensaje(`Creaste "${nuevo.nombre}" (id ${nuevo.id}).`);
    }
    cerrarFormulario();
  }

  function eliminar(producto) {
    borrarProducto(producto.id);
    setPorEliminar(null);
    setMensaje(`Eliminaste "${producto.nombre}".`);
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="mb-1">Productos</h1>
          <p className="texto-secundario mb-0">{productos.length} productos en la tienda</p>
        </div>
        {modo === null && (
          <button type="button" className="btn btn-primary" onClick={() => { setModo('nuevo'); setMensaje(''); }}>
            <i className="bi bi-plus-lg me-1" aria-hidden="true" /> Nuevo producto
          </button>
        )}
      </div>

      {mensaje && (
        <div className="alert alert-success alert-dismissible" role="status">
          {mensaje}
          <button type="button" className="btn-close" aria-label="Cerrar" onClick={() => setMensaje('')} />
        </div>
      )}

      {modo !== null && (
        <FormularioProducto
          key={modo}
          inicial={enEdicion}
          categorias={categorias}
          onGuardar={guardar}
          onCancelar={cerrarFormulario}
        />
      )}

      <div className="panel p-0">
        <div className="p-3 border-bottom">
          <label htmlFor="admin-buscar" className="visually-hidden">Buscar producto</label>
          <input
            id="admin-buscar"
            type="search"
            className="form-control"
            placeholder="Buscar por nombre"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="table-responsive">
          <table className="table tabla-admin align-middle">
            <thead>
              <tr>
                <th>Producto</th>
                <th className="d-none d-md-table-cell">Categoría</th>
                <th className="text-end">Precio</th>
                <th className="text-end">Stock</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img src={p.imagen} alt="" className={esFoto(p.imagen) ? 'img-foto' : ''} />
                      <div>
                        <div>{p.nombre}</div>
                        <div className="small texto-secundario">id {p.id}{p.destacado ? ', destacado' : ''}</div>
                      </div>
                    </div>
                  </td>
                  <td className="d-none d-md-table-cell">{p.categoria}</td>
                  <td className="text-end text-nowrap">
                    {p.enOferta && p.precioOferta ? (
                      <>
                        <span className="text-danger fw-semibold">{formatearPrecio(p.precioOferta)}</span>
                        <div className="small"><del className="texto-secundario">{formatearPrecio(p.precio)}</del></div>
                      </>
                    ) : (
                      formatearPrecio(p.precio)
                    )}
                  </td>
                  <td className="text-end">
                    <span className={p.stock <= STOCK_CRITICO ? 'badge text-bg-danger' : ''}>{p.stock}</span>
                  </td>
                  <td className="text-end text-nowrap">
                    {porEliminar === p.id ? (
                      <>
                        <span className="small me-2">¿Eliminar?</span>
                        <button type="button" className="btn btn-sm btn-danger me-1" onClick={() => eliminar(p)}>Sí, eliminar</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setPorEliminar(null)}>No</button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-dark me-1"
                          onClick={() => { setModo(p.id); setMensaje(''); window.scrollTo(0, 0); }}
                          aria-label={`Editar ${p.nombre}`}
                        >
                          <i className="bi bi-pencil" aria-hidden="true" /> Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => setPorEliminar(p.id)}
                          aria-label={`Eliminar ${p.nombre}`}
                        >
                          <i className="bi bi-trash3" aria-hidden="true" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {lista.length === 0 && <p className="p-3 mb-0 texto-secundario">No hay productos con ese nombre.</p>}
      </div>
    </>
  );
}

export default AdminProductos;
