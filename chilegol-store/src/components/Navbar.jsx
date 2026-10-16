// Barra de navegación superior.
// En computador el menú es horizontal; en celular se esconde detrás del botón ☰.
// El estado "menuAbierto" recuerda si el menú del celular está abierto o cerrado.

import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ENLACES = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/productos', texto: 'Productos' },
  { ruta: '/categorias', texto: 'Categorías' },
  { ruta: '/ofertas', texto: 'Ofertas' },
  { ruta: '/blogs', texto: 'Blog' },
  { ruta: '/nosotros', texto: 'Nosotros' },
  { ruta: '/contacto', texto: 'Contacto' },
];

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { cantidadTotal } = useCart();
  const { usuario, esAdmin, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const cerrarMenu = () => setMenuAbierto(false);

  function salir() {
    cerrarSesion();
    cerrarMenu();
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg cg-navbar sticky-top" aria-label="Menú principal">
      <div className="container">
        <Link className="navbar-brand cg-marca" to="/" onClick={cerrarMenu}>
          <img src="/images/logo-cgs.svg" alt="" />
          ChileGol
        </Link>

        {/* Carrito y botón ☰: en computador quedan al final de la barra */}
        <div className="d-flex align-items-center gap-2 order-lg-last ms-auto ms-lg-0">
          <Link
            to="/carrito"
            className="cg-carrito-btn"
            aria-label={`Carrito, ${cantidadTotal} productos`}
            onClick={cerrarMenu}
          >
            <i className="bi bi-bag" aria-hidden="true" />
            {cantidadTotal > 0 && <span className="badge rounded-pill">{cantidadTotal}</span>}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="menu-principal"
            aria-expanded={menuAbierto}
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <i className={`bi ${menuAbierto ? 'bi-x-lg' : 'bi-list'}`} aria-hidden="true" />
          </button>
        </div>

        <div id="menu-principal" className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`}>
          <ul className="navbar-nav mx-lg-auto">
            {ENLACES.map((enlace) => (
              <li className="nav-item" key={enlace.ruta}>
                <NavLink className="nav-link" to={enlace.ruta} end={enlace.ruta === '/'} onClick={cerrarMenu}>
                  {enlace.texto}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2 py-3 py-lg-0 me-lg-3">
            {usuario ? (
              <>
                <span className="text-white-50 small">Hola, {usuario.nombre}</span>
                {esAdmin && (
                  <Link className="btn btn-sm btn-light" to="/admin" onClick={cerrarMenu}>
                    Panel admin
                  </Link>
                )}
                <button type="button" className="btn btn-sm btn-outline-light" onClick={salir}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-sm btn-outline-light" to="/login" onClick={cerrarMenu}>
                  Ingresar
                </Link>
                <Link className="btn btn-sm btn-primary" to="/registro" onClick={cerrarMenu}>
                  Crear cuenta
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
