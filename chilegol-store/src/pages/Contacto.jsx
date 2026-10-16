// Formulario de contacto: nombre, correo, motivo y mensaje.
// Cada campo está conectado al estado: cuando el usuario escribe, el estado cambia
// y React vuelve a dibujar (por ejemplo, el contador de caracteres del mensaje).

import { useState } from 'react';
import CabeceraPagina from '../components/CabeceraPagina';
import { validarContacto, hayErrores, LARGO_MAXIMO_MENSAJE } from '../utils/validaciones';

const FORMULARIO_VACIO = { nombre: '', email: '', motivo: '', mensaje: '' };

function Contacto() {
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
  const [errores, setErrores] = useState({});
  const [enviadoA, setEnviadoA] = useState('');

  function cambiar(evento) {
    const { name, value } = evento.target;
    setFormulario({ ...formulario, [name]: value });
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = validarContacto(formulario);
    setErrores(nuevosErrores);
    if (hayErrores(nuevosErrores)) return;

    // No hay servidor: solo mostramos la confirmación y limpiamos el formulario
    setEnviadoA(formulario.email);
    setFormulario(FORMULARIO_VACIO);
  }

  return (
    <>
      <CabeceraPagina titulo="Contacto" descripcion="Escríbenos por tallas, pedidos o stock. Respondemos en menos de un día hábil." />

      <section className="seccion">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-lg-7">
              <div className="panel p-4">
                {enviadoA && (
                  <div className="alert alert-success" role="status">
                    Recibimos tu mensaje. Te responderemos a {enviadoA}.
                  </div>
                )}

                <form onSubmit={enviar} noValidate>
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <label htmlFor="contacto-nombre" className="form-label">Nombre</label>
                      <input
                        id="contacto-nombre"
                        name="nombre"
                        className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                        value={formulario.nombre}
                        onChange={cambiar}
                        autoComplete="name"
                      />
                      {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                    </div>
                    <div className="col-12 col-sm-6">
                      <label htmlFor="contacto-email" className="form-label">Correo</label>
                      <input
                        id="contacto-email"
                        name="email"
                        type="email"
                        className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                        value={formulario.email}
                        onChange={cambiar}
                        autoComplete="email"
                      />
                      {errores.email && <div className="invalid-feedback">{errores.email}</div>}
                    </div>
                    <div className="col-12">
                      <label htmlFor="contacto-motivo" className="form-label">Motivo</label>
                      <select
                        id="contacto-motivo"
                        name="motivo"
                        className={`form-select ${errores.motivo ? 'is-invalid' : ''}`}
                        value={formulario.motivo}
                        onChange={cambiar}
                      >
                        <option value="">Elige un motivo</option>
                        <option>Consulta sobre un pedido</option>
                        <option>Cambio de talla</option>
                        <option>Stock de una camiseta</option>
                        <option>Otro</option>
                      </select>
                      {errores.motivo && <div className="invalid-feedback">{errores.motivo}</div>}
                    </div>
                    <div className="col-12">
                      <label htmlFor="contacto-mensaje" className="form-label">Mensaje</label>
                      <textarea
                        id="contacto-mensaje"
                        name="mensaje"
                        rows="5"
                        maxLength={LARGO_MAXIMO_MENSAJE}
                        className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
                        value={formulario.mensaje}
                        onChange={cambiar}
                      />
                      {errores.mensaje && <div className="invalid-feedback">{errores.mensaje}</div>}
                      <div className="form-text text-end" data-testid="contador-mensaje">
                        {formulario.mensaje.length}/{LARGO_MAXIMO_MENSAJE}
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Enviar mensaje</button>
                </form>
              </div>
            </div>

            <div className="col-12 col-lg-5">
              <div className="panel p-4 h-100">
                <h2 className="h3">Otras formas de hablar con nosotros</h2>
                <ul className="list-unstyled mb-0 mt-3">
                  <li className="mb-3"><i className="bi bi-envelope me-2" aria-hidden="true" />contacto@chilegol.cl</li>
                  <li className="mb-3"><i className="bi bi-whatsapp me-2" aria-hidden="true" />+56 9 1234 5678</li>
                  <li className="mb-3"><i className="bi bi-geo-alt me-2" aria-hidden="true" />Santiago, Región Metropolitana (solo venta online)</li>
                  <li><i className="bi bi-clock me-2" aria-hidden="true" />Lunes a viernes, de 9:00 a 18:00</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contacto;
