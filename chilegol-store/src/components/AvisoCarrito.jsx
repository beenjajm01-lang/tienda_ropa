// Aviso que aparece abajo a la derecha cuando se agrega una camiseta al carrito.
// Se cierra solo después de 3 segundos (useEffect + setTimeout).

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function AvisoCarrito() {
  const { aviso, cerrarAviso } = useCart();

  useEffect(() => {
    if (!aviso) return undefined;
    const temporizador = setTimeout(cerrarAviso, 3000);
    // Si llega otro aviso antes de los 3 segundos, se cancela el temporizador anterior
    return () => clearTimeout(temporizador);
  }, [aviso, cerrarAviso]);

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3" aria-live="polite">
      {aviso && (
        <div className="toast show" role="status">
          <div className="toast-body d-flex align-items-start gap-2">
            <i className="bi bi-check-circle-fill text-success fs-5" aria-hidden="true" />
            <div className="flex-grow-1">
              <div className="fw-semibold">Agregaste al carrito</div>
              <div className="small">{aviso.texto}</div>
              <Link to="/carrito" className="small" onClick={cerrarAviso}>
                Ver carrito
              </Link>
            </div>
            <button type="button" className="btn-close" aria-label="Cerrar aviso" onClick={cerrarAviso} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AvisoCarrito;
