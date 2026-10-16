// Perfil del administrador: sus datos, cambio de contraseña y restablecer datos de ejemplo.

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTienda } from '../../context/TiendaContext';
import { formatearFecha } from '../../utils/formato';
import { validarCambioPassword, hayErrores } from '../../utils/validaciones';

const VACIO = { actual: '', nueva: '', confirmar: '' };

function AdminPerfil() {
  const { usuario, cambiarPassword, recargarUsuarios } = useAuth();
  const { restablecerDatos } = useTienda();

  const [formulario, setFormulario] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [aviso, setAviso] = useState(null);
  const [confirmarReinicio, setConfirmarReinicio] = useState(false);
  const [reiniciado, setReiniciado] = useState(false);

  function cambiar(evento) {
    setFormulario({ ...formulario, [evento.target.name]: evento.target.value });
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevos = validarCambioPassword(formulario);
    setErrores(nuevos);
    setAviso(null);
    if (hayErrores(nuevos)) return;

    const resultado = cambiarPassword(formulario.actual, formulario.nueva);
    if (resultado.ok) {
      setAviso({ tipo: 'success', texto: 'Cambiaste tu contraseña.' });
      setFormulario(VACIO);
    } else {
      setAviso({ tipo: 'danger', texto: resultado.error });
    }
  }

  function reiniciar() {
    restablecerDatos();
    recargarUsuarios();
    setConfirmarReinicio(false);
    setReiniciado(true);
  }

  const campos = [
    { nombre: 'actual', etiqueta: 'Contraseña actual', auto: 'current-password' },
    { nombre: 'nueva', etiqueta: 'Contraseña nueva', auto: 'new-password' },
    { nombre: 'confirmar', etiqueta: 'Repite la contraseña nueva', auto: 'new-password' },
  ];

  return (
    <>
      <h1 className="mb-4">Perfil</h1>

      <div className="row g-4">
        <div className="col-12 col-lg-5">
          <div className="panel">
            <div className="d-flex align-items-center gap-3 mb-3">
              <span className="d-inline-flex align-items-center justify-content-center rounded-circle text-white font-titulo"
                style={{ width: 56, height: 56, background: 'var(--cg-azul)', fontSize: '1.6rem', color: '#fff' }}>
                {usuario.nombre[0]}
              </span>
              <div>
                <h2 className="h3 mb-0">{usuario.nombre} {usuario.apellidos}</h2>
                <span className="badge text-bg-dark">Administrador</span>
              </div>
            </div>
            <dl className="row mb-0 small">
              <dt className="col-4 fw-normal texto-secundario">Correo</dt><dd className="col-8">{usuario.email}</dd>
              <dt className="col-4 fw-normal texto-secundario">Teléfono</dt><dd className="col-8">{usuario.telefono || '-'}</dd>
              <dt className="col-4 fw-normal texto-secundario">Desde</dt><dd className="col-8 mb-0">{formatearFecha(usuario.fechaRegistro)}</dd>
            </dl>
          </div>

          <div className="panel mt-4">
            <h2 className="h3">Datos de ejemplo</h2>
            <p className="small texto-secundario">
              Vuelve los productos, categorías, órdenes y usuarios a como vienen en los archivos de la carpeta data.
              Sirve para dejar la tienda limpia antes de una demostración.
            </p>
            {reiniciado && <div className="alert alert-success py-2 small" role="status">Los datos volvieron a su estado original.</div>}
            {confirmarReinicio ? (
              <div className="d-flex flex-wrap gap-2 align-items-center">
                <span className="small">Se perderán los cambios hechos en el panel.</span>
                <button type="button" className="btn btn-sm btn-danger" onClick={reiniciar}>Sí, restablecer</button>
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setConfirmarReinicio(false)}>Cancelar</button>
              </div>
            ) : (
              <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => { setConfirmarReinicio(true); setReiniciado(false); }}>
                Restablecer datos de ejemplo
              </button>
            )}
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <form className="panel" onSubmit={enviar} noValidate>
            <h2 className="h3">Cambiar contraseña</h2>
            {aviso && <div className={`alert alert-${aviso.tipo} py-2`} role="status">{aviso.texto}</div>}
            {campos.map((c) => (
              <div className="mb-3" key={c.nombre}>
                <label htmlFor={`perfil-${c.nombre}`} className="form-label">{c.etiqueta}</label>
                <input
                  id={`perfil-${c.nombre}`}
                  name={c.nombre}
                  type="password"
                  autoComplete={c.auto}
                  className={`form-control ${errores[c.nombre] ? 'is-invalid' : ''}`}
                  value={formulario[c.nombre]}
                  onChange={cambiar}
                />
                {errores[c.nombre] && <div className="invalid-feedback">{errores[c.nombre]}</div>}
              </div>
            ))}
            <button type="submit" className="btn btn-primary">Cambiar contraseña</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminPerfil;
