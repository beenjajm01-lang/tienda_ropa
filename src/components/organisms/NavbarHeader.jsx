import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoCgs from '../../assets/logo-cgs.svg';

export function NavbarHeader({ totalItems = 0 }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();

  return (
    <header className="cabecera">
      <nav className="cabecera__nav" aria-label="Navegación principal">
        <Link className="marca" to="/">
          <img className="marca__icono" src={logoCgs} alt="Logo ChileGol" width="38" height="38" />
          <span>ChileGol Store</span>
        </Link>

        <button 
          className="menu-boton" 
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-expanded={menuAbierto}
        >
          <span className="menu-boton__barras"></span>
          <span>Menú</span>
        </button>

        <ul className={`menu ${menuAbierto ? 'menu--abierto' : ''}`}>
          <li>
            <Link to="/" aria-current={location.pathname === '/' ? 'page' : undefined}>Inicio</Link>
          </li>
          <li>
            <Link to="/productos" aria-current={location.pathname === '/productos' ? 'page' : undefined}>Productos</Link>
          </li>
          <li>
            <Link to="/categorias" aria-current={location.pathname === '/categorias' ? 'page' : undefined}>Categorías</Link>
          </li>
          <li>
            <Link to="/nosotros" aria-current={location.pathname === '/nosotros' ? 'page' : undefined}>Nosotros</Link>
          </li>
          <li>
            <Link to="/contacto" aria-current={location.pathname === '/contacto' ? 'page' : undefined}>Contacto</Link>
          </li>
        </ul>

        <div className="acciones">
          <Link to="/login">Iniciar sesión</Link>
          <Link className="carrito-boton" to="/carrito">
            <span>Carrito</span>
            <span className="carrito-boton__conteo">{totalItems}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

