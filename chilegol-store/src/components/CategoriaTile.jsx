// Tarjeta de una categoría, con las franjas de colores del equipo.
// Si recibe "to" es un enlace; si recibe "onSeleccionar" es un botón.

import { Link } from 'react-router-dom';

function Contenido({ categoria, cantidad }) {
  return (
    <>
      <span className="categoria-tile__colores" aria-hidden="true">
        {categoria.colores.map((color, i) => (
          <span key={i} style={{ background: color, borderRight: '1px solid rgba(0,0,0,.08)' }} />
        ))}
      </span>
      <span className="categoria-tile__texto">
        <span className="categoria-tile__nombre">{categoria.nombre}</span>
        <span className="small texto-secundario">
          {cantidad === 1 ? '1 camiseta' : `${cantidad} camisetas`}
        </span>
      </span>
    </>
  );
}

function CategoriaTile({ categoria, cantidad, to, seleccionada = false, onSeleccionar }) {
  if (to) {
    return (
      <Link to={to} className="categoria-tile">
        <Contenido categoria={categoria} cantidad={cantidad} />
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={`categoria-tile ${seleccionada ? 'seleccionada' : ''}`}
      aria-pressed={seleccionada}
      onClick={() => onSeleccionar(categoria.nombre)}
    >
      <Contenido categoria={categoria} cantidad={cantidad} />
    </button>
  );
}

export default CategoriaTile;
