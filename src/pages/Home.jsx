import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/molecules/ProductCard';
import { resolverImagen } from '../data/products';

export default function Home({ productos = [], onAgregar }) {
  const destacados = productos.slice(0, 4);

  return (
    <main id="contenido">
      <section className="hero">
        <div className="contenedor hero__grid">
          <div className="hero__texto">
            <h1 className="hero__titulo">
              Camisetas oficiales del fútbol chileno
            </h1>
            <p className="hero__texto">
              Encuentra las mejores camisetas de los clubes nacionales para la cancha y la tribuna con el ki Saiyajin.
            </p>
            <Link className="boton boton--principal" to="/productos">
              Ver productos
            </Link>
          </div>

          <figure className="hero__figura">
            <img 
              src={resolverImagen("hero-tienda.webp")} 
              alt="Goku con la camiseta de Colo-Colo y Vegeta con la de Universidad de Chile" 
              width="800" 
              height="560" 
              style={{ borderRadius: '12px', objectFit: 'cover', width: '100%', height: 'auto' }}
            />
          </figure>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <h2 className="seccion__titulo">Productos Destacados</h2>
          <p className="seccion__bajada">Cuatro modelos destacados con despacho a todo Chile.</p>
          <div className="calugas">
            {destacados.map((prod) => (
              <ProductCard key={prod.id} product={prod} onAgregar={onAgregar} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


