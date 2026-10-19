// Plantilla del panel: menú lateral + la sección elegida (Outlet).
// Protege el panel: sin sesión -> login; rol Cliente -> a la tienda.
// Es solo para la maqueta: la seguridad real va en el servidor.

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from '../organisms/AdminSidebar';
import { permisosDe } from '../../data/users';
import '../../assets/admin.css';

export default function AdminLayout({ usuario, onLogout, onProductosCambiados, onSesionCambiada }) {
  const location = useLocation();

  if (!usuario) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ desde: location.pathname, aviso: 'Inicia sesión con una cuenta de administrador o vendedor para entrar al panel.' }}
      />
    );
  }

  if (usuario.rol === 'Cliente') {
    return <Navigate to="/" replace />;
  }

  const permisos = permisosDe(usuario.rol);

  return (
    <div className="panel">
      <AdminSidebar usuario={usuario} permisos={permisos} onLogout={onLogout} />
      <main className="trabajo" id="contenido">
        {/* Contexto que leen las páginas del panel */}
        <Outlet context={{ usuario, permisos, onProductosCambiados, onSesionCambiada }} />
      </main>
    </div>
  );
}
