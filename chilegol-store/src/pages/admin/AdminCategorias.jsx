// Categorías: ver, agregar, editar el nombre y eliminar.
// No se puede eliminar una categoría que todavía tiene productos.

import { useState } from 'react';
import { useTienda } from '../../context/TiendaContext';

const NUEVA_VACIA = { nombre: '', descripcion: '', color1: '#0b1f4b', color2: '#d52b1e' };

function AdminCategorias() {
  const { categorias, productos, agregarCategoria, editarCategoria, borrarCategoria } = useTienda();
  const [nueva, setNueva] = useState(NUEVA_VACIA);
  const [editando, setEditando] = useState(null); // { id, nombre, descripcion }
  const [porEliminar, setPorEliminar] = useState(null);
  const [aviso, setAviso] = useState(null); // { tipo: 'success' | 'danger', texto }

  const contar = (nombre) => productos.filter((p) => p.categoria === nombre).length;

  function crear(evento) {
    evento.preventDefault();
    const resultado = agregarCategoria({
      nombre: nueva.nombre,
      descripcion: nueva.descripcion.trim(),
      colores: [nueva.color1, nueva.color2],
    });
    if (resultado.ok) {
      setAviso({ tipo: 'success', texto: `Agregaste la categoría "${nueva.nombre.trim()}".` });
      setNueva(NUEVA_VACIA);
    } else {
      setAviso({ tipo: 'danger', texto: resultado.error });
    }
  }

  function guardarEdicion(evento) {
    evento.preventDefault();
    const resultado = editarCategoria(editando.id, { nombre: editando.nombre, descripcion: editando.descripcion });
    if (resultado.ok) {
      setAviso({ tipo: 'success', texto: 'Guardaste los cambios. Los productos de la categoría se actualizaron.' });
      setEditando(null);
    } else {
      setAviso({ tipo: 'danger', texto: resultado.error });
    }
  }

  function eliminar(categoria) {
    const resultado = borrarCategoria(categoria.id);
    setPorEliminar(null);
    setAviso(
      resultado.ok
        ? { tipo: 'success', texto: `Eliminaste la categoría "${categoria.nombre}".` }
        : { tipo: 'danger', texto: resultado.error }
    );
  }

  return (
    <>
      <h1 className="mb-1">Categorías</h1>
      <p className="texto-secundario mb-4">Organiza las camisetas por equipo.</p>

      {aviso && (
        <div className={`alert alert-${aviso.tipo} alert-dismissible`} role="status">
          {aviso.texto}
          <button type="button" className="btn-close" aria-label="Cerrar" onClick={() => setAviso(null)} />
        </div>
      )}

      <div className="row g-4">
        <div className="col-12 col-xl-8">
          <div className="panel p-0">
            <div className="table-responsive">
              <table className="table tabla-admin align-middle">
                <thead>
                  <tr><th>Categoría</th><th className="text-end">Productos</th><th className="text-end">Acciones</th></tr>
                </thead>
                <tbody>
                  {categorias.map((c) => (
                    <tr key={c.id}>
                      <td>
                        {editando?.id === c.id ? (
                          <form className="d-flex flex-wrap gap-2" onSubmit={guardarEdicion}>
                            <label className="visually-hidden" htmlFor={`editar-nombre-${c.id}`}>Nombre</label>
                            <input
                              id={`editar-nombre-${c.id}`}
                              className="form-control form-control-sm"
                              style={{ maxWidth: 200 }}
                              value={editando.nombre}
                              onChange={(e) => setEditando({ ...editando, nombre: e.target.value })}
                            />
                            <label className="visually-hidden" htmlFor={`editar-desc-${c.id}`}>Descripción</label>
                            <input
                              id={`editar-desc-${c.id}`}
                              className="form-control form-control-sm"
                              style={{ maxWidth: 240 }}
                              value={editando.descripcion}
                              onChange={(e) => setEditando({ ...editando, descripcion: e.target.value })}
                            />
                            <button type="submit" className="btn btn-sm btn-primary">Guardar</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setEditando(null)}>Cancelar</button>
                          </form>
                        ) : (
                          <div className="d-flex align-items-center gap-2">
                            <span className="d-inline-flex" aria-hidden="true">
                              {c.colores.map((color, i) => (
                                <span key={i} style={{ width: 10, height: 28, background: color, border: '1px solid #ccd3df' }} />
                              ))}
                            </span>
                            <div>
                              <div className="fw-semibold">{c.nombre}</div>
                              <div className="small texto-secundario">{c.descripcion}</div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="text-end">{contar(c.nombre)}</td>
                      <td className="text-end text-nowrap">
                        {porEliminar === c.id ? (
                          <>
                            <button type="button" className="btn btn-sm btn-danger me-1" onClick={() => eliminar(c)}>Sí, eliminar</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setPorEliminar(null)}>No</button>
                          </>
                        ) : (
                          editando?.id !== c.id && (
                            <>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-dark me-1"
                                onClick={() => setEditando({ id: c.id, nombre: c.nombre, descripcion: c.descripcion ?? '' })}
                              >
                                <i className="bi bi-pencil" aria-hidden="true" /> Editar
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => setPorEliminar(c.id)}
                                aria-label={`Eliminar ${c.nombre}`}
                              >
                                <i className="bi bi-trash3" aria-hidden="true" />
                              </button>
                            </>
                          )
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <form className="panel" onSubmit={crear}>
            <h2 className="h3">Nueva categoría</h2>
            <div className="mb-3">
              <label htmlFor="cat-nombre" className="form-label">Nombre</label>
              <input id="cat-nombre" className="form-control" value={nueva.nombre} onChange={(e) => setNueva({ ...nueva, nombre: e.target.value })} />
            </div>
            <div className="mb-3">
              <label htmlFor="cat-desc" className="form-label">Descripción <span className="texto-secundario">(opcional)</span></label>
              <input id="cat-desc" className="form-control" value={nueva.descripcion} onChange={(e) => setNueva({ ...nueva, descripcion: e.target.value })} />
            </div>
            <div className="d-flex gap-3 mb-3">
              <div>
                <label htmlFor="cat-color1" className="form-label">Color 1</label>
                <input id="cat-color1" type="color" className="form-control form-control-color" value={nueva.color1} onChange={(e) => setNueva({ ...nueva, color1: e.target.value })} />
              </div>
              <div>
                <label htmlFor="cat-color2" className="form-label">Color 2</label>
                <input id="cat-color2" type="color" className="form-control form-control-color" value={nueva.color2} onChange={(e) => setNueva({ ...nueva, color2: e.target.value })} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">Agregar categoría</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminCategorias;
