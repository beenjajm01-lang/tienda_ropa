// Crear cuenta nueva.

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validarRegistro, hayErrores } from '../utils/validaciones';

const FORMULARIO_VACIO = {
  nombre: '',
  apellidos: '',
  email: '',
  telefono: '',
  password: '',
  confirmar: '',
  terminos: false,
};

function Registro() {
  const { registrarse } = useAuth();
  const navigate = useNavigate();
  const ubicacion = useLocation();

  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  function cambiar(evento) {
    const { name, value, type, checked } = evento.target;
    setFormulario({ ...formulario, [name]: type === 'checkbox' ? checked : value });
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = validarRegistro(formulario);
    setErrores(nuevosErrores);
    setErrorGeneral('');
    if (hayErrores(nuevosErrores)) return;

    const resultado = registrarse(formulario);
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }
    navigate(ubicacion.state?.desde ?? '/', { replace: true });
  }

  // Pequeña ayuda para no repetir el mismo bloque de input 5 veces
  function campo(nombre, etiqueta, tipo = 'text', autoComplete = 'off', opcional = false) {
    return (
      <>
        <label htmlFor={`registro-${nombre}`} className="form-label">
          {etiqueta} {opcional && <span className="texto-secundario">(opcional)</span>}
        </label>
        <input
          id={`registro-${nombre}`}
          name={nombre}
          type={tipo}
          className={`form-control ${errores[nombre] ? 'is-invalid' : ''}`}
          value={formulario[nombre]}
          onChange={cambiar}
          autoComplete={autoComplete}
        />
        {errores[nombre] && <div className="invalid-feedback">{errores[nombre]}</div>}
      </>
    );
  }

  return (
    <section className="seccion">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7">
            <div className="panel p-4 p-md-5">
              <h1 className="h2 mb-1">Crear cuenta</h1>
              <p className="texto-secundario">Guarda tus datos para comprar más rápido y revisar tus pedidos.</p>

              {errorGeneral && <div className="alert alert-danger" role="alert">{errorGeneral}</div>}

              <form onSubmit={enviar} noValidate>
                <div className="row g-3">
                  <div className="col-12 col-sm-6">{campo('nombre', 'Nombre', 'text', 'given-name')}</div>
                  <div className="col-12 col-sm-6">{campo('apellidos', 'Apellidos', 'text', 'family-name')}</div>
                  <div className="col-12 col-sm-6">{campo('email', 'Correo', 'email', 'email')}</div>
                  <div className="col-12 col-sm-6">{campo('telefono', 'Teléfono', 'tel', 'tel', true)}</div>
                  <div className="col-12 col-sm-6">{campo('password', 'Contraseña', 'password', 'new-password')}</div>
                  <div className="col-12 col-sm-6">{campo('confirmar', 'Repite la contraseña', 'password', 'new-password')}</div>
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        id="registro-terminos"
                        name="terminos"
                        type="checkbox"
                        className={`form-check-input ${errores.terminos ? 'is-invalid' : ''}`}
                        checked={formulario.terminos}
                        onChange={cambiar}
                      />
                      <label htmlFor="registro-terminos" className="form-check-label">
                        Acepto los términos y condiciones de ChileGol Store
                      </label>
                      {errores.terminos && <div className="invalid-feedback">{errores.terminos}</div>}
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-4">Crear cuenta</button>
              </form>

              <p className="text-center mt-3 mb-0">
                ¿Ya tienes cuenta? <Link to="/login" state={ubicacion.state}>Ingresa aquí</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registro;
