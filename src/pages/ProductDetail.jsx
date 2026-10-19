import { useParams, Link } from 'react-router-dom';
import Button from '../components/atoms/Button';

export default function ProductDetail({ productos, onAgregar }) {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === Number(id));

  if (!producto) {
    return (
      <main className="seccion">
        <div className="contenedor centrado">
          <h2>Producto no encontrado</h2>
          <p>La camiseta que buscas no existe o fue retirada del catálogo.</p>
          <div className="su-20">
            <Link to="/productos" className="boton boton--principal">Volver al Catálogo</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="seccion">
      <div className="contenedor">
        <ul className="migas">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li>{producto.nombre}</li>
        </ul>

        <div className="detalle">
          <figure className="detalle__galeria">
            <img src={producto.imagen} alt={producto.nombre} />
          </figure>

          <div>
            <span className="etiqueta etiqueta--ok">{producto.categoria}</span>
            <h1 className="su-20">{producto.nombre}</h1>
            <p className="detalle__precio">${producto.precio?.toLocaleString('es-CL')}</p>
            <p className="detalle__descripcion">{producto.descripcion}</p>

            <div className="detalle__compra">
              <Button
                variant="principal"
                onClick={() => onAgregar(producto)}
                disabled={producto.stock <= 0}
              >
                {producto.stock <= 0 ? "Agotado" : "Agregar al Carrito"}
              </Button>
            </div>

            <div className="detalle__ficha">
              <dl>
                <div>
                  <dt>Código:</dt>
                  <dd>{producto.codigo}</dd>
                </div>
                <div>
                  <dt>Stock disponible:</dt>
                  <dd>{producto.stock} unidades</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

