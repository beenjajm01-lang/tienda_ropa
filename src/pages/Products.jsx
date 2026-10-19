import { useState } from 'react';
import ProductCard from '../components/molecules/ProductCard';

export default function Products({ productos, onAgregar }) {
  const [busqueda, setBusqueda] = useState('');

  const filtrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="seccion">
      <div className="contenedor">
        <h1 className="seccion__titulo">Catálogo de Productos</h1>
        <p className="seccion__bajada">Explora todas las camisetas saiyajin disponibles.</p>

        <div className="campo my-4" style={{ maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Buscar camiseta por equipo o personaje..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="calugas">
          {filtrados.map((prod) => (
            <ProductCard key={prod.id} product={prod} onAgregar={onAgregar} />
          ))}
        </div>
      </div>
    </main>
  );
}

