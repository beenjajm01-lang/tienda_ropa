// Lista de artículos del blog.

import { Link } from 'react-router-dom';
import CabeceraPagina from '../components/CabeceraPagina';
import blogs from '../data/blogs';
import { formatearFecha } from '../utils/formato';

function Blogs() {
  return (
    <>
      <CabeceraPagina titulo="Blog" descripcion="Tallas, cuidados y algo de historia de las camisetas." />

      <section className="seccion">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {blogs.map((blog) => (
              <div className="col" key={blog.id}>
                <article className="blog-card d-flex flex-column">
                  <div className="blog-card__cabecera" style={{ background: blog.color }} />
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <p className="small texto-secundario mb-2">
                      {formatearFecha(blog.fecha)}, {blog.minutos} min de lectura
                    </p>
                    <h2 className="h3">{blog.titulo}</h2>
                    <p className="flex-grow-1">{blog.resumen}</p>
                    <Link to={`/blogs/${blog.id}`} className="fw-semibold">
                      Leer artículo
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Blogs;
