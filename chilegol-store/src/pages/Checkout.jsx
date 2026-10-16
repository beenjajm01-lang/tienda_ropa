// Checkout: resumen del carrito, datos del cliente, dirección y pago.
//
// Usuario con sesión iniciada -> sus datos y su dirección se completan solos.
// Usuario sin sesión          -> escribe todo a mano.
//
// La prop "procesarPago" permite cambiar el servicio de pago por un mock en las pruebas.

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CabeceraPagina from '../components/CabeceraPagina';
import CamposDireccion from '../components/CamposDireccion';
import ResumenPedido from '../components/ResumenPedido';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTienda } from '../context/TiendaContext';
import { procesarPago as procesarPagoServicio } from '../services/pagoService';
import { validarCheckout, hayErrores } from '../utils/validaciones';
import { formatearPrecio } from '../utils/formato';
import { precioFinal } from '../utils/precios';

// Datos con los que parte el formulario
function datosIniciales(usuario) {
  const direccion = usuario?.direccion ?? {};
  return {
    nombre: usuario?.nombre ?? '',
    apellidos: usuario?.apellidos ?? '',
    email: usuario?.email ?? '',
    calle: direccion.calle ?? '',
    departamento: direccion.departamento ?? '',
    region: direccion.region ?? '',
    comuna: direccion.comuna ?? '',
    indicaciones: direccion.indicaciones ?? '',
  };
}

// Convierte un artículo del carrito en una línea de la boleta
function aItemDeOrden(item) {
  return {
    productoId: item.id,
    nombre: item.nombre,
    categoria: item.categoria,
    imagen: item.imagen,
    talla: item.talla,
    cantidad: item.cantidad,
    precioUnitario: precioFinal(item),
    precioOriginal: item.precio,
  };
}

function Checkout({ procesarPago = procesarPagoServicio }) {
  const { items, total, vaciar } = useCart();
  const { usuario } = useAuth();
  const { productos, registrarOrden } = useTienda();
  const navigate = useNavigate();
  const ubicacion = useLocation();

  // Si viene de "Intentar de nuevo", recupero lo que había escrito
  const [formulario, setFormulario] = useState(() => ubicacion.state?.datos ?? datosIniciales(usuario));
  const [errores, setErrores] = useState({});
  const [simularRechazo, setSimularRechazo] = useState(false);
  const [procesando, setProcesando] = useState(false);

  function cambiarCampo(campo, valor) {
    setFormulario((anterior) => ({ ...anterior, [campo]: valor }));
  }

  async function pagar(evento) {
    evento.preventDefault();
    const nuevosErrores = validarCheckout(formulario);
    setErrores(nuevosErrores);
    if (hayErrores(nuevosErrores)) return;

    setProcesando(true);

    const cliente = { nombre: formulario.nombre.trim(), apellidos: formulario.apellidos.trim(), email: formulario.email.trim() };
    const direccion = {
      calle: formulario.calle.trim(),
      departamento: formulario.departamento.trim(),
      region: formulario.region,
      comuna: formulario.comuna,
      indicaciones: formulario.indicaciones.trim(),
    };

    // Reviso el stock actual de cada camiseta (el admin pudo cambiarlo después de agregarla)
    const itemsConStockActual = items.map((item) => ({
      ...item,
      stock: productos.find((p) => p.id === item.id)?.stock ?? 0,
    }));

    const resultado = await procesarPago({ items: itemsConStockActual, total, simularRechazo });

    if (resultado.aprobado) {
      const orden = registrarOrden({
        usuarioId: usuario?.id ?? null,
        cliente,
        direccion,
        items: items.map(aItemDeOrden),
        total,
      });
      navigate('/compra-exitosa', { state: { orden } });
      vaciar();
    } else {
      navigate('/compra-fallida', {
        state: { motivo: resultado.motivo, pedido: { cliente, direccion, items, total }, datos: formulario },
      });
    }
  }

  if (items.length === 0) {
    return (
      <>
        <CabeceraPagina titulo="Pagar" />
        <section className="seccion">
          <div className="container">
            <div className="panel text-center py-5">
              <h2>No hay nada que pagar</h2>
              <p className="texto-secundario">Tu carrito está vacío.</p>
              <Link to="/productos" className="btn btn-primary">Ver camisetas</Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <CabeceraPagina titulo="Pagar" descripcion="Revisa tus datos y la dirección de entrega." />

      <section className="seccion checkout">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-lg-7">
              {usuario ? (
                <div className="alert alert-info">
                  Completamos el formulario con los datos de tu cuenta, {usuario.nombre}. Revisa la dirección antes de pagar.
                </div>
              ) : (
                <div className="alert alert-light border">
                  ¿Tienes cuenta?{' '}
                  <Link to="/login" state={{ desde: '/checkout' }}>Ingresa</Link> y completamos tus datos.
                </div>
              )}

              <form onSubmit={pagar} noValidate>
                <fieldset className="panel mb-4" disabled={procesando}>
                  <legend className="mb-3">Tus datos</legend>
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <label htmlFor="checkout-nombre" className="form-label">Nombre</label>
                      <input
                        id="checkout-nombre"
                        className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                        value={formulario.nombre}
                        onChange={(e) => cambiarCampo('nombre', e.target.value)}
                        autoComplete="given-name"
                      />
                      {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                    </div>
                    <div className="col-12 col-sm-6">
                      <label htmlFor="checkout-apellidos" className="form-label">Apellidos</label>
                      <input
                        id="checkout-apellidos"
                        className={`form-control ${errores.apellidos ? 'is-invalid' : ''}`}
                        value={formulario.apellidos}
                        onChange={(e) => cambiarCampo('apellidos', e.target.value)}
                        autoComplete="family-name"
                      />
                      {errores.apellidos && <div className="invalid-feedback">{errores.apellidos}</div>}
                    </div>
                    <div className="col-12">
                      <label htmlFor="checkout-email" className="form-label">Correo</label>
                      <input
                        id="checkout-email"
                        type="email"
                        className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                        value={formulario.email}
                        onChange={(e) => cambiarCampo('email', e.target.value)}
                        autoComplete="email"
                      />
                      {errores.email && <div className="invalid-feedback">{errores.email}</div>}
                      <div className="form-text">Aquí te llega la boleta.</div>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="panel mb-4" disabled={procesando}>
                  <legend className="mb-3">Dirección de entrega</legend>
                  <CamposDireccion valores={formulario} errores={errores} onCambio={cambiarCampo} idPrefijo="checkout" />
                </fieldset>

                <fieldset className="panel mb-4" disabled={procesando}>
                  <legend className="mb-2">Pago</legend>
                  <p className="texto-secundario">
                    Este es un pago simulado: al confirmar, el pedido se aprueba como si hubieras pagado con tarjeta.
                  </p>
                  <div className="form-check">
                    <input
                      id="simular-rechazo"
                      type="checkbox"
                      className="form-check-input"
                      checked={simularRechazo}
                      onChange={(e) => setSimularRechazo(e.target.checked)}
                    />
                    <label htmlFor="simular-rechazo" className="form-check-label">
                      Simular rechazo del banco (para probar la pantalla de compra fallida)
                    </label>
                  </div>
                </fieldset>

                <button type="submit" className="btn btn-primary btn-lg w-100" disabled={procesando}>
                  {procesando ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                      Procesando el pago
                    </>
                  ) : (
                    `Pagar ${formatearPrecio(total)}`
                  )}
                </button>
              </form>
            </div>

            <div className="col-12 col-lg-5">
              <ResumenPedido items={items} total={total} />
              <Link to="/carrito" className="d-inline-block mt-3">Editar carrito</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Checkout;
