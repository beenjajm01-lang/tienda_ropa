// Página de inicio: carrusel, categorías, destacados y ofertas.

import { Link } from 'react-router-dom';
import Carrusel from '../components/Carrusel';
import CategoriaTile from '../components/CategoriaTile';
import ProductList from '../components/ProductList';
import { useTienda } from '../context/TiendaContext';
import { useAgregarRapido } from '../context/CartContext';
import { filtrarOfertas } from '../services/productosService';
import { porcentajeDescuento } from '../utils/precios';

function Home() {
  const { productos, categorias } = useTienda();
  const agregarRapido = useAgregarRapido();

  const ofertas = filtrarOfertas(productos);
  const destacados = productos.filter((p) => p.destacado).slice(0, 4);
  const mayorDescuento = Math.max(0, ...ofertas.map(porcentajeDescuento));

  const diapositivas = [
    {
      titulo: 'Temporada 2026',
      texto: 'Las camisetas nuevas de Colo-Colo, la U, la UC y La Roja ya están en la tienda.',
      boton: 'Ver camisetas',
      enlace: '/productos',
      imagen: '/images/huevito-rey.png',
      color: 'cancha',
    },
    {
      titulo: `Hasta ${mayorDescuento}% menos`,
      texto: `${ofertas.length} camisetas con precio rebajado mientras dure el stock.`,
      boton: 'Ver ofertas',
      enlace: '/ofertas',
      imagen: '/images/uchile-visita.svg',
      color: 'rojo',
    },
    {
      titulo: 'Clásicas de siempre',
      texto: 'Réplicas retro de 1991 y 1998, con cuello en V y algodón grueso.',
      boton: 'Ver camisetas retro',
      enlace: '/productos?buscar=retro',
      imagen: '/images/colocolo-retro.svg',
      color: 'blanco',
    },
  ];

  return (
    <>
      <Carrusel diapositivas={diapositivas} />

      <div className="franja-beneficios">
        <div className="container py-3">
          <div className="row g-3 text-center text-md-start">
            <div className="col-12 col-md-4 d-flex align-items-center justify-content-center justify-content-md-start gap-3">
              <i className="bi bi-truck" aria-hidden="true" />
              <span>Envío gratis a todo Chile</span>
            </div>
            <div className="col-12 col-md-4 d-flex align-items-center justify-content-center justify-content-md-start gap-3">
              <i className="bi bi-arrow-left-right" aria-hidden="true" />
              <span>Cambio de talla hasta 30 días</span>
            </div>
            <div className="col-12 col-md-4 d-flex align-items-center justify-content-center justify-content-md-start gap-3">
              <i className="bi bi-box-seam" aria-hidden="true" />
              <span>Stock real en cada camiseta</span>
            </div>
          </div>
        </div>
      </div>

      <section className="seccion">
        <div className="container">
          <h2 className="mb-4">Elige tu equipo</h2>
          <div className="row row-cols-2 row-cols-lg-5 g-2 g-md-3">
            {categorias.map((categoria) => (
              <div className="col" key={categoria.id}>
                <CategoriaTile
                  categoria={categoria}
                  cantidad={productos.filter((p) => p.categoria === categoria.nombre).length}
                  to={`/categorias?c=${encodeURIComponent(categoria.nombre)}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion pt-0">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4 gap-3">
            <h2 className="mb-0">Las más pedidas</h2>
            <Link to="/productos">Ver todas</Link>
          </div>
          <ProductList productos={destacados} onAgregar={agregarRapido} />
        </div>
      </section>

      <section className="seccion pt-0">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4 gap-3">
            <h2 className="mb-0">En oferta</h2>
            <Link to="/ofertas">Ver todas las ofertas</Link>
          </div>
          <ProductList
            productos={ofertas.slice(0, 4)}
            onAgregar={agregarRapido}
            mensajeVacio="Ahora no hay ofertas. Vuelve pronto."
          />
        </div>
      </section>
    </>
  );
}

export default Home;
