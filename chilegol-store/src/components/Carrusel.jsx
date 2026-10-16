// Carrusel de la portada (como un pase de diapositivas).
// El estado "indice" dice qué diapositiva se ve. Cada 6 segundos avanza sola,
// salvo que el mouse esté encima o que el usuario prefiera menos movimiento.

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { esFoto } from '../utils/imagenes';

// Color del botón según el fondo de la diapositiva
const CLASE_BOTON = { rojo: 'btn-light', blanco: 'btn-dark', cancha: 'btn-primary' };

function Carrusel({ diapositivas }) {
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);
  const total = diapositivas.length;

  const siguiente = () => setIndice((actual) => (actual + 1) % total);
  const anterior = () => setIndice((actual) => (actual - 1 + total) % total);

  useEffect(() => {
    const menosMovimiento = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (pausado || menosMovimiento || total < 2) return undefined;
    const intervalo = setInterval(() => setIndice((actual) => (actual + 1) % total), 6000);
    return () => clearInterval(intervalo);
  }, [pausado, total]);

  const actual = diapositivas[indice];

  return (
    <section
      className="cg-hero"
      aria-roledescription="carrusel"
      aria-label="Novedades de la tienda"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      <div key={indice} className={`cg-slide cg-slide--${actual.color}`} aria-live="polite">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-7">
              <h1 className="cg-slide__titulo">{actual.titulo}</h1>
              <p className="cg-slide__texto">{actual.texto}</p>
              <Link
                to={actual.enlace}
                className={`btn btn-lg ${CLASE_BOTON[actual.color] ?? 'btn-primary'}`}
              >
                {actual.boton}
              </Link>
            </div>
            <div className="col-12 col-md-5 text-center">
              <img className={esFoto(actual.imagen) ? 'cg-slide__foto' : 'cg-slide__camiseta'} src={actual.imagen} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div
        className="cg-hero__controles"
        style={{ color: actual.color === 'blanco' ? 'var(--cg-azul)' : '#fff' }}
      >
        <div className="container d-flex align-items-center gap-3">
          <button type="button" className="cg-hero__flecha" onClick={anterior} aria-label="Diapositiva anterior">
            <i className="bi bi-chevron-left" aria-hidden="true" />
          </button>
          <div className="d-flex gap-2">
            {diapositivas.map((d, i) => (
              <button
                key={d.titulo}
                type="button"
                className={`cg-hero__indicador ${i === indice ? 'activo' : ''}`}
                onClick={() => setIndice(i)}
                aria-label={`Ir a la diapositiva ${i + 1} de ${total}`}
                aria-current={i === indice}
              />
            ))}
          </div>
          <button type="button" className="cg-hero__flecha" onClick={siguiente} aria-label="Diapositiva siguiente">
            <i className="bi bi-chevron-right" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Carrusel;
