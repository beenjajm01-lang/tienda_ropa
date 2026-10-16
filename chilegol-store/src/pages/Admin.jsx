// Panel administrativo: menú lateral + la sección elegida.
// Cada sección es una ruta hija (/admin/productos, /admin/ordenes, ...) y se dibuja en <Outlet />.

import { startTransition } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SECCIONES = [
  { ruta: '/admin', texto: 'Dashboard', icono: 'bi-speedometer2' },
  { ruta: '/admin/productos', texto: 'Productos', icono: 'bi-box-seam' },
  { ruta: '/admin/categorias', texto: 'Categorías', icono: 'bi-tags' },
  { ruta: '/admin/ordenes', texto: 'Órdenes', icono: 'bi-receipt' },
  { ruta: '/admin/usuarios', texto: 'Usuarios', icono: 'bi-people' },
  { ruta: '/admin/reportes', texto: 'Reportes', icono: 'bi-bar-chart' },
  { ruta: '/admin/perfil', texto: 'Perfil', icono: 'bi-person-circle' },
];

function Admin() {
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  // startTransition hace que cerrar la sesión y cambiar de página ocurran juntos.
  // Si no, la ruta protegida alcanza a ver "sin sesión" y manda al login.
  function salir() {
    startTransition(() => {
      cerrarSesion();
      navigate('/');
    });
  }

  return (
    <div className="admin d-lg-flex">
      <aside className="admin-sidebar d-flex flex-column">
        <div className="p-3 pb-lg-4">
          <Link to="/admin" className="cg-marca text-decoration-none">
            <img src="/images/logo-cgs.svg" alt="" />
            ChileGol
          </Link>
          <div className="small text-white-50 mt-1">Panel de administración</div>
        </div>

        <nav aria-label="Menú del administrador">
          <ul className="nav flex-column">
            {SECCIONES.map((seccion) => (
              <li className="nav-item" key={seccion.ruta}>
                <NavLink className="nav-link" to={seccion.ruta} end={seccion.ruta === '/admin'}>
                  <i className={`bi ${seccion.icono}`} aria-hidden="true" />
                  {seccion.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-lg-auto p-3 d-flex flex-wrap flex-lg-column gap-2">
          <span className="small text-white-50 d-none d-lg-block">{usuario?.email}</span>
          <Link to="/" className="btn btn-sm btn-outline-light">Ver tienda</Link>
          <button type="button" className="btn btn-sm btn-primary" onClick={salir}>
            <i className="bi bi-box-arrow-right me-1" aria-hidden="true" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-grow-1 p-3 p-md-4 p-xl-5" style={{ minWidth: 0 }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Admin;
