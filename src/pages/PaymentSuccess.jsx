import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function PaymentSuccess() {
  const location = useLocation();
  const datos = location.state || { orden: '#20240705', total: 0 };

  return (
    <main className="seccion">
      <div className="contenedor centrado">
        <div className="aviso su-20">
          <h1>¡Pago Realizado con Éxito!</h1>
          <p>Se ha generado la orden de compra N° <strong>{datos.orden}</strong></p>
          <h2>Total Pagado: ${datos.total?.toLocaleString('es-CL')}</h2>
          <p>Enviaremos el comprobante al correo indicado.</p>
          <div className="su-20">
            <Link to="/" className="boton boton--principal">Volver a la Tienda</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

