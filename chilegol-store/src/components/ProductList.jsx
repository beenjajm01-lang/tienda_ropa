// Lista de productos en cuadrícula.
// Recibe una lista y dibuja una ProductCard por cada producto.
// Columnas según la pantalla: 1 en celular, 2 en tablet, 3 en notebook y 4 en pantallas grandes.

import ProductCard from './ProductCard';

function ProductList({ productos, onAgregar, mensajeVacio = 'No encontramos camisetas con esos filtros.' }) {
  if (productos.length === 0) {
    return (
      <div className="panel text-center py-5">
        <p className="mb-0 texto-secundario">{mensajeVacio}</p>
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
      {productos.map((producto) => (
        <div className="col" key={producto.id}>
          <ProductCard producto={producto} onAgregar={onAgregar} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
