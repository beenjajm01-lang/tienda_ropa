// Pie de página: contacto, enlaces y redes sociales.

import { Link } from 'react-router-dom';

const ANIO = new Date().getFullYear();

function Footer() {
  return (
    <footer className="cg-footer">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <p className="cg-marca mb-2">
              <img src="/images/logo-cgs.svg" alt="" />
              ChileGol
            </p>
            <p className="mb-3">
              Camisetas de los clubes chilenos y de La Roja, con envío a todas las regiones.
            </p>
            <div className="redes">
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <i className="bi bi-instagram" aria-hidden="true" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <i className="bi bi-facebook" aria-hidden="true" />
              </a>
              <a href="https://www.tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
                <i className="bi bi-tiktok" aria-hidden="true" />
              </a>
              <a href="https://wa.me/56912345678" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <i className="bi bi-whatsapp" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="col-6 col-md-2">
            <h2>Tienda</h2>
            <ul className="list-unstyled mb-0">
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/categorias">Categorías</Link></li>
              <li><Link to="/ofertas">Ofertas</Link></li>
              <li><Link to="/carrito">Carrito</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-2">
            <h2>Ayuda</h2>
            <ul className="list-unstyled mb-0">
              <li><Link to="/contacto">Contacto</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/blogs">Blog</Link></li>
              <li><Link to="/login">Mi cuenta</Link></li>
            </ul>
          </div>

          <div className="col-12 col-md-4">
            <h2>Contacto</h2>
            <ul className="list-unstyled mb-0">
              <li><i className="bi bi-envelope me-2" aria-hidden="true" />contacto@chilegol.cl</li>
              <li><i className="bi bi-telephone me-2" aria-hidden="true" />+56 9 1234 5678</li>
              <li><i className="bi bi-geo-alt me-2" aria-hidden="true" />Santiago, Región Metropolitana</li>
              <li><i className="bi bi-clock me-2" aria-hidden="true" />Lunes a viernes, 9:00 a 18:00</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="cg-footer__base">
        <div className="container py-3 small">© {ANIO} ChileGol Store. Proyecto académico.</div>
      </div>
    </footer>
  );
}

export default Footer;
