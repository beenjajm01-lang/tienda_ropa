// Iniciar sesión.
// Validaciones: correo con formato válido y contraseña de al menos 6 caracteres.

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validarLogin, hayErrores } from '../utils/validaciones';

function Login() {
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();
  const ubicacion = useLocation();

  // Estado del formulario: lo que el usuario va escribiendo
  const [formulario, setFormulario] = useState({ email: '', password: '' });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  function cambiar(evento) {
    const { name, value } = evento.target;
    setFormulario({ ...formulario, [name]: value });
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = validarLogin(formulario);
    setErrores(nuevosErrores);
    setErrorGeneral('');
    if (hayErrores(nuevosErrores)) return;

    const resultado = iniciarSesion(formulario.email, formulario.password);
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }

    // Vuelve a la página desde donde venía (por ejemplo, el checkout)
    const destino = ubicacion.state?.desde ?? (resultado.usuario.rol === 'admin' ? '/admin' : '/');
    navigate(destino, { replace: true });
  }

  function usarCuenta(email, password) {
    setFormulario({ email, password });
    setErrores({});
    setErrorGeneral('');
  }

  return (
    <section className="seccion">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5">
            <div className="panel p-4 p-md-5">
              <h1 className="h2 mb-1">Ingresar</h1>
              <p className="texto-secundario">Con tu cuenta, el checkout se completa solo.</p>

              {errorGeneral && (
                <div className="alert alert-danger" role="alert">{errorGeneral}</div>
              )}

              <form onSubmit={enviar} noValidate>
                <div className="mb-3">
                  <label htmlFor="login-email" className="form-label">Correo</label>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                    value={formulario.email}
                    onChange={cambiar}
                    autoComplete="email"
                  />
                  {errores.email && <div className="invalid-feedback">{errores.email}</div>}
                </div>
                <div className="mb-4">
                  <label htmlFor="login-password" className="form-label">Contraseña</label>
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    className={`form-control ${errores.password ? 'is-invalid' : ''}`}
                    value={formulario.password}
                    onChange={cambiar}
                    autoComplete="current-password"
                  />
                  {errores.password && <div className="invalid-feedback">{errores.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">Ingresar</button>
              </form>

              <p className="text-center mt-3 mb-0">
                ¿No tienes cuenta? <Link to="/registro" state={ubicacion.state}>Crea una aquí</Link>
              </p>
            </div>

            <div className="panel mt-3 small">
              <p className="fw-semibold mb-2">Cuentas de prueba</p>
              <div className="d-flex flex-wrap gap-2">
                <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => usarCuenta('cliente@chilegol.cl', 'cliente123')}>
                  Usar cuenta de cliente
                </button>
                <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => usarCuenta('admin@chilegol.cl', 'admin123')}>
                  Usar cuenta de administrador
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
