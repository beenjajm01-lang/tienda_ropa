import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';

export default function Cart({ carrito, onCambiarCantidad, onEliminar, onVaciar }) {
  const navigate = useNavigate();
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  if (carrito.length === 0) {
    return (
      <main className="seccion">
        <div className="contenedor vacio">
          <h2>Tu carrito está vacío</h2>
          <p>Explora nuestras camisetas y agrega tus favoritas.</p>
          <Link to="/productos" className="boton boton--principal">Ir a la Tienda</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="seccion">
      <div className="contenedor">
        <h1 className="seccion__titulo">Mi Carrito de Compras</h1>
        <div className="carrito">
          <div className="carrito__lista">
            {carrito.map((item) => (
              <div key={item.id} className="linea">
                <figure className="linea__figura">
                  <img src={item.imagen} alt={item.nombre} />
                </figure>
                <div className="linea__cuerpo">
                  <span className="linea__nombre">{item.nombre}</span>
                  <span className="linea__precio">${item.precio.toLocaleString('es-CL')}</span>
                  <div className="cantidad">
                    <button onClick={() => onCambiarCantidad(item.id, item.cantidad - 1)}>-</button>
                    <output>{item.cantidad}</output>
                    <button onClick={() => onCambiarCantidad(item.id, item.cantidad + 1)}>+</button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p className="linea__subtotal">${(item.precio * item.cantidad).toLocaleString('es-CL')}</p>
                  <Button variant="peligro" className="boton--pequeno" onClick={() => onEliminar(item.id)}>
                    Quitar
                  </Button>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-between mt-3">
              <Button variant="secundario" onClick={onVaciar}>Vaciar Carrito</Button>
            </div>
          </div>

          <div className="resumen">
            <h2>Resumen</h2>
            <div className="resumen__fila">
              <span>Subtotal</span>
              <span>${total.toLocaleString('es-CL')}</span>
            </div>
            <div className="resumen__fila">
              <span>Envío</span>
              <span>Gratis</span>
            </div>
            <div className="resumen__total">
              <span>Total</span>
              <span>${total.toLocaleString('es-CL')}</span>
            </div>
            <Button variant="principal" className="boton--ancho su-20" onClick={() => navigate('/checkout')}>
              Proceder al Pago
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
