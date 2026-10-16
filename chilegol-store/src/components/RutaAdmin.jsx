// Protege las páginas del administrador.
// Si nadie inició sesión -> lo manda a /login.
// Si inició sesión un cliente -> le avisa que no tiene permiso.

import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RutaAdmin({ children }) {
  const { usuario, esAdmin } = useAuth();
  const ubicacion = useLocation();

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: ubicacion.pathname }} />;
  }

  if (!esAdmin) {
    return (
      <main className="container py-5">
        <div className="panel text-center py-5">
          <h1 className="h2">Esta sección es solo para administradores</h1>
          <p className="texto-secundario">Tu cuenta es de cliente. Ingresa con una cuenta de administrador para ver el panel.</p>
          <Link to="/" className="btn btn-dark">Volver a la tienda</Link>
        </div>
      </main>
    );
  }

  return children;
}

export default RutaAdmin;
