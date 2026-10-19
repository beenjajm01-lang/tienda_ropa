import { Link } from 'react-router-dom';
import ProductCard from '../components/molecules/ProductCard';

export default function Home({ productos, onAgregar }) {
  const destacados = productos.slice(0, 4);

  return (
    <main id="contenido">
      <section className="hero">
        <div className="hero__grid">
          <div>
            <h1 className="hero__titulo">Camisetas oficiales del fútbol chileno</h1>
            <p className="hero__texto">
              Encuentra las mejores camisetas de los clubes nacionales para la cancha y la tribuna.
            </p>
            <Link className="boton boton--principal" to="/productos">Ver productos</Link>
          </div>
          <figure className="hero__figura">
            <img src="/images/hero-tienda.svg" alt="Camisetas en la tienda" width="800" height="560" />
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
