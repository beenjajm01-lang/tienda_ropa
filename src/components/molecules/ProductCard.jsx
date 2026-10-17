import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button';

export default function ProductCard({ product, onAgregar }) {
  const stockClase = product.stock <= 0 
    ? "caluga__stock--agotado" 
    : product.stock <= product.stockCritico 
    ? "caluga__stock--critico" 
    : "";

  const stockTexto = product.stock <= 0 
    ? "Agotado" 
    : product.stock <= product.stockCritico 
    ? `¡Pocas unidades! (${product.stock})` 
    : `Stock: ${product.stock}`;

  return (
    <article className="caluga">
      <figure className="caluga__figura">
        <img src={product.imagen} alt={product.nombre} />
      </figure>
      <div className="caluga__cuerpo">
        <span className="caluga__categoria">{product.categoria}</span>
        <h3 className="caluga__nombre">
          <Link to={`/products/${product.id}`}>{product.nombre}</Link>
        </h3>
        <p className="caluga__precio">${product.precio?.toLocaleString('es-CL')}</p>
        <span className={`caluga__stock ${stockClase}`}>{stockTexto}</span>
      </div>
      <div className="caluga__acciones">
        <Button
          variant="principal"
          className="boton--ancho"
          onClick={() => onAgregar && onAgregar(product)}
          disabled={product.stock <= 0}
        >
          {product.stock <= 0 ? "Sin Stock" : "Agregar al carrito"}
        </Button>
      </div>
    </article>
  );
}

