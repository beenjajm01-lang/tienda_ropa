// Menú lateral del panel; solo muestra los módulos que el rol puede abrir.

import { startTransition } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logoCgs from '../../assets/logo-cgs.svg';

export default function AdminSidebar({ usuario, permisos, onLogout }) {
  const navigate = useNavigate();

  // startTransition agrupa el logout y la navegación en un solo render.
  // Si no, el panel alcanza a ver "sin sesión" y manda al login.
  const salir = () => {
    startTransition(() => {
      onLogout();
      navigate('/');
    });
  };

  return (
    <aside className="lateral">
      <Link className="lateral__marca" to="/admin">
        <img src={logoCgs} alt="" width="32" height="32" />
        <span>ChileGol admin</span>
      </Link>

      <nav aria-label="Módulos de administración">
        <ul className="lateral__menu">
          <li><NavLink to="/admin" end>Resumen</NavLink></li>
          {permisos.productos !== 'ninguno' && (
            <li><NavLink to="/admin/productos">Productos</NavLink></li>
          )}
          {permisos.usuarios !== 'ninguno' && (
            <li><NavLink to="/admin/usuarios">Usuarios</NavLink></li>
          )}
        </ul>
      </nav>

      <div className="lateral__sesion">
        <p>{usuario.nombre}</p>
        <p><span className="lateral__rol">{usuario.rol}</span></p>
        <Link to="/">Ver la tienda</Link>
        <button type="button" className="lateral__salir" onClick={salir}>Cerrar sesión</button>
      </div>
    </aside>
  );
}
