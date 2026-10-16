// Página 404: la dirección no existe.

import { Link } from 'react-router-dom';

function NoEncontrado() {
  return (
    <main className="container py-5">
      <div className="panel text-center py-5">
        <p className="font-titulo" style={{ fontSize: '5rem', lineHeight: 1 }}>404</p>
        <h1 className="h2">Esta página quedó fuera de la cancha</h1>
        <p className="texto-secundario">Revisa la dirección o vuelve al inicio.</p>
        <Link to="/" className="btn btn-dark">Ir al inicio</Link>
      </div>
    </main>
  );
}

export default NoEncontrado;
