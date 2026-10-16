// Un artículo del blog. El id viene en la URL: /blogs/2

import { Link, useParams } from 'react-router-dom';
import blogs from '../data/blogs';
import { formatearFecha } from '../utils/formato';

function DetalleBlog() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <main className="container py-5">
        <div className="panel text-center py-5">
          <h1 className="h2">No encontramos ese artículo</h1>
          <Link to="/blogs" className="btn btn-dark mt-2">Ver todos los artículos</Link>
        </div>
      </main>
    );
  }

  const otros = blogs.filter((b) => b.id !== blog.id).slice(0, 2);

  return (
    <section className="seccion">
      <div className="container">
        <Link to="/blogs" className="small"><i className="bi bi-arrow-left me-1" aria-hidden="true" />Volver al blog</Link>

        <article className="blog-articulo mt-3">
          <div style={{ height: 8, width: 80, background: blog.color }} className="mb-3" />
          <h1>{blog.titulo}</h1>
          <p className="texto-secundario">
            {blog.autor}, {formatearFecha(blog.fecha)}. {blog.minutos} min de lectura.
          </p>
          {blog.contenido.map((parrafo, i) => (
            <p key={i}>{parrafo}</p>
          ))}
        </article>

        <hr className="my-5" />
        <h2 className="h3 mb-3">Sigue leyendo</h2>
        <ul className="list-unstyled">
          {otros.map((b) => (
            <li key={b.id} className="mb-2">
              <Link to={`/blogs/${b.id}`}>{b.titulo}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default DetalleBlog;
