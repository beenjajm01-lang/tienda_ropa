// Página "Nosotros": historia de la tienda.

import { Link } from 'react-router-dom';
import CabeceraPagina from '../components/CabeceraPagina';

function Nosotros() {
  return (
    <>
      <CabeceraPagina titulo="Nosotros" descripcion="Una tienda hecha por hinchas, para hinchas." />

      <section className="seccion">
        <div className="container">
          <div className="row g-5 align-items-start">
            <div className="col-12 col-lg-7 blog-articulo">
              <h2>Cómo empezó ChileGol</h2>
              <p>
                ChileGol nació como una cuenta de Instagram donde vendíamos camisetas a compañeros de curso.
                Cada fin de semana íbamos al estadio y veíamos lo mismo: hinchas que querían la camiseta nueva
                de su equipo y no sabían dónde conseguirla con su talla.
              </p>
              <p>
                Hoy tenemos un catálogo con los clubes más grandes de Chile, la Selección y algunas réplicas retro.
                Revisamos el stock de cada camiseta todos los días para que lo que ves en la tienda sea lo que
                realmente hay.
              </p>
              <p>
                Esta es la versión 2.0 de la tienda. La primera era una página HTML; ahora está hecha con React,
                tiene carrito, checkout y un panel para administrar productos y pedidos.
              </p>
            </div>

            <div className="col-12 col-lg-5">
              <div className="panel p-4">
                <h2 className="h3">Lo que cuidamos</h2>
                <ul className="list-unstyled mb-0 mt-3">
                  <li className="d-flex gap-3 mb-3">
                    <i className="bi bi-rulers fs-4 text-danger" aria-hidden="true" />
                    <div>
                      <strong>La talla correcta.</strong> Si no te queda, la cambias hasta 30 días después de la compra.
                    </div>
                  </li>
                  <li className="d-flex gap-3 mb-3">
                    <i className="bi bi-truck fs-4 text-danger" aria-hidden="true" />
                    <div>
                      <strong>Envíos a todo Chile.</strong> De Arica a Punta Arenas, sin costo extra.
                    </div>
                  </li>
                  <li className="d-flex gap-3">
                    <i className="bi bi-chat-dots fs-4 text-danger" aria-hidden="true" />
                    <div>
                      <strong>Respuesta rápida.</strong> Contestamos los mensajes en menos de un día hábil.
                    </div>
                  </li>
                </ul>
                <Link to="/contacto" className="btn btn-dark mt-4">Escríbenos</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Nosotros;
