// Usuarios: lista, detalle, edición e historial de compras.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import CamposDireccion from '../../components/CamposDireccion';
import { useAuth } from '../../context/AuthContext';
import { useTienda } from '../../context/TiendaContext';
import { formatearPrecio, formatearFecha } from '../../utils/formato';
import { validarEmail } from '../../utils/validaciones';

function aFormulario(usuario) {
  const d = usuario.direccion ?? {};
  return {
    nombre: usuario.nombre,
    apellidos: usuario.apellidos,
    email: usuario.email,
    telefono: usuario.telefono ?? '',
    rol: usuario.rol,
    calle: d.calle ?? '',
    departamento: d.departamento ?? '',
    region: d.region ?? '',
    comuna: d.comuna ?? '',
    indicaciones: d.indicaciones ?? '',
  };
}

function DetalleUsuario({ usuario, compras, usuarios, onGuardar, onCerrar, esUsuarioActual }) {
  const [formulario, setFormulario] = useState(() => aFormulario(usuario));
  const [errores, setErrores] = useState({});
  const [guardado, setGuardado] = useState(false);

  function cambiarCampo(campo, valor) {
    setFormulario((anterior) => ({ ...anterior, [campo]: valor }));
    setGuardado(false);
  }

  function guardar(evento) {
    evento.preventDefault();
    const nuevos = {};
    if (!formulario.nombre.trim()) nuevos.nombre = 'Escribe el nombre';
    if (!formulario.apellidos.trim()) nuevos.apellidos = 'Escribe los apellidos';
    if (!validarEmail(formulario.email)) nuevos.email = 'Ingresa un correo válido';
    else if (usuarios.some((u) => u.id !== usuario.id && u.email.toLowerCase() === formulario.email.trim().toLowerCase())) {
      nuevos.email = 'Otro usuario ya usa ese correo';
    }
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    const tieneDireccion = formulario.calle.trim() !== '';
    onGuardar(usuario.id, {
      nombre: formulario.nombre.trim(),
      apellidos: formulario.apellidos.trim(),
      email: formulario.email.trim().toLowerCase(),
      telefono: formulario.telefono.trim(),
      rol: formulario.rol,
      direccion: tieneDireccion
        ? {
            calle: formulario.calle.trim(),
            departamento: formulario.departamento.trim(),
            region: formulario.region,
            comuna: formulario.comuna,
            indicaciones: formulario.indicaciones.trim(),
          }
        : null,
    });
    setGuardado(true);
  }

  const totalGastado = compras.reduce((suma, o) => suma + o.total, 0);

  return (
    <div className="panel">
      <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
        <div>
          <h2 className="h3 mb-0">{usuario.nombre} {usuario.apellidos}</h2>
          <div className="small texto-secundario">
            Cliente desde {formatearFecha(usuario.fechaRegistro)}. {compras.length} compras por {formatearPrecio(totalGastado)}.
          </div>
        </div>
        <button type="button" className="btn-close" aria-label="Cerrar detalle" onClick={onCerrar} />
      </div>

      {guardado && <div className="alert alert-success py-2" role="status">Guardaste los cambios.</div>}

      <form onSubmit={guardar} noValidate>
        <div className="row g-3">
          <div className="col-12 col-sm-6">
            <label htmlFor="usr-nombre" className="form-label">Nombre</label>
            <input id="usr-nombre" className={`form-control ${errores.nombre ? 'is-invalid' : ''}`} value={formulario.nombre} onChange={(e) => cambiarCampo('nombre', e.target.value)} />
            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
          </div>
          <div className="col-12 col-sm-6">
            <label htmlFor="usr-apellidos" className="form-label">Apellidos</label>
            <input id="usr-apellidos" className={`form-control ${errores.apellidos ? 'is-invalid' : ''}`} value={formulario.apellidos} onChange={(e) => cambiarCampo('apellidos', e.target.value)} />
            {errores.apellidos && <div className="invalid-feedback">{errores.apellidos}</div>}
          </div>
          <div className="col-12 col-sm-6">
            <label htmlFor="usr-email" className="form-label">Correo</label>
            <input id="usr-email" type="email" className={`form-control ${errores.email ? 'is-invalid' : ''}`} value={formulario.email} onChange={(e) => cambiarCampo('email', e.target.value)} />
            {errores.email && <div className="invalid-feedback">{errores.email}</div>}
          </div>
          <div className="col-6 col-sm-3">
            <label htmlFor="usr-telefono" className="form-label">Teléfono</label>
            <input id="usr-telefono" className="form-control" value={formulario.telefono} onChange={(e) => cambiarCampo('telefono', e.target.value)} />
          </div>
          <div className="col-6 col-sm-3">
            <label htmlFor="usr-rol" className="form-label">Rol</label>
            <select
              id="usr-rol"
              className="form-select"
              value={formulario.rol}
              onChange={(e) => cambiarCampo('rol', e.target.value)}
              disabled={esUsuarioActual}
            >
              <option value="cliente">Cliente</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
        </div>

        <h3 className="h5 mt-4 mb-3" style={{ fontFamily: 'var(--cg-fuente-texto)', fontWeight: 600 }}>Dirección</h3>
        <CamposDireccion valores={formulario} onCambio={cambiarCampo} idPrefijo="usr" />

        <button type="submit" className="btn btn-primary mt-3">Guardar cambios</button>
      </form>

      <h3 className="h5 mt-4" style={{ fontFamily: 'var(--cg-fuente-texto)', fontWeight: 600 }}>Historial de compras</h3>
      {compras.length === 0 ? (
        <p className="texto-secundario mb-0">Este usuario todavía no compra.</p>
      ) : (
        <ul className="list-group">
          {compras.map((o) => (
            <li key={o.id} className="list-group-item d-flex justify-content-between align-items-center gap-2">
              <div>
                <Link to={`/admin/ordenes?ver=${o.numero}`} className="fw-semibold">{o.numero}</Link>
                <div className="small texto-secundario">{formatearFecha(o.fecha)}, {o.items.length} producto(s), {o.estado}</div>
              </div>
              <span>{formatearPrecio(o.total)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AdminUsuarios() {
  const { usuarios, usuario: usuarioActual, editarUsuario } = useAuth();
  const { ordenes } = useTienda();
  const [seleccionadoId, setSeleccionadoId] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  const comprasDe = (u) =>
    ordenes.filter((o) => o.usuarioId === u.id || o.cliente.email.toLowerCase() === u.email.toLowerCase());

  const texto = busqueda.trim().toLowerCase();
  const lista = usuarios.filter((u) => `${u.nombre} ${u.apellidos} ${u.email}`.toLowerCase().includes(texto));
  const seleccionado = usuarios.find((u) => u.id === seleccionadoId);

  return (
    <>
      <h1 className="mb-1">Usuarios</h1>
      <p className="texto-secundario mb-4">{usuarios.length} cuentas registradas</p>

      <div className="row g-4">
        {seleccionado && (
          <div className="col-12 col-xxl-6 order-xxl-last">
            <DetalleUsuario
              key={seleccionado.id}
              usuario={seleccionado}
              usuarios={usuarios}
              compras={comprasDe(seleccionado)}
              onGuardar={editarUsuario}
              onCerrar={() => setSeleccionadoId(null)}
              esUsuarioActual={seleccionado.id === usuarioActual?.id}
            />
          </div>
        )}
        <div className={seleccionado ? 'col-12 col-xxl-6' : 'col-12'}>
          <div className="panel p-0">
            <div className="p-3 border-bottom">
              <label htmlFor="usuarios-buscar" className="visually-hidden">Buscar usuario</label>
              <input id="usuarios-buscar" type="search" className="form-control" placeholder="Buscar por nombre o correo" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
            </div>
            <div className="table-responsive">
              <table className="table tabla-admin align-middle">
                <thead>
                  <tr><th>Usuario</th><th>Rol</th><th>Comuna</th><th className="text-end">Compras</th><th /></tr>
                </thead>
                <tbody>
                  {lista.map((u) => (
                    <tr key={u.id} className={u.id === seleccionadoId ? 'table-active' : ''}>
                      <td>
                        {u.nombre} {u.apellidos}
                        <div className="small texto-secundario">{u.email}</div>
                      </td>
                      <td>
                        <span className={`badge ${u.rol === 'admin' ? 'text-bg-dark' : 'text-bg-light border'}`}>
                          {u.rol === 'admin' ? 'Administrador' : 'Cliente'}
                        </span>
                      </td>
                      <td>{u.direccion?.comuna ?? '-'}</td>
                      <td className="text-end">{comprasDe(u).length}</td>
                      <td className="text-end">
                        <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => setSeleccionadoId(u.id)}>
                          Ver
                        </button>
                      </td>
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

export default AdminUsuarios;
